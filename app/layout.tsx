import { Nunito } from 'next/font/google';

import getCategories from '@/app/actions/getCategories';
import getCurrentUser from '@/app/actions/getCurrentUser';
import { Navbar } from '@/app/components/layouts/navbar/Navbar';
import { LoginModal } from '@/app/components/modals/login-modal/LoginModal';
import { RegisterModal } from '@/app/components/modals/register-modal/RegisterModal';
import { RentModal } from '@/app/components/modals/rent-modal/RentModal';
import { SearchModal } from '@/app/components/modals/search-modal/SearchModal';
import { ClientOnly } from '@/app/components/services/client-only/ClientOnly';
// import { ClientRootProvider } from '@/app/providers/client/root';
// import { ToastProvider } from '@/app/providers/client/toast-provider/ToastProvider';
import './globals.css';

export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb clone',
};

const font = Nunito({
  subsets: ['latin'],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentUser, categories] = await Promise.all([
    getCurrentUser(),
    getCategories(),
  ]);

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <LoginModal />
          <RegisterModal />
          <SearchModal />
          <RentModal categories={categories ?? []} />
          <Navbar categories={categories} currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}

/*
<ClientRootProvider />
<LoginModal />
<RegisterModal />
<SearchModal />
<RentModal categories={categories ?? []} />
<Navbar currentUser={currentUser} />*/
