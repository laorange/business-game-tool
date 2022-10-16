<script setup lang="ts">
import {computed} from "vue";
import {Department, DepartmentInfo, Level, Person, PersonSubject} from "../assets/types";

const props = defineProps<{ personStr: string }>();

const persons = computed<Person[]>(() => {
  return props.personStr.split(/\n/).filter(_ => !!_).map(row => {
    let infos = row.split(/\s/);
    return new Person(
        infos[1] as PersonSubject,
        infos[2] as Level,
        infos[3] as Department,
        parseInt(infos[5]));
  });
});

const deptInfoDict = computed(() => {
  let localInfo: DepartmentInfo = {};
  for (const person of persons.value) {
    if (!localInfo[person.dept]) {
      localInfo[person.dept] = {
        "研发能力": 0, "生产能力": 0, "销售能力": 0,
      };
    }
    if (person.subject == "研发人员") {
      localInfo[person.dept]["研发能力"] += person.ability;
    } else if (person.subject == "生产人员") {
      localInfo[person.dept]["生产能力"] += person.ability;
    } else if (person.subject == "销售人员") {
      localInfo[person.dept]["销售能力"] += person.ability;
    }
  }
  return localInfo;
});

defineExpose({
  parseDeptInfoDict: deptInfoDict,
  parsedPersons: persons,
});

</script>

<template>
  <div v-if="persons.length">当前共{{ persons.length }}个员工，其中
    A级{{ persons.filter(p => p.level === "A").length }}个，
    B级{{ persons.filter(p => p.level === "B").length }}个，
    C级{{ persons.filter(p => p.level === "C").length }}个，
    D级{{ persons.filter(p => p.level === "D").length }}个
  </div>

  <n-divider/>

  <!--  <div v-if="persons.length">-->
  <!--    <div v-for="[deptName, deptInfo] of Object.entries(deptInfoDict)">{{ deptName }}: {{ deptInfo }}</div>-->
  <!--  </div>-->
</template>

<style scoped>

</style>
