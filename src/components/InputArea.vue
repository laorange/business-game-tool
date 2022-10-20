<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{ value: string }>();
const emits = defineEmits(["update:value"]);

const valueLocal = computed<string>({
  get: () => props.value,
  set: (newValue) => emits("update:value", newValue),
});
</script>

<template>
  <n-form-item label="输入员工信息">
    <n-input
        v-model:value="valueLocal"
        :clearable="true"
        type="textarea"
        placeholder="输入员工信息，每行一个员工"
        :autosize="true"
    />
  </n-form-item>
</template>

<style scoped>

</style>
