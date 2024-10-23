import EditPropertyForm from "@/components/ui/Form/EditPropertyForm/EditPropertyForm";
import React from "react";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  return (
    <div>
      <EditPropertyForm propertyId={params.id} />
    </div>
  );
}
