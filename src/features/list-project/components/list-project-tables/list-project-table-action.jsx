'use client';

import { Button } from '@/components/ui/button';
import { DataTableFilterBox } from '@/components/ui/table/data-table-filter-box';
import { DataTableResetFilter } from '@/components/ui/table/data-table-reset';
import { DataTableSearch } from '@/components/ui/table/data-table-search';
import { PlusSquareIcon } from 'lucide-react';
import { useState } from 'react';
import ButtonModalProject from './modal-project';

import { CATEGORY_OPTIONS, useProductTableFilters } from './use-product-table-filters';

export default function ProjectListTableAction() {
  const [modal, setModal] = useState('');

  const { categoriesFilter, setCategoriesFilter, isAnyFilterActive, resetFilters, searchQuery, setPage, setSearchQuery } = useProductTableFilters();
  return (
    <div className='flex flex-wrap items-center gap-4'>
      <ButtonModalProject modal={modal} setModal={setModal} />
      <Button className='flex gap-5 items-center self-start' variant='ghost' onClick={() => setModal('create')}>
        <PlusSquareIcon size={40} />
        <h1>Create Project</h1>
      </Button>
      <DataTableSearch searchKey='name' searchQuery={searchQuery} setSearchQuery={setSearchQuery} setPage={setPage} />
      <DataTableFilterBox filterKey='categories' title='Categories' options={CATEGORY_OPTIONS} setFilterValue={setCategoriesFilter} filterValue={categoriesFilter} />
      <DataTableResetFilter isFilterActive={isAnyFilterActive} onReset={resetFilters} />
    </div>
  );
}
