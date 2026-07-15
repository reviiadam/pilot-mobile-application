import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    username: ''
  }),
  actions: {
    login(username: string, _password: string) {
      this.isAuthenticated = true
      this.username = username
      return true
    },
    logout() {
      this.isAuthenticated = false
      this.username = ''
    }
  }
})
