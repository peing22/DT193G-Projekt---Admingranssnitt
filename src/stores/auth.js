import { defineStore } from 'pinia'
import router from '../router'

export const useAuthStore = defineStore('auth', {
    state: () => ({

        // Hämtar token från Local Storage
        token: JSON.parse(localStorage.getItem('token')),
        name: JSON.parse(localStorage.getItem('name'))
    }),
    actions: {
        setUser(token, name) {

            // Sätter token och name för state
            this.token = token;
            this.name = name;

            // Lagrar token och name i Local Storage
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('name', JSON.stringify(name));

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

            // Sätter token och name för state till null
            this.token = null;
            this.name = null;

            // Tar bort token och name från Local Storage
            localStorage.removeItem('token');
            localStorage.removeItem('name');

            // Skickar vidare till startsidan
            router.push('/');
        }
    }
})