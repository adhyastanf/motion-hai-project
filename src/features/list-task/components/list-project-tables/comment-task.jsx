// components/comments-section.tsx
'use client';

import { createTaskComment, getCommentsByTaskId } from '@/app/actions';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MessageSquare, SendHorizonal } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  comments: z.string(),
});

export default function CommentsSection({ taskId, assigneeId, memberId }) {
  const { toast } = useToast();
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
      return await createTaskComment(taskId, memberId, values.comments);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-project', orgId] });
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
      toast({
        title: 'Success',
        description: 'Comment submitted successfully.',
      });
      form.reset();
    },
    onError: (err) => {
      console.error('Failed to submit comment:', err);
      toast({
        title: 'Error',
        description: 'Failed to submit comment. Please try again.',
        variant: 'destructive',
      });
    },
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
    return (
      <div className='mb-4 space-y-2 max-h-40 overflow-y-auto'>
        {[...Array(3)].map((_, index) => (
          <div key={index} className='border rounded p-2 space-y-1'>
            <Skeleton className='h-4 w-3/4' />
            <Skeleton className='h-3 w-1/4' />
          </div>
        ))}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className='flex flex-col justify-center items-center h-40'>
        <MessageSquare size={40} />
        <p>No Comments Yet</p>
      </div>
    );
  }

  return (
    <div className='mb-4 space-y-2 max-h-40 overflow-y-auto'>
      {data?.map((comment) => (
        <div key={comment.id} className='border rounded p-2 text-sm'>
          <div className='flex items-center gap-2 mb-1'>
            <Avatar className='h-6 w-6'>
              <AvatarFallback>{comment.userName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <span className='text-sm font-medium'>{comment.userName}</span>
          </div>
          <p>{comment.comment}</p>
          <span className='text-xs text-muted-foreground'>{new Date(comment.createdAt).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
