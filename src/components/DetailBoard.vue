<script setup lang="ts">
import {Direction, Level, Production} from "../assets/ts/personUtils.ts";

const directions: Direction[] = ["研发", "生产", "销售"];
const productions: Production[] = ["P1", "P2", "P3", "P4"];
const level: Level[] = ["A", "B", "C", "D"];
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
        {{ p }}-{{ d }}-{{ level }}
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
  @apply border border-gray-400 border-solid h-full flex justify-center items-center;
}

.pre-col {
  @apply w-16
}

.main-col {
  @apply flex-1 flex-col;
}
</style>
