window.addEventListener('DOMContentLoaded',function(){
    container=document.getElementById("main")
    table=document.createElement("table")
    for(i=0;i<8;i++)
    {
    row=document.createElement("tr")
    table.appendChild(row)
    for(j=65;j<=65+8;j++){
        col=document.createElement("td");
        if(i%2!=0&&j%2==0)
        {
        col.style.backgroundColor="black"
        }else if(i%2==0&&j%2==1){
            col.style.backgroundColor="black"
           
            
           
        }else{
            col.style.backgroundColor="white"
        } 
        col.setAttribute("id",String.fromCharCode(j)+(Math.abs(i-8)))
        col.setAttribute("class","box")
        row.appendChild(col);
    }
    }
    container.appendChild(table)
    elements=document.querySelectorAll("td.box");
    for( i of elements){
        i.addEventListener("click",(event)=>{
            console.log("ih")
            event.target.innerHTML="&#9816"
            
        });
    }
    
    
})