'use client';

import { Headings } from '@/app/components/base/headings/Headings';
import { ListingCard } from '@/app/components/elements/listing-card/ListingCard';
import { Container } from '@/app/components/layouts/container/Container';
import { ListingDto } from '@/app/types/DTO/listing';
import { UserDto } from '@/app/types/DTO/user';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';

interface PropertiesClientProps {
  currentUser: UserDto;
  listings: ListingDto<false, true>[];
}
export const PropertiesClient: React.FC<PropertiesClientProps> = props => {
  const router = useRouter();

  const [deletingId, setDeletingId] = useState<string>('');

  const handleCancelProperty = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete('/api/listings/' + id)
        .then(() => {
          toast.success('Listing deleted');
          router.refresh();
        })
        .catch(error => toast.error(error?.response?.data?.error))
        .finally(() => setDeletingId(''));
    },
    [router]
  );

  return (
    <Container>
      <Headings title="Properties" subtitle="List of your properties" />
      <div
        className="
            mt-10 grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
        "
      >
        {props.listings.map(listing => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={props.currentUser}
            actionId={listing.id}
            onAction={handleCancelProperty}
            disabled={deletingId == listing.id}
            actionLabel="Delete property"
          />
        ))}
      </div>
    </Container>
  );
};
