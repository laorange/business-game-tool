<script setup lang="ts">
import PERSON_ABILITY from "../assets/PERSON_ABILITY.json";
import {computed, ref, watch} from "vue";
import {AbilityCode, Department, Level, Person} from "../assets/types";

const props = withDefaults(defineProps<{
  initNumber: number,
  existingPersons: Person[],
  subject: AbilityCode,
  dept: Department
}>(), {initNumber: 0});

const levels: Level[] = ["A", "B", "C", "D"];

const abilityDict = {
  A: PERSON_ABILITY["A"][props.dept][props.subject] as number,
  B: PERSON_ABILITY["B"][props.dept][props.subject] as number,
  C: PERSON_ABILITY["C"][props.dept][props.subject] as number,
  D: PERSON_ABILITY["D"][props.dept][props.subject] as number,
};

const totalNumber = ref<number>(0);
watch(() => props.initNumber, (newInitValue: number) => totalNumber.value = newInitValue, {immediate: true});

const requireNumber = computed<number>(() => totalNumber.value - props.initNumber);
const actionName = computed<string>(() => requireNumber.value >= 0 ? "招聘" : "裁员");

const changeDescription = computed<string>(() => {
  const sign = requireNumber.value >= 0 ? `+` : `-`;
  return `${sign}${Math.abs(requireNumber.value)}`;
});

function getPersonNumOfLevel(level: Level): number {
  return props.existingPersons.filter(p => p.level === level).length;
}

const abilityDescription = computed<string>(() => levels.map(l => [l, abilityDict[l]]).filter(l => !!l[1]).map(l => `${l[0]}=${l[1]}`).join(", "));

const existingPersonNumDescription = computed<string>(() => levels.filter(l => getPersonNumOfLevel(l)).map(l => `${l}×${getPersonNumOfLevel(l)}`).join(", "));

const requirement = computed<string>(() => {
  let requirementList: number[] = [];

  levels.map((l) => abilityDict[l]).reduce((remains, ability, currentIndex) => {
    let num = ability > 0 ? Math.floor(remains / ability) : 0;
    let newRemains = remains - ability * num;

    // (如果现在有剩余 && (没有下一级能力 || 当前剩余>(当前能力+下一级能力)/2) => 多+1
    if (newRemains && (!levels[currentIndex + 1] || abilityDict[levels[currentIndex + 1]] === 0 || newRemains > (ability + abilityDict[levels[currentIndex + 1]]) / 2)) {
      num += 1;
      newRemains = 0;
    }

    requirementList.push(num);
    return newRemains;
  }, Math.abs(requireNumber.value));

  return requirementList.map((r, i) => r > 0 ? `${levels[i]}×${r}` : "").filter(_ => !!_).join(", ");
});
</script>

<template>
  <n-space :vertical="true" justify="center" align="center">

    <div class="ability-info">
      <span>该部门各级员工能力：{{ abilityDescription }}</span>
    </div>

    <div v-if="existingPersonNumDescription">
      现有员工：{{ existingPersonNumDescription }}（现有能力={{ props.initNumber }}）
    </div>
    <div v-else>该部门暂无员工</div>

    <n-input-number v-model:value="totalNumber" :show-button="false" placeholder="输入数值" clearable :default-value="0">
      <template #prefix>
        调整能力为：
      </template>
    </n-input-number>

    <div v-if="requireNumber!==0" class="advice-area">
      <div>能力变动：{{ changeDescription }}</div>
      <div>建议{{ actionName }}：{{ requirement }}</div>
    </div>
  </n-space>
</template>

<style scoped>
.ability-info {
  font-size: 0.8em;
  color: #999;
  cursor: help;
}

.advice-area {
  color: blue;
}
</style>
