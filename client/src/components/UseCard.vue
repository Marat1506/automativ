<script setup lang="ts">
import { useAuth } from "@/composables/useAuth";
import { useLogin } from "@/composables/useLogin";
import { ref, watch } from "vue";

const props = defineProps<{
  user: { login: string; tabel: string };
}>();

const showForm = ref(false);


const { inputPasswordValue, handleLogin, loginError } = useLogin();

</script>

<template>
  <div>
    <div class="user-card" @click="showForm = !showForm">
    <img class="avatar" src="../assets/avatarka.png" alt="Аватар" />
    <div class="user-info">
      <span class="username">{{ user.login }}</span>
      <span class="user-id">{{ user.tabel }}</span>
    </div>
  </div>

  <transition name="slide">
    <div v-if="showForm" class="login-form">
      <label>
        Пароль
        <n-input
        v-model:value="inputPasswordValue"
        type="password"
        placeholder="Введите пароль"
        round
        clearable
      >
        
      </n-input>
      </label>
     
       <p v-if="loginError" class="error-text">{{ loginError }}</p>
      <n-button @click="handleLogin(user.login)" type="info" block round class="login-button">Войти</n-button>
    </div>
  </transition>
  </div>
  
</template>

<style scoped>
.user-card {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  padding: 10px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.username {
  font-size: 16px;
  font-weight: bold;
  color: black;
}

.user-id {
  font-size: 14px;
  color: gray;
}

.login-form {
  margin-top: 10px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}



.error-text{
  color: red;
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
