'use client'

import { Plus, Trash } from 'lucide-react'
import { arrayMove } from '@dnd-kit/sortable'
import { CMSField } from '~/cms/types/field'
import { CMSPlugin } from '~/cms/types/plugin'
import SortableList from '../sortable-list'
import { Button } from '~/components/ui/button'
import SingleInputField from '../single-input-field'
import { cn } from '~/lib/utils'
import { generateDummyDataForField } from '~/cms/core/fix-data'

export type MultiInputFieldProps<DataType extends any> = {
  field: CMSField
  value: DataType[]
  onChange: (value: DataType[]) => void
  renderField: (args: { value: DataType; onChange: (value: DataType) => void }) => React.ReactElement
  plugins: CMSPlugin[]
  className?: string
  style?: React.CSSProperties
}

export default function MultiInputField<DataType extends any>({
  field,
  value,
  onChange,
  renderField,
  plugins,
  className,
  style,
}: MultiInputFieldProps<DataType>) {
  return (
    <div className={cn('space-y-4', className)}>
      <SortableList
        className="space-y-4"
        style={style}
        items={value?.map((item, index) => ({ id: `item-${index}`, data: item })) ?? []}
        onDragEnd={({ active, over }) => {
          const fromIndex = value?.findIndex((item, index) => `item-${index}` === active.id)
          const toIndex = value?.findIndex((item, index) => `item-${index}` === over!.id)
          if (typeof fromIndex !== 'undefined' && typeof toIndex !== 'undefined') {
            const newArray = arrayMove(value, fromIndex, toIndex)
            onChange(newArray)
          }
        }}
        renderItem={({ id, data }) => {
          return (
            <SortableList.Item key={id} id={id} className="flex items-start space-x-2">
              <SortableList.DragHandle />
              <SingleInputField
                className="flex-1"
                value={data}
                onChange={(updatedValue) => {
                  onChange(
                    value?.map((item, index) => {
                      const itemId = `item-${index}`
                      if (itemId !== id) {
                        return item
                      }
                      return updatedValue
                    }) ?? [],
                  )
                }}
                field={field}
                plugins={plugins}
                renderField={renderField}
              />
              <div className="h-10 border-r border-dashed" />
              <Button
                type="button"
                icon={<Trash />}
                variant="destructive-outline"
                size="icon"
                className="opacity-30 hover:opacity-100"
                onClick={() => {
                  // remove the element
                  onChange(value?.filter((item, index) => `item-${index}` !== id) ?? [])
                }}
              />
            </SortableList.Item>
          )
        }}
      />
      <div className="flex items-center">
        <Button
          type="button"
          variant="outline"
          icon={<Plus />}
          onClick={() => {
            onChange([...(value ?? []), generateDummyDataForField(field) as DataType])
          }}
        >
          Add Entry
        </Button>
      </div>
    </div>
  )
}
