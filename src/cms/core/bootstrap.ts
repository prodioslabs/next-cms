/* eslint-disable no-console */

import colors from 'colors'
import { CMSField } from '../types/field'
import { CMSCollection, CMSSingleton } from '../types/schema'
import { CMSConfig } from '../types/config'
import { prisma } from './db'
import { generateDummyData } from './fix-data'

export async function bootstrap<
  CMSCollections extends Record<string, CMSCollection<Record<string, CMSField>>>,
  CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>,
>(config: CMSConfig<CMSCollections, CMSSingletons>) {
  for (const [collectionName, collection] of Object.entries(config.collections)) {
    const collectionPresent = await prisma.collection.findFirst({
      where: {
        name: collectionName,
      },
    })
    if (!collectionPresent) {
      console.warn(colors.yellow(`⚠️ Collection - ${collectionName} not created. Creating ...`))
      await prisma.collection.create({
        data: {
          label: collection.label,
          name: collectionName,
          schema: collection.schema,
          slugField: collection.slugField,
        },
      })
      console.log(colors.green(`✅ Collection - ${collectionName} created`))
    } else {
      console.log(colors.blue(`⏱️ Syncing singleton ${collectionName} schema...`))
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
      console.log(colors.green(`✅ Collection - ${collectionName} synced`))
    }
  }

  for (const [singletonName, singleton] of Object.entries(config.singletons)) {
    const singletonPresent = await prisma.singleton.findFirst({
      where: {
        name: singletonName,
      },
    })
    if (!singletonPresent) {
      console.warn(colors.yellow(`⚠️ Singleton - ${singletonName} not created. Creating ...`))
      await prisma.singleton.create({
        data: {
          label: singleton.label,
          name: singletonName,
          schema: singleton.schema,
          data: generateDummyData(singleton.schema),
        },
      })
      console.log(colors.green(`✅ Singleton - ${singletonName} created`))
    } else {
      console.log(colors.blue(`⏱️ Syncing singletong ${singletonName} schema...`))
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
      console.log(colors.green(`✅ Singleton - ${singletonName} synced`))
    }
  }
}