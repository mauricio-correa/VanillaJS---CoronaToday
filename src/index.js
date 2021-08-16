import "./style.css";


const lodash = require("lodash");

let headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json",
});

var url = 'https://api.corona-zahlen.org/districts'

// fetch the data from the API
function fetchData() {
    fetch(url, {
        method: 'GET',
        headers: headers,
    })
        .then((res) => res.json())
        .then((data) => {
            createTable()
            createTableTop5()

            if (!data.data) {
                alert('An error has occurred. Self destruction will begin in ten seconds.')
                let myobj = document.getElementById("content");
                myobj.remove();

            } else if (data.data) {
                document.body.classList.add("loaded");
                // let top5 = [];
                //top5 = cases.slice(0, 15)
                let Cases = Object.values(data.data)
                Cases.sort((a, b) => {
                    return  b.weekIncidence - a.weekIncidence;
                });

                appendDataTop5(Cases)
                appendData(data.data)

            } else {
                alert('Sorry, the server is down. Try it later...')
                var myobj = document.getElementById("content");
                myobj.remove();
            }
        })

        .catch((err) => console.log(err));
};

// fuctoins to create elements CleanCode
function createElement(elementName, className) {
    let element = document.createElement(elementName);
    element.className = className
    return element
}
function createElementWithInnerText(elementName, innerText) {
    let element = document.createElement(elementName);
    element.innerText = innerText
    return element
}
// function to round number.
function roundIt(valueToRound) {
    return lodash.round(valueToRound, 2);
}
const tableDiv = document.querySelector("div.tableDiv")
let tableHeaders = ["nr.", "City", "Population", "Cases", "Cases/Week", "Casses/100k", "Week Incidence"]

function createTable() {

   let coronaTable = createElement('table', 'coronaTable')
   
    let coronaTableHead = createElement('thead', 'tableHead')
   
    let coronaTableHeaderRow = createElement('tr', 'tableHeaderRow')
   
    function createTableHeader(headerName) {
        let tableHeader = createElement('th', 'tableHeaderRow')
        tableHeader.innerText = headerName
        coronaTableHeaderRow.append(tableHeader)
    }

    tableHeaders.forEach(createTableHeader)

    coronaTableHead.append(coronaTableHeaderRow)
    coronaTable.append(coronaTableHead)
   
    let coronaTableBody = createElement('tbody', 'coronaTableBody')
    
    coronaTable.append(coronaTableBody)
    tableDiv.append(coronaTable)
}

// append data to the CoronaTable dinamically - all  districts
function appendData(allCases) {

    
    let myKeys = Object.keys(allCases);
    let singleScoreIndex = 1

    myKeys.forEach(key => {
            let singleScore = allCases[key]
            const coronaboardTable = document.querySelector('.coronaTable')
    
            let TableBodyRow = createElement('tr', 'scoreboardTableBodyRow')
    
            let numeral = createElementWithInnerText('td', singleScoreIndex)
    
            let name = createElementWithInnerText('td', singleScore.name)
    
            let population = createElementWithInnerText('td', new Intl.NumberFormat().format(singleScore.population))
    
            let cases = createElementWithInnerText('td', new Intl.NumberFormat().format(singleScore.cases))
    
            let casesPerWeek = createElementWithInnerText('td', new Intl.NumberFormat().format(singleScore.casesPerWeek))
    
            let casesPer100k = createElementWithInnerText('td', new Intl.NumberFormat().format(roundIt(singleScore.casesPer100k)))
    
            let weekIncidence = createElementWithInnerText('td', roundIt(singleScore.weekIncidence))
    
            TableBodyRow.append(numeral, name, population, cases, casesPerWeek, casesPer100k, weekIncidence)
    
            coronaboardTable.append(TableBodyRow)
    
            singleScoreIndex++;


    })

}

const tableDivTop5 = document.querySelector("div.tableDivTop5")
let tableHeadersTop5 = ["nr.", "City", "Casses/100k", "Week Incidence"]


function createTableTop5() {

    let coronaTable = createElement('table', 'coronaTableTop5')

    let coronaTableHead = createElement('thead', 'tableHead')

    let coronaTableHeaderRow = createElement('tr', 'tableHeaderRow')
   

    tableHeadersTop5.forEach(header => {
        let tableHeader = createElementWithInnerText('td', header)
        coronaTableHeaderRow.append(tableHeader)
    })

    coronaTableHead.append(coronaTableHeaderRow)
    coronaTable.append(coronaTableHead)

    let coronaTableBody = createElement('tbody', "coronaTableBody")
 
    coronaTable.append(coronaTableBody)
   tableDivTop5.append(coronaTable)
}

// append data to the CoronaTable dinamically - top 5
function appendDataTop5(allCases) {
    
    for(let i=0; i<16; i++){
        let singleScore = allCases[i]
        let singleScoreIndex = (i+1)
        
        const coronaboardTable = document.querySelector('.coronaTableTop5')

        let TableBodyRow = createElement('tr', 'scoreboardTableBodyRow')
       
        let numeral = createElementWithInnerText('td', singleScoreIndex)
       
        let name = createElementWithInnerText('td', singleScore.name)
       
        let casesPer100k = createElementWithInnerText('td', new Intl.NumberFormat().format(roundIt(singleScore.casesPer100k)))
       
        let weekIncidence = createElementWithInnerText('td', roundIt(singleScore.weekIncidence))
       
        TableBodyRow.append(numeral, name, casesPer100k, weekIncidence)
        coronaboardTable.append(TableBodyRow)

        singleScoreIndex++;
        };
}

// call the functions
fetchData();
