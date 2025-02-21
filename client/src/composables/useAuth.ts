import { ref } from 'vue'
import router from '../router'

export function useAuth() {
  const inputLoginValue = ref("")
  const inputPasswordValue = ref("")
  const inputTabelValue = ref("")
  const rememberMe = ref(false)
  const loginError = ref("");

  
  const handleLogin = async () => {
    if (!inputLoginValue.value || !inputPasswordValue.value) {
      loginError.value = "Логин и пароль обязательны для ввода"
      return
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: inputLoginValue.value,
          password: inputPasswordValue.value,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Ошибка авторизации")
      }
      
      const user = {
        login: inputLoginValue.value,
        password: inputPasswordValue.value,  
        tabel: inputTabelValue.value,
      }

      let users = JSON.parse(localStorage.getItem('users') || '[]')

      users.push(user)

      localStorage.setItem("users", JSON.stringify(users))
      if (data.access_token) {
        if (rememberMe.value) {
          localStorage.setItem("access_token", data.access_token)
        } else {
          sessionStorage.setItem("access_token", data.access_token)
        }
      }
  

      router.push("/about")
    } catch (error) {
      loginError.value = "Неверный логин или пароль"
    }
  }

  return {
    inputLoginValue,
    inputPasswordValue,
    inputTabelValue,
    handleLogin,
    rememberMe,
    loginError
  }
}
