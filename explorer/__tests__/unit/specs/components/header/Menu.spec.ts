import { HeaderMenuDesktop, HeaderMenuMobile } from "@/components/header/menu";
import mixins from "@/mixins";
import router from "@/router/index";
import { createLocalVue, mount } from "@vue/test-utils";
import Vuex from "vuex";
import { useI18n } from "../../../__utils__/i18n";

describe("Components > Header > Menu", () => {
  let wrapper;
  let pushMock;
  let dispatchMock;

  const localVue = createLocalVue();
  localVue.use(Vuex);

  const i18n = useI18n(localVue);

  const store = new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        state: {
          menuVisible: true,
          nightMode: false,
        },
        getters: {
          menuVisible: () => true,
          nightMode: () => false,
        },
        actions: {
          setMenuVisible: jest.fn(),
        },
      },
    },
    strict: true,
  });

  describe("Desktop", () => {
    beforeEach(() => {
      pushMock = jest.fn(params => {
        return "name" in params && name.length > 0;
      });
      router.push = pushMock;

      dispatchMock = jest.fn();
      store.dispatch = dispatchMock;

      wrapper = mount(HeaderMenuDesktop, {
        i18n,
        localVue,
        mixins,
        store,
        router,
      });
    });

    it("should be possible to click on menu option", () => {
      const items = wrapper.findAll(".menu-button");

      for (let i = 0; i < items.length; ++i) {
        items.at(i).trigger("click");
        expect(pushMock).toHaveBeenCalledTimes(i + 1);
        expect(pushMock).toHaveLastReturnedWith(true);
      }
    });

    it("should be possible to close menu on desktop", () => {
      wrapper.find("div > button:not(.menu-button)").trigger("click");

      expect(dispatchMock).toHaveBeenCalledTimes(1);
      expect(dispatchMock).toHaveBeenCalledWith("ui/setMenuVisible", false);
    });
  });

  describe("Mobile", () => {
    beforeEach(() => {
      pushMock = jest.fn(params => {
        return "name" in params && name.length > 0;
      });
      router.push = pushMock;

      dispatchMock = jest.fn();
      store.dispatch = dispatchMock;

      wrapper = mount(HeaderMenuMobile, {
        i18n,
        localVue,
        mixins,
        store,
        router,
      });
    });

    it("should be possible to click on menu option", () => {
      const items = wrapper.findAll(".menu-container > li > div");

      for (let i = 0; i < items.length; ++i) {
        items.at(i).trigger("click");
        expect(pushMock).toHaveBeenCalledTimes(i + 1);
        expect(pushMock).toHaveLastReturnedWith(true);
      }
    });
  });
});
