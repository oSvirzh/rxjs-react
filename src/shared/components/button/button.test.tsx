import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from './button.component';

describe('Button', () => {
  it('renders the button with the correct label', () => {
    render(<Button label="Click Me" />);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('has the correct classes applied', () => {
    const { container } = render(<Button label="Click Me" />);
    const buttonElement = container.querySelector('button');
    expect(buttonElement).toHaveClass(
      'mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none',
    );
  });
});
