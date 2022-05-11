# TO DO LIST

- Créer le calendrier ✔️
- Ajout setCheckIn / setChekOut ✔️
- Ajout d'une librairie vue.js ✔️
- Ajout d'une librairie react-native ⏰
- Ajout d'une clé pour le checkIn / checkOut + Date entre ✔️
- Ajout des disabled dates ✔️
- Ajout des bookings ✔️
- Ajout des périodes ⏰
  - Ajout des différent cas
- Réfléchir à la gestion du Hover

## Return a Month which look's like :

```typescript
{
  days: Day[]
  monthKey: number
  monthName: string
  yearKey: number
}
```

- days : Array of Day
- monthKey : The month key
- monthName : The month name in english
- yearKey : The year key

## Return a Day which look's like :

```typescript
{
  "belongsToThisMonth": boolean,
  "date": Date,
  "dayNumber": number,
  "formatDay": string,

  "isDisabled": boolean,
  "isBookingDate": boolean,
  "isCheckInCheckOutHalfDay": boolean,
  "isCheckInHalfDay": boolean,
  "isCheckOutHalfDay": boolean,
  "isInCheckinHalfDayAndNotCheckin": boolean
}
```

- isDisabled : Day is disabled => In a booking and not a checkOutDay / bookedDates
- isBookingDate : Day is in bookingsDate
- isCheckInCheckOutHalfDay : Day is a startDate / endDate of a booking so an half day
- isCheckInHalfDay : Day is a startDate of a booking
- isCheckOutHalfDay : Day is a endDate of a booking
- isInCheckinHalfDayAndNotCheckin : Day is a startDate of a booking and not a checkIn
