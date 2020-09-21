function extraRuns2016(deliveries){
let id=[ '577','578','579','580','581','582','583','584','585','586','587','588','589','590','591','592','593','594','595','596','597','598','599','600','601','602','603','604','605','606','607','608','609','610','611','612','613','614','615','616','617','618','619','620','621','622','623','624','625','626','627','628','629','630','631','632','633','634','635','636' ]
let re={}
for(let i in id){
    for(let delivery of deliveries){
        if(delivery.match_id== id[i]){
            if(re[delivery.batting_team]){
                re[delivery.batting_team]+=parseInt(delivery.extra_runs)
            }
            else{
                re[delivery.batting_team]=parseInt(delivery.extra_runs)
            }
        }
    }
}
return re
}
module.exports=extraRuns2016;