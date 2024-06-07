'use client';

import { Headings } from '@/app/components/base/headings/Headings';
import { CountrySelect } from '@/app/components/base/inputs/CountrySelect';
import { Country } from '@/app/hooks/useCountries';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

interface SelectLocationProps {
  value?: Country;
  onChange: (country: Country) => void;
}
export const SelectLocation: React.FC<SelectLocationProps> = props => {
  const Map = useMemo(
    () =>
      dynamic(
        () =>
          import('@/app/components/base/pickers/Map').then(
            module => module.Map
          ),
        {
          ssr: false,
        }
      ),
    [props.value?.latlng]
  );

  return (
    <div className="flex flex-col gap-8">
      <Headings
        title="Где находится ваш отель?"
        subtitle="Помогите гостям найти вас!"
      />
      <CountrySelect value={props.value} onChange={props.onChange} />
      <Map center={props.value?.latlng} />
    </div>
  );
};
