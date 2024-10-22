import EditPropertyForm from "@/components/ui/Form/EditPropertyForm/EditPropertyForm";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <EditPropertyForm propertyId={params.id} />
    </div>
  );
}
