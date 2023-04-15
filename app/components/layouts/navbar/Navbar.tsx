'use client';

import { Container } from '../container/Container';
import { Logo } from './Logo';
import { Search } from '@/app/components/layouts/navbar/Search';
import { UserMenu } from '@/app/components/layouts/navbar/user-menu/UserMenu';

export const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};
