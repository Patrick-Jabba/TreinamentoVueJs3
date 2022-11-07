<template>
  <Teleport to="body">
    <Component @openBox="handleOpenBox" @closeBox="handleCloseBox" :is="state.component" />
  </Teleport>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import Standby from "./Standby.vue";
import Box from "./Box.vue"; 

type State = {
  component: string;
}

interface SetupReturn {
  state: State;
  handleOpenBox(): void;
  handleCloseBox(): void;
}

export default defineComponent({
    components: {
      Standby,
      Box
    },

    setup(): SetupReturn{
      const state = reactive<State>({
        component: "Standby"
      })

      function handleOpenBox():void{
        state.component = 'Box'
      }

      function handleCloseBox():void{
        state.component = 'Standby'
      }
      return {
        state,
        handleOpenBox,
        handleCloseBox
      }
    }
})
</script>