/* tslint:disable:no-shadowed-variable */
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";
import { INetworkState, IStorePayload } from "../../interfaces";
import * as types from "../mutation-types";

const namespaced = true;
const state: INetworkState = {
  defaults: {},
  server: null,
  nethash: null,
  alias: null,
  addressPrefix: 23,
  activeDelegates: 51,
  rewardOffset: 51,
  token: null,
  symbol: null,
  currencies: [],
  knownWallets: [],
  supply: 0,
  height: 0,
  epoch: null,
  blocktime: 0,
};

const actions: ActionTree<INetworkState, {}> = {
  setDefaults: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_DEFAULTS,
      value,
    });
  },
  setServer: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_SERVER,
      value,
    });
  },
  setNethash: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_NETHASH,
      value,
    });
  },
  setAlias: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_ALIAS,
      value,
    });
  },
  setAddressPrefix: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_ADDRESS_PREFIX,
      value,
    });
  },
  setActiveDelegates: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_ACTIVE_DELEGATES,
      value,
    });
  },
  setRewardOffset: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_REWARD_OFFSET,
      value,
    });
  },
  setToken: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_TOKEN,
      value,
    });
  },
  setSymbol: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_SYMBOL,
      value,
    });
  },
  setCurrencies: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_CURRENCIES,
      value,
    });
  },
  setKnownWallets: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_KNOWN_WALLETS,
      value,
    });
  },
  setSupply: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_SUPPLY,
      value,
    });
  },
  setHeight: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_HEIGHT,
      value,
    });
  },
  setEpoch: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_EPOCH,
      value,
    });
  },
  setBlocktime: ({ commit }, value) => {
    commit({
      type: types.SET_NETWORK_BLOCKTIME,
      value,
    });
  },
};

const mutations: MutationTree<INetworkState> = {
  [types.SET_NETWORK_DEFAULTS](state, payload: IStorePayload) {
    state.defaults = payload.value;
  },
  [types.SET_NETWORK_SERVER](state, payload: IStorePayload) {
    state.server = payload.value;
  },
  [types.SET_NETWORK_NETHASH](state, payload: IStorePayload) {
    state.nethash = payload.value;
  },
  [types.SET_NETWORK_ALIAS](state, payload: IStorePayload) {
    state.alias = payload.value;
  },
  [types.SET_NETWORK_ADDRESS_PREFIX](state, payload: IStorePayload) {
    state.addressPrefix = payload.value;
  },
  [types.SET_NETWORK_ACTIVE_DELEGATES](state, payload: IStorePayload) {
    state.activeDelegates = payload.value;
  },
  [types.SET_NETWORK_REWARD_OFFSET](state, payload: IStorePayload) {
    state.rewardOffset = payload.value;
  },
  [types.SET_NETWORK_TOKEN](state, payload: IStorePayload) {
    state.token = payload.value;
  },
  [types.SET_NETWORK_SYMBOL](state, payload: IStorePayload) {
    state.symbol = payload.value;
  },
  [types.SET_NETWORK_CURRENCIES](state, payload: IStorePayload) {
    state.currencies = payload.value;
  },
  [types.SET_NETWORK_KNOWN_WALLETS](state, payload: IStorePayload) {
    state.knownWallets = payload.value;
  },
  [types.SET_NETWORK_SUPPLY](state, payload: IStorePayload) {
    state.supply = payload.value;
  },
  [types.SET_NETWORK_HEIGHT](state, payload: IStorePayload) {
    state.height = payload.value;
  },
  [types.SET_NETWORK_EPOCH](state, payload: IStorePayload) {
    state.epoch = payload.value;
  },
  [types.SET_NETWORK_BLOCKTIME](state, payload: IStorePayload) {
    state.blocktime = payload.value;
  },
};

const getters: GetterTree<INetworkState, {}> = {
  defaults: state => state.defaults,
  server: state => state.server,
  nethash: state => state.nethash,
  alias: state => state.alias,
  addressPrefix: state => state.addressPrefix,
  activeDelegates: state => state.activeDelegates,
  rewardOffset: state => state.rewardOffset,
  token: state => state.token,
  symbol: state => state.symbol,
  currencies: state => state.currencies,
  knownWallets: state => state.knownWallets,
  supply: state => state.supply,
  height: state => state.height,
  epoch: state => state.epoch,
  blocktime: state => state.blocktime,
};

export const network: Module<INetworkState, {}> = {
  namespaced,
  state,
  actions,
  mutations,
  getters,
};
