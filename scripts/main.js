import { createCalendarOnElement } from "./calendar.js"

const calendarElement = document.querySelector("#calendar")

createCalendarOnElement(calendarElement)

document.querySelector("button")
    .addEventListener(
        "click",
        () => calendarElement.classList.toggle("week-view")
    )