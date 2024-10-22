import { Property } from "@/types/model";
import { fetchHostProperties } from "@/actions/properties";
import { NextRequest, NextResponse } from "next/server";
import { currentUserId } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  const { nextUrl } = req;
  const userId: string | undefined = await currentUserId();

  if (userId === undefined) {
    return NextResponse.json(
      { error: "Error retrieving the user" },
      { status: 404 },
    );
  }

  const properties: Property[] = await fetchHostProperties(userId);

  if (!properties || properties.length === 0) {
    return NextResponse.json({ error: "No properties found" }, { status: 404 });
  }

  revalidatePath(nextUrl.pathname);

  return NextResponse.json(properties, { status: 200 });
}
