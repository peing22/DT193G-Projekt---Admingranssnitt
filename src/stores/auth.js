import { defineStore } from 'pinia'
import router from '../router'

export const useAuthStore = defineStore('auth', {
    state: () => ({

        // Hämtar token från Local Storage
        token: JSON.parse(localStorage.getItem('token'))
    }),
    actions: {
        setToken(token) {

            // Sätter token för state
            this.token = token;

            // Lagrar token i Local Storage
            localStorage.setItem('token', JSON.stringify(token));

            // Skickar vidare till produktsidan
            router.push('/produkter');
        },
        async logoutUser() {

            // Loggar ut användare
            const resp = await fetch("http://127.0.0.1:8000/api/logout", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + this.token
                }
            });
            const data = await resp.json();

            // Sätter token för state till null
            this.token = null;

            // Tar bort token från Local Storage
            localStorage.removeItem('token');

            // Skickar vidare till startsidan
            router.push('/');
        }
    }
})