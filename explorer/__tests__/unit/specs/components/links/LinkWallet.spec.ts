import StringsMixin from "@/mixins/strings";
import store from "@/store";
import { createLocalVue, mount, RouterLinkStub, Wrapper } from "@vue/test-utils";
import merge from "lodash/merge";

import { LinkWallet } from "@/components/links";
import SvgIcon from "@/components/SvgIcon";
import { useI18n } from "../../../__utils__/i18n";

describe("Compontents > Links > Wallet", () => {
  let wrapper: Wrapper<Vue>;

  const localVue = createLocalVue();
  const i18n = useI18n(localVue);

  const testAddress = "AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv";
  const testPublicKey = "021d03bace0687a1a5e797f884b13fb46f817ec32de1374a7f223f24404401d220";
  const testDelegateAddress = "ALgvTAoz5Vi9easHqBK6aEMKatHb4beCXm";
  const testDelegatePublicKey = "03aa4863c93d170d89675a6e381d08a451c1067fc0f6fed479571d9ecb178963b3";

  const delegates = [{ username: "TestDelegate", address: testDelegateAddress, publicKey: testDelegatePublicKey }];

  const mountComponent = config => {
    return mount(
      LinkWallet,
      merge(
        {
          stubs: {
            RouterLink: RouterLinkStub,
            SvgIcon: "<svg></svg>",
          },
          i18n,
          localVue,
          mixins: [StringsMixin],
          store,
        },
        config,
      ),
    );
  };

  it("should display a full link to a wallet", () => {
    wrapper = mountComponent({
      propsData: {
        address: testAddress,
        publicKey: testPublicKey,
        type: 0,
        trunc: false,
      },
    });

    expect(wrapper.contains("a")).toBe(true);
    expect(wrapper.findAll("a")).toHaveLength(1);
    expect(wrapper.text()).toEqual(expect.stringContaining(testAddress));
    expect(wrapper.text()).toEqual(expect.stringContaining(wrapper.vm.truncate(testAddress)));
  });

  it("should display a truncated link to a wallet", () => {
    wrapper = mountComponent({
      propsData: {
        address: testAddress,
        publicKey: testPublicKey,
        type: 0,
      },
    });

    expect(wrapper.contains("a")).toBe(true);
    expect(wrapper.findAll("a")).toHaveLength(1);
    expect(wrapper.text()).not.toEqual(expect.stringContaining(testAddress));
    expect(wrapper.text()).toEqual(expect.stringContaining(wrapper.vm.truncate(testAddress)));
  });

  it("should display the name of a known address", () => {
    store.dispatch("network/setKnownWallets", { AUDud8tvyVZa67p3QY7XPRUTjRGnWQQ9Xv: "TestKnownWallet" });
    wrapper = mountComponent({
      propsData: {
        address: testAddress,
        publicKey: testPublicKey,
        type: 0,
      },
    });

    expect(wrapper.contains("a")).toBe(true);
    expect(wrapper.findAll("a")).toHaveLength(1);
    expect(wrapper.findAll("svg")).toHaveLength(1);
    expect(wrapper.text()).not.toEqual(expect.stringContaining(testAddress));
    expect(wrapper.text()).not.toEqual(expect.stringContaining(wrapper.vm.truncate(testAddress)));
    expect(wrapper.text()).toEqual(expect.stringContaining("TestKnownWallet"));
  });

  it("should display the name of a delegate", done => {
    store.dispatch("delegates/setDelegates", { delegates });
    wrapper = mountComponent({
      propsData: {
        address: testDelegateAddress,
        type: 0,
      },
    });

    // Delegate name is set after function call in mounted(), so we need to wait a little while
    expect(wrapper.contains("a")).toBe(true);
    expect(wrapper.findAll("a")).toHaveLength(1);
    setTimeout(() => {
      expect(wrapper.text()).not.toEqual(expect.stringContaining(testDelegateAddress));
      expect(wrapper.text()).not.toEqual(expect.stringContaining(wrapper.vm.truncate(testDelegateAddress)));
      expect(wrapper.text()).toEqual(expect.stringContaining("TestDelegate"));
      done();
    }, 500);
  });

  it("should also find the delegate by public key", done => {
    store.dispatch("delegates/setDelegates", { delegates });
    wrapper = mountComponent({
      propsData: {
        publicKey: testDelegatePublicKey,
        type: 0,
      },
    });

    // Delegate name is set after function call in mounted(), so we need to wait a little while
    expect(wrapper.contains("a")).toBe(true);
    expect(wrapper.findAll("a")).toHaveLength(1);
    setTimeout(() => {
      expect(wrapper.text()).not.toEqual(expect.stringContaining(testDelegateAddress));
      expect(wrapper.text()).not.toEqual(expect.stringContaining(wrapper.vm.truncate(testDelegateAddress)));
      expect(wrapper.text()).toEqual(expect.stringContaining("TestDelegate"));
      done();
    }, 500);
  });

  describe("When given a transaction type > 0", () => {
    it("should display 2nd Signature Registration for type 1", () => {
      wrapper = mountComponent({
        propsData: { type: 1 },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("2nd Signature Registration"));
    });

    it("should display Delegate Registration for type 2", () => {
      wrapper = mountComponent({
        propsData: { type: 2 },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("Delegate Registration"));
    });

    it("should display Vote for type 3", () => {
      store.dispatch("delegates/setDelegates", { delegates });

      wrapper = mountComponent({
        propsData: {
          type: 3,
          asset: {
            votes: ["+testDelegatePublicKey"],
          },
        },
      });

      setTimeout(() => {
        expect(wrapper.text()).toEqual(expect.stringContaining("Vote"));
      }, 500);
    });

    it("should display Multi Signature for type 4", () => {
      wrapper = mountComponent({
        propsData: { type: 4 },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("Multisignature Registration"));
    });

    it("should display IPFS for type 5", () => {
      wrapper = mountComponent({
        propsData: { type: 5 },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("IPFS"));
    });

    it("should display Timelock Transfer for type 6", () => {
      wrapper = mountComponent({
        propsData: { type: 6 },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("Multipayment"));
    });

    it("should display Multi Payment for type 7", () => {
      wrapper = mountComponent({
        propsData: { type: 7 },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("Delegate Resignation"));
    });

    it("should display Delegate Resignation for type 8", () => {
      wrapper = mountComponent({
        propsData: { type: 8 },
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("Timelock"));
    });

    it("should display Timeelock Claim for type 9", () => {
      const wrapper = mount(LinkWallet, {
        propsData: { type: 9 },
        stubs: {
          RouterLink: RouterLinkStub,
        },
        i18n,
        localVue,
        mixins: [StringsMixin],
        store,
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("Timelock Claim"));
    });

    it("should display Timeelock Refund for type 10", () => {
      const wrapper = mount(LinkWallet, {
        propsData: { type: 10 },
        stubs: {
          RouterLink: RouterLinkStub,
        },
        i18n,
        localVue,
        mixins: [StringsMixin],
        store,
      });

      expect(wrapper.contains("a")).toBe(false);
      expect(wrapper.text()).toEqual(expect.stringContaining("Timelock Refund"));
    });
  });
});
