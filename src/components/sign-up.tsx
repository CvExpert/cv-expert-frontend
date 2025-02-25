import React, { useState } from 'react';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import { Checkbox } from '@heroui/checkbox';
import { Button } from '@heroui/button';
import { MailIcon } from './icons';
import { useGlobalAuthState } from '@/states/auth-state';

const API_BASE_URL = "http://localhost:3000/user";

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  terms?: string;
  country?:string;
}

export default function SignUp() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', country: '', terms: false });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitted, setSubmitted] = useState(null);
  const authContext = useGlobalAuthState();
  const state = authContext?.state;
  const setState = authContext?.setState ?? (() => {});

  const getPasswordError = (value: string) => {
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must have at least one uppercase letter';
    if (!/[^a-zA-Z0-9]/.test(value)) return 'Password must contain at least one symbol';
    return null;
  };

  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    if (!formData.name) newErrors.name = 'Please enter your name';
    if (!formData.email) newErrors.email = 'Please enter your email';
    if (!formData.password) newErrors.password = 'Please enter your password';
    else {
      const passwordError = getPasswordError(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }
    if (!formData.country) newErrors.country = 'Please select a country';
    if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions';
    return newErrors;
  };

  const handleInputChange = (field: string, value: any) => {
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
    console.log(formData)
    // setSubmitted(formData);

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.error) throw new Error(result.error);
      localStorage.setItem("accessToken", result.accessToken);
      setErrors({});
      setState({ isSignedIn: true })
    } catch (err: any) {
      setErrors({ email: err.message });
    }
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      validationBehavior="native"
      // validationErrors={errors}
      onReset={() => setSubmitted(null)}
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4 max-w-md">
        <Input
          name="name"
          isRequired
          errorMessage={errors.name}
          label="Name"
          labelPlacement="outside"
          placeholder="Enter your name"
          value={formData.name}
          onValueChange={(val) => handleInputChange('name', val)}
        />

        <Input
          name="email"
          isRequired
          errorMessage={errors.email}
          endContent={<MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
          label="Email"
          labelPlacement="outside"
          placeholder="you@example.com"
          type="email"
          value={formData.email}
          onValueChange={(val) => handleInputChange('email', val)}
        />

        <Input
          name="password"
          isRequired
          errorMessage={getPasswordError(formData.password)}
          isInvalid={getPasswordError(formData.password) !== null}
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          type="password"
          value={formData.password}
          onValueChange={(val) => handleInputChange('password', val)}
        />

        <Select
          name="country"
          isRequired
          label="Country"
          labelPlacement="outside"
          placeholder="Select country"
          value={formData.country}
          onChange={(val) => handleInputChange('country', val)}
        >
          <SelectItem key="in" value="in">India</SelectItem>
          <SelectItem key="us" value="us">United States</SelectItem>
          <SelectItem key="ca" value="ca">Canada</SelectItem>
          <SelectItem key="uk" value="uk">United Kingdom</SelectItem>
          <SelectItem key="au" value="au">Australia</SelectItem>
        </Select>

        <Checkbox
          name="terms"
          isRequired
          isInvalid={!!errors.terms}
          value={formData.terms ? 'true' : ''}
          onValueChange={(val) => handleInputChange('terms', val === true)}
        >
          I agree to the terms and conditions
        </Checkbox>

        {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}

        <div className="flex gap-4">
          <Button className="w-full" color="primary" type="submit">
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>
      </div>

      {submitted && (
        <div className="text-small text-default-500 mt-4">
          Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </Form>
  );
}

