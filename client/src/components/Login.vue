<script setup lang="ts">
import router from '@/router'
import { useDataStore } from '@/stores/useDataStore'
import { onMounted, ref } from 'vue'
import {useAuth} from "../composables/useAuth"


const store = useDataStore()
const {
  inputLoginValue, 
  inputPasswordValue, 
  inputTabelValue, 
  handleLogin, 
  rememberMe, 
  loginError} = useAuth()

onMounted(async () => { 
    await store.loadTabelData()  
    await store.loadLoginData()
})

const showTabelDropdown = ref(false)
const showLoginDropdown = ref(false)


const selectTabel = (value: string) => {
  inputTabelValue.value = value
  showTabelDropdown.value = false
}

const selectLogin = (value: string) => {
  inputLoginValue.value = value
  showLoginDropdown.value = false
}



</script>

<template>
  <div class="container">
    <h2>Вход в ERP-систему</h2>
    <form class="login-form">
      <label>
        Табельный номер
        <n-popover trigger="manual" :show="showTabelDropdown" placement="bottom">
          <template #trigger>
            <n-input 
              v-model:value="inputTabelValue" 
              type="text" 
              placeholder="Введите табельный номер"
              @focus="showTabelDropdown = true" 
              @blur="setTimeout(() => showTabelDropdown = false, 200)"
            />
          </template>
          <div class="dropdown-content">
            <n-list hoverable>
              <n-list-item 
                v-for="item in store.tabel" 
                :key="item" 
                @mousedown="selectTabel(item)"
                class="dropdown-item"
              >
                {{ item }}
              </n-list-item>
            </n-list>
          </div>
        </n-popover>
      </label>
      <label>
        Логин
        <n-popover trigger="manual" :show="showLoginDropdown" placement="bottom">
          <template #trigger>
            <n-input 
              v-model:value="inputLoginValue" 
              type="text" 
              placeholder="Введите логин"
              @focus="showLoginDropdown = true" 
              @blur="setTimeout(() => showLoginDropdown = false, 200)"
            />
          </template>
          <div class="dropdown-content">
            <n-list hoverable>
              <n-list-item 
                v-for="item in store.logins" 
                :key="item" 
                @mousedown="selectLogin(item)"
                class="dropdown-item"
              >
                {{ item }}
              </n-list-item>
            </n-list>
          </div>
        </n-popover>
      </label>
      <label>
        Пароль
        <n-input v-model:value="inputPasswordValue" type="password" placeholder="Введите пароль" />
      </label>
      <n-checkbox v-model:checked="rememberMe">Запомнить меня</n-checkbox>
      <br />
      <p v-if="loginError" class="error-text">{{ loginError }}</p>
      <n-button @click="handleLogin">Войти</n-button>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}

.login-form {
  width: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.dropdown-content {
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%; 
  max-width: 500px;
}

.dropdown-item {
  padding: 8px;
  cursor: pointer;
}

.dropdown-item:hover {
  background: #f5f5f5;
}

.error-text{
  color: red;
}
</style>
