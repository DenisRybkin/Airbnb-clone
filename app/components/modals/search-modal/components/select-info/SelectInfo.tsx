'use client';

import { Counter } from '@/app/components/base/counter/Counter';
import { Headings } from '@/app/components/base/headings/Headings';

interface SelectInfoProps {
  guestsCount: number;
  onChangeGuests: (value: number) => void;
  roomsCount: number;
  onChangeRooms: (value: number) => void;
  bathroomsCount: number;
  onChangeBathrooms: (value: number) => void;
}

export const SelectInfo: React.FC<SelectInfoProps> = props => {
  return (
    <div className="flex flex-col gap-8">
      <Headings title="More information" subtitle="Find your perfect place" />
      <Counter
        title="Гости"
        subtitle="Сколько гостей приедет?"
        value={props.guestsCount}
        onChange={props.onChangeGuests}
      />
      <hr />
      <Counter
        title="Комнаты"
        subtitle="Сколько комнат вам нужно?"
        value={props.roomsCount}
        onChange={props.onChangeRooms}
      />
      <hr />
      <Counter
        title="Ванные комнаты"
        subtitle="Сколько ванных комнат вам нужно?"
        value={props.bathroomsCount}
        onChange={props.onChangeBathrooms}
      />
    </div>
  );
};
