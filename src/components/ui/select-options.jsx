import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';

export default function SelectField({ value, onValueChange, options, placeholder }) {
  
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className='capitalize'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options?.map((option, idx) => (
          <SelectItem key={idx} value={option.id} className='capitalize'>
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
