import { NextResponse } from 'next/server'
import { z } from 'zod'
import cmsConfig from '~/cms.config'
import {
  ElementData,
  getCollectionData,
  getDataFilePath,
  getSingletonData,
  writeDataToFile,
  writeElementDataToCollectionFile,
} from '~/core/collection'
import { Config } from '~/core/config'
import { getValidationSchemaForSingleton } from '~/core/collection-schema'
import { generateRouteHandlerSchemas } from './schema'

// TODO: Move this makehandlers into the core folder
function makehandlers(config: Config) {
  const { getContentQueryParamsSchema, updateContentBodySchema, deleteContentQueryParamsSchema } =
    generateRouteHandlerSchemas(config)

  /**
   * GET /cms/content?type=singleton&id={singletonId}
   * GET /cms/content?type=collection&id={collectionId}
   *
   * Method to get the content of a singleton or a collection
   */
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

  /**
   * POST /cms/content
   *
   * Method to update the content of a singleton or a collection
   */
  async function POST(request: Request) {
    try {
      const input = updateContentBodySchema.parse(await request.json())

      let schema
      if (input.type === 'collection') {
        schema = cmsConfig.collections[input.id as keyof typeof cmsConfig.collections]
      } else if (input.type === 'singleton') {
        schema = cmsConfig.singletons[input.id as keyof typeof cmsConfig.singletons]
      }

      if (!schema) {
        return NextResponse.json(
          { error: `${input.type} with id - ${input.id} not found in the config` },
          { status: 404 },
        )
      }

      // validationSchema is always computed assuming schema as a singleton because of even for the collection
      // each element of the collection would be having its own content manager
      const validationSchema = getValidationSchemaForSingleton(schema)
      const parsedData = validationSchema.parse(input.data)

      // update the data file
      const dataFile = await getDataFilePath(schema.path, config.basePath)
      if (input.type === 'singleton') {
        await writeDataToFile(dataFile, parsedData)
        return NextResponse.json(
          {
            type: input.type,
            id: input.id,
            data: parsedData,
          },
          { status: 200 },
        )
      } else {
        await writeElementDataToCollectionFile(dataFile, parsedData, input.elementIndex)
        return NextResponse.json(
          {
            type: input.type,
            id: input.id,
            data: parsedData,
            elementIndex: input.elementIndex,
          },
          { status: 200 },
        )
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

  /**
   * DELETE /cms/content
   *
   * Method to delete the element of a collection
   */
  async function DELETE(request: Request) {
    const { searchParams } = new URL(request.url)

    try {
      const { elementIndex, id } = deleteContentQueryParamsSchema.parse({
        elementIndex: Number.parseInt(searchParams.get('elementIndex') as string),
        id: searchParams.get('id'),
      })
      const collection = cmsConfig.collections[id as keyof typeof cmsConfig.collections]

      const data = (await getCollectionData(collection, cmsConfig.basePath)) as ElementData<typeof collection>[]
      const updatedData = data.filter((_, index) => index !== elementIndex)

      await writeDataToFile(await getDataFilePath(collection.path, cmsConfig.basePath), updatedData)

      return NextResponse.json({ id, elementIndex })
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
    DELETE,
  }
}

export const { GET, POST, DELETE } = makehandlers(cmsConfig)
