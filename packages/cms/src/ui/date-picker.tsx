'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { type SelectSingleEventHandler } from 'react-day-picker'
import { CalendarIcon } from 'lucide-react'
import { cn } from '../dashboard/lib/utils'
import { Button } from './button'
import { Calendar } from './calendar'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

type DatePickerProps = {
  date?: Date
  onChange?: SelectSingleEventHandler
  className?: string
  style?: React.CSSProperties
}

export function DatePicker({ date, onChange, className, style }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('w-[240px] justify-start text-left font-normal', !date && 'text-muted-foreground', className)}
          style={style}
          icon={<CalendarIcon />}
        >
          {date ? format(date, 'PPP') : 'Pick a date'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar mode="single" selected={date} onSelect={onChange} initialFocus />
      </PopoverContent>
    </Popover>
  )
}
