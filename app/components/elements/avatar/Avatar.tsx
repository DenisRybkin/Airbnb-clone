'use client';

import Image from 'next/image';

export const Avatar = () => {
  return (
    <Image
      src="/images/placeholder.jpg"
      height={30}
      width={30}
      alt="Avatar"
      className="rounded-full"
    />
  );
};
