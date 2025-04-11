// components/auth/Login.jsx
import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import Button from '../common/Button';
import Card, { CardHeader, CardBody, CardFooter } from '../common/Card';
import LoadingSpinner from '../common/LoadingSpinner';
import Input from '../common/Input';
import Alert from '../common/Alert';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;
  const { login, isAuthenticated, loading, error, clearErrors } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    isAuthenticated && navigate('/homepage');
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
    await login(formData);
  };

  if (loading) return <LoadingSpinner center size="lg" />;

  return (
    <div className="max-w-md mx-auto my-8 px-4">
      <Card className="transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-800">
        <CardHeader className="border-b dark:border-gray-600">
          <h2 className="text-3xl font-extrabold text-center text-gray-800 dark:text-gray-100 py-4">
            Welcome Back
          </h2>
        </CardHeader>

        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-6">
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
              autoComplete="current-password"
              required
            />

            <Button type="submit" variant="primary" className="w-full group">
              <span className="group-hover:translate-x-2 transition-transform">
                Sign In
              </span>
            </Button>
          </form>
        </CardBody>

        <CardFooter className="pt-4 border-t dark:border-gray-600">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            New here?{' '}
            <Link
              to="/register"
              className="text-primary-600 dark:text-primary-400 font-medium hover:underline hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
            >
              Create account
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;