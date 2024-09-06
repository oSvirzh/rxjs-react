import * as Form from '@radix-ui/react-form';
import { IInputProps, Validity } from '@/shared/components/input/input.model';

export const Input = ({ label, name, type, required, validation }: IInputProps) => (
  <Form.Field className="mb-[10px] grid" name={name}>
    <div className="flex items-baseline justify-between">
      <Form.Label className="text-[15px] font-medium leading-[35px] text-white">{label}</Form.Label>
      {validation &&
        Object.entries(validation).map(([key, value]) => (
          <Form.Message className="text-[13px] text-red-600 opacity-[0.8]" match={key as Validity}>
            {value}
          </Form.Message>
        ))}

      <Form.Message className="text-[13px] text-red-600 opacity-[0.8]" match="typeMismatch">
        Please provide a valid email
      </Form.Message>
    </div>
    <Form.Control asChild>
      <input
        className="selection:color-white box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded-[4px] bg-blackA2 px-[10px] text-[15px] leading-none text-white shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
        type={type}
        required={required}
      />
    </Form.Control>
  </Form.Field>
);
