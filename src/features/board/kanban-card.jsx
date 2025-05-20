import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function KanbanCard({ id, title, desc }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="p-3 bg-white rounded shadow transition-all duration-300 ease-in-out cursor-move"
    >
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  )
}