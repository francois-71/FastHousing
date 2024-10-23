import React from "react";
import HostPropertyCardDisplay from "@/components/ui/Cards/HostPropertyCardDisplay";
import { revalidateTimeConfig } from "@/config/app.config";
import { imageConfig } from "@/config/app.config";
import { Property } from "@/types/model";
import RedirectButton from "@/components/ui/Buttons/RedirectButton";
import ErrorDisplay from "@/components/ui/ErrorDisplay";
import { auth } from "@/auth";
import { headers } from "next/headers";

export const revalidate = revalidateTimeConfig.apiHostProperties;

async function getProperties(): Promise<Property[]> {
  const session = await auth();

  if (!session) {
    console.log("No session found in host properties page");

    return [];
  }

  const response = await fetch("http://localhost:3000/api/host/properties", {
    next: {
      revalidate,
    },
    headers: await headers(),
  });

  if (!response.ok) {
    console.log("No properties found in host properties page");

    return [];
  }

  const data = await response.json();

  return data;
}

export default async function Page() {
  const properties: Property[] = await getProperties();
  const imageQuality = imageConfig.nextImageQuality;

  return (
    <div>
      {properties.length > 0 ? (
        <HostPropertyCardDisplay
          properties={properties}
          imageQuality={imageQuality}
        />
      ) : (
        <ErrorDisplay
          title="You haven't registered any property yet :("
          message="But it's not too late..."
        >
          <RedirectButton
            path="/property/create"
            text="Create my first property"
          />
          <RedirectButton path="/" text="Home page" />
        </ErrorDisplay>
      )}
    </div>
  );
}
