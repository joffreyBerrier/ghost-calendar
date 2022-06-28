<script setup lang="ts">
import { useCalendar } from "../hooks/useCalendar";
import { rangeDates } from "./inMemory/rangeDates";

const { calendar, setPeriod } = useCalendar({
  locale: "fr",
  nbMonths: 2,
  rangeDates,
});

console.log(setPeriod);
// defineProps<{
//   msg: string;
// }>();
</script>

<template>
  <div class="calendar_wrapper_content">
    <div v-for="month in calendar?.months" :key="month.monthKey">
      <span class="font-bold">{{ month.monthName }}</span>
      <div class="calendar_wrapper_content-days">
        <div
          v-for="day in month.days"
          :key="day.day"
          :class="[
            'calendar_day-wrap',
            // Color date
            day.bookingType ? `calendar_day--${day.bookingType}` : '',
            {
              'calendar_day-wrap--no-border': !day,
              'calendar_day-wrap--disabled': day.isBooking,
            },
          ]"
          :data-testid="`daywrap-${day.day}`"
        >
          <!-- Add disabledDay -->
          <!-- @mouseenter="dayMouseOver(day)"
          @mouseleave="dayMouseLeave" -->
          <!-- <div v-if="day" class="calendar_tooltip"></div> -->

          <button
            v-if="day.day"
            type="button"
            :class="[
              // Basic style
              'calendar_day z-10',
              // Today
              {
                'calendar_day--today': day.isCurrentDay,
              },
              // CheckIn or CheckOut
              {
                'calendar_day--checkIn-checkOut':
                  day.period?.checkIn === day.day ||
                  day.period?.checkOut === day.day,
              },
              // Booking date
              {
                'calendar_day--booking':
                  day.isStartDate || day.isEndDate || day.isBooking,
              },
              // Disabled date
              //{
              //'calendar_day--disabled': inDisabledDay(day),
              //},
              // Hovering date
              //{
              //'calendar_day--hovering':
              // (!checkIn &&
              //   checkIn !== day.date &&
              //   hoveringDay === day.date) ||
              // hoveringDates.includes(day.formatDay),
              //},
              //{
              //'calendar_day_between--checkIn-checkOut':
              //datesBetweenCheckInCheckOutDates.includes(day.formatDay),
              //},
              //{
              //  'calendar_day--hovering-checkIn':
              //    checkIn && hoveringDay === day.date,
              //},
              // Inactive saturday period
              //{
              //  'calendar_day--in-period':
              //    inWeeklyPeriods(day) || inNextPeriodDisabledDates(day),
              //},
              // CheckIn saturday / sunday period
              //{
              //  'calendar_day--in-period-checkIn':
              //    inWeeklyPeriodsCheckin(day) || inNightlyPeriod(day),
              //},
            ]"
            :data-testid="`day-${day.day}`"
            @click="setPeriod(day)"
          >
            <!-- <i
              v-if="
                isInCheckoutHalfDay(day) ||
                isInCheckinHalfDayAndCheckin(day) ||
                isInCheckinHalfDayAndNotCheckin(day)
              "
              :style="{ background: bookingStyle[day.formatDay] }"
              :class="[
                'calendar_day_haldDay',
                {
                  'calendar_day_haldDay--checkIn':
                    isInCheckinHalfDayAndCheckin(day) ||
                    isInCheckinHalfDayAndNotCheckin(day),
                  'calendar_day_haldDay--checkOut': isInCheckoutHalfDay(day),
                },
              ]"
            /> -->

            <span class="calendar_day--day-number">
              {{ day.dayNumber }}
              {{ day }}
            </span>
          </button>
          <span v-else></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  --calendar-wrapper: #fff;
  --calendar-tooltip-bg: #fff;
  --calendar-tooltip-border: #ececec;

  --calendar-input-bg: #fff;
  --calendar-input-border: #eee;

  --calendar-paginate-bg: rgb(236 252 203);
  --calendar-paginate-text-color: rgb(163 230 53);
  --calendar-paginate-border-color: rgb(163 230 53);

  --calendar-paginate-hover-bg: rgb(163 230 53);
  --calendar-paginate-hover-border: rgb(163 230 53);
  --calendar-paginate-hover-text: #ffffff;

  --calendar-paginate-disabled-bg: rgba(101, 163, 13, 0.5);
  --calendar-paginate-disabled-border: rgb(101 163 13);
  --calendar-paginate-disabled-text: #ffffff;

  --day-disabled: rgb(241 245 249);

  --day-border: rgb(226 232 240);
  --day-range-days: rgb(236 252 203);
  --day-hovering-with-checkIn: rgb(163 230 53);

  --day-checkIn-checkOut: rgb(190 242 100);

  --day-today: rgb(217 249 157);
}

