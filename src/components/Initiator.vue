<script setup lang="ts">
import {onBeforeMount, watch} from "vue";
import {useStore} from "../pinia/useStore";

import {useStorage} from "vue3-storage";
import {LocalConfig} from "../assets/types";

const store = useStore();
const storage = useStorage();
const LOCAL_CONFIG_STORAGE_KEY = "local_config";


const initiators = {
  localStorage() {
    // 从 localStorage 读取本地设置
    let localConfig = storage.getStorageSync<LocalConfig>(LOCAL_CONFIG_STORAGE_KEY);

    store.localConfig = {...store.localConfig, ...localConfig} ?? store.localConfig;
  },
};


onBeforeMount(async () => {
  initiators.localStorage();
});

watch(() => store.localConfig, (newConfig) => {
  // 向 localStorage 存入本地设置
  storage.setStorageSync(LOCAL_CONFIG_STORAGE_KEY, newConfig);
}, {deep: true});
</script>

<template>

</template>

<style scoped>

</style>
