"use client";
import { useStoreon } from "storeon/react";
import { useRouter } from "next/navigation";
import styles from "./styles/LoginButton.module.scss";
import { AuthEvents, AuthState } from "@/app/store/authStore";

export const LoginButton = () => {
  const { token, dispatch } = useStoreon<AuthState, AuthEvents>("token");
  const router = useRouter();

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.login}
        onClick={() => {
          token && dispatch("auth/signout");
          router.push("/login");
        }}
      >
        {token ? `User token: ${token}, logout` : "login"}
      </button>
    </div>
  );
};
