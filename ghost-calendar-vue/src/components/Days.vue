<script setup lang="ts">
import type { DayType } from "core";

defineProps<{
  days: DayType[];
  hoveringDates: string[];
}>();

// const hoveringPeriod: Ref<CurrentPeriod> | Ref<null> = ref(null);

const emit = defineEmits([
  "setPeriod",
  "onBooking",
  "dayMouseOver",
  "dayMouseLeave",
]);

const setPeriod = (day: DayType) => {
  if (day.day) {
    // hoveringDates.value = [];
    if (day.isBooking) emit("onBooking", day);

    emit("setPeriod", day);
  }
};

const dayMouseOver = (day: DayType) => {
  emit("dayMouseOver", day);
};
const dayMouseLeave = () => {
  emit("dayMouseLeave");
};
</script>

<template>
  <div
    v-for="day in days"
    :key="day.day"
    :class="[
      'calendar_day-wrap',
      // Color date
      day.bookingType ? `calendar_day--${day.bookingType}` : '',
      {
        'calendar_day-wrap--no-border': !day.day,
        'calendar_day-wrap--disabled': day.isBooking,
      },
    ]"
    :data-testid="day.day ? `daywrap-${day.day}` : 'daywrap-empty'"
  >
    <button
      v-if="day.day"
      type="button"
      :class="[
        'calendar_day z-10',
        {
          'calendar_day--disabled': day.isPastDay,
          'calendar_day--today': day.isCurrentDay,
          'calendar_day--startDate': day.isStartDate,
          'calendar_day--endDate': day.isEndDate,
          'calendar_day--checkInCheckOut': day.isRangeDate,
          'calendar_day--booking': day.isBooking,
          'calendar_day--hovering': hoveringDates.includes(day.day),
        },
      ]"
      :data-testid="`day-${day.day}`"
      @click="setPeriod(day)"
      @mouseenter="dayMouseOver(day)"
      @mouseleave="dayMouseLeave"
    >
      <img
        v-if="
          day.bookingType === 'option' && !day.isStartDate && !day.isEndDate
        "
        src="./option.png"
        :style="{
          width: 49,
          height: 41,
          position: 'absolute',
          flexDirection: 'row',
          top: 0,
          flexWrap: 'wrap',
        }"
      />
      <span class="calendar_day--day-number">
        {{ day.dayNumber }}
      </span>
    </button>

    <span v-else></span>
  </div>
</template>
