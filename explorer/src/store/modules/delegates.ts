/* tslint:disable:no-shadowed-variable */
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { IDelegate, IDelegateState, IStorePayload } from "../../interfaces";
import * as types from "../mutation-types";

const namespaced = true;
const state: IDelegateState = {
  delegates: null,
  forged: [],
};

const actions: ActionTree<IDelegateState, {}> = {
  setDelegates: ({ commit }, { delegates, timestamp }) => {
    localStorage.setItem("delegates", JSON.stringify(delegates));
    localStorage.setItem("delegatesFetchedAt", timestamp);

    commit({
      type: types.SET_DELEGATES,
      value: delegates,
    });
  },

  setForged: ({ commit }, value: string) => {
    commit({
      type: types.SET_FORGED,
      value,
    });
  },
};

const mutations: MutationTree<IDelegateState> = {
  [types.SET_DELEGATES](state, payload: IStorePayload) {
    state.delegates = payload.value;
  },
  [types.SET_FORGED](state, payload: IStorePayload) {
    state.forged = payload.value;
  },
};

const getters: GetterTree<IDelegateState, {}> = {
  delegates: (state): IDelegate[] => {
    return state.delegates ? state.delegates : JSON.parse(localStorage.getItem("delegates") as string) || [];
  },

  forged: state => state.forged,

  byPublicKey: (_, getters) => (publicKey: string) => {
    return (
      getters.delegates.find((delegate: IDelegate) => {
        return delegate.publicKey === publicKey;
      }) || null
    );
  },

  byAddress: (_, getters) => (address: string) => {
    return (
      getters.delegates.find((delegate: IDelegate) => {
        return delegate.address === address;
      }) || null
    );
  },

  stateHasDelegates: state => {
    return !!state.delegates;
  },
};

export const delegates: Module<IDelegateState, {}> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
