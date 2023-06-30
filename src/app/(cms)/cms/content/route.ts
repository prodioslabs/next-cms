import { NextResponse } from 'next/server'
import { z } from 'zod'
import cmsConfig from '~/cms.config'
import { getCollectionData, getDataFilePath, getSingletonData, writeDataToFile } from '~/core/collection'
import { Config } from '~/core/config'
import { getValidationSchemaForCollection, getValidationSchemaForSingleton } from '~/core/collection-schema'
import { generateRouteHandlerSchemas } from '~/core/route-schema'

// TODO: Move this makehandlers into the core folder
function makehandlers(config: Config) {
  const { getContentQueryParamsSchema, updateContentBodySchema } = generateRouteHandlerSchemas(config)

  async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    try {
      const { type, id } = getContentQueryParamsSchema.parse({
        type: searchParams.get('type'),
        id: searchParams.get('id'),
      })
      if (type === 'collection') {
        if (id in cmsConfig.collections) {
          const data = await getCollectionData(
            config.collections[id as keyof typeof config.collections],
            config.basePath,
          )
          return NextResponse.json({ type: 'collection', data })
        }
        return NextResponse.json({ error: `Collection ${id} not found` }, { status: 404 })
      }
      if (type === 'singleton') {
        if (id in config.singletons) {
          const data = await getSingletonData(config.singletons[id as keyof typeof config.singletons], config.basePath)
          return NextResponse.json({ type: 'singleton', data })
        }
        return NextResponse.json({ error: `Singleton ${id} not found` }, { status: 404 })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: { issues: error.issues, message: error.message, name: error.name } },
          { status: 422 },
        )
      }
      throw error
    }
  }

  async function POST(request: Request) {
    try {
      const { type, data, id } = updateContentBodySchema.parse(await request.json())

      let schema
      if (type === 'collection') {
        schema = cmsConfig.collections[id as keyof typeof cmsConfig.collections]
      } else if (type === 'singleton') {
        schema = cmsConfig.singletons[id as keyof typeof cmsConfig.singletons]
      }

      if (!schema) {
        return NextResponse.json({ error: `${type} with id - ${data.id} not found in the config` }, { status: 404 })
      }

      const validationSchema =
        type === 'collection' ? getValidationSchemaForCollection(schema) : getValidationSchemaForSingleton(schema)
      const parsedData = validationSchema.parse(data)

      // update the data file
      const dataFile = await getDataFilePath(schema.path, config.basePath)
      await writeDataToFile(dataFile, parsedData)

      return NextResponse.json(
        {
          type,
          id,
          data: parsedData,
        },
        { status: 200 },
      )
    } catch (error) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { error: { issues: error.issues, message: error.message, name: error.name } },
          { status: 422 },
        )
      }
      throw error
    }
  }

  return {
    GET,
    POST,
  }
}

export const { GET, POST } = makehandlers(cmsConfig)
