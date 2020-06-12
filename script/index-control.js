// (function () {
    /**@type {HTMLInputElement} */
    let inp_region = _$(`#inp-region`)
    let smt_region = _$(`#search-region`)
    let tab_region = _$(`#region-table`)

    let sumary_aprox_data = fetch_JSON_API(`https://api.covid19api.com/summary`)
    let sumary_json_data = undefined
    sumary_aprox_data.then(ex => {
        sumary_json_data = ex
    })

    let waitData = setInterval(function () {
        if (sumary_json_data != undefined) {
            // console.log(sumary_json_data[`Global`])
            document.getElementById("updateday").innerHTML = Date(sumary_json_data.Date)
            setChart()
            setSummary()
            clearInterval(waitData)
        }
    }, 100)

    function setSummary() {
        incDAT(0, sumary_json_data.Global.TotalConfirmed, 1000, _$(`#sum-inf-total`))
        incDAT(0, sumary_json_data.Global.TotalDeaths, 1000, _$(`#sum-inf-tdeath`))
        incDAT(0, sumary_json_data.Global.NewDeaths, 1000, _$(`#sum-inf-ndeath`))
        incDAT(0, sumary_json_data.Global.NewConfirmed, 1000, _$(`#sum-inf-ntotal`))
        incDAT(0, sumary_json_data.Global.NewRecovered, 1000, _$(`#sum-inf-nrecovered`))
        incDAT(0, sumary_json_data.Global.TotalRecovered, 1000, _$(`#sum-inf-trecovered`))
    }
    function regionalsetSummary() {
        incDAT(0, sumary_json_data.Countries[i].TotalConfirmed, 1000, _$(`#sum-inf-total`))
        incDAT(0, sumary_json_data.Countries[i].TotalDeaths, 1000, _$(`#sum-inf-tdeath`))
        incDAT(0, sumary_json_data.Countries[i].NewDeaths, 1000, _$(`#sum-inf-ndeath`))
        incDAT(0, sumary_json_data.Countries[i].NewConfirmed, 1000, _$(`#sum-inf-ntotal`))
        incDAT(0, sumary_json_data.Countries[i].NewRecovered, 1000, _$(`#sum-inf-nrecovered`))
        incDAT(0, sumary_json_data.Countries[i].TotalRecovered, 1000, _$(`#sum-inf-trecovered`))
    }
    function setChart() {
        /**@type {Array<{"Country","CountryCode","Slug","NewConfirmed","TotalConfirmed","NewDeaths","TotalDeaths","NewRecovered","TotalRecovered","Date"}>} */
        let c_dat = sumary_json_data.Countries
        c_dat.sort((a, b) => b.TotalConfirmed - a.TotalConfirmed)
        setVal_sC(1, Math.round(c_dat[0].TotalConfirmed * 100 / sumary_json_data.Global.TotalConfirmed), c_dat[0].Country)
        setVal_sC(2, Math.round(c_dat[1].TotalConfirmed * 100 / sumary_json_data.Global.TotalConfirmed), c_dat[1].Country)
        setVal_sC(3, Math.round(c_dat[2].TotalConfirmed * 100 / sumary_json_data.Global.TotalConfirmed), c_dat[2].Country)
        // console.log(c_dat)
    }

    function setVal_sC(cx, percent, name) {
        setStyle(`#chart-graph-cx${cx}`, `strokeDashoffset`, `calc(502.65 - (502.65 * ${percent}) / 100)`)
        _$(`#chart-ptr-cx${cx}`).innerText = `${percent}%`
        _$(`#chart-nat-lab${cx}`).innerText = name
    }

    smt_region.addEventListener(`click`, function () {
        let data = inp_region.value
        // the thing below is just a terrible snippet, might as well delete it.
        for (i=0; i<sumary_json_data.Countries.length-1; i++) {
            if ((sumary_json_data.Countries[i].Country = data) || (sumary_json_data.Countries[i].Slug = data) || (sumary_json_data.Countries[i].CountryCode = data) ) {
                document.getElementById("watching").innerHTML = sumary_json_data.Countries[i].Country
                regionalsetSummary()


            }
        }
    })

// }).call(this)