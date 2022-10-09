<template>
  <div
    class="flex flex-col rounded cursor-pointer px-8 py-6 bg-brand-gray"
    @click="handleToggle"
  >
    <div class="flex items-center justify-between w-full mb-8">
      <Badge :type="feedback.type" />
      <span class="font-regular text-brand-graydark">
        {{ getDiffTimeBetweenCurrentDate(feedback.createdAt) }}
      </span>
    </div>

    <div class="text-lg font-medium text-gray-800">
      {{ feedback.text }}
    </div>

    <div
      class="flex mt-8 animate__animated animate__fadeInUp animate__faster"
      v-if="state.isOpen"
    >
      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none"
            >Página</span
          >
          <span class="font-medium text-gray-700">{{ feedback.page }}</span>
        </div>
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">Dispositivo</span>
          <span class="font-medium text-gray-700">{{ feedback.device }}</span>
        </div>
      </div>

      <div class="flex flex-col w-1/2">
        <div class="flex flex-col">
          <span class="font-bold text-gray-400 uppercase select-none">Usuário</span>
          <span class="font-medium text-gray-700">{{ feedback.fingerprint }}</span>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8" v-if="!state.isOpen">
      <Icon name="chevron-down" size="24" :color="brandColors.graydark" />
    </div>
  </div>
</template>

<script>
import Icon from '../Icon';
import Badge from "./Badge";
import { getDiffTimeBetweenCurrentDate } from "../../utils/date";
import palette from '../../../palette';
import reactive from 'vue';

export default {
  components: {
    Badge,
    Icon
  },
  props: {
    feedback: {
      type: Object,
      required: true,
    },
    isOpened: {
      type: Boolean,
      default: false
    },
  },
  setup(props) {
    const state = reactive({
      isOpen: props.isOpened
    })
    function handleToggle() {
      state.isOpen = !state.isOpen;
    }

    return {
      handleToggle,
      getDiffTimeBetweenCurrentDate,
      brandColors: palette.brand
    };
  },
};
</script>
