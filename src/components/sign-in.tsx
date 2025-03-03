import React, { useState } from 'react';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { MailIcon } from './icons';
import { useGlobalAuthState } from '@/states/auth-state';

const API_BASE_URL = 'http://localhost:3000/user';

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function SignIn() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(null);
  const authContext = useGlobalAuthState();
  const setState = authContext?.setState ?? (() => {});

  const getPasswordError = (value: string) => {
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must have at least one uppercase letter';
    if (!/[^a-zA-Z0-9]/.test(value)) return 'Password must contain at least one symbol';
    return null;
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    if (!formData.email) newErrors.email = 'Please enter your email';
    if (!formData.password) newErrors.password = 'Please enter your password';
    else {
      const passwordError = getPasswordError(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }
    return newErrors;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    // setSubmitted(formData);
    console.log(formData);
    try {
      const response = await fetch(`${API_BASE_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      localStorage.setItem('accessToken', result.accessToken);
      setErrors({});
      setState({ isSignedIn: true });
    } catch (err: any) {
      setState({ isSignedIn: true });
      setErrors({ email: err.message });
    }
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      onSubmit={onSubmit}
      onReset={() => setSubmitted(null)}
    >
      <div className="flex flex-col gap-4 max-w-md">
        <Input
          name="email"
          label="Email"
          placeholder="you@example.com"
          type="email"
          value={formData.email}
          onValueChange={(val) => handleInputChange('email', val)}
          errorMessage={errors.email}
          isRequired
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
        />

        <Input
          name="password"
          label="Password"
          placeholder="Enter your password"
          type="password"
          value={formData.password}
          onValueChange={(val) => handleInputChange('password', val)}
          errorMessage={errors.password}
          isInvalid={!!errors.password}
          isRequired
        />

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>

        <Button className="w-full" color="primary" type="button">
          Continue with Demo Account
        </Button>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}
