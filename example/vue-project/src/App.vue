<script setup lang="ts">
import { Calendar, format } from "../../../core/calendar";
import type { HeaderDay } from "../../../core/calendar";
import { ref } from "vue";
import type { Ref } from "vue";

const startDate = new Date(new Date().getFullYear() - 2, 0, 1);
const endDate = new Date(new Date().getFullYear() + 2, 0, 1);
const calendar = new Calendar(startDate, endDate, true);

const days: Ref<HeaderDay[]> = ref([
  { key: 1, name: "Mo" },
  { key: 2, name: "Tu" },
  { key: 3, name: "We" },
  { key: 4, name: "Th" },
  { key: 5, name: "Fr" },
  { key: 6, name: "Sa" },
  { key: 0, name: "Su" },
]);

const vmCalendar = ref(calendar.vm);
</script>

<template>
  <div class="wrap_input">
    <template v-if="vmCalendar.checkIn">
      {{ format(vmCalendar.checkIn, "YYYY-MM-DD") }}
    </template>
    <template v-else>Check-in</template>
    <span class="mx-2">-</span>
    <template v-if="vmCalendar.checkOut">
      {{ format(vmCalendar.checkOut, "YYYY-MM-DD") }}
    </template>
    <template v-else>Check-out</template>
  </div>
  <div class="calendar">
    <div
      :key="month.monthKey"
      v-for="month in vmCalendar.months.slice(27, 29)"
      class="wrap_month"
    >
      <div>{{ month.monthName }}</div>

      <div class="month">
        <div :key="day.key" v-for="day in days">{{ day.name }}</div>

        <button
          type="button"
          :class="[
            'day',
            {
              'day--not-belong-to-month': !day.belongsToThisMonth,
              'day--check-in': day.isCheckIn,
              'day--check-out': day.isCheckOut,
              'day--disabled': day.isDisabled,
              'day--check-in-check-out': day.isBetweenCheckInCheckOut,
            },
          ]"
          :key="day.date"
          v-for="day in month.days"
          @click="calendar.clickOnCalendar(day)"
        >
          <template v-if="day.belongsToThisMonth">
            {{ day.dayNumber }}
          </template>
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.wrap_input {
  padding: 10px;
  border: 1px solid gray;
}
.calendar {
  display: flex;
  max-width: 1280px;
  width: 100%;
}
.wrap_month {
  width: 50%;
  margin: 0 10px;
}
.month {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
}
.day {
  position: relative;
  height: 0px;
  border-width: 0.5px;
  padding-bottom: 100%;
  border-color: #ccc;
  background: transparent;
}
.mx-2 {
  margin-left: 0.4rem;
  margin-right: 0.4rem;
}
.day.day--check-in {
  background: red;
}
.day.day--check-out {
  background: red;
}
.day--check-in-check-out {
  background: rgba(255, 0, 0, 0.5);
}
.day--not-belong-to-month {
  border: 0;
}
.day--disabled {
  background: #ececec;
}
</style>
