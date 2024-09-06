import { IButtonProps } from '@/shared/components/button/button.model';

export const Button = ({ label, isSubmit }: IButtonProps) => (
  <button
    type={isSubmit ? 'submit' : 'button'}
    className="mt-[10px] box-border inline-flex h-[35px] w-full items-center justify-center rounded-[4px] bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none"
  >
    {label}
  </button>
);
