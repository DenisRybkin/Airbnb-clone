import { UserDto } from '@/app/types/DTO/user';
import { User } from '@prisma/client';

export const mapUser = (user: User): UserDto => ({
  ...user,
  emailVerified: user?.emailVerified?.toISOString() ?? null,
  createdAt: user?.createdAt?.toISOString() ?? null,
  updatedAt: user?.updatedAt?.toISOString() ?? null,
});
