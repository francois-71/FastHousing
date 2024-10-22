import { NextRequest, NextResponse } from "next/server";
import { deleteProperty } from "@/actions/properties";
import { revalidatePath } from "next/cache";

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ success: false }, { status: 404 });
  }

  try {
    await deleteProperty(id);
  } catch (error) {
    console.error("There was an error", error);

    return NextResponse.json({ success: false }, { status: 500 });
  }

  revalidatePath("", "page");
  revalidatePath("/properties", "page");

  return NextResponse.json({ success: true }, { status: 200 });
}
