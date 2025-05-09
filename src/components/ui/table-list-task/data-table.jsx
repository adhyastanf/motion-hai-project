import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import ButtonCreateTask from '@/features/list-project/components/list-project-tables/button-create-task';
import { useGetMembers, useGetStatusTask } from '@/hooks/use-query';
import { flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from '@tanstack/react-table';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import SelectField from '../select-options';

export default function TaskTable({ data, columns, orgId }) {
  const [tasks, setTasks] = useState(data)
  const { data: taskOptions } = useGetStatusTask();
  const { data: memberOptions } = useGetMembers(orgId);

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const handleStatusChange = (taskId, subtaskId, newStatus) => {
    const updated = tasks.map((task) => {
      if (task.id !== taskId) return task;

      return {
        ...task,
        tasks: task.tasks.map((sub) =>
          sub.id === subtaskId ? { ...sub, statusId: newStatus } : sub
        ),
      };
    });

    setTasks(updated);

  };

  const handleAssigneeChange = (taskId, subtaskId, newAssigneeId) => {
    const updated = tasks.map((task) => {
      if (task.id !== taskId) return task;

      return {
        ...task,
        tasks: task.tasks.map((sub) =>
          sub.id === subtaskId ? { ...sub, assignee: newAssigneeId } : sub
        ),
      };
    });

    setTasks(updated);
  };

  const table = useReactTable({
    data: tasks,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => true,
  });

  const toggleAllRows = () => {
    // setExpandedRows(
    //   expandedRows.length === data.length ? [] : data.map((task) => task.id)
    // );
  };

  return (
    <div className='space-y-4'>
      <div className='flex justify-end gap-2'></div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows ? (
              table.getRowModel().rows.map((row) => {
                const task = row.original;

                return (
                  <React.Fragment key={task.id}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>

                    {row.getIsExpanded() &&
                      task.tasks.map((sub) => (
                        <TableRow key={sub.id} className='bg-muted/50'>
                          <TableCell />
                          <TableCell className='pl-8'>{sub.name}</TableCell>
                          <TableCell>
                            <SelectField value={sub?.statusId || ''} onValueChange={(value) => handleStatusChange(task.id, sub.id, value)} options={taskOptions} placeholder='Select status' />
                          </TableCell>
                          <TableCell>
                            <SelectField value={sub?.assignee || ''} onValueChange={(value) => handleAssigneeChange(task.id, sub.id, value)} options={memberOptions?.data} placeholder='Select Assignee' />
                          </TableCell>
                          <TableCell>
                            {sub?.dueDate ? format(sub.dueDate, 'MMM dd, yyyy') : ''}
                          </TableCell>
                        </TableRow>
                      ))}

                    <TableRow>
                      <TableCell colSpan={4}>
                        <ButtonCreateTask projectId={task.id} taskOptions={taskOptions} memberOptions={memberOptions?.data} />
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
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
      </div>
    </div>
  );
}
