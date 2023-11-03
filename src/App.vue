<script setup lang="ts">
import UserInputArea from "./components/UserInputArea.vue";
import DetailBoard from "./components/DetailBoard.vue";
</script>

<template>
  <main class="w-full p-4 flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold">人力资源管理智能仿真与竞赛 计算工具</h1>

    <UserInputArea/>

    <DetailBoard/>
  </main>
</template>

<style scoped></style>
