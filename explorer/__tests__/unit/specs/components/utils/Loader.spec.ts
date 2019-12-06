import Loader from "@/components/utils/Loader";
import { shallowMount } from "@vue/test-utils";

describe("Components > Utils > Loader", () => {
  it("should render Loader", () => {
    const wrapper = shallowMount(Loader, {
      propsData: {
        data: null,
      },
    });

    expect(wrapper.isVueInstance()).toBe(true);
  });
});
