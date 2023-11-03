<script setup lang="ts">
import RequirementBlock from "./RequirementBlock.vue";
import StuffParser from "./components/StuffParser.vue";
import {computed} from "vue";
import {AbilityCode, AbilityDict, Department, DepartmentInfo, Person} from "../assets/types";

const props = defineProps<{ stuffParserExpose: (any | typeof StuffParser) }>();

const deptList: Department[] = ["P1", "P2", "P3", "P4"];
const abilityNames = [`研发能力`, `生产能力`, `销售能力`] as (keyof AbilityDict)[];

function getAbilityCode(abilityName: keyof AbilityDict): AbilityCode {
  switch (abilityName) {
    case "研发能力":
      return "研发";
    case "生产能力":
      return "生产";
    case "销售能力":
      return "销售";
  }
}

const deptInfoDict = computed<DepartmentInfo>(() => props.stuffParserExpose?.parseDeptInfoDict);
const persons = computed<Person[]>(() => props.stuffParserExpose?.parsedPersons);

function getInitNumber(dept: Department, abilityName: keyof AbilityDict) {
  if (!deptInfoDict.value) return 0;
  let deptInfo = deptInfoDict.value[dept];
  if (!deptInfo) return 0;
  return deptInfo[abilityName] ?? 0;
}

function getCorrespondPersons(dept: Department, abilityName: keyof AbilityDict): Person[] {
  if (!persons.value) return [];
  return persons.value.filter(p => p.dept === dept && p.subject === abilityName.replace("能力", "人员"));
}
</script>

<template>
  <n-grid cols="7" x-gap="2" y-gap="2">
    <n-gi></n-gi>
    <n-gi span="2">研发</n-gi>
    <n-gi span="2">生产</n-gi>
    <n-gi span="2">销售</n-gi>
    <template v-for="dept in deptList">
      <n-gi>{{ dept }}</n-gi>
      <n-gi span="2" v-for="abilityName in abilityNames">
        <RequirementBlock :init-number="getInitNumber(dept, abilityName)"
                          :existing-persons="getCorrespondPersons(dept, abilityName)"
                          :dept="dept" :subject="getAbilityCode(abilityName)"/>
      </n-gi>
    </template>
  </n-grid>
</template>

<style scoped>
.n-grid > * {
  border: #1a1a1a 1px solid;
  padding: 30px 0;
}
</style>
