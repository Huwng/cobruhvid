/**
 * fetch data JSON of full path API
 * @param {string} url 
 */
async function fetch_JSON_API(url) {
  let request = new Request(url)
  const data = await fetch(request)
  return await data.json()
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
  let ttr = document.createElement(`td`)
  ttr.addEventListener(`click`, function () {
    hidePopup(`#p-s-region`)
  })
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

/**
 * increase data to append to element
 * @param {number} _fr
 * @param {number} _to 
 * @param {number} inTime milliseconds
 * @param {HTMLElement} setTO 
 */
function incDAT(_fr, _to, inTime, setTO, param = '') {
  let step = (_to - _fr) / inTime * 10
  let frVal = _fr, toVal = _to
  let interval = setInterval(function () {
    frVal += step
    if (frVal >= toVal) frVal = toVal
    setTO.innerText = `${Math.round(frVal)}${param}`
    // console.log(frVal)
    if (frVal >= toVal) clearInterval(interval)
  }, 10)
}

function showStart() {
  _$(`.body .start-screen`).classList.remove(`hidden`)
}

function hideStart() {
  _$(`.body .start-screen`).classList.add(`hidden`)
}
/**
 * Find all Region contain text in template
 * @param {string} template 
 */
function filterRegion(template) {
  let tmp = ``, tux
  for (let i in template) {
    tux = `(${template[i]}|${(template[i].toUpperCase() == template[i]) ? template[i].toLowerCase() : template[i].toUpperCase()})`
    tmp = `${tmp}${tux}.*`
  }
  let regex = new RegExp(tmp, `g`)
  // console.log(regex)
  return regex
}

async function fetch_REGION(id) {
  fetch_JSON_API(`https://api.covid19api.com/country/${id}`).then(data => {

  })
}

function showPopup(id) {
  _$(id).classList.add(`show`)
}

function hidePopup(id) {
  _$(id).classList.remove(`show`)
}