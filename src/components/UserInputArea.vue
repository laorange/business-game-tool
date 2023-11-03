<script setup lang="ts">
import {ref, watch} from "vue";
import {Person} from "../assets/ts/personUtils.ts";
import {useStore} from "../store/useStore.ts";

const store = useStore();

const demoUserInputStr = `(以下仅为示例数据；请从系统中的“总经理办公室”-“公司员工”中复制)
Y53096 研发人员 C P2 3 6 已培训 从 第5年第3期 到 第6年第4期
Y53095 研发人员 C P2 3 6 已培训 从 第5年第3期 到 第6年第4期
Y53091 研发人员 C P2 3 6 已培训 从 第5年第3期 到 第6年第4期
Y53089 研发人员 B P2 6 15 已培训 从 第5年第3期 到 第6年第4期
X23120 销售人员 B P1 6 36 已培训 从 第2年第3期 到 第6年第4期
X13023 销售人员 D P1 1 6 已培训 从 第1年第3期 到 第6年第4期
S53135 生产人员 D P1 1 1 已培训 从 第5年第3期 到 第6年第4期
S53130 生产人员 D P1 1 1 已培训 从 第5年第3期 到 第6年第4期
S53123 生产人员 A P3 10 6 已培训 从 第5年第3期 到 第6年第4期`;

const userInputStr = ref(demoUserInputStr);
watch(() => userInputStr.value, () => store.persons = Person.parseStr(userInputStr.value));
</script>

<template>
  <div class="user-input-area">
    <n-input
        v-model:value="userInputStr"
        :clearable="true"
        type="textarea"
        placeholder="在此输入员工信息，每行一个员工"
        :autosize="true"
    />
  </div>
</template>

<style scoped>
.user-input-area {
  @apply w-full flex flex-col justify-center items-center p-8 text-center;
}
</style>
