import { CMSField } from './field'

export type CMSPluginComponentProps = {
  field: CMSField
  updateField: (value: any) => void
}

export type CMSPlugin = {
  name: string
  enabledForFields: CMSField['type'][]
  component: React.ComponentType<CMSPluginComponentProps>
  config: any
  api?: {
    method: 'GET' | 'POST'
    handler: (request: Request) => Promise<any>
  }
}
