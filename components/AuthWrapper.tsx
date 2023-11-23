import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { AuthService } from 'services';

const AuthWrapper = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const authservice = new AuthService();
    useEffect(() => {
      // Check authentication on component mount
      if (!authservice.verifyToken()) {
        // Redirect to login page if not authenticated
        router.push('/');
      }
    }, []);

    // Render the wrapped component if authenticated
    return authservice.verifyToken() ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default AuthWrapper;