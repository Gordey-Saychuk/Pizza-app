import { Link } from "react-router-dom";
import Button from "../../components/Button/Button"; // Предполагаем, что Button используется позже
import Headling from "../../components/Headling/Headling"; // Предполагаем, что Headling используется позже
import Input from "../../components/Input/Input";
import styles from "./Login.module.css";
import { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { LoginRespons } from "../../interfaces/auth.interfaces";

export type LoginForm = {
  email: {
    value: string;
  };
  password: {
    value: string;
  };
};

export default function Login() {
  const [error, setError] = useState<string | null>(null); // Исправленная типизация

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    const target = e.target as typeof e.target & LoginForm;
    const { email, password } = target;
    await sendLogin(email.value, password.value);
  };

  const sendLogin = async (email: string, password: string) => {
    try {
      const { data } = await axios.post<LoginRespons>(`http://localhost:3000/auth/login`, {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem('jwt', data.token)
    } catch (e) {
      if (e instanceof AxiosError) {
        setError(e.response?.data.message);
      }
    }
  };

  return (
    <div className={styles["login"]}>
      <Headling>Вход</Headling>
      {error && <div>{error}</div>}
      <form className={styles["form"]} onSubmit={submit}>
        <div className={styles["field"]}>
          <label htmlFor="email">Ваш Email</label>
          <Input name="email" id="email" placeholder="Email" />
        </div>
        <div className={styles["field"]}>
          <label htmlFor="password">Ваш пароль</label>
          <Input
            name="password"
            placeholder="Пароль"
            id="password"
            type="password"
          />
        </div>
        <Button appearence="big">Вход</Button>
      </form>
      <div className={styles["links"]}>
        <div>Нет аккаунта?</div>
        <Link to="/auth/register">Зарегистрироваться</Link>
      </div>
    </div>
  );
}
