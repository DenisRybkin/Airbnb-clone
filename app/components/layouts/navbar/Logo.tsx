'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const Logo = () => {
  const router = useRouter();
  return (
    <Image
      className="hidden md:block cursor-pointer"
      height="100"
      width="100"
      alt="Logo"
      src="/images/logo.png"
    />
  );
};