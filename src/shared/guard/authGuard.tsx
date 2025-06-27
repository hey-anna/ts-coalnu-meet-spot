import { useUserStore } from '@/domain/user/store/userStore';
import { Navigate, useLocation } from 'react-router';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore();
  const location = useLocation();

  if (!user?.id) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
