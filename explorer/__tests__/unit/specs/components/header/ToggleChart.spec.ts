import mixins from "@/mixins";
import { createLocalVue, mount } from "@vue/test-utils";

import ToggleChart from "@/components/header/toggles/ToggleChart";
import Vuex from "vuex";
import { useI18n } from "../../../__utils__/i18n";

describe("Components > Header > ToggleChart", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const i18n = useI18n(localVue);

  const uiAction = { setPriceChartOption: jest.fn() };

  const store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        state: {
          priceChartOptions: {
            enabled: false,
          },
        },
        actions: uiAction,
        getters: {
          priceChartOptions: () => {
            return { enabled: false };
          },
        },
      },
    },
    strict: true,
  });

  it("should be possible to toggle the chart", () => {
    const wrapper = mount(ToggleChart, {
      i18n,
      localVue,
      mixins,
      store,
    });

    wrapper.find("button").trigger("click");
    expect(uiAction.setPriceChartOption).toHaveBeenCalled();
  });
});
