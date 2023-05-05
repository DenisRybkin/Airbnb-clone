import getCurrentUser from '@/app/actions/getCurrentUser';
import { RentDto } from '@/app/components/modals/rent-modal/RentModal';
import client from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return NextResponse.error();

  const body = await request.json();

  const {
    title,
    description,
    imageSrc,
    categoryId,
    roomCount,
    guestCount,
    bathroomCount,
    price,
    location,
  }: RentDto = body;

  //Object.keys(body).forEach(key => !body[key] && NextResponse.error());

  const listing = await prisma?.listing.create({
    data: {
      title,
      description,
      imageSrc,
      categoryId,
      roomCount,
      bathroomCount,
      guestCount,
      locationValue: location.value,
      price: parseInt(String(price), 10),
      userId: currentUser.id,
    },
  });

  return NextResponse.json(listing);
}
