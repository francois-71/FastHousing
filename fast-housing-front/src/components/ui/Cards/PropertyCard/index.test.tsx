import { render } from "@testing-library/react";
import PropertyCard from "./index";
import "@testing-library/jest-dom";

describe("PropertyCard Component", () => {
  const mockProperty = {
    id: "1",
    price: 100000,
    description: "Beautiful house in the suburbs",
  };

  const mockCoverImage = {
    id: "1",
    url: "/mock-image.jpg",
    filename: "mock-image.jpg",
    coverImage: true,
    order: 1,
    propertyId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockButtons = [
    <button key="1">Button 1</button>,
    <button key="2">Button 2</button>,
  ];

  it("renders with required props", () => {
    const { getByAltText } = render(
      <PropertyCard
        coverImage={mockCoverImage}
        property={mockProperty}
        editPathname="edit"
        imageQuality={80}
      />
    );

    const imageElement = getByAltText("Property Image");
    expect(imageElement).toBeInTheDocument();

  });

  it("renders with optional buttons", () => {
    const { getAllByRole } = render(
      <PropertyCard
        coverImage={mockCoverImage}
        property={mockProperty}
        editPathname="edit"
        imageQuality={80}
        buttons={mockButtons}
      />
    );

    const buttons = getAllByRole("button");
    expect(buttons.length).toBe(2);
  });
});
