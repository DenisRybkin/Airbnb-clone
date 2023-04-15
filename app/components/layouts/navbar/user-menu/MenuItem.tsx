'use client';

import { FC } from 'react';

interface MenuItemProps {
  onClick: () => void;
  label: string;
}
export const MenuItem: FC<MenuItemProps> = props => {
  return (
    <div
      onClick={props.onClick}
      className="
        px-4
        py-3
        hover:bg-neutral-100
        transition
        font-semibold
      "
    >
      {props.label}
    </div>
  );
};
