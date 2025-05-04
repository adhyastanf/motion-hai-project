import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const columns = [
    {
      id: 'expander',
      cell: ({ row }) => {
        const isExpanded = row.getIsExpanded();
  
        return  <Button
            variant="ghost"
            size="icon"
            onClick={() => row.toggleExpanded()}
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        
      },
    },
    {
      accessorKey: 'title',
      header: 'Task',
      cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
    },
    {
      id: 'status',
      header: 'Status',
      cell: () => null,
    },
    {
      id: 'assignee',
      header: 'Assignee',
      cell: () => null,
    },
    {
      id: 'due',
      header: 'Due',
      cell: () => null,
    },
    {
      id: 'priority',
      header: 'Priority',
      cell: () => null,
    },
  ];