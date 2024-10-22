import { NextResponse } from "next/server";
import { Property } from "@prisma/client";
import { fetchTwentyRandomProperties } from "@/actions/properties";

export async function GET() {
  // We need to change this function, we limit the number of properties to 20 now to not overload the server and to limit AWS S3 costs
  const properties: Property[] = await fetchTwentyRandomProperties();

  if (!properties) {
    return NextResponse.json({ error: "No properties found" }, { status: 404 });
  }

  return NextResponse.json({
    revalidePath: true,
    properties: properties,
    status: 200,
  });
}
