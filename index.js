const fs = require("fs")
const csv = require('csvtojson')
const DELIVERIES_FILE_PATH ="./csv_data/deliveries.csv"
const MATCHES_FILE_PATH="./csv_data/matches.csv"
const matchesPlayedPerYear = require("./evaluatingdata/matchesPlayedPerYear")
const matchesWonPerTeam = require("./evaluatingdata/matchesWonPerTeam")
const mostManOfMatchStory = require("./evaluatingdata/mostManOfMatchStory")
const extraRuns2016 = require("./evaluatingdata/extraRuns2016")
const economicalBowler2015 = require("./evaluatingdata/economicalBowler2015")
const JSON_OUTPUT_FILE_PATH="./public/data.json"


function main(){
csv()
.fromFile(MATCHES_FILE_PATH)
.then(matches=>{
    csv()
    .fromFile(DELIVERIES_FILE_PATH)
    .then(deliveries=>{
           let result1 = matchesPlayedPerYear(matches);
           let result2 = matchesWonPerTeam(matches);
           let result3 = extraRuns2016(deliveries);
           let result4 = economicalBowler2015(matches,deliveries);
           let result5 = mostManOfMatchStory(matches);
            saveData(result1,result2,result3,result4,result5);
        })
})
}

function saveData(result1,result2,result3,result4,result5) {
const jsonData={
    matchesPlayedPerYear:result1,
    matchesWonPerTeam:result2,
    extraRuns2016:result3,
    economicalBowler2015:result4,
    mostManOfMatchStory:result5
}
const jsonString=JSON.stringify(jsonData);
fs.writeFile(JSON_OUTPUT_FILE_PATH,jsonString,"utf8",err=>{
    if(err){
    console.error(err);
    }
    });
}


main();