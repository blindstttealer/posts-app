import { StoreonModule } from "storeon";

export interface AuthState {
  token: string | null;
}

export interface AuthEvents {
  "auth/signin": string;
  "auth/signout": undefined;
}

export const authModule: StoreonModule<AuthState, AuthEvents> = (store) => {
  store.on("@init", () => ({ token: null }));
  store.on("auth/signin", (state, token) => ({ ...state, token }));
  store.on("auth/signout", (state) => ({ ...state, token: null }));
};
