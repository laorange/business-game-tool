<script setup lang="ts">
import {computed, inject, provide, Ref, ref} from "vue";
import {AbilityDict} from "./RequirementBlock.vue";
import {Level, levels} from "../assets/ts/personUtils.ts";

const props = defineProps<{
  abilityNow: number
}>();

const abilityValue = ref(props.abilityNow);
const changedValue = computed<number>(() => abilityValue.value - props.abilityNow);

const abilityDict = inject("abilityDict") as Ref<AbilityDict>;

// 该部门最低的能力等级 （低于该等级的员工，在该岗位的能力值为0）
const thresholdLevel = computed<Level>(() => {
  for (const [index, level] of levels.entries()) {
    if (abilityDict.value[level] === 0) return levels[index - 1];
  }
  return levels[levels.length - 1];
});

type Solution = { [level: string]: number }
const bestSolution = computed<Solution>(() => {
  let _solution: Solution = {};

  let remains = changedValue.value;
  for (const level of levels) {
    let ability = abilityDict.value[level];
    let num = ability > 0 ? Math.floor(remains / ability) : 0;
    let newRemains = remains - ability * num;

    // (如果现在有剩余 && (没有下一级能力 || 当前剩余>(当前能力+下一级能力)/2) => 多+1
    if (newRemains && (!Object.keys(abilityDict)[Object.keys(abilityDict).indexOf(level) + 1] || abilityDict[Object.keys(abilityDict)[Object.keys(abilityDict).indexOf(level) + 1]] === 0 || newRemains > (ability + abilityDict[Object.keys(abilityDict)[Object.keys(abilityDict).indexOf(level) + 1]]) / 2)) {
      num += 1;
      newRemains = 0;
    }

    _solution[level] = num;
    remains = newRemains;
  }

  if (remains > 0) {
    _solution[thresholdLevel.value] += 1;
  }

  return _solution;
});

provide("bestSolution", bestSolution);
</script>

<template>
  <n-input-number v-model:value="abilityValue" :show-button="false" placeholder="输入数值" clearable :default-value="0">
    <template #prefix>
      调整能力为：
    </template>
  </n-input-number>

  {{ bestSolution }}
</template>

<style scoped>

</style>
