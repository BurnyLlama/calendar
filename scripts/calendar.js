import { setLangDataToElement } from "./lang.js"

/**
 * Array containing days of every month. January has index 0.
 */
const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]


/**
 * Creates a calendar day element.
 * @param {number} date The date of the month, (1<=date<=31)
 * @param {number} offset The number of days the first day of the month is from a monday.
 * @returns {Element}
 */
function createCalendarDayElement(date, month, year, offset) {
    // Create necessary elements.
    const day     = document.createElement("div")
    const dayDate = document.createElement("p")
    const dayName = document.createElement("p")
    const fullscreenToggleButton = document.createElement("button")

    // Add the correct classes.
    day.classList.add("calendar-day")
    dayDate.classList.add("calendar-day-date")
    dayName.classList.add("calendar-day-name")
    fullscreenToggleButton.classList.add("calendar-day-fullscreen-toggle")

    fullscreenToggleButton.textContent = "•••"

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
    day.appendChild(fullscreenToggleButton)

    // Make sure today's day can be styled differently.
    const today = new Date()
    if (
        date  === today.getUTCDate() +1 &&
        month === today.getUTCMonth()   &&
        year  === today.getUTCFullYear()
    ) {
        day.classList.add("today")
    }

    // Fullscreen toggle on click.
    fullscreenToggleButton.addEventListener(
        "click",
        () => {
            // Reset previous fullscreen days.
            document.querySelectorAll(".calendar-day.fullscreen")
                .forEach(
                    element => {
                        if (element !== day)
                            element.classList.remove("fullscreen")
                    }
                )

            fullscreenToggleButton.classList.toggle("close")

            // Set current day to fullscreen.
            day.classList.toggle("fullscreen")
        }
    )

    return day
}

/**
 * Creates a calendar at an element.
 * @param {Element} calendarElement The element to make into a calendar.
 * @param {Date} originDate The origin from which to create the calendar.
 */
export function createCalendarOnElement(calendarElement, originDate) {
    // Make sure to empty the element, so that nothing
    // interferes with the calendar.
    calendarElement.replaceChildren("")

    // Get the current date and day of month.
    const currentDayOfMonth = originDate.getUTCDate()

    // Get the first day of the month via date and math magic.
    const firstDayOfCurrentMonth = new Date(originDate - (currentDayOfMonth - 1) * 24 * 60 * 60 * 1000)

    // Get the day offset from the first day of the month.
    const dayOffset = firstDayOfCurrentMonth.getUTCDay() - 1

    // Get amount of days this month
    const daysThisMonth = daysPerMonth[originDate.getUTCMonth()]

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
            const calendarDay = createCalendarDayElement(calendarDayIndex + 1, originDate.getUTCMonth(), originDate.getUTCFullYear(), dayOffset)
            calendarElement.appendChild(calendarDay)
        })

    // Show current month above the calendar.
    setLangDataToElement(
        "en_GB",
        document.querySelector("#month"),
        lang => lang.months[originDate.getUTCMonth()]
    )
}