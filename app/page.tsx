import getCurrentUser from '@/app/actions/getCurrentUser';
import getListings, { GetListingsParams } from '@/app/actions/getListings';
import { ListingCard } from '@/app/components/elements/listing-card/ListingCard';
import { Container } from '@/app/components/layouts/container/Container';
import { EmptyState } from '@/app/components/views/empty-state/EmptyState';
import { ClientOnly } from './components/services/client-only/ClientOnly';

interface HomeProps {
  searchParams: GetListingsParams;
}

const Home = async (props: HomeProps) => {
  const [currentUser, listings] = await Promise.all([
    getCurrentUser(),
    getListings(props.searchParams),
  ]);

  if (listings.length == 0)
    return (
      <ClientOnly>
        <EmptyState showReset />
      </ClientOnly>
    );
  return (
    <ClientOnly>
      <Container>
        <div
          className="
          pt-24
          grid
          grid-cols-1
          sm:gird-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          xl:grid-cols-5
          2xl:grid-cols-6
          gap-8
          "
        >
          {listings?.map(listing => (
            <ListingCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
