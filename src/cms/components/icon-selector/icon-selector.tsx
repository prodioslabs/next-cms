'use client'

import { useMemo, useState } from 'react'
import invariant from 'tiny-invariant'
import * as LucideIcons from 'lucide-react'
import { matchSorter } from 'match-sorter'
import { CMSIconData } from '~/cms/types/field'
import { Button } from '~/components/ui/button'
import { Command, CommandEmpty, CommandInput, CommandItem, CommandList } from '~/components/ui/command'
import { LucideIcon } from '~/components/ui/lucide-icon'
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover'
import { cn } from '~/lib/utils'

const iconNames = Object.keys(LucideIcons).filter((key) => key !== 'createLucideIcon' && key !== 'icons')

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

  const filteredIcons = useMemo(() => matchSorter(iconNames, searchText), [searchText])

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
