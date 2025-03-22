"use client";

import type React from "react";
import { createContext, useContext, useState } from "react";

type AuthLoadingContextType = {
  isAuthLoading: boolean;
  setAuthLoading: (loading: boolean) => void;
};

const AuthLoadingContext = createContext<AuthLoadingContextType | undefined>(
  undefined,
);

export function AuthLoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthLoading, setAuthLoading] = useState(true);

  return (
    <AuthLoadingContext.Provider value={{ isAuthLoading, setAuthLoading }}>
      {children}
    </AuthLoadingContext.Provider>
  );
}

export function useAuthLoading() {
  const context = useContext(AuthLoadingContext);
  if (context === undefined) {
    throw new Error(
      "useAuthLoading must be used within an AuthLoadingProvider",
    );
  }
  return context;
}
