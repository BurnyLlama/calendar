import { createCalendarOnElement } from "./calendar.js"
import { setup } from "./settings.js"

const calendarElement = document.querySelector("#calendar")
const settingsElement = document.querySelector("#settings")

createCalendarOnElement(calendarElement, new Date())

document.querySelector("#switch-layout-button")
    .addEventListener(
        "click",
        () => calendarElement.classList.toggle("week-view")
    )

// Set week view as default view on small screens.
if (document.body.clientWidth < 700)
    calendarElement.classList.toggle("week-view")

document.querySelectorAll("#settings-button, #close-settings")
    .forEach(
        button => button.addEventListener(
            "click",
            () => settingsElement.classList.toggle("hidden")
        )
    )

let monthOffset = 0
document.querySelector("#next-month")
    .addEventListener(
        "click",
        () => {
            monthOffset -= 1
            createCalendarOnElement(calendarElement, new Date(Date.now() + monthOffset * 30 * 24 * 60 * 60 * 1000))
        }
    )

document.querySelector("#prev-month")
    .addEventListener(
        "click",
        () => {
            monthOffset += 1
            createCalendarOnElement(calendarElement, new Date(Date.now() + monthOffset * 30 * 24 * 60 * 60 * 1000))
        }
    )

setup()