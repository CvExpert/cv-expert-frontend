import React, { useState, useEffect } from 'react';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Checkbox } from '@heroui/checkbox';
import { Button } from '@heroui/button';
import { MailIcon } from './icons';
import { useGlobalAuthState } from '@/states/auth-state';
import api from '@/functions/api'; // Import the Axios instance
import Cookies from 'js-cookie';

interface ValidationErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { setState, logout } = useGlobalAuthState();

  // Password Validation
  const getPasswordError = (value: string) => {
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(value)) return 'Password must have at least one uppercase letter';
    if (!/[^a-zA-Z0-9]/.test(value)) return 'Password must contain at least one symbol';
    return null;
  };

  // Form Validation
  const validateForm = () => {
    const newErrors: ValidationErrors = {};
    if (!formData.name) newErrors.name = 'Please enter your name';
    if (!formData.email) newErrors.email = 'Please enter your email';
    if (!formData.password) {
      newErrors.password = 'Please enter your password';
    } else {
      const passwordError = getPasswordError(formData.password);
      if (passwordError) newErrors.password = passwordError;
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    }
    if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions';
    return newErrors;
  };

  // Handle Form Input Change
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Real-time password match validation
  useEffect(() => {
    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: 'Passwords do not match' }));
    } else {
      setErrors((prev) => {
        const { confirmPassword, ...rest } = prev;
        return rest;
      });
    }
  }, [formData.password, formData.confirmPassword]);

  // Handle Form Submission
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    console.log('Submitting form:', formData);

    try {
      console.log('Trying to fetch the response');
      const response = await api.post(
        '/user/signup',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        // formData
      ); // API call using Axios
      if (!response) {
        console.log('Unable to communicate to backend');
      }
      console.log(response);
      // console.log('Server Response:', response.data);

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      setErrors({});
      if (response.data.user) {
        setState({
          isSignedIn: true,
          email: formData.email,
          userID: response.data.user.userID,
          name: formData.name,
        });
        // Set Cookie
        Cookies.set('accessToken', response.data.accessToken, {
          expires: 15 / (60 * 24), // 15 minutes
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });
        localStorage.setItem('authState', JSON.stringify({
          isSignedIn: true,
          email: formData.email,
          userID: response.data.user.userID,
          name: formData.name,
        }));
        console.log('Global State Saved and cookie saved');
      }
      // setState({isSignedIn:true, })
    } catch (err: any) {
      if (logout) logout();
      if (err.response) {
        console.error('Error Response:', err.response.data);
        setErrors({ email: err.response.data.error || 'Signup failed' });
      } else if (err.request) {
        console.error('No Response:', err.request);
        setErrors({ email: 'No response from server' });
      } else {
        console.error('Error:', err.message);
        setErrors({ email: err.message });
      }
    }
  };

  return (
    <Form
      className="w-full justify-center items-center space-y-4"
      validationBehavior="native"
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
          endContent={
            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
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
          errorMessage={errors.password}
          isInvalid={!!errors.password}
          label="Password"
          labelPlacement="outside"
          placeholder="Enter your password"
          type="password"
          value={formData.password}
          onValueChange={(val) => handleInputChange('password', val)}
        />
        <Input
          name="confirmPassword"
          isRequired
          errorMessage={errors.confirmPassword}
          isInvalid={!!errors.confirmPassword}
          label="Confirm Password"
          labelPlacement="outside"
          placeholder="Re-enter your password"
          type="password"
          value={formData.confirmPassword}
          onValueChange={(val) => handleInputChange('confirmPassword', val)}
        />
        <Checkbox
          name="terms"
          isRequired
          isInvalid={!!errors.terms}
          isSelected={formData.terms}
          onValueChange={(val) => handleInputChange('terms', val)}
        >
          I agree to the terms and conditions
        </Checkbox>
        {errors.terms && <span className="text-danger text-small">{errors.terms}</span>}
        <div className="flex gap-4">
          <Button
            className="w-full"
            color="primary"
            type="submit"
            isDisabled={
              !formData.terms ||
              !formData.password ||
              !formData.confirmPassword ||
              formData.password !== formData.confirmPassword
            }
          >
            Submit
          </Button>
          <Button type="reset" variant="bordered">
            Reset
          </Button>
        </div>
      </div>
    </Form>
  );
}
