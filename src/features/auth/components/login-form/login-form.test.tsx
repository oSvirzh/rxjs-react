import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LoginForm } from './login-form.component';

vi.mock('@/features/auth/hooks/useLogin', () => ({
  useLogin: () => ({
    handleSubmit: vi.fn((e) => e.preventDefault()),
    error: '',
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  it('renders the form with email and password inputs and submit button', () => {
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('displays validation messages when fields are empty and form is submitted', () => {
    fireEvent.click(screen.getByRole('button', { name: 'Login' }));
    expect(screen.getByText('Please provide your email')).toBeInTheDocument();
    expect(screen.getByText('Please provide your password')).toBeInTheDocument();
  });
});
