const tbody = document.getElementsByTagName('tbody')[0];
let bool = true;

function sirala(){
    let tr= [...tbody.getElementsByTagName('tr')];
    let count=1;
    tr.forEach(a=>{
        a.querySelector('td').innerText=count++;
    })
}

function addRow(){
    if(bool){
       
        let time = new Date();
        tbody.innerHTML+=`
            <tr>
                <td></td>
                <td><input type="text" placeholder="Name"></td>
                <td><input type="text" placeholder="Surname"></td>
                <td><input type="text" placeholder="Phone"></td>
                <td><input readonly type="text" value="${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}"></td>
                <td>
                    <button class="save-btn" onclick= "save(this)">Save</button>
                    <button class="cancel-btn" onclick= "cancel (this)">Cancel</button>

                </td>
            </tr>
        `;   
        bool=!bool; 
    }
    sirala();
   
}

function save(btn){
    let inputs = [... document.getElementsByTagName('input')];
    let check=true;
    
    inputs.forEach(function(a){
        a.classList.remove('error');
        if(a.value.length<3){
            a.classList.add('error');
            check=false;
        }
    })
    if(check){
        inputs.forEach(function(a){
            a.classList.remove('error');
            a.parentElement.innerHTML=a.value;
        });
        bool=!bool; 
        btn.innerText = 'Edit';
        btn.setAttribute('onclick','edit(this)');
        btn.nextElementSibling.innerHTML='Delete'; 
        
    }
    
}
function cancel(btn){
    btn.closest('tr').remove();// closest btne en yaxin olar trni goturur
    bool=true;
    sirala();
}
function edit(btn){
    let tr=btn.closest('tr');
   [...tr.children].forEach(function(value,key){
       if(key!=0 && key!=5){
           let temp = value.innerText;
           value.innerHTML=`
                <input type="text" value="${temp}">
           `
       }
   });
   btn.innerText='Save';
   btn.setAttribute('onclick','save(this)');
   btn.setAttribute('class','save-btn'); 
   bool=!bool;
}