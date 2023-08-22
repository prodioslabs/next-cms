'use client'

import { useMemo, useState } from 'react'
import invariant from 'tiny-invariant'
import { matchSorter } from 'match-sorter'
import {
  Button,
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
} from 'ui'
import { CMSIconData } from '../../../../types/field'
import { lucideIconNames, LucideIcon } from '../../../../ui/components/lucide-icon'

type IconSelectorProps = {
  icon?: CMSIconData
  onChange?: (icon: CMSIconData) => void
  className?: string
  style?: React.CSSProperties
}

export default function IconSelector({ icon, onChange, className, style }: IconSelectorProps) {
  invariant(icon?.iconLib ?? 'lucide', `Icon library "${icon?.iconLib}" is not supported`)

  const [open, setOpen] = useState(false)
  const [searchText, setSearchText] = useState('')

  const filteredIcons = useMemo(() => matchSorter(lucideIconNames, searchText), [searchText])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={className}
          style={style}
          icon={icon ? <LucideIcon name={icon.name} /> : undefined}
        >
          {icon ? icon.name : 'Select Icon'}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command
          shouldFilter={false}
          onChange={(event) => {
            setSearchText((event.target as HTMLInputElement).value)
          }}
        >
          <CommandInput placeholder="Search framework..." />
          <CommandList className="max-h-[300px]">
            {filteredIcons.length === 0 ? <CommandEmpty>No icon found.</CommandEmpty> : null}
            {filteredIcons.slice(0, 50).map((iconName) => (
              <CommandItem
                key={iconName}
                onSelect={() => {
                  onChange?.({
                    iconLib: 'lucide',
                    name: iconName,
                  })
                  setOpen(false)
                }}
              >
                <LucideIcon
                  name={iconName}
                  className={cn('mr-2 h-4 w-4', icon?.name === iconName ? 'opacity-100' : 'opacity-80')}
                />
                {iconName}
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
