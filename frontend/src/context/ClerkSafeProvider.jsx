import React, { createContext, useContext } from "react";
import { ClerkProvider } from "@clerk/react";
import { dark } from "@clerk/themes";

const ClerkConfigContext = createContext({
  isClerkConfigured: false,
  publishableKey: "",
});

export const useClerkConfig = () => useContext(ClerkConfigContext);

const rawKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || "";
const isValidClerkKey =
  rawKey.trim().length > 0 &&
  rawKey.startsWith("pk_") &&
  !rawKey.includes("your_clerk_publishable_key");

export default function ClerkSafeProvider({ children }) {
  if (!isValidClerkKey) {
    return (
      <ClerkConfigContext.Provider
        value={{ isClerkConfigured: false, publishableKey: "" }}
      >
        {children}
      </ClerkConfigContext.Provider>
    );
  }

  return (
    <ClerkConfigContext.Provider
      value={{ isClerkConfigured: true, publishableKey: rawKey }}
    >
      <ClerkProvider
        publishableKey={rawKey}
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: "#facc15",
            colorBackground: "#12141d",
            colorInputBackground: "#090a10",
            colorInputText: "#ffffff",
            colorText: "#ffffff",
            colorTextSecondary: "#9ca3af",
            colorNeutral: "#ffffff",
          },
          elements: {
            card: "border border-[#272a38] shadow-2xl rounded-2xl bg-[#12141d]",
            formButtonPrimary:
              "!bg-[#facc15] hover:!bg-[#fde047] !text-[#0c0d14] font-bold shadow-lg shadow-yellow-400/20",
          },
        }}
      >
        {children}
      </ClerkProvider>
    </ClerkConfigContext.Provider>
  );
}
