import { UseFormReturn } from 'react-hook-form'
import { CMSField } from './field'

export type CMSPluginComponentProps = { form: UseFormReturn<any, any, any>; fieldKey: string; field: CMSField }

export type CMSPlugin = {
  name: string
  enabledForFields: CMSField['type'][]
  component: React.ComponentType<CMSPluginComponentProps>
  config: any
}