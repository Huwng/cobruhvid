function test() {
   // var x = document.getElementById("rektput").value
   let x = "vietnam"
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("https://api.covid19api.com/total/country/"+x, requestOptions)
       // .then(response => response.text())
       // .then(result => console.log(result))
       // .catch(error => console.log('error', error));
        .then(response => response.text())
        .then(result => wtfFunction(result))
        .catch(error => console.log('error', error));

  function wtfFunction(result) {
    var s
    s = JSON.parse(result[1])
    console.log(s.Country)
  }
}