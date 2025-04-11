// components/auth/Register.jsx
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import Button from '../common/Button';
import Card, { CardHeader, CardBody, CardFooter } from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import Input from '../common/Input';
import Alert from '../common/Alert';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formError, setFormError] = useState('');
  const { name, email, password, confirmPassword } = formData;
  const { register, isAuthenticated, loading, error, clearErrors } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      toast.success('Account created successfully! 🎉');
      navigate('/homepage');
    }
    return () => clearErrors();
  }, [isAuthenticated, navigate, clearErrors]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (password !== confirmPassword) {
      const msg = 'Passwords do not match';
      setFormError(msg);
      return toast.error(msg);
    }

    if (password.length < 6) {
      const msg = 'Password must be at least 6 characters';
      setFormError(msg);
      return toast.error(msg);
    }

    await register({ name, email, password });
  };

  if (loading) return <LoadingSpinner center size="lg" />;

  return (
    <div className="max-w-md mx-auto my-8 px-4">
      <Card className="transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-800">
        <CardHeader className="border-b dark:border-gray-600">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-100 py-4">
            Create Account
          </h2>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
            {formError && <Alert variant="error">{formError}</Alert>}

            <Input
              label="Full Name"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              autoComplete="name"
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              autoComplete="email"
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              helperText="Minimum 6 characters"
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
            />

            <Button type="submit" variant="primary" className="w-full group">
              <span className="group-hover:translate-x-2 transition-transform">
                Get Started
              </span>
            </Button>
          </form>
        </CardBody>

        <CardFooter className="pt-4 border-t dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Already registered?{' '}
            <Link
              to="/login"
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;