import "./style.css";
const lodash = require("lodash");  

const fetch = require('node-fetch');
let headers = new Headers ({
    "Accept": "application/json",
    "Content-Type": "application/json",
      });

var url = 'https://api.corona-zahlen.org/states'

// fetch the data from the API
function fetchData() { fetch(url, {
    method: 'GET',
    headers: headers,
})
.then((res) => res.json())
.then((data)=> {
    createTable()
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
    console.log('cases', cases)
    appendData(cases)
})

.catch((err) => console.log(err)); 
};

// create CoronaTable dinamically

 const tableDiv = document.querySelector("div.tableDiv")
 let tableHeaders = ["nr.", "State", "Population", "Cases", "Cases/Week", "Casses/100k", "Week Incidence"]

 function createTable (){
     let coronaTable = document.createElement('table')
     coronaTable.className = 'coronaTable'

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

 // append data to the CoronaTable dinamically
 function appendData(c) {
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

// call the functions
 fetchData();

