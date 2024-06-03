"use client";
import Loading from "@/app/loading";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const withProtectedRoute = (Component: React.FC) => {
  const WithProtectedRoute = (props: any) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem("authToken");

      if (!token || token.length === 0) {
        router.push("/login");
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    }, [router]);
    if (isLoading) {
      return (
        <div>
          <Loading />
        </div>
      );
    }
    if (!isAuthenticated) {
      return null;
    }

    return <Component {...props} />;
  };
  return WithProtectedRoute;
};
