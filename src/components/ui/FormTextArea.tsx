'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import TextareaAutosize from 'react-textarea-autosize'

interface Props {
  control: any
  name: string
  label: string
  placeholder?: string
  disabled?: boolean
}

const FormTextArea = ({ control, name, label, placeholder, disabled = false }: Props) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium text-gray-700">{label}</FormLabel>
          <FormControl>
            <TextareaAutosize
              {...field}
              disabled={disabled}
              minRows={4}
              placeholder={placeholder}
              className="w-full mt-1 px-4 py-3 text-sm border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormTextArea
