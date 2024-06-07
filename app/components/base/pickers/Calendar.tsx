'use client';

import { DateRange, Range, RangeKeyDict } from 'react-date-range';
// @ts-ignore
import * as rdrLocales from 'react-date-range/dist/locale'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

interface CalendarProps {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

export const Calendar: React.FC<CalendarProps> = props => {
  return (
    <DateRange
      rangeColors={['#262626']}
      ranges={[props.value]}
      locale={rdrLocales.ru}
      date={new Date()}
      onChange={props.onChange}
      direction="vertical"
      showDateDisplay={false}
      minDate={new Date()}
      disabledDates={props.disabledDates}
    />
  );
};
