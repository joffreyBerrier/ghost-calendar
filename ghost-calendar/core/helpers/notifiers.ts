import { CalendarPresenter } from '../CalendarPresenter'
import { checkCurrentDayAndPastDay } from './utils'

export const notifyIfPeriodIsUncompleted = (
  presenter: CalendarPresenter,
  day: string,
  startDayState: string
) => {
  if (checkCurrentDayAndPastDay(day, new Date(startDayState))) {
    presenter.displayStartDate(day)
  } else {
    presenter.displayEndDate(day, startDayState)
  }
}
