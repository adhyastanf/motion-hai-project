'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ButtonModalTask from '@/features/list-task/components/list-project-tables/modal-task';
import { addMonths, format, getDay, parse, startOfWeek, subMonths } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, StickyNote } from 'lucide-react';
import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './data-calendar.css';

const locales = { 'en-US': enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CustomToolbar = ({ date, onNavigate }) => (

    <div className='flex gap-4 mb-4 flex-1'>
      <div className='flex items-center gap-2 flex-1 w-full'>
        <Button onClick={() => onNavigate('PREV')} variant='secondary' size='icon' className='border border-black/30 hover:border-black'>
          <ChevronLeftIcon className='size-4' />
        </Button>

        <div className='flex items-center border border-black/30 text-primary rounded-md px-3 py-2 h-8 flex-1 justify-center'>
          <CalendarIcon className='mr-2 size-4' />
          <p className='text-sm'>{format(date, 'MMMM yyyy')}</p>
        </div>

        <Button onClick={() => onNavigate('NEXT')} variant='secondary' size='icon' className='border border-black/30 hover:border-black'>
          <ChevronRightIcon className='size-4' />
        </Button>
      </div>
  </div>
);

export default function DataCalendar({ data, isLoading, statusOptions, memberOptions }) {
  const [value, setValue] = useState(new Date());
  const [modal, setModal] = useState('');
  const [selectedTask, setSelectedTask] = useState({});
  const MODAL_CONSTANT = ['update', 'delete', 'create'];

  const events = data?.map((task) => ({
    start: new Date(task.dueDate),
    end: new Date(task.dueDate),
    status: task.status || null,
    assignee: task.assignee || null,
    brand: task.brand || null,
    id: task.id,
    ...task,
  }));

  const handleNavigate = (action) => {
    if (action === 'PREV') setValue(subMonths(value, 1));
    else if (action === 'NEXT') setValue(addMonths(value, 1));
    else if (action === 'TODAY') setValue(new Date());
  };

  const statusColor = (status) => {
    const clean = status?.normalize('NFKC').replace(/\s+/g, '').toLowerCase();
    const baseStyle = 'shadow-none rounded-full capitalize flex items-center gap-2';
    if (clean === 'todo')
      return (
        <Badge className={`bg-red-600/10 text-red-500 ${baseStyle}`}>
          <div className='h-1.5 w-1.5 rounded-full bg-red-500' />
          {status}
        </Badge>
      );
    if (clean === 'inprogress')
      return (
        <Badge className={`bg-amber-600/10 text-amber-500 ${baseStyle}`}>
          <div className='h-1.5 w-1.5 rounded-full bg-amber-500' />
          {status}
        </Badge>
      );
    if (clean === 'done')
      return (
        <Badge className={`bg-emerald-600/10 text-emerald-500 ${baseStyle}`}>
          <div className='h-1.5 w-1.5 rounded-full bg-emerald-500' />
          {status}
        </Badge>
      );
    return null;
  };

  if (isLoading) return <LoadingSkeleton />;

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
            <div
              className='bg-white border border-black/10 rounded-lg p-2 mb-1 shadow-sm cursor-pointer transition hover:bg-gray-50 space-y-1'
              onClick={() => {
                setModal('update');
                setSelectedTask(event);
              }}
            >
              <p className='capitalize flex gap-1 items-center font-medium text-xs text-gray-800'>
                <StickyNote size={14} /> {event.name}
              </p>
              {statusColor(event.status) ?? <p className='text-xs text-gray-400 italic mt-1'>No Status</p>}
              <p className='text-xs text-gray-600 truncate'>{event.assignee ?? 'No Assignee'}</p>
              <p className='text-xs text-gray-600 truncate capitalize'>{event.brand ?? 'No Brand'}</p>
            </div>
          ),
          toolbar: () => <CustomToolbar date={value} onNavigate={handleNavigate} />,
        }}
      />

      {MODAL_CONSTANT.includes(modal) && <ButtonModalTask modal={modal} setModal={setModal} taskId={selectedTask?.id} initialData={selectedTask} statusOptions={statusOptions} memberOptions={memberOptions} />}
    </>
  );
}

function LoadingSkeleton() {
  return (
    <div className='p-4 space-y-4'>
      <div className='flex justify-between items-center mb-4'>
        <Skeleton className='h-8 w-10 rounded-md' />
        <Skeleton className='h-8 w-40 rounded-md' />
        <Skeleton className='h-8 w-10 rounded-md' />
      </div>
      <div className='grid grid-cols-7 gap-2'>
        {[...Array(35)].map((_, i) => (
          <Skeleton key={i} className='h-20 rounded-md' />
        ))}
      </div>
    </div>
  );
}
