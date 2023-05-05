'use client';

import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}
export const Counter: React.FC<CounterProps> = props => {
  const handleAdd = () => props.onChange(props.value + 1);

  const handleReduce = () =>
    props.value != 1 && props.onChange(props.value - 1);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{props.title}</div>
        <div className="font-light text-gray-600">{props.subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <button
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
            "
          onClick={handleReduce}
        >
          <AiOutlineMinus />
        </button>
        <div className="font-light text-xl text-neutral-600">{props.value}</div>
        <button
          className="
            w-10
            h-10
            rounded-full
            border-[1px]
            border-neutral-400
            flex
            items-center
            justify-center
            text-neutral-600
            cursor-pointer
            hover:opacity-80
            transition
            "
          onClick={handleAdd}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};
