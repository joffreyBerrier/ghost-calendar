<script setup lang="ts">
import { Calendar } from "../../calendar";
import { ref } from "vue";

const startDate = new Date(new Date().getFullYear() - 2, 0, 1);
const endDate = new Date(new Date().getFullYear() + 2, 0, 1);
const calendar = new Calendar(startDate, endDate);

const vmCalendar = ref(calendar.vm);
</script>

<template>
  <div class="calendar">
    <div :key="month.monthKey" v-for="month in vmCalendar.months">
      <div>{{ month.monthName }}</div>

      <div class="month">
        <button
          type="button"
          :class="[
            'day',
            {
              'day--check-in': day.isCheckIn,
              'day--check-out': day.isCheckOut,
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
.calendar {
  width: 800px;
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
.day.day--check-in {
  background: red;
}
.day.day--check-out {
  background: red;
}
.day--check-in-check-out {
  background: rgba(255, 0, 0, 0.5);
}
</style>
