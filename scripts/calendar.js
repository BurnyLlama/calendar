import { setLangDataToElement } from "./lang.js"

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

/**
 * Creates a calendar at an element.
 * @param {Element} calendarElement The element to make into a calendar.
 */
export function createCalendarOnElement(calendarElement) {
    // Make sure to empty the element, so that nothing
    // interferes with the calendar.
    calendarElement.childNodes
        .forEach(child => calendarElement.removeChild(child))

    // Get the current date and day of month.
    const currentDate = new Date(Date.now())
    const currentDayOfMonth = currentDate.getUTCDate()

    // Get the first day of the month via date and math magic.
    const firstDayOfCurrentMonth = new Date(Date.now() - (currentDayOfMonth - 1) * 24 * 60 * 60 * 1000)

    // Get the day offset from the first day of the month.
    const dayOffset = firstDayOfCurrentMonth.getUTCDay() - 1

    // Array containing days of every month. January has index 0.
    const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30]

    // Get amount of days this month
    const daysThisMonth = daysPerMonth[currentDate.getUTCMonth()]

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
    new Array(dayOffset)
        .fill(0)
        .forEach(() => {
            const offset = document.createElement("div")
            offset.classList.add("calendar-offset")
            calendarElement.appendChild(offset)
        })

    // Add days to calendar
    // TODO: Currently assumes days of month to be 31, should be
    // fixed to reflect actual number of days of the month.
    new Array(daysThisMonth)
        .fill(0)
        .forEach((_, calendarDayIndex) => {
            const calendarDay = createCalendarDayElement(calendarDayIndex + 1, dayOffset)
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
}