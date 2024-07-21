"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useStoreon } from "storeon/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthEvents, AuthState } from "@/app/store/authStore";
import styles from "./styles/Page.module.scss";
const Login: React.FC = () => {
  const { dispatch, token } = useStoreon<AuthState, AuthEvents>();
  const [username, setName] = useState("");
  const [password, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  // Хотел формик или хук форм вставить, но решил не усложнять, сделал без валидации максимально просто
  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = { username, password };
    try {
      const response = await axios.post("/api/fakeAuth", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = response.data;
      if (data.success) {
        dispatch("auth/signin", data.token);
        router.push("/posts");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };
  const setNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const setPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <form onSubmit={handleLogin} className={styles.form}>
      <div className={styles.title}>Авторизация</div>
      <input
        className={styles.input}
        type="text"
        placeholder="name"
        value={username}
        onChange={setNameHandler}
      />
      <input
        className={styles.input}
        type="password"
        placeholder="password"
        value={password}
        onChange={setPasswordHandler}
      />
      <button className={styles.button}>Login</button>
      <div className={styles.error}>{error}</div>
    </form>
  );
};

export default Login;
