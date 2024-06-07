import { Headings } from '@/app/components/base/headings/Headings';
import { ListingCard } from '@/app/components/elements/listing-card/ListingCard';
import { Container } from '@/app/components/layouts/container/Container';
import { ListingDto } from '@/app/types/DTO/listing';
import { UserDto } from '@/app/types/DTO/user';

interface FavoritesClientProps {
  listings: ListingDto<false, true>[];
  currentUser: UserDto;
}

export const FavoritesClient: React.FC<FavoritesClientProps> = props => {
  return (
    <Container>
      <Headings title="Избранное" subtitle="Список ваших любимых мест!" />
      <div
        className="
          mt-10
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
        "
      >
        {props.listings.map((listing: any) => (
          <ListingCard
            currentUser={props.currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};
