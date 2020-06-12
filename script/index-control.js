(function () {
    /**@type {HTMLInputElement} */
    let inp_region = _$(`#inp-region`)
    let smt_region = _$(`#search-region`)

    let sumary_aprox_data = fetch_JSON_API(`https://api.covid19api.com/summary`)
    let sumary_json_data = undefined
    sumary_aprox_data.then(ex => {
        sumary_json_data = ex
    })

    let waitData = setInterval(function () {
        if (sumary_json_data != undefined) {
            // console.log(sumary_json_data[`Global`])
            fetchGlobal()
            clearInterval(waitData)
        }
    }, 100)

    _$(`#fetch-Global`).addEventListener(`click`, function() {
        fetchGlobal()
    })

    smt_region.addEventListener(`click`, function () {
        let data = inp_region.value
        // console.log(data)
        refresh_Region_tab(data)
        showPopup(`#p-s-region`)
    })

    _$(`#b-c-region`).addEventListener('click', function() {
        hidePopup(`#p-s-region`)
    })

    //! Function ZONE
    function fetchGlobal() {
        _$("#footer-updateday").innerHTML = Date(sumary_json_data.Date)
        setChartGlobal()
        setSummary()
        highlightCard(1, false)
        highlightCard(2, false)
        highlightCard(3, false)
    }
    function setSummary() {
        incDAT(0, sumary_json_data.Global.TotalConfirmed, 1000, _$(`#sum-inf-total`))
        incDAT(0, sumary_json_data.Global.TotalDeaths, 1000, _$(`#sum-inf-tdeath`))
        incDAT(0, sumary_json_data.Global.NewDeaths, 1000, _$(`#sum-inf-ndeath`))
        incDAT(0, sumary_json_data.Global.NewConfirmed, 1000, _$(`#sum-inf-ntotal`))
        incDAT(0, sumary_json_data.Global.NewRecovered, 1000, _$(`#sum-inf-nrecovered`))
        incDAT(0, sumary_json_data.Global.TotalRecovered, 1000, _$(`#sum-inf-trecovered`))
        _$(`#footer-watchingCountry`).innerText = `Global`
    }
    function regionalSetSummary(index) {
        incDAT(0, sumary_json_data.Countries[index].TotalConfirmed, 1000, _$(`#sum-inf-total`))
        incDAT(0, sumary_json_data.Countries[index].TotalDeaths, 1000, _$(`#sum-inf-tdeath`))
        incDAT(0, sumary_json_data.Countries[index].NewDeaths, 1000, _$(`#sum-inf-ndeath`))
        incDAT(0, sumary_json_data.Countries[index].NewConfirmed, 1000, _$(`#sum-inf-ntotal`))
        incDAT(0, sumary_json_data.Countries[index].NewRecovered, 1000, _$(`#sum-inf-nrecovered`))
        incDAT(0, sumary_json_data.Countries[index].TotalRecovered, 1000, _$(`#sum-inf-trecovered`))
        _$(`#footer-watchingCountry`).innerText = `${sumary_json_data.Countries[index].Country}`
    }
    function setChartGlobal() {
        /**@type {Array<{"Country","CountryCode","Slug","NewConfirmed","TotalConfirmed","NewDeaths","TotalDeaths","NewRecovered","TotalRecovered","Date"}>} */
        let c_dat = sumary_json_data.Countries
        c_dat.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
        let p1 = Math.round(c_dat[0].TotalConfirmed * 100 / sumary_json_data.Global.TotalConfirmed)
        let p2 = Math.round(c_dat[1].TotalConfirmed * 100 / sumary_json_data.Global.TotalConfirmed)
        let p3 = Math.round(c_dat[2].TotalConfirmed * 100 / sumary_json_data.Global.TotalConfirmed)
        setVal_sC(1, p1 + p2 + p3, p1, c_dat[0].Country)
        setVal_sC(2, p2 + p3, p2, c_dat[1].Country)
        setVal_sC(3, p3 , p3, c_dat[2].Country)
        // console.log(c_dat)
    }
    function regionalSetChart(id) {
        let c_dat = sumary_json_data.Countries
        let p1 = c_dat[0].TotalConfirmed * 100.0 / sumary_json_data.Global.TotalConfirmed
        let p2 = c_dat[1].TotalConfirmed * 100.0 / sumary_json_data.Global.TotalConfirmed
        let p3 = c_dat[id].TotalConfirmed * 100.0 / sumary_json_data.Global.TotalConfirmed
        setVal_sC(1, p1 + p2 + p3, p1, c_dat[0].Country)
        setVal_sC(2, p2 + p3, p2, c_dat[1].Country)
        setVal_sC(3, p3, p3, c_dat[id].Country)
    }
    function setVal_sC(cx, val, percent, name) {
        setStyle(`#chart-graph-cx${cx}`, `strokeDashoffset`, `calc(502.65 - (502.65 * ${val}) / 100)`)
        incDAT(0, percent, 1000, _$(`#chart-ptr-cx${cx}`), `%`)
        _$(`#chart-nat-lab${cx}`).innerText = name
    }
    function refresh_Region_tab(filterTXT) {
        let tb = _$(`#region-tab-sl`)
        /**@type {Array<{"Country","CountryCode","Slug","NewConfirmed","TotalConfirmed","NewDeaths","TotalDeaths","NewRecovered","TotalRecovered","Date"}>} */
        let cn = sumary_json_data.Countries
        tb.innerHTML = ``
        let exp = filterRegion(filterTXT)
        for (let i in cn) {
            if (cn[i].Country.match(exp) != undefined) {
                tb.appendChild(cRE(cn[i].Country, i, function(i) {
                    if (i > 2) {
                        regionalSetChart(i)
                        regionalSetSummary(i)
                        highlightCard(1, false)
                        highlightCard(2, false)
                        highlightCard(3, true)
                    } else {
                        fetchGlobal()
                        regionalSetSummary(i)
                        highlightCard(0 - `-${i}` + 1, true)
                    }
                }))
            }
        }
    }
    function highlightCard(id, on) {
        let highlighter = on ? `#00000033` : `#00000000`
        setStyle(`#name-card${id}`, `background`, highlighter)
    }
    //! Function ZONE
}).call(this)


