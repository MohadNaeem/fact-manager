import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { RecordTable } from "../RecordTable";
import { Record } from "../../../interfaces/Record";
import RecordContextProvider from "../../../context/RecordContext"; // Assuming you have a provider

describe("RecordTable", () => {
  const mockOnEditInit = jest.fn();

  const records: Record[] = [
    { id: "1", title: "Test Record 1", upvotes: 10, date: "2024-01-01" },
    { id: "2", title: "Test Record 2", upvotes: 20, date: "2024-02-01" },
  ];

  const setup = () => {
    render(
      <RecordContextProvider>
        <RecordTable onEditInit={mockOnEditInit} />
      </RecordContextProvider>
    );
  };

  it("renders without crashing", () => {
    setup();
    expect(screen.getByText("Test Record 1")).toBeInTheDocument();
    expect(screen.getByText("Test Record 2")).toBeInTheDocument();
  });

  it("calls onEditInit when Edit button is clicked", async () => {
    setup();
    const editButtons = screen.getAllByText("Edit");
    userEvent.click(editButtons[0]);
    expect(mockOnEditInit).toHaveBeenCalledWith(records[0]);
  });

  it("applies filter correctly", () => {
    setup();
    const filterInput = screen.getByPlaceholderText("Filter records");
    fireEvent.change(filterInput, { target: { value: "Test Record 1" } });
    expect(screen.getByText("Test Record 1")).toBeInTheDocument();
    expect(screen.queryByText("Test Record 2")).toBeNull();
  });

  it("sorts records by upvotes", () => {
    setup();
    const sortButton = screen.getByText("Sort by upvotes");
    userEvent.click(sortButton);
    const firstRecordAfterSort = screen.getAllByRole("row")[1]; // Skip header row
    expect(firstRecordAfterSort).toHaveTextContent("Test Record 2");
  });
});
