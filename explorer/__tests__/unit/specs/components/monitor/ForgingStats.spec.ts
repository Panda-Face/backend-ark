import mixins from "@/mixins";
import { createLocalVue, mount } from "@vue/test-utils";

import ForgingStats from "@/components/monitor/ForgingStats";
import Vuex from "vuex";
import { useI18n } from "../../../__utils__/i18n";

describe("Components > Monitor > ForgingStats", () => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  const i18n = useI18n(localVue);

  it("should show the forging info", () => {
    const store = new Vuex.Store({
      modules: {
        network: {
          namespaced: true,
          getters: { activeDelegates: () => 51 },
        },
      },
      strict: true,
    });

    const wrapper = mount(ForgingStats, {
      i18n,
      localVue,
      mixins,
      store,
      stubs: {
        ArkMeter: "<div></div>",
      },
      propsData: {
        delegates: [],
      },
    });

    const divs = wrapper.findAll("div.text-grey");
    expect(divs).toHaveLength(4);
    expect(divs.at(0).text()).toBe("Forged block recently");
    expect(divs.at(1).text()).toContain("Missed round");
    expect(divs.at(2).text()).toBe("Not forging");
    expect(divs.at(3).text()).toContain("In queue for forging");
  });
});
