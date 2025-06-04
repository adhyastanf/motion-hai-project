'use client';

import { updateStatusTask } from '@/app/actions';
import { closestCenter, DndContext, DragOverlay, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import KanbanCard from './kanban-card';
import { KanbanColumn } from './kanban-column';

export default function DataKanban({ data = [], isLoading, statusOptions = [] }) {
  const { projectId } = useParams();

  const queryClient = useQueryClient();

  const statusMapping = Object.fromEntries(statusOptions?.map((status) => [status.name.toLowerCase(), status.id]));

  const sensors = useSensors(useSensor(PointerSensor));

  const [tasks, setTasks] = useState(data);
  const [activeTask, setActiveTask] = useState(null);

  const [activeId, setActiveId] = useState(null);

  const columns = {
    todo: tasks.filter((task) => task.status === 'todo' && task.id !== activeId),
    inprogress: tasks.filter((task) => task.status === 'inprogress' && task.id !== activeId),
    done: tasks.filter((task) => task.status === 'done' && task.id !== activeId),
  };

  const { mutate } = useMutation({
    mutationFn: updateStatusTask,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['list-task', projectId],
      });
    },
    onError: (err) => console.error('Failed to submit comment:', err),
  });

  const handleDragEnd = async ({ active, over }) => {
    if (!over || !active) return;

    const activeTaskId = active.id;

    const activeTask = tasks.find((task) => task.id === activeTaskId);
    if (!activeTask) return;

    const overTask = tasks.find((task) => task.id === over.id);

    let destinationColumn = activeTask.status;

    if (overTask) {
      destinationColumn = overTask.status;
    } else if (Boolean(over.id)) {
      destinationColumn = over.id;
    }

    if (activeTask.status !== destinationColumn) {
      setTasks((prevTasks) => prevTasks.map((task) => (task.id === activeTaskId ? { ...task, status: destinationColumn } : task)));

      setActiveId(null);
      setActiveTask(null);
      const values = { taskId: activeId, status: statusMapping[destinationColumn] };
      mutate(values);
    }

    setActiveId(null);
    setActiveTask(null);
  };

  useEffect(() => {
    setTasks((prevTasks) => {
      if (prevTasks !== data && data?.length !== prevTasks?.length) {
        return data;
      }
      return prevTasks;
    });
  }, [data]);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        setActiveId(event.active.id);
        const task = tasks.find((t) => t.id === event.active.id);
        setActiveTask(task);
      }}
      onDragEnd={handleDragEnd}
      onDragCancel={() => {
        setActiveId(null);
        setActiveTask(null);
      }}
    >
      <div className='grid sm:grid-cols-3 grid-cols-1 gap-4'>
        <KanbanColumn title='To Do' id='todo' items={columns.todo} isLoading={isLoading}/>
        <KanbanColumn title='In Progress' id='inprogress' items={columns.inprogress}  isLoading={isLoading} />
        <KanbanColumn title='Done' id='done' items={columns.done}  isLoading={isLoading} />
      </div>

      <DragOverlay>{activeTask ? <KanbanCard id={activeTask.id} title={activeTask.name} desc={activeTask.description} brand={activeTask.brand} /> : null}</DragOverlay>
    </DndContext>
  );
}
