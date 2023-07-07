import { UseFormReturn } from 'react-hook-form'
import { CMSField } from './field'

export type CMSPlugin = {
  name: string
  enabledForFields: CMSField['type'][]
  component: React.ComponentType<{ form: UseFormReturn<any, any, any>; fieldKey: string; field: CMSField }>
  config: any
}
