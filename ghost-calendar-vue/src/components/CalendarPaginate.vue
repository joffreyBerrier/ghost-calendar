<script lang="ts">
export default {
  name: "CalendarPaginate",
};
</script>

<script setup lang="ts">
import BaseIcon from "./BaseIcon.vue";

const emit = defineEmits(["paginate"]);
const paginate = (operator: string) => {
  emit("paginate", operator);
};
</script>

<template>
  <div class="calendar_header">
    <button
      type="button"
      data-testid="button-prev-month"
      class="calendar_header-left-button"
      @click="paginate('-')"
    >
      <BaseIcon name="chevronLeft" />
    </button>

    <button
      type="button"
      data-testid="button-next-month"
      class="calendar_header-right-button"
      @click="paginate('+')"
    >
      <BaseIcon name="chevronRight" />
    </button>
  </div>
</template>

<style>
.calendar_header {
  @apply relative grid grid-cols-2 items-center gap-4;
}
.calendar_header-left-button,
.calendar_header-right-button {
  background-color: var(--calendar-paginate-bg);
  border-color: var(--calendar-paginate-border-color);
  color: var(--calendar-paginate-text-color);
}
.calendar_header-left-button:hover,
.calendar_header-right-button:hover {
  background-color: var(--calendar-paginate-hover-bg);
  border-color: var(--calendar-paginate-hover-border);
  color: var(--calendar-paginate-hover-text);
}
.calendar_header-left-button:disabled,
.calendar_header-right-button:disabled {
  background-color: var(--calendar-paginate-disabled-bg);
  border-color: var(--calendar-paginate-disabled-border);
  color: var(--calendar-paginate-disabled-text);
}
.calendar_header-left-button {
  @apply absolute left-0 w-10 h-10 flex items-center justify-center border focus:outline-none disabled:pointer-events-none duration-300;
}
.calendar_header-right-button {
  @apply absolute right-0 w-10 h-10 flex items-center justify-center border focus:outline-none disabled:pointer-events-none duration-300;
}
</style>
