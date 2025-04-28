'use client';

import ModalCreateTask from '@/components/modal/task-modal';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';

export function AreaTask() {
  const [modal, setModal] = useState('');

  const tabs = [
    {
      name: 'upcoming',
      value: 'upcoming',
      content: <Button onClick={() => setModal('upcoming')}>+ Create Task</Button>,
    },
    {
      name: 'overdue',
      value: 'overdue',
      content: <Button onClick={() => setModal('overdue')}>+ Create Task</Button>,
    },
    {
      name: 'completed',
      value: 'completed',
      content: <Button onClick={() => setModal('completed')}>+ Create Task</Button>,
    },
  ];

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='flex gap-4 items-center'>
          <Avatar>
            <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <h2>My Tasks</h2>
        </CardTitle>
        <Button variant='ghost'>
          <Ellipsis />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={tabs[0].value} className='w-full'>
          <TabsList className='w-full p-0 bg-background justify-start border-b rounded-none'>
            {tabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className='rounded-none bg-background h-full data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary'>
                <p className='text-[13px]'>{tab.name}</p>
              </TabsTrigger>
            ))}
          </TabsList>
          {tabs.map((tab) => (
            <TabsContent key={tab.value} value={tab.value}>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
        <ModalCreateTask open={modal === 'upcoming'} onClose={() => setModal('')} title="Let's Build a Task Upcoming" />
        <ModalCreateTask open={modal === 'overdue'} onClose={() => setModal('')} title="Let's Build a Task Overdue" />
        <ModalCreateTask open={modal === 'completed'} onClose={() => setModal('')} title="Let's Build a Task Completed" />
      </CardContent>
    </Card>
  );
}
