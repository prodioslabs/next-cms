import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { CMSSingleton } from '~/cms/types/schema'
import { UpdateSingletonBodySchema } from './schema'
import { CMSField } from '~/cms/types/field'
import { handleError } from '~/cms/utils/api'
import { updateSingletonData } from '~/cms/core/data'

export function createUpdateSingletonAPI<CMSSingletons extends Record<string, CMSSingleton<Record<string, CMSField>>>>(
  singletons: CMSSingletons,
) {
  return async function updateSingletonAPI(input: UpdateSingletonBodySchema) {
    try {
      const { singletonName, data } = input

      if (!(singletonName in singletons)) {
        return NextResponse.json({ message: `Singleton ${singletonName} not found` }, { status: 404 })
      }

      const singleton = singletons[singletonName]
      await updateSingletonData(singleton, singletonName, data)

      // revalidate path
      revalidatePath('/cms/admin/[[...slug]]')

      return NextResponse.json({ type: 'singleton', singletonName, data })
    } catch (error) {
      return handleError(error)
    }
  }
}
