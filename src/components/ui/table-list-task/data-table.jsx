import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ButtonModalTask from '@/features/list-task/components/list-project-tables/modal-task';
import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from '@tanstack/react-table';
import { ArrowLeft, ArrowRight, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useState } from 'react';
import { Button } from '../button';

export default function TaskTable({ data, columns, totalItems, pageSizeOptions = [10, 20, 30, 40, 50], statusOptions = [], memberOptions = [], memberId }) {
  const [modal, setModal] = useState('');
  const [selectedTask, setSelectedTask] = useState({});

  const MODAL_CONSTANT = ['update', 'delete', 'create'];

  const [currentPage, setCurrentPage] = useQueryState('page', parseAsInteger.withOptions({ shallow: true }).withDefault(1));
  const [pageSize, setPageSize] = useQueryState('limit', parseAsInteger.withOptions({ shallow: true, history: 'push' }).withDefault(10));

  const paginationState = {
    pageIndex: currentPage - 1, 
    pageSize: pageSize,
  };

  const pageCount = Math.ceil(totalItems / pageSize);

  const handlePaginationChange = (updaterOrValue) => {
    const pagination = typeof updaterOrValue === 'function' ? updaterOrValue(paginationState) : updaterOrValue;

    setCurrentPage(pagination.pageIndex + 1);
    setPageSize(pagination.pageSize);
  };

  const table = useReactTable({
    data,
    columns,
    pageCount: pageCount,
    state: {
      pagination: paginationState,
    },
    onPaginationChange: handlePaginationChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    meta: {
      openModal: (val) => setModal(val),
      setSelectedTask: (task) => setSelectedTask(task),
    },
    manualPagination: true,
  });

  return (
    <div className='flex flex-1 flex-col space-y-4'>
      <div className='relative flex flex-1'>
        <div className='inset-0 flex overflow-hidden rounded-lg border flex-1'>
          <ScrollArea className=' h-full w-full'>
            <Table className='relative'>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const task = row.original;
                    return (
                      <TableRow key={task.id}>
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {MODAL_CONSTANT.includes(modal) && <ButtonModalTask modal={modal} setModal={setModal} taskId={selectedTask?.id} initialData={selectedTask} statusOptions={statusOptions} memberOptions={memberOptions} memberId={memberId} />}
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
        </div>

      </div>
        <div className='flex flex-col items-center justify-end gap-2 space-x-2 py-2 sm:flex-row'>
          <div className='flex w-full items-center justify-between'>
            <div className='flex-1 text-sm text-muted-foreground'>
              {totalItems > 0 ? (
                <>
                  Showing {paginationState.pageIndex * paginationState.pageSize + 1} to {Math.min((paginationState.pageIndex + 1) * paginationState.pageSize, totalItems)} of {totalItems} entries
                </>
              ) : (
                'No entries found'
              )}
            </div>
            <div className='flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8'>
              <div className='flex items-center space-x-2'>
                <p className='whitespace-nowrap text-sm font-medium'>Rows per page</p>
                <Select
                  value={`${paginationState.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value));
                  }}
                >
                  <SelectTrigger className='h-8 w-[70px]'>
                    <SelectValue placeholder={paginationState.pageSize} />
                  </SelectTrigger>
                  <SelectContent side='top'>
                    {pageSizeOptions.map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <div className='flex w-full items-center justify-between gap-2 sm:justify-end'>
            <div className='flex w-[150px] items-center justify-center text-sm font-medium'>
              {totalItems > 0 ? (
                <>
                  Page {paginationState.pageIndex + 1} of {table.getPageCount()}
                </>
              ) : (
                'No pages'
              )}
            </div>
            <div className='flex items-center space-x-2'>
              <Button aria-label='Go to first page' variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                <ArrowLeft className='h-4 w-4' aria-hidden='true' />
              </Button>
              <Button aria-label='Go to previous page' variant='outline' className='h-8 w-8 p-0' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <ChevronLeftIcon className='h-4 w-4' aria-hidden='true' />
              </Button>
              <Button aria-label='Go to next page' variant='outline' className='h-8 w-8 p-0' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <ChevronRightIcon className='h-4 w-4' aria-hidden='true' />
              </Button>
              <Button aria-label='Go to last page' variant='outline' className='hidden h-8 w-8 p-0 lg:flex' onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                <ArrowRight className='h-4 w-4' aria-hidden='true' />
              </Button>
            </div>
          </div>
        </div>
    </div>
  );
}
