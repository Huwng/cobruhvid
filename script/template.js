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
 * @param {Function} callback
 */
function cRE(name, id, callback) {
  let ttr = document.createElement(`td`)
  ttr.addEventListener(`click`, function () {
    hidePopup(`#p-s-region`)
    callback(id)
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
  _$(element).style[`${property}`] = value
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
    setTO.innerText = `${Math.round(frVal).toLocaleString()}${param}`
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

/**
 * set data to chart use specific id
 * * id must be: 
 *  * tconf: Total Confirmed
 *  * nconf: New Confirmed
 *  * tdeath: Total Death
 *  * ndeath: New Death
 *  * treco: Total Recovered
 *  * nreco: New Recovered
 * * value must be an array of Object {date, data}
 * @param {string} id id of the chart 
 * @param {Array<{date: string, data: number}>} value data to set
 * 
 * @returns {void} no return value
 */
function setDataForChart(id, value) {
  let specific_chart = _$(`#ex-chart-${id}`).children[1].children
  let maxVAL = 0
  for (let i = 0; i < value.length; ++i) 
    if (value[i].data > maxVAL) maxVAL = value[i].data
  
  for (let i = 0; i < value.length; ++i) {
    getEL_DATE(i).innerHTML = value[i].date
    getEL_VAL(i).style.height = `0%`
    setTimeout(() => getEL_VAL(i).style.height = `${value[i].data * 100 / maxVAL}%`, 100)
    getEL_LAB(i).innerHTML = toFixedDigit(value[i].data)
  }

  function toFixedDigit(number) {
    if (number > 1e+6) return `${Math.floor(number / 1e+6)}.${Math.round(number % 1e+6 / 1e+5)}m`
    if (number > 1e+3) return `${Math.floor(number / 1e+3)}.${Math.round(number % 1e+3 / 1e+2)}k`
    return number
  }
  function getEL_LAB(index) {
    return getEL_VAL(index).children[0]
  }
  function getEL_VAL(index) {
    return specific_chart[index].children[0].children[0]
  }
  function getEL_DATE(index) {
    return specific_chart[index].children[1].children[0]
  }
}

function showDetails() {
  _$(`#more-details-pane`).classList.remove(`hidden`)
}

function hideDetails() {
  _$(`#more-details-pane`).classList.add(`hidden`)
}
