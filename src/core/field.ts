export type BaseField = {
  label?: string
  hidden?: boolean
}

export type TextField = {
  type: 'text'
  default?: string
}

export type RichTextField = {
  type: 'rich-text'
  default?: string
}

export type NumberField = {
  type: 'number'
  default?: number
}

export type DateField = {
  type: 'date'
  default?: Date
}

export type SingleImageField = {
  type: 'image'
  multiple?: false
}
export type MultipleImageField = {
  type: 'image'
  multiple: true
}
export type ImageField = SingleImageField | MultipleImageField
export type ImageData = {
  url: string
  width: number
  height: number
}

export type Field = BaseField & (TextField | RichTextField | NumberField | DateField | ImageField)

export type InferFieldDataType<F extends Field> = F extends TextField
  ? string
  : F extends RichTextField
  ? string
  : F extends NumberField
  ? number
  : F extends DateField
  ? Date
  : F extends SingleImageField
  ? ImageData
  : F extends MultipleImageField
  ? ImageData[]
  : never
