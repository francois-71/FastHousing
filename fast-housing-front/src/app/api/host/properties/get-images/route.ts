import { getAllCoverImagesByUser } from "@/actions/images";
import { currentUserId } from "@/lib/auth";
import { Image } from "@/types/model";
import { NextRequest, NextResponse } from "next/server";

type Response = {
  filename: string;
  url: string;
  propertyId: string;
  propertyName: string;
};

export async function GET(req: NextRequest, res: NextResponse) {
  //const userId: string | undefined = await currentUserId();
  const userId = "cm2tbiykb00006xxv0vgqbgzr";
  if (!userId) {
    return NextResponse.json(
      { error: "Error retrieving the user" },
      { status: 404 },
    );
  }

  const propertiesImages: (Image & { propertyName: string })[] | undefined =
    await getAllCoverImagesByUser(userId);

  if (!propertiesImages) {
    return NextResponse.json(
      {
        error: "No properties images found",
      },
      { status: 404 },
    );
  }

  // create a new object with the url and filename field.
  const propertiesImagesFiltered: Response[] = propertiesImages.reduce(
    (acc: Response[], image) => {
      acc.push({
        filename: image.filename,
        url: image.url,
        propertyId: image.propertyId,
        propertyName: image.propertyName,
      });
      return acc;
    },
    [],
  );

  return NextResponse.json(
    {
      propertiesImagesFiltered,
    },
    { status: 200 },
  );
}
