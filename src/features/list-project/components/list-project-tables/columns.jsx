import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, ChevronRight, MoreHorizontal } from 'lucide-react';

export const columns = (setSelectedProject, setModal) => [
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
      const project = row.original;
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
                  setModal('update');
                  setSelectedProject(project);
                }}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setModal('delete');
                  setSelectedProject(project);
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
