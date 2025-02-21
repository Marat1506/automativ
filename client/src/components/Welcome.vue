<script setup lang="ts">
import { useRouter } from 'vue-router'
import UseCard from './UseCard.vue';
import router from '../router';
import { useDataStore } from '../stores/useDataStore';
import { computed, onMounted, ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useAccounts } from '../composables/useAccount';

const store = useDataStore()
const { 
  users, 
  inputAccountValue, 
  showAccountDropdown, 
  availableLogins, 
  addAccount, 
  selectAccount 
} = useAccounts();

const {inputLoginValue, inputPasswordValue, handleLogin, rememberMe} = useAuth()


onMounted(async () => {
    await store.loadTabelData()  
    await store.loadLoginData()

    const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    users.value = JSON.parse(storedUsers); 
  }
})



</script>

<template>
<div class="container">
<div class="login-form">
    <img src="../assets/logo.png" width="50px" height="50px"/>
    <h3>Вход в ERP-систему</h3>
    <h1>С возвращением!</h1>

    <div class="input-wrapper">
        <button class="add-btn" @click="addAccount(inputAccountValue)">+</button>
        <n-popover trigger="manual" :show="showAccountDropdown" placement="bottom">
          <template #trigger>
            <input 
              v-model="inputAccountValue" 
              type="text" 
              placeholder="Добавить аккаунт" 
              @focus="showAccountDropdown = true" 
              @blur="setTimeout(() => showAccountDropdown = false, 200)"
            />
          </template>
          <div class="dropdown-content">
            <n-list hoverable>
              <n-list-item 
                v-for="item in availableLogins" 
                :key="item" 
                @mousedown="selectAccount(item)"
                class="dropdown-item"
              >
                {{ item }}
              </n-list-item>
            </n-list>
          </div>
        </n-popover>
    </div>

    <div class="users-list">
  <div v-for="user in users" :key="user.login" class="user-wrapper">
    <UseCard :user="user" />
  </div>
</div>
    
     
</div>
 
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
  color: white;
  
}

.login-form {
  width: 500px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: linear-gradient(to bottom, 
    rgba(161, 194, 255, 1), 
    rgba(117, 163, 251, 1), 
    rgba(71, 129, 238, 1)
  );
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.input-wrapper {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  padding: 5px;
  width: 100%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.add-btn {
  border: none;
  background: white;
  color: gray;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

input {
  border: none;
  background: transparent;
  flex-grow: 1;
  font-size: 16px;
  color: gray;
  outline: none;
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

.users{
    width: 450px;
}
.users-list {
  width: 450px;
  max-height: 240px; 
  overflow-y: auto; 
  padding-right: 5px; 
  display: flex;
  flex-direction: column;
  gap: 10px; 
}

.users-list::-webkit-scrollbar {
  width: 6px;
}

.users-list::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
</style>