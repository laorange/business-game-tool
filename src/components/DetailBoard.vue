<script setup lang="ts">
import {directions, productions} from "../assets/ts/personUtils.ts";
import RequirementBlock from "./RequirementBlock.vue";
</script>

<template>
  <div class="detail-board">
    <div class="board-row">
      <div class="pre-col">&nbsp;</div>
      <div class="main-col" v-for="d of directions" :key="d">{{ d }}</div>
    </div>

    <div class="board-row" v-for="p of productions" :key="p">
      <div class="pre-col">{{ p }}</div>
      <div class="main-col" v-for="d of directions" :key="d">
        <RequirementBlock :direction="d" :production="p"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-board {
  @apply w-full flex flex-col justify-center items-center p-8 text-center;
}

.board-row {
  @apply w-full flex justify-between;
}

.pre-col, .main-col {
  @apply border border-gray-400 border-solid flex justify-center items-center;
}

.pre-col {
  @apply w-16
}

.main-col {
  @apply flex-1 flex-col ;
}
</style>
