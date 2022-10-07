<template>
<div class="flex items-center justify-between w-4/5 max-w-6xl py-10">
<div class="w-28 lg:w-36">
  <img class="w-full" src="../../assets/images/logo_white.png" alt="logo">
</div>

<div class="flex">
  <ul class="flex list-none">
    <li
    @click="() => router.push({name: 'Credentials'})" 
    class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
    >
      Credenciais
    </li>

    <li
    @click="() => router.push({name: 'Feedbacks'})" 
    class="px-6 py-2 mr-2 font-bold text-white rounded-full cursor-pointer focus:outline-none"
    >
      Feedbacks
    </li>

    <li
    @click="handleLogout"
    class="px-6 py-2 font-bold text-brand-main bg-white rounded-full cursor-pointer focus:outline-none"
    >
      {{logoutLabel}}
    </li>
  </ul>
</div>
</div>  
</template>

<script>
import useStore from '@/hooks/useStore';
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { cleanCurrentUser } from '@/store/user';

export default {
  setup() {
    const router = useRouter();
    const store = useStore('User');

    const logoutLabel = computed(() =>{
      if(!store.currentUser.name){
        return '...'
      }
      return `${store.currentUser.name} (sair)`
    });

    function handleLogout() {
      localStorage.removeItem('token');
      router.push({name: 'Home'});
      cleanCurrentUser
    }


    return {
      router,
      store,
      logoutLabel,
      handleLogout
    }
  }
}
</script>
