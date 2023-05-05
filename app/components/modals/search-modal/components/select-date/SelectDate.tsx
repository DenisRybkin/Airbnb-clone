import { Headings } from '@/app/components/base/headings/Headings';
import { Calendar } from '@/app/components/base/pickers/Calendar';
import React from 'react';
import { Range, RangeKeyDict } from 'react-date-range';

interface SelectDateProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
}

export const SelectDate: React.FC<SelectDateProps> = props => {
  return (
    <div className="flex flex-col gap-8">
      <Headings
        title="When do you plan to go?"
        subtitle="Make sure everyone is free!"
      />
      <Calendar value={props.value} onChange={props.onChange} />
    </div>
  );
};
