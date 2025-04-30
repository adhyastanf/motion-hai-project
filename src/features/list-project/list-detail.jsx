'use client';

import { getListProject } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { DataTable as ProductTable } from '@/components/ui/table/data-table';
import { columns } from '../products/components/product-tables/columns';
import ProductTableAction from '../products/components/product-tables/product-table-action';

export default function ListProject({ projectId }) {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ['list-project', projectId],
  //   queryFn: () => getListProject(projectId),
  // });

  return (
    <div>
      <Button>+ Add Task</Button>
      <ProductTableAction />
      <ProductTable columns={columns} data={[]} totalItems={0} />
    </div>
  );
}
