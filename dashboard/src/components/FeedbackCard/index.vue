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
      {{feedback.text}}
    </div>
  </div>
</template>

<script>
import Badge from "./Badge";
import { getDiffTimeBetweenCurrentDate } from "../../utils/date";
export default {
  components: {
    Badge,
  },
  props: {
    feedback: {
      type: Object,
      required: true,
    },
  },
  setup() {
    function handleToggle() {}

    return {
      handleToggle,
      getDiffTimeBetweenCurrentDate,
    };
  },
};
</script>
