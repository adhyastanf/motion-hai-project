'use client';

import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, getDay, parse, startOfWeek, addMonths, subMonths } from 'date-fns';
import { enUS } from 'date-fns/locale';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import { EventCard } from './event-card';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import './data-calendar.css';
import { useGetListProject } from '@/hooks/use-query';

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
      <div className='flex mb-4 gap-x-2 items-center w-full lg:w-auto justify-center lg:justify-start'>
        <Button className='border border-black/30 hover:border-black' onClick={() => onNavigate('PREV')} variant='secondary' size='icon'>
          <ChevronLeftIcon className='size-4' />
        </Button>
        <div className='flex items-center border border-black/30 text-primary rounded-md px-3 py-2 h-8 justify-center w-full lg:w-auto'>
          <CalendarIcon className='mr-2 size-4' />
          <p className='text-sm'>{format(date, 'MMMM yyyy')}</p>
        </div>
        <Button className='border border-black/30 hover:border-black' onClick={() => onNavigate('NEXT')} variant='secondary' size='icon'>
          <ChevronRightIcon className='size-4' />
        </Button>
      </div>
      <Button> + Create Task</Button>
    </div>
  );
};

export default function DataCalendar({ orgId }) {
  const { data, isLoading } = useGetListProject(orgId);
  const [value, setValue] = useState(new Date());
  const allTasks = data?.data.flatMap((project) =>
    project?.tasks?.map((task) => ({
      ...task,
      projectName: project.name,
    }))
  );

  const events = allTasks
    // ?.filter((task) => task.dueDate && task.status.name !== 'Done')
    .map((task) => ({
      start: new Date(task.dueDate),
      end: new Date(task.dueDate),
      title: task.name,
      status: task.status.name,
      project: task.projectName,
      assignee: task.assignee.name,
      id: task.id,
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

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
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
        eventWrapper: ({ event }) =>
          event.status !== 'Done' ? (
            <Badge variant='default' className='w-full block whitespace-normal text-left px-2 py-1'>
              <div>{event.title}</div>
              <div>{event.status}</div>
              <div>{event.assignee}</div>
              <div>{event.project}</div>
            </Badge>
          ) : (
            <Badge className='w-full block whitespace-normal text-left px-2 py-1 bg-red-700'>
              <div>{event.title}</div>
              <div>{event.status}</div>
              <div>{event.assignee}</div>
              <div>{event.project}</div>
            </Badge>
          ),
        toolbar: () => <CustomToolbar date={value} onNavigate={handleNavigate} />,
      }}
    />
  );
}
