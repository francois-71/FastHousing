// this file contains some function that are either used in the form or in the validation of the form
import { createPropertySchema } from "@/schema/create-property";

export function processFormData(formData: FormData): {
  success: boolean;
  data: Record<string, any>;
  error?: string;
} {
  {
    const body: Record<string, any> = {};

    // Iterate over formData entries
    for (const [key, value] of formData.entries()) {
      // if key is amenities, or images, make it an array the key as the name and if it already exists, append to the array
      if (key === "amenities" || key === "images") {
        if (body[key]) {
          body[key].push(value);
        } else {
          body[key] = [value];
        }
      } else {
        body[key] = value;
      }
    }

    const parsed = createPropertySchema.safeParse(body);


    if (parsed.success && parsed.data) {
      return { success: true, data: parsed.data };
    }

    return { success: false, data: [] };
  }
}
