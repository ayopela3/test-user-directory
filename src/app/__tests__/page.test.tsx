import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import UserDirectoryPage from "../page";
import { fetchUsers } from "../actions";

// Mock fetchUsers from actions
jest.mock("../actions", () => ({
  fetchUsers: jest.fn(),
}));

describe("UserDirectoryPage", () => {
  const users = [
    {
      id: 1,
      name: "Alice Smith",
      email: "alice@example.com",
      address: {
        street: "1 Apple St",
        suite: "Suite 100",
        city: "Cupertino",
        zipcode: "95014",
      },
    },
    {
      id: 2,
      name: "Bob Johnson",
      email: "bob@example.com",
      address: {
        street: "2 Banana Ave",
        suite: "Apt 2",
        city: "Mountain View",
        zipcode: "94040",
      },
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state", async () => {
    (fetchUsers as jest.Mock).mockReturnValue(new Promise(() => {}));
    render(<UserDirectoryPage />);
    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error state", async () => {
    (fetchUsers as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch users")
    );
    render(<UserDirectoryPage />);
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch users/i)).toBeInTheDocument();
    });
  });

  it("renders users and filters by name", async () => {
    (fetchUsers as jest.Mock).mockResolvedValue(users);
    render(<UserDirectoryPage />);
    await waitFor(() => {
      expect(screen.getByText(/alice smith/i)).toBeInTheDocument();
      expect(screen.getByText(/bob johnson/i)).toBeInTheDocument();
    });
    const input = screen.getByPlaceholderText(/search by name/i);
    fireEvent.change(input, { target: { value: "Alice" } });
    expect(screen.getByText(/alice smith/i)).toBeInTheDocument();
    expect(screen.queryByText(/bob johnson/i)).not.toBeInTheDocument();
  });
});
