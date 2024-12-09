import React from 'react'
import { FormControl, FormField, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, FieldPath } from 'react-hook-form'
import { authFormSchema } from '@/lib/utils'
import { z } from 'zod'

const formSchema = authFormSchema('sign-up')

interface InputFieldProps {
    controller: Control<z.infer<typeof formSchema>>
    name: FieldPath<z.infer<typeof formSchema>>
    label: string
    type?: 'text' | 'email' | 'password' | 'date' | 'datetime' | 'datetime-local'
}

const InputField = ({ controller, name, label, type = 'text' }: InputFieldProps) => {
    return (
        <FormField
            control={controller}
            name={name}
            render={({ field }) => (
                <div className='form-item'>
                    <FormLabel htmlFor={name} className='form-label'>{label}</FormLabel>
                    <div className='flex w-full flex-col'>
                        <FormControl>
                            <Input placeholder={`Input a ${label}`}
                                {...field}
                                className='input-class'
                                type={type}
                            />
                        </FormControl>
                        <FormMessage className='form-message mt-2' />
                    </div>
                </div>
            )}
        />
    )
}

export default InputField