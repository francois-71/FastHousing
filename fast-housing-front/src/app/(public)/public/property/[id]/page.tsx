import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <p>This is a simple page to display the id of the selected property </p>
      {params.id}
    </div>
  );
}
