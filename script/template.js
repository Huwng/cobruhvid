/**
 * fetch data JSON of full path API
 * @param {string} url 
 */
function fetch_JSON_API(url) {
  let request = new Request(url)
  fetch(request)
    .then(response => {
      if (response.status === 200)
        return response.json()
      else
        throw new Error(`Something went wrong on api server!`)
    })
    .then(response => {
      console.log(response)
      // progress(response)
    }).catch(error => {
      console.error(error)
    })
}
/**
 * return a matched element by QUERY
 * @param {string} selector 
 * @returns {HTMLElement}
 */
function _$(selector) {
  return document.querySelector(selector)
}
/**
 * return all matched element by QUERY
 * @param {string} selector 
 * @returns {HTMLCollection}
 */
function $$(selector) {
  return document.querySelectorAll(selector)
}

/**
 * Create a region element to append to region table
 * @param {string} name 
 * @param {string} id 
 */
function cRE(name, id) {
  let ttr = document.createElement(`tr`)
  ttr.addEventListener(`click`, function() {fetch_REGION(id)})
  ttr.classList.add(`f-center`)
  let tlab = document.createElement(`div`)
  tlab.innerText = name
  ttr.appendChild(tlab)
  return ttr
}
/**
 * set the style attribute of element
 * @param {string} element 
 * @param {string} property 
 * @param {string} value 
 */
function setStyle(element, property, value) {
  _$(element)[`style`][`${property}`] = value
}