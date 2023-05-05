import countries, { CountryName } from 'world-countries';
export interface Country {
  value: string;
  label: string;
  flag: string;
  latlng: [number, number];
  region: string;
}

const convertedCountries: Country[] = countries.map(country => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

interface IUseCountries {
  getAll: () => Country[];
  getByValue: (value: string) => Country | undefined;
  getCountryCode: (flag: string) => string;
  getFlagUrl: (flag: string) => string;
}
export const useCountries = (): IUseCountries => {
  const getAll = () => convertedCountries;

  const getCountryCode = (flag: string) =>
    Array.from(flag, codeUnit => codeUnit.codePointAt(0))
      .map(char => String.fromCharCode(char! - 127397).toLowerCase())
      .join('');

  const getFlagUrl = (flag: string) =>
    `https://flagcdn.com/24x18/${getCountryCode(flag)}.png`;

  const getByValue = (value: string) =>
    convertedCountries.find(item => item.value == value);

  return {
    getAll,
    getByValue,
    getCountryCode,
    getFlagUrl,
  };
};