@tailwind base;
@tailwind components;
@tailwind utilities;

.calendar {
  @apply w-full relative select-none;
}
.calendar_wrapper {
  @apply w-full md:w-[600px];
  background-color: var(--calendar-wrapper);
}
.calendar_wrapper:not(.calendar_wrapper--year) {
  @apply p-4 shadow-md absolute top-[100%];
}
.calendar_wrapper_content {
  @apply grid grid-cols-2 gap-4;
}
.calendar_wrapper_content-days {
  @apply grid grid-cols-7;
}
.calendar_day-wrap {
  @apply relative h-0 pb-[100%] border-[.5px];
  border-color: var(--day-border);
}
.calendar_day-wrap--no-border {
  @apply border-0 pointer-events-none;
}
.calendar_day-wrap--disabled {
  @apply pointer-events-none;
}
.calendar_tooltip {
  @apply absolute top-full left-1/2 transform -translate-x-1/2 shadow-sm border p-3 text-xs z-20 text-center w-max;
  width: max-content;
  max-width: 150px;
  border-color: var(--calendar-tooltip-border);
  background-color: var(--calendar-tooltip-bg);
}
.calendar_day {
  @apply w-full left-0 right-0 h-full text-sm absolute focus:outline-none overflow-hidden;
}
.calendar_day--today {
  @apply border-2;
  border-color: var(--day-today);
}
.calendar_day--checkIn-checkOut,
.calendar_day--checkIn-checkOut.calendar_day--hovering {
  background-color: var(--day-checkIn-checkOut);
}
.calendar_day--disabled {
  background-color: var(--day-disabled);
  @apply pointer-events-none font-extralight;
}
.calendar_day--hovering,
.calendar_day_between--checkIn-checkOut {
  background-color: var(--day-range-days);
}
.calendar_day--hovering-checkIn {
  background-color: var(--day-hovering-with-checkIn);
}
.calendar_day--in-period {
  @apply pointer-events-none font-extralight;
}
.calendar_day--in-period-checkIn {
  @apply pointer-events-none font-extralight;
}
.calendar_day--day-number {
  @apply absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2;
}
.event-none {
  @apply pointer-events-none;
}
/* Year calendar */
.calendar_wrapper--year {
  @apply w-full;
}
.calendar_wrapper--year .calendar_wrapper_content {
  @apply grid grid-cols-4 gap-x-6 gap-y-6;
}

.calendar_paginate-wrapper {
  @apply mb-4;
}
.calendar_paginate-button {
  @apply p-4 duration-300;
  border-width: 1px;
  border-style: solid;
  background-color: var(--calendar-paginate-bg);
  border-color: var(--calendar-paginate-border-color);
  color: var(--calendar-paginate-text-color);
}
.calendar_paginate-button:hover {
  background-color: var(--calendar-paginate-hover-bg);
  border-color: var(--calendar-paginate-hover-border);
  color: var(--calendar-paginate-hover-text);
}
.calendar_paginate-button:disabled {
  background-color: var(--calendar-paginate-disabled-bg);
  border-color: var(--calendar-paginate-disabled-border);
  color: var(--calendar-paginate-disabled-text);
}
.calendar_paginate-year {
  @apply w-20 inline-block text-center font-bold;
}

.calendar_day--booking {
  @apply opacity-80;
}
/* New */
.calendar_day_haldDay {
  @apply w-[200%] h-[200%] absolute transform rotate-45;
}
.calendar_day_haldDay--checkIn {
  top: 0px;
  right: -140%;
}
.calendar_day_haldDay--checkOut {
  top: -140%;
  right: 0;
}
</style>
