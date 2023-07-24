'use client'

import { createElement } from 'react'
import { CMSField } from '~/cms/types/field'
import { CMSPlugin } from '~/cms/types/plugin'
import { cn } from '~/lib/utils'

type BaseFieldProps<DataType extends any> = {
  field: CMSField
  value: DataType
  onChange: (value: DataType) => void
  renderField: (args: { value: DataType; onChange: (value: DataType) => void }) => React.ReactElement
  plugins: CMSPlugin[]
  className?: string
  style?: React.CSSProperties
}

export default function BaseField<DataType extends any>({
  value,
  onChange,
  renderField,
  field,
  plugins,
  className,
  style,
}: BaseFieldProps<DataType>) {
  return (
    <div className={cn('flex items-start space-x-2', className)} style={style}>
      <div className="flex-1">{renderField({ value, onChange })}</div>
      {plugins.length ? (
        <>
          <div className="h-10 border-r border-dashed" />
          {plugins.map((plugin) => {
            return createElement(plugin.component, { field, updateField: onChange })
          })}
        </>
      ) : null}
    </div>
  )
}
