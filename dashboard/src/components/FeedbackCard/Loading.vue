<template>
  <ContentLoader
    class="flex flex-col rounded items-center"
    width="100%"
    height="300px"
  >
    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animationDuration="2s"
     />
    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animationDuration="2.3s"
     />
    <ContentLoader
      class="mt-3 rounded"
      width="90%"
      height="90px"
      animationDuration="2.7s"
     />
  </ContentLoader>
</template>

<script>
import ContentLoader from "../ContentLoader";
export default {
  components: {
    ContentLoader,
  },
};
</script>