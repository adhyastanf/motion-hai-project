import { ChevronDown, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export const columns = [
  {
    id: 'expander',
    cell: ({ row }) => {
      const isExpanded = row.getIsExpanded();

      return (
        <Button variant='ghost' size='icon' onClick={() => row.toggleExpanded()}>
          {isExpanded ? <ChevronDown className='h-4 w-4' /> : <ChevronRight className='h-4 w-4' />}
        </Button>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Task',
    cell: ({ row }) => <span className='font-medium'>{row.original.name}</span>,
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
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
