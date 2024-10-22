import { fetchPropertyById } from "@/actions/properties";
import { Property } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
  const session = await auth();

  if (!session || session === undefined) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  const userId = session.user.id;

  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  console.log("id", id);

  try {
    const property: Property | undefined = await fetchPropertyById(id, userId);

    if (property === undefined || !property) {
      return NextResponse.json({ success: false }, { status: 404 });
    }

    return NextResponse.json({ success: true, property: property });
  } catch (error) {
    console.error("There was an error:", error);

    return NextResponse.json({ success: false }, { status: 500 });
  }
}
