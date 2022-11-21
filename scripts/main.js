import { createCalendarOnElement } from "./calendar.js"
import { setup } from "./settings.js"

const calendarElement = document.querySelector("#calendar")
const settingsElement = document.querySelector("#settings")

createCalendarOnElement(calendarElement)

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

setup()