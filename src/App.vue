<script setup lang="ts">
import InputArea from "./components/InputArea.vue";
import {ref} from "vue";
import StuffParser from "./components/StuffParser.vue";
import RequirementParser from "./components/RequirementParser.vue";
import CopyrightDiv from "./components/CopyrightDiv.vue";
import Initiator from "./components/Initiator.vue";
import {useStore} from "./pinia/useStore";

const store = useStore()

const stuffParser = ref<typeof StuffParser>();
</script>

<template>
  <Initiator/>

  <main>
    <h1>人力资源管理智能仿真与竞赛-计算工具</h1>
    <InputArea v-model:value="store.localConfig.personStr"/>
    <StuffParser :person-str="store.localConfig.personStr" ref="stuffParser"/>
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
