'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  disabled?: boolean;
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

export const Button: React.FC<ButtonProps> = ({ icon: Icon, ...props }) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${
          props.outline
            ? 'bg-white border-black text-black'
            : 'bg-rose-500 border-rose-500 text-white'
        }
        ${
          props.small
            ? 'text-sm py-1 font-light border-[1px]'
            : 'text-md py-3 font-semibold border-2'
        }
      `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {props.label}
    </button>
  );
};
