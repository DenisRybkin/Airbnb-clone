import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';

import client from '@/app/libs/prismadb';

interface IParams {
  listingId?: string;
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
    await client.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    })
  );
}
