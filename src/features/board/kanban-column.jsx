import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import KanbanCard from './kanban-card';


export function KanbanColumn({ id, title, items }) {

  const { setNodeRef } = useDroppable({
    id,
  });
  return (
    <div ref={setNodeRef} className="bg-gray-100 rounded-lg shadow p-4 min-h-[400px]">
      <h2 className="text-lg font-bold capitalize mb-4">{title}</h2>
      <SortableContext items={items.map((i) => i.id)} strategy={rectSortingStrategy}>
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <KanbanCard key={item.id} id={item.id} title={item.name} desc={item.description} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}
