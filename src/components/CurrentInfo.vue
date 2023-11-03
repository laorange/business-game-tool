<script setup lang="ts">
import {Level, Person, levels} from "../assets/ts/personUtils.ts";
import {inject, Ref} from "vue";

const props = defineProps<{
  persons: Person[]
}>();

function getPersonOfThisLevel(level: Level): Person[] {
  return props.persons.filter(p => p.level === level);
}

const totalAbility = inject("totalAbility") as Ref<number>;
</script>

<template>
  <div class="flex flex-wrap space-x-2 text-xs justify-center">现有员工：
    <template v-for="level of levels">
      <div v-if="getPersonOfThisLevel(level).length">{{ level }}×{{ getPersonOfThisLevel(level).length }}</div>
    </template>
    <div>(现有能力：{{ totalAbility }})</div>
  </div>
</template>

<style scoped>

</style>
