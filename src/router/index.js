import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductView from '../views/ProductView.vue'
import AdminView from '../views/AdminView.vue'
import { useAuthStore } from '../stores/auth'

// Skapar routes till respektive vy
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/produkter',
      name: 'produkter',
      component: ProductView,
      meta: { requiresAuth: true }
    },
    {
      path: '/administrera',
      name: 'administrera',
      component: AdminView,
      meta: { requiresAuth: true }
    }
  ]
});

// Skyddar vissa vyer genom att kräva autentisering
router.beforeEach((to, from, next) => {

  // Lagrar token i variabel
  let token = useAuthStore().$state.token;

  // Om krav finns på autentisering och token är null
  if (to.meta.requiresAuth && token == null) {

    // Omdirigerar till startsidan
    next('/');

  // Fortsätter till nästa route
  } else {
    next();
  }
});

export default router