import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { validateRegister } from '../utils/validation';
import Input from './Input';
import Button from './Button';

export default function RegisterForm ({ onSuccess, onSwitchToLogin }) {
  const { register } = useAuth();
  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(
    { name: '', email: '', password: '', confirmPassword: '' },
    validateRegister
  );

  const onSubmit = async (formValues) => {
    try {
      const { confirmPassword, ...userData } = formValues;
      await register(userData);
      onSuccess();
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit);
      }}>
        <Input
          label="Full Name"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name}
          placeholder="Enter your full name"
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.email && errors.email}
          placeholder="Enter your email"
          required
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.password && errors.password}
          placeholder="Enter your password"
          required
        />

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.confirmPassword && errors.confirmPassword}
          placeholder="Confirm your password"
          required
        />
        <p>{values.confirmPassword}</p>

        {errors.submit && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isSubmitting}
          className="w-full mb-4"
        >
          Sign Up
        </Button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
}