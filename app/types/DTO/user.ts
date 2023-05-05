import { User } from '@prisma/client';

export interface UserDto
  extends Omit<User, 'emailVerified' | 'createdAt' | 'updatedAt'> {
  emailVerified?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}
