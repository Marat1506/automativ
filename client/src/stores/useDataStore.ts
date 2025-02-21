// stores/useDataStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDataStore = defineStore('data', () => {
  const tabel = ref<string[]>([])
  const logins = ref<string[]>([])

  const loadTabelData = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/tabels')
      const data = await response.json()
      tabel.value = data
    } catch (error) {
      console.error('Error loading tabel data:', error)
    }
  }

  const loadLoginData = async () => {
    try {
      const response = await fetch('http://localhost:3000/users/logins')
      const data = await response.json()
      console.log("DATALOGIN = ", data)
      logins.value = data
    } catch (error) {
      console.error('Ошибка загрузки данных:', error)
    }
  }

  return { tabel, logins, loadTabelData, loadLoginData }
})
