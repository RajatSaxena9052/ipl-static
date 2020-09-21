function matchesWonPerTeam(matches){
    const team=[],year=[],res={}

//checking alll the years    
    for(let y of matches){
        if(year.indexOf(y.season)===-1){
            year.push(y.season)
        }
    }
year.sort()
    //picking all the winning teams
    for(var win of matches){
        if(win.winner==""){
            continue
        }
        if(team.indexOf(win.winner)==-1 ){
            team.push(win.winner)
        }
        else{
            continue
        }
    }

//getting the required result
for(let se of year){
    let ch={}
    for(let t in matches){
        if(se==matches[t].season){
            if(ch[matches[t].winner]){
                ch[matches[t].winner]+=1
            }
            else{
                ch[matches[t].winner]=1
            }
        }
    }
   res[se]=ch 
}
return res
}

module.exports=matchesWonPerTeam;
