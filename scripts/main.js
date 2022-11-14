import { createCalendarOnElement } from "./calendar.js"

const calendarElement = document.querySelector("#calendar")

createCalendarOnElement(calendarElement)

document.querySelector("#switch-layout-button")
    .addEventListener(
        "click",
        () => {
            calendarElement.classList.toggle("week-view")
        }
    )

// Set week view as default view on small screens.
if (document.body.clientWidth < 700)
    calendarElement.classList.toggle("week-view")