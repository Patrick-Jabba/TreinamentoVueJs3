<template>
  <ModalFactory />
  <RouterView/>
</template>

<script>
import { watch } from "vue";
import services from "./services";
import { useRoute, useRouter } from "vue-router";
import ModalFactory from "./components/ModalFactory";
import { setCurrentUser } from "./store/user";

export default {
  components: { 
    ModalFactory 
  },

  setup() {
    const router = useRouter();
    const route = useRoute();

    watch(() => route.path, async () => {
      if (route.meta.requiresAuth) {
        const token = localStorage.getItem('token')
        if (!token) {
          router.push({ name: 'Home' })
          return
        }
        const { data } = await services.users.getMe();
        setCurrentUser(data);
        }
      });
  },
};
</script>
