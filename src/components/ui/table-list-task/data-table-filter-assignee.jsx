'use client';

import { useMemo } from 'react';
import SelectField from '../select-options';

export function DataTableFilterAssignee({ options = [], setFilterValue, filterValue }) {
  const allStatusOptions = useMemo(() => {
    return [...options, { id: null, name: 'All Assignee' }];
  }, [options]);

  const handleSelect = (value) => {
    setFilterValue(value === '' ? null : value);
  };

  return <SelectField value={filterValue} onValueChange={(value) => handleSelect(value)} options={allStatusOptions} placeholder='Filter by Assignee' />;
}
