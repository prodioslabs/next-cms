/* eslint-disable no-console */

import { z } from 'zod'
import { CMSField } from './types/field'
import { CMSCollection, CMSSingleton } from './types/schema'
import { CMSConfig } from './types/config'
import { prisma } from './db'
import { fixData, generateDummyData } from './fix-data'
import { isTextField } from './field'
import { getValidationSchemaForCollectionElement, getValidationSchemaForSingleton } from './validation'
import { DIVIDER, errorMessage, eventMessage, successMessage, warnMessage } from './lib/cli'

function validateCollection(collection: CMSCollection<Record<string, CMSField>>, collectionName: string) {
  if (!isTextField(collection.schema[collection.slugField])) {
    throw new Error(`Collection - ${collectionName}: slugField ${collection.slugField} is not of type "text"`)
  }
  if (collection.nameField && !isTextField(collection.schema[collection.nameField])) {
    throw new Error(`Collection - ${collectionName}: nameField ${collection.nameField} is not of type "text"`)
  }
}

export async function bootstrap<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(config: CMSConfig<CMSCollections, CMSSingletons>) {
  console.log(DIVIDER)

  console.group(eventMessage('bootstrapping cms...'))

  console.group(eventMessage('syncing collection and collection elements...'))
  for (const [collectionName, collection] of Object.entries(config.collections)) {
    // validate the collection
    validateCollection(collection, collectionName)

    const collectionPresent = await prisma.collection.findFirst({
      where: {
        name: collectionName,
      },
    })
    if (!collectionPresent) {
      console.log(warnMessage(`collection - ${collectionName} not found. creating ...`))
      await prisma.collection.create({
        data: {
          label: collection.label,
          name: collectionName,
          schema: collection.schema,
          slugField: collection.slugField,
        },
      })
      console.log(successMessage(`collection - ${collectionName} created`))
    } else {
      console.log(eventMessage(`syncing singleton ${collectionName} schema...`))
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
      console.log(successMessage(`collection - ${collectionName} synced`))
    }

    const validationSchema = getValidationSchemaForCollectionElement(collection)

    console.group(eventMessage(`syncing collection elements for collection - ${collectionName}...`))
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
            errorMessage(
              `invalid collection element ${collectionElement.id} for collection - ${collectionName} data found`,
            ),
          )
          console.log(
            eventMessage(
              `fixing collection element ${collectionElement.id} for collection - ${collectionName} data...`,
            ),
          )
          const fixedData = fixData(collection.schema, collectionElement.data, error)
          await prisma.collectionElement.update({
            where: {
              id: collectionElement.id,
            },
            data: {
              data: fixedData,
            },
          })
          console.log(
            successMessage(`collection element ${collectionElement.id} for collection - ${collectionName} data fixed`),
          )
        } else {
          throw error
        }
      }
    }
    console.groupEnd()
    console.log(successMessage(`syncing collection elements for collection - ${collectionName}...`))
  }
  console.groupEnd()
  console.log(successMessage('collection and collection elements synced'))

  console.group(eventMessage('syncing singletons...'))
  for (const [singletonName, singleton] of Object.entries(config.singletons)) {
    const singletonPresent = await prisma.singleton.findFirst({
      where: {
        name: singletonName,
      },
    })
    if (!singletonPresent) {
      console.log(warnMessage(`singleton - ${singletonName} not created. creating ...`))
      await prisma.singleton.create({
        data: {
          label: singleton.label,
          name: singletonName,
          schema: singleton.schema,
          data: generateDummyData(singleton.schema),
        },
      })
      console.log(successMessage(`singleton - ${singletonName} created`))
    } else {
      console.log(eventMessage(`syncing singleton ${singletonName} schema...`))
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
      console.log(successMessage(`singleton - ${singletonName} synced`))

      const validationSchema = getValidationSchemaForSingleton(singleton)
      try {
        validationSchema.parse(singletonPresent.data)
      } catch (error) {
        if (error instanceof z.ZodError) {
          console.log(errorMessage(`invalid singleton ${singletonName} data found`))
          console.log(eventMessage(`fixing singleton ${singletonName} data...`))
          const fixedData = fixData(singleton.schema, singletonPresent.data, error)
          await prisma.singleton.update({
            where: {
              name: singletonName,
            },
            data: {
              data: fixedData,
            },
          })
          console.log(successMessage(`singleton ${singletonName} data fixed`))
        } else {
          throw error
        }
      }
    }
  }
  console.groupEnd()
  console.log(successMessage('singletons synced'))

  console.groupEnd()
  console.log(successMessage('cms bootstrapped'))

  console.log(DIVIDER)
}
