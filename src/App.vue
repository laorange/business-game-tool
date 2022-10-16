<script setup lang="ts">

import InputArea from "./components/InputArea.vue";
import {ref} from "vue";
import StuffParser from "./components/StuffParser.vue";
import RequirementParser from "./components/RequirementParser.vue";
import CopyrightDiv from "./components/CopyrightDiv.vue";

const personStr = ref<string>("");

const stuffParser = ref<typeof StuffParser>();
</script>

<template>
  <main>
    <h1>人力资源管理智能仿真与竞赛-计算工具</h1>
    <InputArea v-model:value="personStr"/>
    <StuffParser :person-str="personStr" ref="stuffParser"/>
    <RequirementParser :stuff-parser-expose="stuffParser"/>
  </main>

  <CopyrightDiv project-url="https://github.com/laorange/business-game-tool/"/>
</template>

<style scoped>
main {
  margin: 10px 30px;
  text-align: center;
}
</style>
