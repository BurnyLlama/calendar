import { setLangDataToElement } from "./lang.js"

const DAY_OFFSET = 4

const calendarElement = document.querySelector("#calendar")

/**
 * Creates a calendar day element.
 * @param {number} date The date of the month, (1<=date<=31)
 * @param {number} offset The number of days the first day of the month is from a monday.
 * @returns {Element}
 */
function createCalendarDayElement(date, offset) {
    // Create necessary elements.
    const day = document.createElement("div")
    const dayDate = document.createElement("p")
    const dayName = document.createElement("p")

    // Add the correct classes.
    day.classList.add("calendar-day")
    dayDate.classList.add("calendar-day-date")
    dayName.classList.add("calendar-day-name")

    // Set the day name from lang file.
    dayDate.textContent = date
    setLangDataToElement(
        "en_GB",
        dayName,
        lang => lang.days[(offset + date - 1) % 7]
    )

    // Append day name and day date to the day element.
    day.appendChild(dayDate)
    day.appendChild(dayName)

    // Fullscreen toggle on click.
    day.addEventListener(
        "click",
        () => day.classList.toggle("fullscreen")
    )

    return day
}

// Add day headers -- grabs day names from lang file.
new Array(7)
    .fill(0)
    .forEach((_, dayIndex) => {
        const day = document.createElement("div")
        day.classList.add("calendar-header")
        calendarElement.appendChild(day)
        setLangDataToElement(
            "en_GB",
            day,
            lang => lang.days[dayIndex]
        )
    })

// Add offset, will depend on month.
// Offset is how many days the first day of the month is from a monday.
// TODO: Make this dynamic based on month.
new Array(DAY_OFFSET)
    .fill(0)
    .forEach(() => {
        const offset = document.createElement("div")
        offset.classList.add("calendar-offset")
        calendarElement.appendChild(offset)
    })

// Add days to calendar
// TODO: Currently assumes days of month to be 31, should be
// fixed to reflect actual number of days of the month.
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

setLangDataToElement(
    "en_GB",
    document.querySelector("#month"),
    lang => lang.months[new Date(Date.now()).getMonth()]
)