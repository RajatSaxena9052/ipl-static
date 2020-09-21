function economicalBowler2015(matches,deliveries){
let matchId=[]
//check the year season's = [team id]

for(let match of matches){
    if(match.season == 2015){
        matchId.push(match.id)
}
}


//check the year season's = [bowler names]

let x=[]
for(let k of matchId){
    //console.log(k)
    for(var del of deliveries){
            if(del.match_id == k){
                x.push(del.bowler)
            }
        }
    }
x=Array.from(new Set(x))

let ball=0,runs=0,overs=0,econ=0,p;
    p={}
    for(let player of x){
        runs=0;
        ball=0;
        for(let del of deliveries){
            if(del.bowler == player){
            if(matchId.indexOf(del.match_id)!=-1){
                    if( del.wide_runs==0 && del.noball_runs == 0){    
                        runs += parseInt(del.total_runs)
                        ball +=1
                    }
                }
            }
        }
        overs=ball/6;
        econ=(runs/overs).toFixed(2);
        if(econ <=7){
            p[player]=econ
        }
    }

return p
}

module.exports=economicalBowler2015;