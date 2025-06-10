'use client';

import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent
} from '@/components/ui/popover';
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

type ComboboxProps = {
  items: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
};

export function Combobox({ items, value, onChange, placeholder = 'Select...', disabled = false }: ComboboxProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setOpen(!open)}
          className={cn(
            "w-full justify-between border border-gray-300 bg-white px-4 py-2 rounded-md shadow-sm text-sm text-left flex items-center",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <span>{value || placeholder}</span>
          <ChevronDown className="ml-2 h-4 w-4 text-gray-400" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Cari..." />
          <CommandEmpty>Tidak ditemukan</CommandEmpty>
          <CommandGroup>
            {items.map((item) => (
              <CommandItem
                key={item}
                onSelect={() => {
                  onChange(item);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    'mr-2 h-4 w-4',
                    value === item ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {item}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
