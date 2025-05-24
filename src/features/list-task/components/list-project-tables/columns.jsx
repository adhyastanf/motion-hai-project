import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';
import { MoreHorizontal } from 'lucide-react';

export const columns = [
  {
    accessorKey: 'task',
    header: 'Task',
    cell: ({ row }) => {
      const task = row.original;
      return <span className='font-medium capitalize'>{task.name}</span>;
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const {status} = row.original;
      return <span className='font-medium capitalize'>{status || 'No Status'}</span>;
    },
  },
  {
    accessorKey: 'assignee',
    header: 'Assignee',
    cell: ({ row }) => {
      const { assignee } = row.original;
      return <span className='font-medium'>{assignee || 'No Assignee'}</span>;
    },
  },
  {
    accessorKey: 'due',
    header: 'Due',
    cell: ({ row }) => {
      const { dueDate } = row.original;
      return <span className='font-medium'>{dueDate ? format(dueDate, 'MMM dd, yyyy') : 'No Due Date'}</span>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row, table }) => {
      const task = row.original;
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => {
                  table.options.meta?.setSelectedTask(task)
                  table.options.meta?.openModal('update')
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  table.options.meta?.setSelectedTask(task)
                  table.options.meta?.openModal('delete')
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      );
    },
  },
];
