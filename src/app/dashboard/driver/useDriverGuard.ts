// Protects driver dashboard routes by redirecting non-drivers to the user dashboard
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function useDriverGuard(user: any) {
  const router = useRouter();
  useEffect(() => {
    if (user && user.role !== 'driver') {
      router.replace('/dashboard/user');
    }
  }, [user, router]);
}
