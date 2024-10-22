import React from "react";
import HomePageCardDisplay from "@/components/ui/Cards/HomePageCardDisplay";
import { revalidateTimeConfig, imageConfig } from "@/config/app.config";
import ReservationSearchBarDisplay from "@/components/ui/SearchBar/ReservationSearchBarDisplay";
import { Property } from "@/types/model";

export default async function Page() {
  const response = await fetch("http://localhost:3000/api/public/properties", {
    next: {
      revalidate: revalidateTimeConfig.apiProperties,
    },
  });

  if (!response.ok || response === undefined) {
    console.log("Didn't find any property");

    return [];
  }

  const data = await response.json();
  const properties: Property[] = data.properties;

  return (
    <div>
      <div>
        <ReservationSearchBarDisplay />
      </div>
      {properties ? (
        <HomePageCardDisplay
          properties={properties}
          imageQuality={imageConfig.nextImageQuality}
        />
      ) : (
        <p>An error occured, please try again later </p>
      )}
    </div>
  );
}
