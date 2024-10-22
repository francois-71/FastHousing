import { auth } from "@/auth";
import { processFormData } from "@/app/helpers/form/form";
import { editProperty } from "@/actions/properties";
import { revalidatePath } from "next/cache";

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const userId: string = session.user.id;

  const formData = await request.formData();
  const response = processFormData(formData);

  if (!response.success) {
    return new Response(response.error, { status: 400 });
  }

  // before editing the property, we need to make sure that the session id is linked to the user that owns the property

  const action = await editProperty(response.data, userId);

  if (!action.success) {
    return new Response(action.message, { status: 500 });
  }

  revalidatePath("/");

  return new Response("Success", { status: 200 });
}
