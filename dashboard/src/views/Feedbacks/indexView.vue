<template>
  <div class="flex justify-center w-full h-28 bg-brand-main">
    <HeaderLogged />
  </div>

  <div class="flex flex-col items-center justify-center bg-brand-gray h-64">
    <h1 class="text-4xl font-black text-center text-gray-800">Feedbacks</h1>
    <p class="text-lg text-center text-gray-800 font-regular">
      Detalhes de todos os feedbacks recebidos.
    </p>
  </div>

  <div class="flex justify-center w-full pb-20">
    <div class="w-4/5 max-w-6xl py-10 grid grid-cols-4 gap-2">
      <div>
        <h1 class="text-3xl font-black text-brand-darkgray">
          Listagem
        </h1>
        <suspense>
          <template #default>
            <Filters
            @select="changeFeedbacksType"
              class="mt-8 animate__animated animate__fadeIn animate__faster"
            />
          </template>
          <template #fallback>
            <FiltersLoading class="mt-8" />
          </template>
        </suspense>
      </div>

      <div class="px-10 pt-20 col-span-3">
        <p
          v-if="state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Aconteceu um erro ao carregar os feedbacks 😢
        </p>
        
        <p
          v-if="!state.feedbacks.length && !state.isLoading && !state.isLoadingFeedbacks && !state.hasError"
          class="text-lg text-center text-gray-800 font-regular"
        >
          Ainda nenhum feedback foi recebido. 🤓
        </p>

        <FeedbackCardLoading v-if="state.isLoading || state.isLoadingFeedbacks" />
        <FeedbackCard
          v-else
          v-for="(feedback, index) in state.feedbacks"
          :key="feedback.id"
          :isOpened="index === 0"
          :feedback="feedback"
          class="mb-8"
        />
         <FeedbackCardLoading v-if="state.isLoadingMoreFeedback" />
      </div>
    </div>
  </div>
</template>

<script>
import { onErrorCaptured, onMounted, onUnmounted, reactive } from "vue";
import Filters from "./Filters.vue";
import FiltersLoading from "./FiltersLoading.vue";
import HeaderLogged from "../../components/HeaderLogged";
import FeedbackCard from "../../components/FeedbackCard";
import FeedbackCardLoading from "@/components/FeedbackCard/Loading.vue";
import services from "@/services";

export default {
  components: {
    HeaderLogged,
    Filters,
    FiltersLoading,
    FeedbackCard,
    FeedbackCardLoading
  },

  setup() {
    const state = reactive({
      isLoadingMoreFeedback: false,
      isLoadingFeedbacks: false,
      isLoading: false,
      feedbacks: [],
      currentFeedBackType: "",
      pagination: {
        limit: 5,
        offset: 0,
        total: 0
      },
      hasError: false,
    });

    onErrorCaptured(handleErrors)

    onMounted(() => {
      fetchFeedbacks();
      window.addEventListener('scroll', handleScroll, false)
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll, false)
    })

    async function handleScroll(){
      const isBottomOfWindow = Math.ceil(
        document.documentElement.scrollTop + window.innerHeight
      ) >= document.documentElement.scrollHeight

      if(state.isLoading || state.isLoadingMoreFeedback) return;
      if(!isBottomOfWindow) return;
      if(state.feedbacks.length >= state.pagination.total) return;

      try {
        state.isLoadingMoreFeedback = true;
        const {data} = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedBackType,
          offset: (state.pagination.offset + 5)
        });

        if(data.results.length){
          state.feedbacks.push(...data.results)
        }

        state.isLoadingMoreFeedback = false;
        state.pagination = data.pagination;
      } catch (error) {
        state.isLoadingMoreFeedback = false;
        handleErrors(error);
      }
    }

    function handleErrors(error) {
      state.isLoadingMoreFeedback = false;
      state.isLoadingFeedbacks = false;
      state.isLoading = false;
      state.hasError = !!error;
    }

    async function changeFeedbacksType(type){
      try {
        state.isLoadingFeedbacks = true;
        state.pagination.limit = 5;
        state.pagination.offset = 0;
        state.currentFeedBackType = type;

        const {data} = await services.feedbacks.getAll({
          type,
          ...state.pagination
        });

        state.feedbacks = data.results;
        state.pagination = data.pagination;
        state.isLoadingFeedbacks = false;
      } catch (error) {
        handleErrors(error)
      }
    }

    async function fetchFeedbacks() {
      try {
        state.isLoading = true;
        const { data } = await services.feedbacks.getAll({
          ...state.pagination,
          type: state.currentFeedBackType,
        });

        state.feedbacks = data.results;
        console.log('array', state.feedbacks)
        state.pagination = data.pagination;
        state.isLoading = false;
      } catch (error) {
        handleErrors(error);
      }
    }

    return {
      state,
      changeFeedbacksType
    }
  }
}
</script>
