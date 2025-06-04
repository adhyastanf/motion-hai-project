import { Card, CardContent } from '@/components/ui/card';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { StickyNote } from 'lucide-react';

export default function KanbanCard({ id, title, desc, assignee, brand }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.div ref={setNodeRef} style={style} animate={{ scale: 1 }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} {...attributes} {...listeners}>
      <Card className='bg-background border border-border shadow-sm rounded-md cursor-move'>
        <CardContent className='p-4 space-y-1 capitalize'>
          <h4 className='text-xs font-semibold text-primary flex items-center gap-1'>
            <StickyNote size={16} />
            {title}
          </h4>
          <p className='text-xs text-muted-foreground leading-snug line-clamp-2'>{desc}</p>
          <p className='text-xs text-muted-foreground leading-snug line-clamp-2'>{brand}</p>
          <p className='text-xs text-muted-foreground leading-snug line-clamp-2'>{assignee}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
