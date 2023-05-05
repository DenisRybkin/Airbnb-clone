'use client';

import { Country, useCountries } from '@/app/hooks/useCountries';
import Select from 'react-select';

interface CountrySelectProps {
  value?: Country;
  onChange?: (value: Country) => void;
}
export const CountrySelect: React.FC<CountrySelectProps> = props => {
  const { getAll, getFlagUrl } = useCountries();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={props.value}
        onChange={props.onChange as (value: Country | null) => void}
        formatOptionLabel={(option: any) => (
          <div
            className="
          flex flex-row items-center gap-3"
          >
            <div>{<img src={getFlagUrl(option.flag)} alt="flag" />}</div>
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => 'p-2 border-2',
          input: () => 'text-lg',
          option: () => 'text-lg focus:bg-black',
        }}
        theme={theme => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
      />
    </div>
  );
};
