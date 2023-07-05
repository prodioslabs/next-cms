/* eslint-disable no-console */

import { CMSField } from '../types/field'
import { CMSCollection, CMSSingleton } from '../types/schema'
import { CMSConfig } from '../types/config'
import { prisma } from './db'
import { generateDummyData } from './fix-data'

function validateCollection(collection: CMSCollection<Record<string, CMSField>>, collectionName: string) {
  if (collection.schema[collection.slugField]?.type !== 'text') {
    throw new Error(`Collection - ${collectionName}: slugField ${collection.slugField} is not of type "text"`)
  }
  if (collection.nameField && collection.schema[collection.nameField]?.type !== 'text') {
    throw new Error(`Collection - ${collectionName}: nameField ${collection.nameField} is not of type "text"`)
  }
}

export async function bootstrap<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(config: CMSConfig<CMSCollections, CMSSingletons>) {
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
    }
  }
}
