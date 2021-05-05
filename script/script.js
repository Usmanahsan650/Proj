window.addEventListener('DOMContentLoaded',function(){
    var count=0,player1=[],player2=[];

    var board=new Array(8)
    for(i=0;i<board.length;i++){
        board[i]=new Array(8);
    }
    for(i=0;i<8;i++){
        for(j=0;j<8;j++){
            board[i][j]=1;
        }
    }

    container=document.getElementById("main")
    table=document.createElement("table")
    for(i=0;i<8;i++)
    {
    row=document.createElement("tr")
    table.appendChild(row)
    for(j=65;j<=65+7;j++){
        col=document.createElement("td");
        if(i%2!=0&&j%2==0)
        {
        col.style.backgroundColor="white"
        }else if(i%2==0&&j%2==1){
            col.style.backgroundColor="white"
           
            
           
        }else{
            col.style.backgroundColor="black"
        } 
        col.setAttribute("id",String.fromCharCode(j)+(Math.abs(i-8)))
        col.setAttribute("class","box")
        row.appendChild(col);
    }
    }
    function convert(id){
        // if(typeof id =="string"){
        let index=id[0]
        index=index.charCodeAt(0)
        index-=65;
        
        row=Math.abs(id[1]-8)
    
        let li=[row,index]
        return li
        // }
        // return id
    }
    function revert(p){
        let index=p[1]+65
        index=String.fromCharCode(index);
        row=Math.abs(p[0]-8)
        return index+row;
    }
    function check(id,p,flag=0){
        index=id;
        console.log(index[0])
        if(board[index[0]][index[1]]!==0&&((Math.abs(p[0]-index[0])==1&&Math.abs(p[1]-index[1])==2)||(Math.abs(p[0]-index[0])==2&&Math.abs(p[1]-index[1])==1)))
        {   if(flag==1)
                board[index[0]][index[1]]=0
            console.log("valid")
            return 1;
        }

        return 0;
    }
    function options(p){
            let li=[];
           let op=0,i=convert(p);
            let id=[[i[0]-2,i[1]-1],[i[0]-2,i[1]+1],[i[0]+2,i[1]-1],[i[0]+2,i[1]+1],[i[0]-1,i[1]-2],[i[0]-1,i[1]+2],[i[0]+1,i[1]-2],[i[0]+1,i[1]+2]]
           id.forEach(element => {
               console.log(i+" "+element)

               if((element[0]>=0&&element[0]<8)&&(element[1]>=0&&element[1]<8)&&check(element,i,0))
                  {
                      op++;
                      let box=document.getElementById(revert(element))
                     box.style.border="5px solid rgb(100, 255, 100)";
                     li.push(box); 
                     box.style.boxShadow="0 0 50px #00ff00"
                      box.addEventListener("click",()=>{
                         for(i=0;i<li.length;i++){
                            box=li[i];
                            box.style.border="";
                            box.style.boxShadow="";
                         } 
                            
                      })
                  }
           });
           console.log(op)
           return op;
    }
    function setbox(p){
      
        let box=document.getElementById(p);
        box.style.border="5px solid rgb(45, 165, 235)";
        box.style.boxShadow="0 0 15px #0463b1";

    }
    function unsetbox(p){
        let box=document.getElementById(p);
        box.style.border="";
        box.style.boxShadow="";

    }

    container.appendChild(table)
    let elements=document.querySelectorAll("td.box");
    for( i of elements){
        i.addEventListener("click",(event)=>{
            let id =event.target.id
            if(count%2==0)
            {
               
                if(count==0){
                    
                    console.log("Fdf")
                    player1=id;
                    let box=event.target;
                    box.innerHTML="&#9816"
                // box.style.border="5px solid rgb(45, 165, 235)";
                    box.style.boxShadow="0 0 15px #0463b1";
                    setTimeout(()=>{
                    box.style.border="";
                    box.style.boxShadow="";
                    },1000)
                    let t=convert(id);
                    board[t[0]][t[1]]=0;
                }
                else if(check(convert(id),convert(player1),1)){
                    unsetbox(player1)
                    player1=id //prev
                    let box=event.target;
                    box.innerHTML="&#9816"
                    // box.style.border="5px solid rgb(45, 165, 235)";
                    box.style.boxShadow="0 0 15px #0463b1";
                    setTimeout(()=>{
                    box.style.border="";
                    box.style.boxShadow="";
                    },1000)
                    setbox(player2)
                    if(options(player2)==0){
                        let b=document.getElementById(player2)
                        b.style.backgroundColor="pink"
                        b.style.border="5px solid rgb(255, 102, 120)";
                        b.style.boxShadow="0 0 15px #FF0000";
                        document.getElementById("info").innerHTML="Team Red Won"
                    }
                }
                else{
                    
                    let box=event.target;
                    box.style.border="5px solid rgb(255, 0, 0)";
                    box.style.boxShadow="0 0 15px #FF0000";
                    setTimeout(()=>{
                    box.style.border="";
                    box.style.boxShadow="";
                    setbox(player1)
                    },1000,false)

                    count-=1
                    // if(id==player1){
                    //     console.log("gegeg"+player1)
                    //  setbox(player1)   
                    // }
                }
            }else{
                if(count==1){
                    player2=id;
                    let box=event.target;
                    box.innerHTML="&#9816"
                    box.style.color="blue"
                    // box.style.border="5px solid rgb(45, 165, 235)";
                    box.style.boxShadow="0 0 15px #0463b1";
                    setTimeout(()=>{
                        box.style.border="";
                        box.style.boxShadow="";
                    },1000)
                    setbox(player1)
                    options(player1)
                    let t=convert(id);
                    board[t[0]][t[1]]=0

                }
                else if(check(convert(id),convert(player2),1)){
                    unsetbox(player2)
                    player2=id;
                    let box=event.target;
                    box.innerHTML="&#9816"
                    box.style.color="blue"
                    // box.style.border="5px solid rgb(45, 165, 235)";
                    box.style.boxShadow="0 0 15px #0463b1";
                    setTimeout(()=>{
                        box.style.border="";
                        box.style.boxShadow="";
                    },1000)
                    setbox(player1)
                    if(options(player1)==0){
                        let b=document.getElementById(player1)
                        b.style.backgroundColor="pink"
                        b.style.border="5px solid rgb(255, 102, 120)";
                        b.style.boxShadow="0 0 15px #FF0000";
                        document.getElementById("info").innerHTML="Team Blue Won"
                    }
                } else{
                    let box=event.target;
                    box.style.border="5px solid rgb(255, 0, 0)";
                    box.style.boxShadow="0 0 15px #FF0000";
                    setTimeout(()=>{
                    box.style.border="";
                    box.style.boxShadow="";
                    setbox(player2)
                    },1000)
                    count-=1
                  
                }
                
            }
            count+=1
            console.log(id)
            
        
            
        });   //end event
    }
    document.getElementById("reset").addEventListener("click",()=>{
        window.location.reload();
    })
    
})
