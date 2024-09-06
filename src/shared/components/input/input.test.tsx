import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import * as Form from '@radix-ui/react-form';
import { Input } from './input.component';

const renderWithForm = (ui: JSX.Element) =>
  render(
    <Form.Root>
      {ui}
      <Form.Submit asChild>
        <button type="submit">Submit</button>
      </Form.Submit>
    </Form.Root>,
  );

describe('Input Component', () => {
  it('renders with the correct label and type', () => {
    renderWithForm(<Input label="Email" name="email" type="email" required />);
    expect(screen.getByText('Email')).toBeInTheDocument();
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('type', 'email');
  });

  it('shows validation messages correctly', () => {
    const validationMessages = {
      valueMissing: 'This field is required',
    };

    renderWithForm(<Input label="Email" name="email" type="email" required validation={validationMessages} />);
    fireEvent.click(screen.getByText('Submit'));

    expect(screen.getByText(validationMessages.valueMissing)).toBeInTheDocument();
  });

  it('has required attribute if required prop is true', () => {
    renderWithForm(<Input label="Email" name="email" type="email" required />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('required');
  });

  it('does not have required attribute if required prop is false', () => {
    renderWithForm(<Input label="Email" name="email" type="email" />);

    const inputElement = screen.getByRole('textbox');
    expect(inputElement).not.toHaveAttribute('required');
  });
});
