"use client";

import { AuthEvents, authModule, AuthState } from "@/app/store/authStore";
import { StoreContext } from "storeon/react";
import { createStoreon } from "storeon";
import { ReactNode } from "react";

const store = createStoreon<AuthState, AuthEvents>([authModule]);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
