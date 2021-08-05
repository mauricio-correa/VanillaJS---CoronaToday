import "./style.css";
const lodash = require("lodash");  

const fetch = require('node-fetch');
let headers = new Headers ({
    "Accept": "application/json",
    "Content-Type": "application/json",
      });

var url = 'https://api.corona-zahlen.org/districts'

// fetch the data from the API
function fetchData() { fetch(url, {
    method: 'GET',
    headers: headers,
})
.then((res) => res.json())
.then((data)=> {
    createTable()
    createTableTop5()
    var cases = [];
    
    for(var i in data.data) {    
        var item = data.data[i];   
        cases.push({ 
            "name" : item.name,
            "population": item.population,
            "cases": item.cases,
            "casesPerWeek": item.casesPerWeek,
            "casesPer100k": item.casesPer100k,
            "weekIncidence": item.weekIncidence
        });
    }
    cases.sort((a, b) => {
        return  b.weekIncidence - a.weekIncidence;
    });
    if (cases.length == 0){
        alert('An error has occurred. Self destruction will begin in ten seconds.')
        console.log('chau')
        var myobj = document.getElementById("content");
        myobj.remove();

    } else {
    var top5 = [];
    top5 = cases.slice(0,15)
    appendData(cases)
    appendDataTop5(top5)
}
})

.catch((err) => console.log(err)); 
};

// create CoronaTable dinamically - all districts

 const tableDiv = document.querySelector("div.tableDiv")
 let tableHeaders = ["nr.", "City", "Population", "Cases", "Cases/Week", "Casses/100k", "Week Incidence"]

 function createTable (){
     let coronaTable = document.createElement('table')
     coronaTable.className = 'coronaTableTop5'

     let coronaTableHead = document.createElement('thead')
     coronaTableHead.className = 'tableHead'

     let coronaTableHeaderRow = document.createElement('tr')
     coronaTableHeaderRow.className = 'tableHeaderRow'
     
     tableHeaders.forEach(header => {
         let tableHeader = document.createElement('th')
         tableHeader.innerText = header
         coronaTableHeaderRow.append(tableHeader)
     })

     coronaTableHead.append(coronaTableHeaderRow)
     coronaTable.append(coronaTableHead)

     let coronaTableBody = document.createElement('tbody')
     coronaTableBody.className = "coronaTableBody"

     coronaTable.append(coronaTableBody)
     tableDiv.append(coronaTable)
 }

 // append data to the CoronaTable dinamically - all  districts
 function appendData(c) {
    for(let i=0; i< c.length; i++){
        let singleScore = c[i]
        let singleScoreIndex = (i+1)

         const coronaboardTable = document.querySelector('.coronaTableTop5')
         let TableBodyRow = document.createElement('tr')
         TableBodyRow.className = 'scoreboardTableBodyRow'

         let numeral = document.createElement('td')
         numeral.innerText = singleScoreIndex

         let name = document.createElement('td')
         name.innerText = singleScore.name

         let population = document.createElement('td')
         let popul = new Intl.NumberFormat().format(singleScore.population)
         population.innerText = popul

         let cases = document.createElement('td')
         let casesnr = new Intl.NumberFormat().format(singleScore.cases)
         cases.innerText = casesnr

         let casesPerWeek = document.createElement('td')
         let casesPWeek = new Intl.NumberFormat().format(singleScore.casesPerWeek)
         casesPerWeek.innerText = casesPWeek

         let casesPer100k = document.createElement('td')
         var rounded = lodash.round(singleScore.casesPer100k, 2);
         let casesPweek = new Intl.NumberFormat().format(rounded)
         casesPer100k.innerText = casesPweek

         let weekIncidence = document.createElement('td')
         var rounded = lodash.round(singleScore.weekIncidence, 2);
         weekIncidence.innerText = rounded

         TableBodyRow.append(numeral, name, population, cases, casesPerWeek, casesPer100k, weekIncidence)
        
         coronaboardTable.append(TableBodyRow)

    }
 }

// create CoronaTable dinamically - top 5
const tableDivTop5 = document.querySelector("div.tableDivTop5")
let tableHeadersTop5 = ["nr.", "City", "Casses/100k", "Week Incidence"]


function createTableTop5 (){
    let coronaTable = document.createElement('table')
    coronaTable.className = 'coronaTable'

    let coronaTableHead = document.createElement('thead')
    coronaTableHead.className = 'tableHead'

    let coronaTableHeaderRow = document.createElement('tr')
    coronaTableHeaderRow.className = 'tableHeaderRow'
    
    tableHeadersTop5.forEach(header => {
        let tableHeader = document.createElement('th')
        tableHeader.innerText = header
        coronaTableHeaderRow.append(tableHeader)
    })

    coronaTableHead.append(coronaTableHeaderRow)
    coronaTable.append(coronaTableHead)

    let coronaTableBody = document.createElement('tbody')
    coronaTableBody.className = "coronaTableBody"

    coronaTable.append(coronaTableBody)
    tableDivTop5.append(coronaTable)
}

// append data to the CoronaTable dinamically - top 5
function appendDataTop5(c) {
    console.log('c    ---', c)
   for(let i=0; i< c.length; i++){
       let singleScore = c[i]
       let singleScoreIndex = (i+1)

        const coronaboardTable = document.querySelector('.coronaTable')
        let TableBodyRow = document.createElement('tr')
        TableBodyRow.className = 'scoreboardTableBodyRow'

        let numeral = document.createElement('td')
        numeral.innerText = singleScoreIndex

        let name = document.createElement('td')
        name.innerText = singleScore.name

       
        let casesPer100k = document.createElement('td')
        var rounded = lodash.round(singleScore.casesPer100k, 2);
        let casesPweek = new Intl.NumberFormat().format(rounded)
        casesPer100k.innerText = casesPweek

        let weekIncidence = document.createElement('td')
        var rounded = lodash.round(singleScore.weekIncidence, 2);
        weekIncidence.innerText = rounded

        TableBodyRow.append(numeral, name, casesPer100k, weekIncidence)
        coronaboardTable.append(TableBodyRow)

   }
}
 
// call the functions
 fetchData();

 setTimeout(function setTimeout() {
    document.body.classList.add("loaded");
  }, 1000);