// components/comments-section.tsx
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { MessageSquare, SendHorizonal } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { createTaskComment, getCommentsByTaskId } from '@/app/actions';
import { useParams } from 'next/navigation';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const formSchema = z.object({
  comments: z.string(),
});

export default function CommentsSection({ taskId, assigneeId }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { comments: '' },
  });

  const queryClient = useQueryClient();
  const { orgId } = useParams();

  const disabledForm = form.watch('comments');

  const { data, isLoading } = useQuery({
    queryKey: ['comments', taskId],
    queryFn: () => getCommentsByTaskId(taskId),
    enabled: !!taskId,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values) => {
      return await createTaskComment(taskId, assigneeId, values.comments);
    },
    onSuccess: () => {
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['list-project', orgId] });
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
    },
    onError: (err) => console.error('Failed to submit comment:', err),
  });

  const onSubmit = (values) => {
    mutate(values);
  };

  return (
    <div>
      <ListComment data={data?.data} isLoading={isLoading} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='comments'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className='flex w-full items-center space-x-2'>
                    <Input placeholder='Add New Comment' {...field} />
                    <Button type='submit' disabled={!disabledForm || isPending}>
                      <SendHorizonal />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}

function ListComment({ data, isLoading }) {
  const isEmpty = !data?.length;

  if (isLoading) {
    return <div className='text-center'>Loading comments...</div>;
  }

  if (isEmpty) {
    return <div className='flex flex-col justify-center items-center h-40'>
      <MessageSquare size={40} />
      <p>No Comments Yet</p>
    </div>;
  }

  return (
    <div className='mb-4 space-y-2 max-h-40 overflow-y-auto'>
      {data?.map((comment) => (
        <div key={comment.id} className='border rounded p-2 text-sm'>
          <p>{comment.comment}</p>
          <span className='text-xs text-muted-foreground'>{new Date(comment.createdAt).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
