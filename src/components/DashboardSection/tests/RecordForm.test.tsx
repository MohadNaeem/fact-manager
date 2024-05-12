import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { RecordForm } from '../RecordForm';

describe('RecordForm', () => {
  const mockSubmit = jest.fn();
  const mockCancel = jest.fn();

  beforeEach(() => {
    render(<RecordForm onSubmit={mockSubmit} onCancel={mockCancel} editRecord={null} />);
  });

  it('renders correctly', () => {
    expect(screen.getByLabelText(/Enter title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Enter upvotes/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Record/i })).toBeInTheDocument();
  });

  it('allows input to be entered', () => {
    fireEvent.change(screen.getByLabelText(/Enter title/i), { target: { value: 'New Title' } });
    fireEvent.change(screen.getByLabelText(/Enter upvotes/i), { target: { value: '123' } });
    expect(screen.getByLabelText(/Enter title/i)).toBe('New Title');
    expect(screen.getByLabelText(/Enter upvotes/i)).toBe('123');
  });

  it('submits the form with correct data', () => {
    fireEvent.change(screen.getByLabelText(/Enter title/i), { target: { value: 'New Title' } });
    fireEvent.change(screen.getByLabelText(/Enter upvotes/i), { target: { value: '123' } });
    fireEvent.click(screen.getByRole('button', { name: /Add Record/i }));

    expect(mockSubmit).toHaveBeenCalledWith({
      id: expect.any(String), // or specific logic if ID is generated differently
      title: 'New Title',
      upvotes: 123,
      date: expect.any(String)
    });
  });

  it('cancels the form', () => {
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(mockCancel).toHaveBeenCalled();
  });
});
