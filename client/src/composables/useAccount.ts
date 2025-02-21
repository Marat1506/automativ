import { ref, computed } from 'vue';
import { useDataStore } from '../stores/useDataStore';

export function useAccounts() {
  const store = useDataStore();
  const users = ref<{ login: string; tabel: string }[]>([]);
  const inputAccountValue = ref("");
  const showAccountDropdown = ref(false);

  const availableLogins = computed(() => {
    return store.logins.filter(login => !users.value.some(user => user.login === login));
  });

  const addAccount = async (login: string) => {
    if (!login) return;
    try {
      inputAccountValue.value = "";
      const response = await fetch(`http://localhost:3000/users/find?login=${login}`);
      const data = await response.json();

      users.value.push({ login: data.login, tabel: data.tabel });

      localStorage.setItem('users', JSON.stringify(users.value));

    } catch (error) {
    }
  };

  const selectAccount = (value: string) => {
    inputAccountValue.value = value;
    showAccountDropdown.value = false;
  };

  return {
    users,
    inputAccountValue,
    showAccountDropdown,
    availableLogins,
    addAccount,
    selectAccount
  };
}
