import * as Form from '@radix-ui/react-form';
import { Input } from '@/shared/components/input/input.component';
import { useLogin } from '@/features/auth/hooks/useLogin';
import { Button } from '@/shared/components/button/button.component';

export const LoginForm = () => {
  const { handleSubmit, error } = useLogin();

  return (
    <Form.Root className="w-[260px]" onSubmit={handleSubmit}>
      <Input
        label="Email"
        name="email"
        type="email"
        validation={{ typeMismatch: 'Please provide a valid email', valueMissing: 'Please provide your email' }}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        validation={{ valueMissing: 'Please provide your password' }}
        required
      />
      {error && <span className="text-[13px] text-red-600 opacity-[0.8]">{error}</span>}
      <Form.Submit asChild>
        <Button isSubmit label="Login" />
      </Form.Submit>
    </Form.Root>
  );
};
