let solverStartTime;
function findMax(rhythm, melody,solutions){
    solverStartTime = Date.now();
    for(let i=1;i<=Math.max(...rhythm);i++){
        if(isFeasible(rhythm,melody,[0,i])==true){
            solutions[0].push([0,i]);
        }
    }
    let keepGoing=true;
    do{
        keepGoing=considerCombinations(solutions,solutions.length-1,solutions.length-1, rhythm, melody);
        console.log(keepGoing);
    } while(keepGoing==true)
    

    for(let k=solutions.length-1;k>=0;k--){
        if(keepGoing==false){keepGoing=considerCombinations(solutions,solutions.length-1,k, rhythm, melody);}
    }
    
    if(keepGoing==="quit"){
        solutions.push("quit");
    }
    
}

function considerCombinations(solutions,set1,set2, rhythm, melody){
    
    solutions.push([]);
    for(let i=0;i<solutions[set1].length;i++){
        for(let j=0;j<solutions[set2].length;j++){

            if(Date.now()-solverStartTime>15000){
                return "quit"
            }

            
            const combination = [...solutions[set1][i]];
            const m = Math.max(...solutions[set1][i]);
            for(let n=1;n<solutions[set2][j].length;n++){
                combination.push(solutions[set2][j][n]+m);
            }
            if(Math.max(...combination)<=Math.max(...rhythm) && isFeasible(rhythm,melody,combination)==true){
                solutions[solutions.length-1].push(combination);
            }
        }
    }
    if(solutions[solutions.length-1].length==0){
        solutions.splice(solutions.length-1,1)
        return false;
    } else {
        return true;
    }
}


function isFeasible(rhythm,melody,hShifts){
    
    const numBeats = Math.max(...rhythm)+Math.max(...hShifts)+1;
    let score=[];
    for(let i=0;i<hShifts.length;i++){
        score.push(new Array().fill(null));
        for(let j=0;j<rhythm.length;j++){
            score[i][rhythm[j]+hShifts[i]]=melody[j];
        }
    }
    console.log(score[score.length-1]);
    for(let beat=0;beat<numBeats;beat++){
        for(let i=0;i<score.length;i++){
            for(let j=i+1;j<score.length;j++){
                if(score[i][beat]!=null && score[j][beat]!=null){
                    //if(score[j][beat]!=score[i][beat]){
                        for(let k=0;k<score[j].length;k++){
                            if(score[j][k]!=null){
                                if(score[i][k]==null){
                                    score[i][k]=score[j][k]-(score[j][beat]-score[i][beat]);
                                } else {
                                    if(score[j][k]-(score[j][beat]-score[i][beat])!=score[i][k]){
                                        return false;
                                    }
                                }
                            }
                        }
                        score.splice(j,1);
                        j--;
                    //}
                }
            }
        }
    } 
    console.log(hShifts);
    console.log(score);
    return true
}



