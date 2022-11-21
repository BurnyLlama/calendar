/**
 * Set a CSS varaible.
 * @param {string} key The key/name of the variable.
 * @param {string} value The value of the variable.
 */
function setCSSVariable(key, value) {
    document.documentElement.style.setProperty(key, value)
}

/**
 * Save currently loaded CSS variables to localStorage.
 */
function saveCSSVariables() {
    const variables = ["--accent", "--red"]
        .map(variable => ({
            key: variable,
            value: document.documentElement.style.getPropertyValue(variable)
        }))

    const JsonStringCSSVariables = JSON.stringify(variables)

    localStorage.setItem("css-variables", JsonStringCSSVariables)
}

/**
 * Load CSS variables from localStorage.
 * Also sets current colours in the settings.
 */
function loadCSSVariables() {
    const JsonStringCSSVariables = localStorage.getItem("css-variables")
    const variables = JSON.parse(JsonStringCSSVariables)

    variables.forEach(variable => setCSSVariable(variable.key, variable.value))

    // Set colours in the settings menu.
    const accentColorSelector = document.querySelector("#accent-color")
    const redColorSelector    = document.querySelector("#red-color")
    accentColorSelector.value = variables.find(variable => variable.key == "--accent").value
    redColorSelector.value    = variables.find(variable => variable.key == "--red").value
}

/**
 * Sets up some stuff for settings.
 * For now just loads CSS variables.
 */
export function setup() {
    // Listen to colour changes.
    const accentColorSelector = document.querySelector("#accent-color")
    accentColorSelector.addEventListener(
        "change",
        () => {
            setCSSVariable("--accent", accentColorSelector.value)
            saveCSSVariables()
        }
    )

    const redColorSelector = document.querySelector("#red-color")
    redColorSelector.addEventListener(
        "change",
        () => {
            setCSSVariable("--red", redColorSelector.value)
            saveCSSVariables()
        }
    )

    // Load previous settings.
    loadCSSVariables()
}