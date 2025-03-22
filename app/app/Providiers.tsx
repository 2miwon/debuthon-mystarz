"use client"; // Mark this as a Client Component

import React, { useEffect, useState } from "react";
import { FutureverseAuthProvider } from "@futureverse/auth-react";
import { WagmiProvider } from "wagmi";
import { config } from "./wagmiClient"; // Your wagmi configuration
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { FutureverseAuthClient } from "@futureverse/auth-react/auth";
import {
  AuthUiProvider,
  DefaultTheme,
  ThemeConfig,
} from "@futureverse/auth-ui";
import { useAuthLoading } from "./auth-loading-context";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID as string;

const customTheme: ThemeConfig = {
  ...DefaultTheme,
  defaultAuthOption: "custodial",
};

const queryClient = new QueryClient();

export function Providers({ children }: { children: ReactNode }) {
  const { setAuthLoading } = useAuthLoading();
  const [theme, setTheme] = useState<ThemeConfig>(customTheme);

  const [authClient, setAuthClient] = useState<FutureverseAuthClient | null>(
    null,
  );

  useEffect(() => {
    setAuthLoading(true);
    const client = new FutureverseAuthClient({
      clientId,
      environment: "staging",
      redirectUri: `${window.location.origin}`,
      signInFlow: "redirect",
    });

    setAuthClient(client);
    setTimeout(() => {
      setAuthLoading(false);
    }, 2000);
  }, []);

  if (!authClient) {
    return <div className="h-[80vh] bg-white"> </div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <FutureverseAuthProvider authClient={authClient}>
        <WagmiProvider config={config}>
          <AuthUiProvider themeConfig={theme} authClient={authClient}>
            {children}
          </AuthUiProvider>
        </WagmiProvider>
      </FutureverseAuthProvider>
    </QueryClientProvider>
  );
}
