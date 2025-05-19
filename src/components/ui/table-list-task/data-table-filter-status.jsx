'use client';

import { useMemo } from 'react';
import SelectField from '../select-options';

export function DataTableFilterStatus({ options = [], setFilterValue, filterValue = null }) {
  const allStatusOptions = useMemo(() => {
    return [...options, { id: null, name: 'All Status' }];
  }, [options]);

  const handleSelect = (value) => {
    setFilterValue(value === '' ? null : value);
  };

  return <SelectField value={filterValue} onValueChange={(value) => handleSelect(value)} options={allStatusOptions} placeholder='Filter by Status' />;
}
