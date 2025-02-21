import { ref } from "vue";
import router from "@/router";

export function useLogin() {
  const inputPasswordValue = ref("");
  const loginError = ref("");

  const handleLogin = async (login: string) => {
    if (!inputPasswordValue.value) {
      loginError.value = "Пароль не может быть пустым";
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password: inputPasswordValue.value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ошибка авторизации");
      }


      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
      }

      router.push("/about");
    } catch (error) {
      loginError.value =  "Неверный пароль";
    }
  };

  return {
    inputPasswordValue,
    handleLogin,
    loginError, 
  };
}
