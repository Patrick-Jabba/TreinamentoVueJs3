import { shallowMount } from "@vue/test-utils";
import router from "../../router";

import Home from ".";

const wrapper = shallowMount(Home, {
  global: {
    plugins: [router],
  },
});

describe("<Home />", () => {
  it("should render home correctly", async () => {
    await router.isReady();
    router.push("/");

    expect(wrapper.html()).toMatchSnapshot();
  });
});
