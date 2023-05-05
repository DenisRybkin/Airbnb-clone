import getCurrentUser from '@/app/actions/getCurrentUser';
import client from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();

  const { listingId, startDate, endDate, totalPrice } = body;

  if ([listingId, startDate, endDate, totalPrice].some(value => !value))
    return NextResponse.error();

  return NextResponse.json(
    await client.listing.update({
      where: {
        id: listingId,
      },
      data: {
        reservations: {
          create: {
            userId: currentUser.id,
            startDate,
            endDate,
            totalPrice,
          },
        },
      },
    })
  );
}
