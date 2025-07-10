import { useAuth } from '../hooks/useAuth';
import { useForm } from '../hooks/useForm';
import { validateLogin } from '../utils/validation';
import Input from './Input';
import Button from './Button';

const LoginForm = ({ onSuccess, onSwitchToRegister }) => {
  const { login } = useAuth();
  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(
    { email: '', password: '' },
    validateLogin
  );

  const onSubmit = async (formValues) => {
    try {
      await login(formValues);
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
          Sign In
        </Button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;