import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { processFormData } from "@/app/helpers/form/form";
import { revalidatePath } from "next/cache";
import { createProperty } from "@/actions/properties";

export async function POST(request: Request) {
  const session = await auth();

  console.log("session", session);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const response = processFormData(formData);

  if (!response.success) {
    return NextResponse.json({ error: response.error }, { status: 400 });
  }

  const action = await createProperty(response.data, session.user.id);

  if (!action.success) {
    return NextResponse.json({ error: action.message }, { status: 500 });
  }

  revalidatePath("/");

  return NextResponse.json({ success: true }, { status: 200 });
}
