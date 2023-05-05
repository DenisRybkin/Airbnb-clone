'use client';

import { Search } from '@/app/components/layouts/navbar/Search';
import { Categories } from '@/app/components/layouts/navbar/categories/Categories';
import { UserMenu } from '@/app/components/layouts/navbar/user-menu/UserMenu';
import { UserDto } from '@/app/types/DTO/user';
import { Category } from '@prisma/client';
import { Container } from '../container/Container';
import { Logo } from './Logo';

interface NavbarProps {
  currentUser?: UserDto | null;
  categories: Category[] | null;
}
export const Navbar: React.FC<NavbarProps> = props => {
  return (
    <div className="fixed t-0 w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between md:gap-0 max-[768px]:gap-2">
            <Logo />
            <Search />
            <UserMenu currentUser={props.currentUser} />
          </div>
        </Container>
      </div>
      <Categories categories={props.categories} />
    </div>
  );
};
