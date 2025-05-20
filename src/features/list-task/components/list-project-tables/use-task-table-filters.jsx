'use client';

import { searchParams } from '@/lib/searchparams';
import { useQueryState } from 'nuqs';
import { useCallback, useMemo } from 'react';

export const CATEGORY_OPTIONS = [
  { value: 'Electronics', label: 'Electronics' },
  { value: 'Furniture', label: 'Furniture' },
  { value: 'Clothing', label: 'Clothing' },
  { value: 'Toys', label: 'Toys' },
  { value: 'Groceries', label: 'Groceries' },
  { value: 'Books', label: 'Books' },
  { value: 'Jewelry', label: 'Jewelry' },
  { value: 'Beauty Products', label: 'Beauty Products' },
];

export function useProductTableFilters() {

  const [searchQuery, setSearchQuery] = useQueryState('q', searchParams.q.withOptions({ shallow: false, throttleMs: 1000 }).withDefault(''));

  const [categoriesFilter, setCategoriesFilter] = useQueryState('categories', searchParams.categories.withOptions({ shallow: false }).withDefault(''));

  const [page, setPage] = useQueryState('page', searchParams.page.withDefault(1));

  const [statusFilter, setStatusFilter] = useQueryState('status', searchParams.status.withOptions({ shallow: true }).withDefault(''));

  const [assigneeFilter, setAssigneeFilter] = useQueryState('assignee', searchParams.assignee.withOptions({ shallow: true }).withDefault(''));

  const [dueDateFilter, setDueDateFilter] = useQueryState('dueDate', searchParams.dueDate.withOptions({ shallow: false }).withDefault(''));

  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setCategoriesFilter(null);
    setStatusFilter(null);
    setAssigneeFilter(null);
    setDueDateFilter(null);
    setPage(1);
  }, [setSearchQuery, setCategoriesFilter, setStatusFilter, setAssigneeFilter, setDueDateFilter, setPage]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!categoriesFilter || !!statusFilter || !!assigneeFilter || !!dueDateFilter;
  }, [searchQuery, categoriesFilter, statusFilter, assigneeFilter, dueDateFilter]);

  return {
    searchQuery,
    setSearchQuery,
    categoriesFilter,
    setCategoriesFilter,
    statusFilter,
    setStatusFilter,
    assigneeFilter,
    setAssigneeFilter,
    dueDateFilter,
    setDueDateFilter,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
  };
}
