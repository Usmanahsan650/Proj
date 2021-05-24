window.addEventListener('DOMContentLoaded',function(){
    let move=String() //best
    var count=0,player1=[],player2=[];
    var grid=new Array(8)
    var board=new Array(8)
    for(i=0;i<board.length;i++){
        grid[i]=new Array(8)
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
// class node{
//     constructor(){
//         this.val=0
//         this.childrens=[]    
//     }
// } 
function printgr(g){
    for (i=0;i<8;i++)
    {
    for(j=0;j<8;j++)
    console.log(g[i][j])
    console.log("\n")
    }
}
function max(pos,pos2,grid){
    console.log("pass 1")
        if(isTerminal(pos,pos2,grid)){
            console.log("pass 3")
            return utility(pos,pos2,grid)
        }
        else{
            console.log("pass 2")
            let i=pos
            let id=[[i[0]-2,i[1]-1],[i[0]-2,i[1]+1],[i[0]+2,i[1]-1],[i[0]+2,i[1]+1],[i[0]-1,i[1]-2],[i[0]-1,i[1]+2],[i[0]+1,i[1]-2],[i[0]+1,i[1]+2]]
            let max=new Array(2);
            
            max[0]=0
            id.forEach(element => {
                console.log(element)
                // console.log(checkT(element,pos,grid))
                if((element[0]>=0&&element[0]<8)&&(element[1]>=0&&element[1]<8)&&checkT(element,pos,grid)){
                    console.log("pass 5")
                    let t=min(element,pos2,grid)
                    if(t[0]>max[0]){
                        console.log(t)
                        max=t
                        move=element
                        
                    }
                }
                
        });    
        return max
    }
    }
    function min(pos,pos2,grid){
        console.log("min")
        if(isTerminal(pos,pos2,grid)){
            console.log(utility(pos,pos2,grid))
            return utility(pos,pos2,grid)
        }
        else{
            let i=pos2
            let id=[[i[0]-2,i[1]-1],[i[0]-2,i[1]+1],[i[0]+2,i[1]-1],[i[0]+2,i[1]+1],[i[0]-1,i[1]-2],[i[0]-1,i[1]+2],[i[0]+1,i[1]-2],[i[0]+1,i[1]+2]]
            let min=new Array(2);
            min=[8,8]

            id.forEach(element => {
                if((element[0]>=0&&element[0]<8)&&(element[1]>=0&&element[1]<8)&&checkT(element,pos,grid)){
                    let t=max(pos,element,grid)
                
                    if(t[0]<min[0]){
                        console.log(t)
                        min=t;
                    }
                }
                
            });    
            return min;
        }
        }

    function isTerminal(pos,pos2,grid){
        if(!optionsT(pos,grid)){
            return 1;
        }
        if(!optionsT(pos2,grid)){
            return 1;
        }
        else{
            return 0;
        }
    }
    function utility(pos,pos2,grid){
        let t=Array(2);
        t.push(optionsT(pos,grid))
        t.push(pos2,grid)
        return t;

    }
//  createTree(){

// }
//logic 
function hint(move){
    let id=revert(move)
    console.log(id)
    let box=document.getElementById(id)
    box.style.border="5px solid rgb(100, 100,190 )";
                      
}
document.getElementById("hint").addEventListener("click",()=>{
    // createTree()
    for (i=0;i<8;i++)
    {
    for(j=0;j<8;j++)
    grid[i][j]=board[i][j]
    }
    let p1=convert(player1)
    let p2=convert(player2)
    console.log(max(p1,p2,grid))
    console.log(move)
    hint(move)
    // printgr(board)

})
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
        if(board[index[0]][index[1]]!==0&&((Math.abs(p[0]-index[0])==1&&Math.abs(p[1]-index[1])==2)||(Math.abs(p[0]-index[0])==2&&Math.abs(p[1]-index[1])==1)))
        {   if(flag==1)
                board[index[0]][index[1]]=0
            console.log("valid")
            return 1;
        }

        return 0;
    }

    function checkT(id,p,grid,flag=1){
        index=id;
        // printgr(grid)
        console.log(index[0],index[1])
        if(grid[index[0]][index[1]]!==0&&((Math.abs(p[0]-index[0])==1&&Math.abs(p[1]-index[1])==2)||(Math.abs(p[0]-index[0])==2&&Math.abs(p[1]-index[1])==1)))
        {  if(flag==1)
            grid[index[0]][index[1]]=0
            console.log("valid")
            return 1;
        }
        return 0;
    }
    function optionsT(p,grid){
        let li=[];
       let op=0,i=p;
       
        let id=[[i[0]-2,i[1]-1],[i[0]-2,i[1]+1],[i[0]+2,i[1]-1],[i[0]+2,i[1]+1],[i[0]-1,i[1]-2],[i[0]-1,i[1]+2],[i[0]+1,i[1]-2],[i[0]+1,i[1]+2]]
       id.forEach(element => {
           console.log(i+" "+element)

           if((element[0]>=0&&element[0]<8)&&(element[1]>=0&&element[1]<8)&&checkT(element,i,grid,0))
              {
                  op++;
                //   let box=document.getElementById(revert(element))
                //  box.style.border="5px solid rgb(100, 255, 100)";
                //  li.push(box); 
                //  box.style.boxShadow="0 0 50px #00ff00"
                //   box.addEventListener("click",()=>{
                //      for(i=0;i<li.length;i++){
                //         box=li[i];
                //         box.style.border="";
                //         box.style.boxShadow="";
                //      } 
                        
                //   })
              }
       });
       console.log(op)
       return op;
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
                    let t=convert(id)
                    board[t[0]][t[1]]=0
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
                    if(options(player2)==0){   //player2 loses
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
                    t=convert(id)
                    board[t[0]][t[1]]=0
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
                    if(options(player1)==0){   //player1 loses
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
