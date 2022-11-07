/**
 * @typedef { "en_GB" | "sv_SE" } Lang
 */

/**
 * @typedef LangData
 * @property {Array<String>} days Contains a list of all days. Monday = 0.
 */

let langCache = {}

export function loadLang(lang) {
    return new Promise(
        (resolve, reject) => {
            if (langCache[lang])
                return resolve(langCache[lang])

            fetch(`/lang/${lang}.json`)
                .then(res => res.json())
                .then(langData => {
                    langCache[lang] = langData
                    resolve(langData)
                })
                .catch(reject)
        }
    )
}

/**
 * Select a string from LangData.
 * Usage: lang => lang.category.thing
 * @callback SelectLangDataFunc
 * @param {LangData}
 * @return {string}
 */

/**
 * Set some lang data to an elemets textContent.
 * @param {Lang} lang
 * @param {Element} element
 * @param {SelectLangDataFunc} selectFunc
 */
export function setLangDataToElement(lang, element, selectFunc) {
    loadLang(lang)
        .then(langData => element.textContent = selectFunc(langData))
        .catch(err => {
            console.error(err)
            element.innerHTML = "<span style=\"color:red;\">FAILED TO LOAD!</span>"
        })
}