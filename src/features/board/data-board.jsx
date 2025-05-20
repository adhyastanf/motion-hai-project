'use client';

import { updateStatusTask } from '@/app/actions';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { useState } from 'react';
import KanbanCard from './kanban-card';
import { KanbanColumn } from './kanban-column';

export default function DataKanban({ data = [], isLoading, statusOptions = [] }) {
  const statusMapping = Object.fromEntries(
    statusOptions?.map(status => [status.name.toLowerCase(), status.id])
  );

  const sensors = useSensors(useSensor(PointerSensor));

  const [tasks, setTasks] = useState(data);
  const [activeTask, setActiveTask] = useState(null);

  const [activeId, setActiveId] = useState(null);

  const columns = {
    todo: tasks.filter((task) => task.status === 'todo' && task.id !== activeId),
    inprogress: tasks.filter((task) => task.status === 'inprogress' && task.id !== activeId),
    done: tasks.filter((task) => task.status === 'done' && task.id !== activeId),
  };

  const handleDragEnd = async ({ active, over }) => {
    if (!over || !active) return;

    const activeTaskId = active.id;

    const activeTask = tasks.find((task) => task.id === activeTaskId);
    if (!activeTask) return;

    const overTask = tasks.find((task) => task.id === over.id);

    let destinationColumn = activeTask.status;

    if (overTask) {
      destinationColumn = overTask.status;
    }
    else if (Boolean(over.id)) {
      destinationColumn = over.id;
    }

    if (activeTask.status !== destinationColumn) {
      setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === activeTaskId ? { ...task, status: destinationColumn } : task
      ))
      const values = { taskId: activeId, status: statusMapping[destinationColumn] };
      // await updateStatusTask(values)
    }

    setActiveId(null);
    setActiveTask(null);
  };

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
      <div className='grid grid-cols-3 gap-4 p-4'>
        <KanbanColumn title='To Do' id='todo' items={columns.todo} />
        <KanbanColumn title='In Progress' id='inprogress' items={columns.inprogress} />
        <KanbanColumn title='Done' id='done' items={columns.done} />
      </div>

      <DragOverlay>{activeTask ? <KanbanCard id={activeTask.id} title={activeTask.name} desc={activeTask.description} /> : null}</DragOverlay>
    </DndContext>
  );
}
