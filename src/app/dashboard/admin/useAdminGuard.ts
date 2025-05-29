// Protects admin dashboard routes by redirecting non-admins to the user dashboard
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAdminGuard(user: any) {
  const router = useRouter();
  useEffect(() => {
    if (user && user.role !== "admin") {
      router.replace("/dashboard/user");
    }
  }, [user, router]);
}
