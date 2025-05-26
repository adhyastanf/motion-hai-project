// kanban-column.tsx
'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import KanbanCard from './kanban-card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export function KanbanColumn({ id, title, items, isLoading }) {;
  const { setNodeRef } = useDroppable({ id });

  return (
    <Card
      ref={setNodeRef}
      className="h-[75vh] bg-secondary flex flex-col shrink-0 snap-center"
    >
      <CardHeader className="p-4 text-left font-semibold capitalize">
        {title}
      </CardHeader>
      <Separator />
      <CardContent className="flex grow flex-col gap-4 overflow-x-hidden p-2">
        <ScrollArea className="h-full">
        {isLoading ? (
            <div className="flex flex-col gap-2">
              <Card className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </Card>
            </div>
          ) : (
            <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <KanbanCard
                    key={item.id}
                    id={item.id}
                    title={item.name}
                    desc={item.description}
                    assignee={item.assignee}
                  />
                ))}
              </div>
            </SortableContext>
          )}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
