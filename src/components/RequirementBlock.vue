<script setup lang="ts">
import {Level, Direction, Person, Production, levels} from "../assets/ts/personUtils.ts";
import {useStore} from "../store/useStore.ts";
import {computed, provide} from "vue";
import CurrentInfo from "./CurrentInfo.vue";
import AbilityInputArea from "./AbilityInputArea.vue";

const store = useStore();

const props = defineProps<{
  direction: Direction,
  production: Production,
}>();

const personsOfThisBlock = computed<Person[]>(() => {
  return store.persons.filter(p => p.direction === props.direction && p.production === props.production);
});

export type AbilityDict = { [level: Level]: number }
const abilityDict = computed<AbilityDict>(() => {
  let _abilityDict: AbilityDict = {
    "A": 0,
    "B": 0,
    "C": 0,
    "D": 0,
  };
  for (const level of levels) {
    _abilityDict[level] = (new Person(props.production, props.direction, level)).getAbility();
  }
  return _abilityDict;
});

const totalAbility = computed<number>(() => {
  return personsOfThisBlock.value.map(p => p.getAbility()).reduce((a, b) => a + b, 0);
});

provide("totalAbility", totalAbility);
provide("abilityDict", abilityDict);
</script>

<template>
  <div class="requirement-block">
    <div class="flex flex-wrap space-x-2 text-xs text-gray-400">
      该部门各级员工能力：
      <div v-for="[level, ability] of Object.entries(abilityDict)">{{ level }}={{ ability }}</div>
    </div>

    <CurrentInfo v-if="personsOfThisBlock.length>0" :persons="personsOfThisBlock"/>

    <AbilityInputArea :ability-now="totalAbility"/>
  </div>

</template>

<style scoped>
.requirement-block {
  @apply w-full h-full flex flex-col justify-center items-center p-2 text-center space-y-2;
}
</style>
