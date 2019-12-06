// tslint:disable-next-line:no-var-requires
require("es6-promise").polyfill();

import "@/assets/css/style.css";
import "nprogress/nprogress.css";

// @ts-ignore
import VTooltip from "v-tooltip";
import Vue from "vue";
// @ts-ignore
import VueGoodTablePlugin from "vue-good-table";
import { sync } from "vuex-router-sync";
// @ts-ignore
import App from "./App.vue";
import directives from "./directives";
import i18n from "./i18n";
import mixins from "./mixins";
import router from "./router";
import store from "./store";

// tslint:disable-next-line:no-var-requires
require("./components");

sync(store, router);

Vue.config.productionTip = false;

Vue.use(directives);
Vue.use(VTooltip, {
  defaultHtml: false,
  defaultContainer: "main",
});
Vue.use(VueGoodTablePlugin);

Vue.mixin(mixins);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount("#app");
