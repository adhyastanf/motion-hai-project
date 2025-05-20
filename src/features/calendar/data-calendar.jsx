'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ButtonModalTask from '@/features/list-task/components/list-project-tables/modal-task';
import { useGetMembers, useGetStatusTask } from '@/hooks/use-query';
import { addMonths, format, getDay, parse, startOfWeek, subMonths } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, StickyNote } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './data-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomToolbar = ({ date, onNavigate }) => {
  return (
    <div className='flex justify-between'>
      <div className='flex-1 flex mb-4 gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start'>
        <Button className='border border-black/30 hover:border-black' onClick={() => onNavigate('PREV')} variant='secondary' size='icon'>
          <ChevronLeftIcon className='size-4' />
        </Button>
        <div className='flex-1 flex items-center border border-black/30 text-primary rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto'>
          <CalendarIcon className='mr-2 size-4' />
          <p className='text-sm'>{format(date, 'MMMM yyyy')}</p>
        </div>
        <Button className='border border-black/30 hover:border-black' onClick={() => onNavigate('NEXT')} variant='secondary' size='icon'>
          <ChevronRightIcon className='size-4' />
        </Button>
      </div>
    </div>
  );
};

export default function DataCalendar({data, isLoading}) {
  const { orgId } = useParams();
  const { data: taskOptions } = useGetStatusTask();
  const { data: memberOptions } = useGetMembers(orgId);
  const [value, setValue] = useState(new Date());
  const [modal, setModal] = useState('');
  const [selectedTask, setSelectedTask] = useState({});
  const MODAL_CONSTANT = ['update', 'delete', 'create'];

  const events = data
    // ?.filter((task) => task.dueDate && task.status.name !== 'Done')
    ?.map((task) => ({
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      status: task.status || null,
      assignee: task.assignee || null,
      id: task.id,
      ...task,
    }));

  const handleNavigate = (action) => {
    if (action === 'PREV') {
      setValue(subMonths(value, 1));
    } else if (action === 'NEXT') {
      setValue(addMonths(value, 1));
    } else if (action === 'TODAY') {
      setValue(new Date());
    }
  };

  const statusColor = (status) => {
    const cleanStatus = status
      ?.normalize('NFKC') // Normalisasi Unicode
      .replace(/\s+/g, '') // Hapus semua whitespace (termasuk tab, newline, dll)
      .toLowerCase();
    if (cleanStatus === 'todo') {
      return (
        <Badge className='bg-red-600/10 dark:bg-red-600/20 hover:bg-red-600/10 text-red-500 shadow-none rounded-full'>
          <div className='h-1.5 w-1.5 rounded-full bg-red-500 mr-2' /> {status}
        </Badge>
      );
    } else if (cleanStatus === 'inprogress') {
      return (
        <Badge className='bg-amber-600/10 dark:bg-amber-600/20 hover:bg-amber-600/10 text-amber-500 shadow-none rounded-full'>
          <div className='h-1.5 w-1.5 rounded-full bg-amber-500 mr-2' /> {status}
        </Badge>
      );
    } else if (cleanStatus === 'done') {
      return (
        <Badge className='bg-emerald-600/10 dark:bg-emerald-600/20 hover:bg-emerald-600/10 text-emerald-500 shadow-none rounded-full'>
          <div className='h-1.5 w-1.5 rounded-full bg-emerald-500 mr-2' /> {status}
        </Badge>
      );
    }
  };

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <Calendar
        localizer={localizer}
        date={value}
        events={events}
        views={['month']}
        defaultView='month'
        toolbar
        showAllEvents
        className='h-full'
        max={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
        formats={{
          weekdayFormat: (date, culture, localizer) => localizer?.format(date, 'EEE', culture) ?? '',
        }}
        components={{
          eventWrapper: ({ event }) => (
            <div className='px-1 cursor-pointer'>
              <Badge
                onClick={() => {
                  setModal('update');
                  setSelectedTask(event);
                }}
                variant='secondary'
                className='w-full block whitespace-normal text-left px-2 py-1 space-y-2 text-xs'
              >
                <p className='capitalize flex gap-1 items-center'>
                  <StickyNote size={16} />
                  {event.name}
                </p>
                {statusColor(event.status)}
                <p>{event.assignee}</p>
              </Badge>
            </div>
          ),
          toolbar: () => <CustomToolbar date={value} onNavigate={handleNavigate} />,
        }}
      />
      {MODAL_CONSTANT.includes(modal) && <ButtonModalTask modal={modal} setModal={setModal} taskId={selectedTask?.id} initialData={selectedTask} taskOptions={taskOptions} memberOptions={memberOptions} />}
    </>
  );
}
