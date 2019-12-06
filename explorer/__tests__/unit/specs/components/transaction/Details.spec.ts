import CurrencyMixin from "@/mixins/currency";
import MiscMixin from "@/mixins/misc";
import StringsMixin from "@/mixins/strings";
import { createLocalVue, mount } from "@vue/test-utils";

import TransactionDetails from "@/components/transaction/Details";
import Vuex from "vuex";
import { useI18n } from "../../../__utils__/i18n";

describe("Components > Transaction > Details", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const i18n = useI18n(localVue);

  const store = new Vuex.Store({
    modules: {
      network: {
        namespaced: true,
        getters: {
          height: () => 1000000,
        },
      },
      currency: {
        namespaced: true,
        getters: {
          symbol: () => "$",
        },
      },
    },
    strict: true,
  });

  it("should display the transaction details", () => {
    const wrapper = mount(TransactionDetails, {
      propsData: {
        transaction: {
          id: "transaction-id",
          confirmations: 1,
          vendorField: "vendor-field",
        },
      },
      stubs: {
        LinkWallet: "<div></div>",
        LinkBlock: "<div></div>",
      },
      i18n,
      localVue,
      mixins: [CurrencyMixin, MiscMixin, StringsMixin],
      store,
    });
    expect(wrapper.findAll(".list-row-border-b")).toHaveLength(5);
    expect(wrapper.findAll(".list-row-border-b-no-wrap")).toHaveLength(2);
    expect(wrapper.findAll(".list-row")).toHaveLength(1);
  });
});
