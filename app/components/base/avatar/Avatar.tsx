'use client';

import Image from 'next/image';

interface AvatarProps {
  src?: string | null;
}

const PLACEHOLDER_URL = '/images/placeholder.jpg';
export const Avatar: React.FC<AvatarProps> = props => {
  return (
    <Image
      src={props.src ?? PLACEHOLDER_URL}
      height={30}
      width={30}
      alt="Avatar"
      className="rounded-full"
    />
  );
};
