import {defineStore} from "pinia";
import {StoreState} from "../assets/types";

export const useStore = defineStore("store", {
    state: (): StoreState => {
        return {
            localConfig: {
                personStr: "",
            },
        };
    },
    getters: {},
    actions: {},
});
