<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged />
  </div>

  <div class="flex flex-col items-center justify-center bg-brand-gray h-64">
    <h1 class="text-4xl font-black text-center text-gray-800">Credenciais</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Guia de instalação e geração de suas credenciais
    </p>
  </div>

  <div class="flex justify-center w-full h-full">
    <div class="flex flex-col w-4/5 max-w-6xl py-10">
      <h1 class="text-3xl font-black text-gray-800">
        Instalação e configuração
      </h1>
      <p class="mt-10 text-lg text-gray-800 font-regular">
        Este aqui é a sua chave de api
      </p>

      <div
        class="flex py-3 pl-5 mt-2 w-1/2 rounded items-center text-gray-800 bg-brand-gray"
      >
        <span>{{ apiKey }}</span>
        <div class="flex ml-20 mr-1">
          <Icon
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <Icon
            name="loading"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer ml-3"
          />
        </div>
      </div>

      <p class="mt-5 text-lg text-gray-800 font-regular">
        Coloque o script abaixo no seu site para começar a receber feedbacks
      </p>

      <div 
      class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-2/3 overflow-x-scroll"      
      >
        <pre>&lt;script src="https://patrick-jabba-feedbacker-widget.netlify.app?api_key={{apiKey}}"&gt;&lt;/script&gt;
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import useStore from "@/hooks/useStore";
import HeaderLogged from "../../components/HeaderLogged";
import palette from "../../../palette";
import Icon from "../../components/Icon";

import { computed } from "vue";

export default {
  components: {
    HeaderLogged,
    Icon,
  },

  setup() {
    const store = useStore("User");

    const apiKey = computed(() => {
      return `${store.currentUser.apiKey}`;
    });

    return {
      store,
      apiKey,
      brandColors: palette.brand,
    };
  },
};
</script>

<style></style>
