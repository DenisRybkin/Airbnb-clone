import client from '@/app/libs/prismadb';
import { Category } from '@prisma/client';

export default async function getCategories(): Promise<Category[] | null> {
  return client.category.findMany();
}
