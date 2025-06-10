'use client'

import { useEffect, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import industryOptions from '@/data/industrySector'

interface IndustryComboboxProps {
  value: string
  onChange: (value: string) => void
}

export function IndustryCombobox({ value, onChange }: IndustryComboboxProps) {
  const [open, setOpen] = useState(false)
  const [customIndustry, setCustomIndustry] = useState('')
  const [isCustom, setIsCustom] = useState(false)

  useEffect(() => {
    if (value === 'Lainnya') {
      setIsCustom(true)
    } else {
      setIsCustom(false)
    }
  }, [value])

  return (
    <div className="space-y-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? value : 'Pilih Bidang Industri'}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 max-h-60 overflow-y-auto">
          <Command>
            <CommandInput placeholder="Cari bidang industri..." />
            <CommandEmpty>Industri tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {[...industryOptions, 'Lainnya'].map((industry) => (
                <CommandItem
                  key={industry}
                  value={industry}
                  onSelect={(currentValue) => {
                    onChange(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === industry ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {industry}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>

      {isCustom && (
        <Input
          value={customIndustry}
          onChange={(e) => {
            setCustomIndustry(e.target.value)
            onChange(e.target.value)
          }}
          placeholder="Tulis bidang industri secara manual"
        />
      )}
    </div>
  )
}
