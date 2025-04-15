import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { UserCard } from "../user-card";

describe("UserCard", () => {
  const mockProps = {
    name: "John Doe",
    email: "john@example.com",
    address: {
      street: "123 Main St",
      suite: "Apt 1",
      city: "Metropolis",
      zipcode: "12345",
    },
  };

  it("renders user name, email, and address", () => {
    render(<UserCard {...mockProps} />);
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/john@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/123 main st/i)).toBeInTheDocument();
    expect(screen.getByText(/apt 1/i)).toBeInTheDocument();
    expect(screen.getByText(/metropolis/i)).toBeInTheDocument();
    expect(screen.getByText(/12345/i)).toBeInTheDocument();
  });
});
