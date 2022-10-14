<template>
  <div class="flex justify-between" id="modal-login">
    <h1 class="text-4xl font-black text-gray-800">Entre na sua conta</h1>

    <button @click="close" class="text-4xl text-gray-600 focus:outline-none">
      &times;
    </button>
  </div>

  <div class="mt-16">
    <form @submit.prevent="handleSubmit">
      <label class="block">
        <span class="text-lg font-medium text-gray-800">E-mail</span>
        <input
          id="email-field"
          v-model="state.email.value"
          type="email"
          :class="{ 'border-brand-danger': !!state.email.errorMessage }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="email@email.com"
        />
        <span
          id="email-error"
          class="block font-medium text-brand-danger"
          v-if="!!state.email.errorMessage"
        >
          {{ state.email.errorMessage }}
        </span>
      </label>

      <label class="block mt-9">
        <span class="text-lg font-medium text-gray-800">Senha</span>
        <input
          id="password-field"
          v-model="state.password.value"
          type="password"
          :class="{ 'border-brand-danger': !!state.password.errorMessage }"
          class="block w-full px-4 py-3 mt-1 text-lg bg-gray-100 border-2 border-transparent rounded"
          placeholder="minhasenhasecreta"
        />
        <span
          class="block font-medium text-brand-danger"
          v-if="!!state.password.errorMessage"
        >
          {{ state.password.errorMessage }}
        </span>
      </label>

      <button
        id="submit-button"
        :disabled="state.isLoading"
        type="submit"
        :class="{ 'opacity-50': state.isLoading }"
        class="px-8 py-3 mt-10 text-2xl font-bold text-white rounded-full bg-brand-main focus:outline-none transition-all duration-150"
      >
        <Icon v-if="state.isLoading" class="animate-spin" name="loading" />
        <span v-else>ENTRAR</span>
      </button>
    </form>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useField } from "vee-validate";
import { useToast } from "vue-toastification";

import useModal from "@/hooks/useModal";
import services from "@/services";
import Icon from "@/components/Icon";
import { validateEmptyLength3 } from "@/utils/validators";
import { validateEmptyAndEmail } from "@/utils/validators";

export default {
  components: {
    Icon,
  },

  setup() {
    const toast = useToast();
    const router = useRouter();
    const modal = useModal();
    const { value: email, errorMessage: emailErrorMessage } = useField(
      "email",
      validateEmptyAndEmail
    );

    const { value: password, errorMessage: passwordErrorMessage } = useField(
      "password",
      validateEmptyLength3
    );

    const state = reactive({
      hasErrors: false,
      isLoading: false,
      email: {
        value: email,
        errorMessage: emailErrorMessage,
      },
      password: {
        value: password,
        errorMessage: passwordErrorMessage,
      },
    });

    async function handleSubmit() {
      try {
        toast.clear();
        state.isLoading = true;
        const { data, errors } = await services.auth.login({
          email: state.email.value,
          password: state.password.value,
        });
        if (!errors) {
          localStorage.setItem("token", data.token);
          state.isLoading = false;
          router.push({ name: "Feedbacks" });
          modal.close();
          return;
        }

        if (errors.status === 404) {
          toast.error("E-mail não encontrado.");
        }
        if (errors.status === 401) {
          toast.error("E-mail ou senha inválidos!");
        }
        if (errors.status === 400) {
          toast.error("Ocorreu um erro ao efetuar login.");
        }

        state.isLoading = false;
      } catch (error) {
        state.isLoading = false;
        state.hasErrors = !!error;
        toast.error("Ocorreu um erro ao efetuar login.");
      }
    }

    return {
      state,
      close: modal.close,
      handleSubmit,
    };
  },
};
</script>
