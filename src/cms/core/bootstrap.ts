/* eslint-disable no-console */

import { z } from 'zod'
import { CMSField } from '../types/field'
import { CMSCollection, CMSSingleton } from '../types/schema'
import { CMSConfig } from '../types/config'
import { prisma } from './db'
import { fixData, generateDummyData } from './fix-data'
import { isTextField } from './field'
import { getValidationSchemaForCollectionElement, getValidationSchemaForSingleton } from './validation'
import config from '~/cms.config'

function validateCollection(collection: CMSCollection<Record<string, CMSField>>, collectionName: string) {
  if (!isTextField(collection.schema[collection.slugField])) {
    throw new Error(`Collection - ${collectionName}: slugField ${collection.slugField} is not of type "text"`)
  }
  if (collection.nameField && !isTextField(collection.schema[collection.nameField])) {
    throw new Error(`Collection - ${collectionName}: nameField ${collection.nameField} is not of type "text"`)
  }
}

async function bootstrap<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(config: CMSConfig<CMSCollections, CMSSingletons>) {
  console.log('🚀 Bootstrapping CMS...')

  for (const [collectionName, collection] of Object.entries(config.collections)) {
    // validate the collection
    validateCollection(collection, collectionName)

    const collectionPresent = await prisma.collection.findFirst({
      where: {
        name: collectionName,
      },
    })
    if (!collectionPresent) {
      console.warn(`⚠️ Collection - ${collectionName} not created. Creating ...`)
      await prisma.collection.create({
        data: {
          label: collection.label,
          name: collectionName,
          schema: collection.schema,
          slugField: collection.slugField,
        },
      })
      console.log(`✅ Collection - ${collectionName} created`)
    } else {
      console.log(`⏱️ Syncing singleton ${collectionName} schema...`)
      await prisma.collection.update({
        where: {
          id: collectionPresent.id,
        },
        data: {
          label: collection.label,
          name: collectionName,
          schema: collection.schema,
          slugField: collection.slugField,
        },
      })
      console.log(`✅ Collection - ${collectionName} synced`)
    }

    const validationSchema = getValidationSchemaForCollectionElement(collection)

    // Fix the collection elements data
    const collectionElements = await prisma.collectionElement.findMany({
      where: {
        collection: {
          name: collectionName,
        },
      },
    })
    for (const collectionElement of collectionElements) {
      try {
        // check if the collection data is valid or not
        validationSchema.parse(collectionElement.data)
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.log(
            `⚠️ Invalid collection element ${collectionElement.id} for collection - ${collectionName} data found`,
          )
          console.log(`⏱️ Fixing collection element ${collectionElement.id} for collection - ${collectionName} data...`)
          const fixedData = fixData(collection.schema, collectionElement.data, error)
          await prisma.collectionElement.update({
            where: {
              id: collectionElement.id,
            },
            data: {
              data: fixedData,
            },
          })
          console.log(`✅ Collection element ${collectionElement.id} for collection - ${collectionName} data fixed`)
        } else {
          throw error
        }
      }
    }
  }

  for (const [singletonName, singleton] of Object.entries(config.singletons)) {
    const singletonPresent = await prisma.singleton.findFirst({
      where: {
        name: singletonName,
      },
    })
    if (!singletonPresent) {
      console.warn(`⚠️ Singleton - ${singletonName} not created. Creating ...`)
      await prisma.singleton.create({
        data: {
          label: singleton.label,
          name: singletonName,
          schema: singleton.schema,
          data: generateDummyData(singleton.schema),
        },
      })
      console.log(`✅ Singleton - ${singletonName} created`)
    } else {
      console.log(`⏱️ Syncing singletong ${singletonName} schema...`)
      await prisma.singleton.update({
        where: {
          id: singletonPresent.id,
        },
        data: {
          label: singleton.label,
          name: singletonName,
          schema: singleton.schema,
        },
      })
      console.log(`✅ Singleton - ${singletonName} synced`)

      const validationSchema = getValidationSchemaForSingleton(singleton)
      try {
        validationSchema.parse(singletonPresent.data)
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.log(`⚠️ Invalid singleton ${singletonName} data found`)
          console.log(`⏱️ Fixing singleton ${singletonName} data...`)
          const fixedData = fixData(singleton.schema, singletonPresent.data, error)
          await prisma.singleton.update({
            where: {
              name: singletonName,
            },
            data: {
              data: fixedData,
            },
          })
          console.log(`✅ Singleton ${singletonName} data fixed`)
        } else {
          throw error
        }
      }
    }
  }
  console.log('✅ CMS Bootstrapped')
}

bootstrap(config)
