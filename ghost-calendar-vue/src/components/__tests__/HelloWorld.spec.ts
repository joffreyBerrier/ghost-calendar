import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import Calendar from "../Calendar.vue";

describe("Calendar", () => {
  it("renders properly", () => {
    const wrapper = mount(Calendar, { props: { msg: "Hello Vitest" } });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
