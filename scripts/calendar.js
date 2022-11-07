import { setLangDataToElement } from "./lang.js"

const DAY_OFFSET = 4

const calendarElement = document.querySelector("#calendar")

function createCalendarDayElement(date, offset) {
    const day = document.createElement("div")
    const dayDate = document.createElement("p")
    const dayName = document.createElement("p")

    day.classList.add("calendar-day")
    dayDate.classList.add("calendar-day-date")
    dayName.classList.add("calendar-day-name")

    dayDate.textContent = date
    setLangDataToElement("en_GB", dayName, lang => lang.days[(offset + date - 1) % 7])

    day.appendChild(dayDate)
    day.appendChild(dayName)

    return day
}

// Add day headers
new Array(7)
    .fill(0)
    .forEach((_, dayIndex) => {
        const day = document.createElement("div")
        day.classList.add("calendar-header")
        calendarElement.appendChild(day)
        setLangDataToElement("en_GB", day, lang => lang.days[dayIndex])
    })

// Add offset, will depend on month
new Array(DAY_OFFSET)
    .fill(0)
    .forEach(() => {
        const offset = document.createElement("div")
        offset.classList.add("calendar-offset")
        calendarElement.appendChild(offset)
    })

// Add days to calendar
new Array(31)
    .fill(0)
    .forEach((_, calendarDayIndex) => {
        const calendarDay = createCalendarDayElement(calendarDayIndex + 1, DAY_OFFSET)
        calendarElement.appendChild(calendarDay)
    })

document.querySelector("button")
    .addEventListener(
        "click",
        () => calendarElement.classList.toggle("week-view")
    )