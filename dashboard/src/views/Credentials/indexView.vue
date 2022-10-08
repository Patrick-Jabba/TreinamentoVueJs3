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

      <ContentLoader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50"
      />

      <div
        v-else
        class="flex py-3 pl-5 mt-2 w-full lg:w-1/2 rounded justify-between items-center text-gray-800 bg-brand-gray"
      >
        <span v-if="state.hasError">Erro ao carregar a apiKey</span>
        <span v-else>{{ apiKey }}</span>
        <div v-if="!state.hasError" class="flex ml-20 mr-5">
          <Icon
            @click="handleCopy"
            name="copy"
            :color="brandColors.graydark"
            size="24"
            class="cursor-pointer"
          />
          <Icon
            @click="handleGenerateApiKey"
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

      <ContentLoader
        v-if="store.Global.isLoading || state.isLoading"
        class="rounded"
        width="600px"
        height="50"
      />

      <div
        v-else
        class="py-3 pl-5 pr-20 mt-2 rounded bg-brand-gray w-full lg:w-2/3 overflow-x-scroll"
      >
        <span v-if="state.hasError">Erro ao carregar o script</span>
        <pre v-else>&lt;script src="https://patrick-jabba-feedbacker-widget.netlify.app?api_key={{apiKey}}"&gt;&lt;/script&gt;
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, watch } from "vue";

import services from "../../services";
import { setApiKey } from "@/store/user";
import useStore from "@/hooks/useStore";

import Icon from "../../components/Icon";
import HeaderLogged from "../../components/HeaderLogged";
import ContentLoader from "../../components/ContentLoader";

import palette from "../../../palette";
import { useToast } from 'vue-toastification';

export default {
  components: {
    Icon,
    HeaderLogged,
    ContentLoader,
  },

  setup() {
    const toast = useToast();
    const store = useStore();
    const state = reactive({
      isLoading: false,
      hasError: false,
    });

    const apiKey = computed(() => {
      return `${store.User.currentUser.apiKey}`;
    });

    watch(() => store.Global.isLoading, () => {
        if (!apiKey.value) {
          handleError(true);
        }
      }
    );

    function handleError(error) {
      state.isLoading = false;
      state.hasError = !!error;
    }

    async function handleGenerateApiKey() {
      try {
        state.isLoading = true;
        const { data } = await services.users.generateApiKey();

        setApiKey(data.apiKey);
        state.isLoading = false;
      } catch (error) {
        handleError(error);
      }
    }

    async function handleCopy() {
      toast.clear();
      try {
        await navigator.clipboard.writeText(apiKey.value)
        toast.success('Copiado!');
      }
      catch(error){
        handleError(error)
      }
    }

    return {
      state,
      store,
      apiKey,
      brandColors: palette.brand,
      handleGenerateApiKey,
      handleError,
      handleCopy
    };
  },
};
</script>

<style></style>
