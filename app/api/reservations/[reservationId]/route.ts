import getCurrentUser from '@/app/actions/getCurrentUser';
import client from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const { reservationId } = params;

  if (!reservationId) throw new Error('Invalid ID');

  return NextResponse.json(
    await client.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    })
  );
}
