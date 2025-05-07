'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SelectField from '@/components/ui/select-options';
import { Textarea } from '@/components/ui/textarea';

export default function TaskForm({ form, memberOptions }) {
  const { data: taskOptions } = useGetStatusTask();

  function onSubmit(values) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='name'
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
                <Select onValueChange={(value) => field.onChange(value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select due date' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='beauty'>Beauty Products</SelectItem>
                    <SelectItem value='electronics'>Electronics</SelectItem>
                    <SelectItem value='clothing'>Clothing</SelectItem>
                    <SelectItem value='home'>Home & Garden</SelectItem>
                    <SelectItem value='sports'>Sports & Outdoors</SelectItem>
                  </SelectContent>
                </Select>
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
                <SelectField value={field.value} onValueChange={(value) => field.onChange(value)} options={taskOptions} placeholder='Select Status' />
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
                <SelectField value={field.value} onValueChange={(value) => field.onChange(value)} options={taskOptions} placeholder='Select Assigne' />
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
        <Button type='submit'>Add Product</Button>
      </form>
    </Form>
  );
}
