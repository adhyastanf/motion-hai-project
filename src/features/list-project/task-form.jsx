'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import SelectField from '@/components/ui/select-options';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar1Icon, Loader2 } from 'lucide-react';

export default function TaskForm({ form, disabled, isLoading, onConfirm, taskOptions = [], memberOptions = [] }) {

  function onSubmit(values) {
    onConfirm(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='task'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter task name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
          <FormField
            control={form.control}
            name='due'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button variant={'outline'} className={cn('w-full text-left font-normal', !field.value && 'text-muted-foreground')}>
                        {field.value ? format(field.value,  'dd MMMM yyyy') : <span>Pick a date</span>}
                        <Calendar1Icon  className='ml-auto h-4 w-4 opacity-50'/>
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className='w-auto p-0' align='start'>
                    <Calendar mode='single' selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))} initialFocus />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='status'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <SelectField onValueChange={(value) => field.onChange(value)} options={taskOptions} placeholder='Select Status' />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='assigne'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assigne</FormLabel>
                <SelectField onValueChange={(value) => field.onChange(value)} options={memberOptions} placeholder='Select Assigne' />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder='Enter product description' className='resize-none' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading && (
            <Button disabled className='w-full'>
              <Loader2 className='animate-spin' />
              Please wait...
            </Button>
          )}

          {!isLoading && (
            <Button type='submit' disabled={!disabled} className='w-full'>
              Submit
            </Button>
          )}
      </form>
    </Form>
  );
}
