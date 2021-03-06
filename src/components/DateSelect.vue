<template lang='jade'>
  .calendar(v-show='calendarVisible')
    .calendar__navigation
      .navigation__btn(@click='previousMonth()') <
      .navigation__date {{ monthName + ' ' + year }}
      .navigation__btn(@click='nextMonth()') >
    .calendar__day-names-row
      .calendar__day-name(v-for='day in dayNames')
        span.calendar__day-name {{ day }}
    .calendar__dates
      .calendar__week(v-for='week in weekRows')
        .calendar__day(v-for='day in week')
          span.calendar__day-name(@click='setDate(day)') {{ day }}
</template>

<script>
  import getCalendar from './../libs/dateCreator'
  import moment from 'moment'

  export default {
    name: 'date-select',
    props: ['calendarVisible'],
    mounted: function () {
      const year = moment().year()
      const month = moment().month()
      this.year = year
      this.month = month
      this.getCalendar(year, month)
      document.addEventListener('click', this.hideCalendar)
    },
    beforeDestroy: function () {
      document.removeEventListener('click', this.hideCalendar)
    },
    data () {
      return {
        selectedDate: null,
        calendar: null,
        dayNames: ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'],
        month: moment().month(),
        year: moment().year()
      }
    },
    computed: {
      weekRows: function () {
        const calendar = this.calendar
        if (calendar) {
          return calendar.map((week) => {
            let dayList = []

            for (let day of week.by('days')) {
              dayList.push(day)
            }

            return dayList.map((day) => {
              return day.format('D')
            })
          })
        }
      },
      monthName: function () {
        return moment().month(this.month).format('MMMM')
      }
    },
    methods: {
      hideCalendar (e) {
        const className = e.target.className
        const isCalendarNav = className.indexOf('navigation') + 1
        const isCalendarBody = className.indexOf('calendar') + 1
        const isDate = className.indexOf('new-task-date') + 1
        if (isDate || isCalendarNav || isCalendarBody) {
          e.preventDefault()
        } else {
          this.$emit('closeCalendar')
        }
      },
      setDate (date) {
        const momentDate = moment().date(date).month(this.month).year(this.year)
        this.$emit('setDate', momentDate)
      },
      getCalendar (year, month) {
        this.calendar = getCalendar(year, month)
        this.year = year
        this.month = month
      },
      nextMonth () {
        const {month, year} = this
        let newMonth
        let newYear
        if (month === 11) {
          newMonth = 0
          newYear = year + 1
        } else {
          newMonth = month + 1
          newYear = year
        }
        this.getCalendar(newYear, newMonth)
      },
      previousMonth () {
        let month
        let year
        if (this.month === 0) {
          month = 11
          year = this.year - 1
        } else {
          month = this.month - 1
          year = this.year
        }
        this.getCalendar(year, month)
      }
    }
  }
</script>

<style scoped>
  .calendar {
    display: flex;
    flex-direction: column;
    max-width: 250px;
    position: absolute;
    top: 30px;
    border: solid 1px #ccc;
    padding: 15px;
  }

  .calendar__navigation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .calendar__day-names-row {
    display: flex;
    justify-content: space-between;
    border-bottom: solid 1px #ccc;
    margin-bottom: 15px;
  }

  .calendar__dates {
    display: flex;
    flex-direction: column;
  }
  .calendar__week {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: solid 1px #ccc;
  }

  .calendar__week:last-child {
    border-bottom: none;
  }

  .calendar__day {
    margin: 6px;
    min-width: 20px;
    min-height: 20px;
    max-width: 20px;
    max-height: 20px;
    cursor: pointer;
  }

  .calendar__day-name {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
