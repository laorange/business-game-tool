<script setup lang="ts">
import {useStore} from "../pinia/useStore";

const store = useStore();
</script>

<template>
  <n-form-item label="输入员工信息">
    <n-input
        v-model:value="store.localConfig.personStr"
        :clearable="true"
        type="textarea"
        placeholder="输入员工信息，每行一个员工"
        :autosize="true"
    />
  </n-form-item>
</template>

<style scoped>

</style>
