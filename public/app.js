function fetchAndVisualizeData(){
    fetch("./data.json")
    .then(r => r.json())
    .then(visualizeData)
}

fetchAndVisualizeData();


function visualizeData(data){
     visualiseMatchesPlayedPerYear(data.matchesPlayedPerYear);
     visualiseMatchesWonPerTeam(data.matchesWonPerTeam);
     visualiseExtraRuns2016(data.extraRuns2016);
     visualiseEconomicalPlayer(data.economicalBowler2015);
     visualiseMostManOfMatchStory(data.mostManOfMatchStory);
     return;
    }

function visualiseMatchesPlayedPerYear(matchesPlayedPerYear){
const a=[]
for(let year in matchesPlayedPerYear){
    a.push([year,matchesPlayedPerYear[year]])
}

Highcharts.chart("matches-played-per-year", {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Matches Played Per Year'
    },
    subtitle: {
        text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data?select=matches.csv" target="_blank">IPL Dataset</a>'
    },
    xAxis: {
        type: 'category',
        labels: {
            rotation: -45,
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Matches'
        }
    },
    legend: {
        enabled: false
    },
    tooltip: {
        pointFormat: 'Matches Played <b>{point.y:.0f}</b>'
    },
    series: [{
        name: 'Population',
        data:a,
        dataLabels: {
            enabled: true,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            format: '{point.y:.0f}', // one decimal
            y: 10, // 10 pixels down from the top
            style: {
                fontSize: '13px',
                fontFamily: 'Verdana, sans-serif'
            }
        }
    }]
});
}

function visualiseMatchesWonPerTeam(matchesWonPerTeam) {
  //console.log(matchesWonPerTeam)
    let Team = [], o = Object.values(matchesWonPerTeam), k = Object.keys(matchesWonPerTeam)

    //collecting all team names 
    for (let i in o) {
        for (let j of Object.keys(o[i])) {
            if (Team.indexOf(j) == -1) {
                Team.push(j)
            }
        }
    }
    //console.log(Team)
    Team = Team.filter(s => s != "")
    //preparing chart visualization
    let score, ser = []
    for (let i in Team) {
        score = []
        for (let j in o) {
            if (o[j][Team[i]] == undefined) {
                score.push(0)
            }
            else {
                score.push(o[j][Team[i]])
            }
        }

        ser.push({ "name": Team[i], "data": score })
    }

    Highcharts.chart("matches-won-per-team", {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Number of matches won by each team over all the years of IPL'
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data?select=matches.csv" target="_blank">IPL Dataset</a>'
        },
        xAxis: {
            categories: k,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Matches Won'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.0f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: ser,
    });
    
}

function visualiseExtraRuns2016(extraRuns) {
    let a = [];
    for (let i in extraRuns) {
        a.push([i, extraRuns[i]])
    }

Highcharts.chart("extra-Runs", {
        chart: {
            type: 'column'
        },
        title: {
            text: `Extra runs conceded by each team in 2016`,
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data?select=matches.csv" target="_blank">IPL Dataset</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Extra Runs'
            }
        },
        series: [{
            name: 'Extra Runs',
            data: a,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
            
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
}

function visualiseEconomicalPlayer(bowler){
    let ar=[];
    for(let i in bowler){
        ar.push([i,parseFloat(bowler[i])])
    }

    ar = ar.sort((a, b) => a[1] - b[1]).slice(0,10)

    Highcharts.chart("economical-bowler", {
chart: {
    type: 'column'
},
title: {
    text: `Top 10 Economical bowlers in Year 2015`
},
subtitle: {
    text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data?select=matches.csv" target="_blank">IPL Dataset</a>'
},
xAxis: {
    type: 'category',
    labels: {
        rotation: -45,
        style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
        }
    }
},
yAxis: {
    min: 0,
    title: {
        text: 'Economy'
    }
},
legend: {
    enabled: false
},
tooltip: {
    pointFormat: 'Economy: <b>{point.y:.2f}</b>'
},
series: [{
    name: 'Economy',
    data:ar,
    dataLabels: {
        enabled: true,
        rotation: -90,
        color: '#FFFFFF',
        align: 'right',
        format: '{point.y:.2f}', // one decimal
        y: 10, // 10 pixels down from the top
        style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
        }
    }
}]
});
}



function visualiseMostManOfMatchStory(mostManOfMatches) {

    let res = [], d = mostManOfMatches;
    for (var i in d) {
        if (d[i] > 9) {
            res.push([i, d[i]])
        }
    }
    res = res.sort((a, b) => b[1] - a[1]).filter(s => s[1] >= 11)


    Highcharts.chart("most-man-of-match", {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Story of Most Man Of the Match'
        },
        subtitle: {
            text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data?select=matches.csv" target="_blank">IPL Dataset</a>'
        },
        xAxis: {
            type: 'category',
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Matches Won'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Matches Won: <b>{point.y:.0f}</b>'
        },
        series: [{
            name: 'Population',
            data: res,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.0f}',
                y: 10,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });

}