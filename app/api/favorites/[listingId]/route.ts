import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

import client from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { listingId } = params;

  if (!listingId) throw new Error('Invalid ID');

  return NextResponse.json(
    await client.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: [...(currentUser.favoriteIds ?? []), listingId],
      },
    })
  );
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();
  const { listingId } = params;
  if (!listingId) throw new Error('Invalid ID');
  return NextResponse.json(
    await client.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favoriteIds: [...(currentUser.favoriteIds ?? []), listingId].filter(
          id => id != listingId
        ),
      },
    })
  );
}
