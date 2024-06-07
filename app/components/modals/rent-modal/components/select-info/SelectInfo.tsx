'use client';

import { Counter } from '@/app/components/base/counter/Counter';
import { Headings } from '@/app/components/base/headings/Headings';

interface SelectInfoProps {
  guestsValue: number;
  onChangeGuests: (value: number) => void;
  roomsValue: number;
  onChangeRooms: (value: number) => void;
  bathroomsValue: number;
  onChangeBathrooms: (value: number) => void;
}

export const SelectInfo: React.FC<SelectInfoProps> = props => {
  return (
    <div className="flex flex-col gap-8">
      <Headings
        title="Расскажите немного о своем отеле"
        subtitle="Какие удобства у вас есть?"
      />
      <Counter
        title="Гости"
        subtitle="Сколько гостей вы принимаете?"
        value={props.guestsValue}
        onChange={props.onChangeGuests}
      />
      <hr />
      <Counter
        title="Комнаты"
        subtitle="Сколько у вас комнат?"
        value={props.roomsValue}
        onChange={props.onChangeRooms}
      />
      <hr />
      <Counter
        title="Ванные комнаты"
        subtitle="Сколько у вас ванных комнат?"
        value={props.bathroomsValue}
        onChange={props.onChangeBathrooms}
      />
    </div>
  );
};
