import { defineStore } from 'pinia';
import {Person} from "../assets/ts/personUtils.ts";

type State = {
  persons: Person[];
};

export const useStore = defineStore('store', {
  state: (): State => {
    return {
      persons: [],
    };
  },
  getters: {},
  actions: {},
});
