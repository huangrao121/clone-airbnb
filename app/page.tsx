export const dynamic = "force-dynamic"

import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings from "./actions/getListings";
import ListingCard from "./components/Listing/ListingCard";
import getCurrentUser from "./actions/getCurrentUser";
import { listingParams } from "./actions/getListings";
import { Suspense } from "react";

export default async function Home({searchParams}:{searchParams:listingParams}) {
  const currentUser = await getCurrentUser()
  const listings = await getListings(searchParams)
  if(listings.length===0){
    return (
      <EmptyState
        showReset
      />
    )
  }


  return (
    <Container>
      <div className="
        pt-24
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
      ">
        <Suspense>
        {listings.map((listing:any)=>(
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser!}
          />
        ))}
        </Suspense>
      </div>
    </Container>
  );
}
