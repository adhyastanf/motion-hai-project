'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';

export default function ProjectForm({ form, disabled, isLoading, onConfirm, fields, buttonYesText="Submit" }) {
  function onSubmit(values) {
    onConfirm(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        {fields.map((val, idx) => {
          return (
            <FormField
              key={idx}
              control={form.control}
              name={val.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{val.label}</FormLabel>
                  <FormControl>
                    <Input placeholder={val.placeholder} {...field} />
                  </FormControl>
                  <FormDescription>{val.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          );
        })}

        {isLoading && (
          <Button disabled className='w-full'>
            <Loader2 className='animate-spin' />
            Please wait...
          </Button>
        )}

        {!isLoading && (
          <Button type='submit' disabled={!disabled} className='w-full'>
            {buttonYesText}
          </Button>
        )}
      </form>
    </Form>
  );
}
