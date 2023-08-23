'use client'

import { createElement, forwardRef } from 'react'
import { Control, Controller } from 'react-hook-form'
import { CMSField } from '../../../types/field'
import { CMSPlugin } from '../../../types/plugin'
import { cn } from '../../lib/utils'

export type SingleInputFieldProps = {
  fieldName: string
  control: Control
  renderInput: (args: { value: any; onChange: (updatedValue: any) => void; fieldName: string }) => React.ReactNode
  cmsField: CMSField
  plugins: CMSPlugin[]
  className?: string
  style?: React.CSSProperties
}

function SingleInputField(
  { fieldName, control, renderInput, cmsField, plugins, className, style }: SingleInputFieldProps,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <div className={cn('flex items-start space-x-2', className)} style={style} ref={ref}>
            <div className="flex-1">{renderInput({ value, onChange, fieldName })}</div>
            {plugins.length ? (
              <>
                <div className="h-10 border-r border-dashed" />
                <div className="space-y-2">
                  {plugins.map((plugin) => {
                    return createElement(plugin.component, { field: cmsField, updateField: onChange, key: plugin.name })
                  })}
                </div>
              </>
            ) : null}
          </div>
        )
      }}
    />
  )
}

export default forwardRef(SingleInputField)
