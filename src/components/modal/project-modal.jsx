'use client';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { Modal } from '../ui/modal';


export default function ModalCreateProject({ open, onClose, onConfirm, isLoading,  form, disabled }) {

    return (
      <Modal title="Let's build a Workspace" isOpen={open} onClose={onClose}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onConfirm)} className='space-y-8'>
              <FormField
                control={form.control}
                name='project'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Create your project' {...field} />
                    </FormControl>
                    <FormDescription>This is the name of your company, team or organization.</FormDescription>
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
                  Continue
                </Button>
              )}

            </form>
          </Form>
      </Modal>
    );
  }