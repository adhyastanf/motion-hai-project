'use client';
import Image from 'next/image';
import { CellAction } from './cell-action';

export const columns = [
  {
    accessorKey: 'photo_url',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <div className='relative aspect-square'>
          <Image src={row.getValue('photo_url')} alt={row.getValue('name')} fill className='rounded-lg' />
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
