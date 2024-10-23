import React from "react";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  return (
    <div>
      <p>This is a simple page to display the id of the selected property </p>
      {params.id}
    </div>
  );
}
