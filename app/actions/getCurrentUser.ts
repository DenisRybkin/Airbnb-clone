import { getServerSession } from 'next-auth/next';

import client from '@/app/libs/prismadb';

import { UserDto } from '@/app/types/DTO/user';
import { mapUser } from '@/app/utils/mappings/user';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<UserDto | null> {
  try {
    const session = await getSession();

    if (!session?.user?.email) return null;

    const currentUser = await client?.user?.findUnique({
      where: { email: session.user.email },
    });

    return currentUser ? mapUser(currentUser) : null;
  } catch (e) {
    return null;
  }
}
