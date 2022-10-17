<template>
  <ContentLoader
    class="flex flex-col items-center rounded"
    width="100%"
    height="300px"
  >
    <ContentLoader
      width="90%"
      height="50px"
      class="mt-3 rounded"
      animationDuration="2s"
    />
    <ContentLoader
      width="80%"
      height="50px"
      class="mt-3 rounded"
      animation-duration="2.3s"
    />
    <ContentLoader
      class="mt-3 rounded"
      width="80%"
      height="50px"
      animation-duration="2.7s"
    />
    <ContentLoader
      class="mt-3 rounded"
      width="80%"
      height="50px"
      animation-duration="2.9s"
    />
  </ContentLoader>
</template>

<script>
import ContentLoader from "../../components/ContentLoader";

export default {
  components: {
    ContentLoader,
  },
};
</script>
