let addBtnOpner = document.querySelector(".addNew");
let inputArea = document.querySelector(".input");
let dataFolder = document.querySelector(".data");
let propertyAddBtn = document.getElementById("add");
let sortInc = document.querySelector(".inc");
let sortDec = document.querySelector(".dec");

let uid = new ShortUniqueId();

let allPropertyArr = [];

if(localStorage.getItem("propertyDB")){
    allPropertyArr = JSON.parse(localStorage.getItem("propertyDB"));
    showFromArr(allPropertyArr);
}
// sorting
sortInc.addEventListener("click", ()=>{
    console.log(allPropertyArr);
    sortByKey(allPropertyArr, 1);
    let all = document.querySelectorAll(".property");
    for(let i = 0; i<all.length; i++){
        all[i].remove();
    }
    console.log(allPropertyArr);
    showFromArr(allPropertyArr);
})
// sorting
sortDec.addEventListener("click", ()=>{
    sortByKey(allPropertyArr, 0);
    let all = document.querySelectorAll(".property");
    for(let i = 0; i<all.length; i++){
        all[i].remove();
    }
    showFromArr(allPropertyArr);
});

// add btn input area opener

addBtnOpner.addEventListener("click", ()=>{
    inputArea.classList.toggle("visibleInput")
    if(inputArea.classList.contains("visibleInput")){
        dataFolder.style.marginTop = "405px";
    }else{
        dataFolder.style.marginTop = "60px";
    }
    if(addBtnOpner.textContent === "Add New"){
        addBtnOpner.textContent = "Colapse";
    }else{
        addBtnOpner.textContent = "Add New";
    }
});
// creating property divs

propertyAddBtn.addEventListener("click", ()=>{
    let inputName = document.getElementById("name");
    let inputDes = document.getElementById("description");
    let inputSize = document.getElementById("size");
    let id;
    let name = inputName.value;
    let des = inputDes.value;
    let size = Number(inputSize.value);
    createProperty(id,name, des, size);
    inputName.value = "";
    inputDes.value = "";
    inputSize.value= "";
    inputArea.classList.remove("visibleInput");
    if(addBtnOpner.textContent === "Add New"){
        addBtnOpner.textContent = "Colapse";
    }else{
        addBtnOpner.textContent = "Add New";
    }
    dataFolder.style.marginTop = "60px";
});
function createProperty(myId,name, des, size){
    let id;
    if(myId===undefined){
        id = uid();
    }else{
        id = myId;
    }
    let newProperty = document.createElement("div");
    newProperty.classList.add("property");
    newProperty.innerHTML = `<img src="./property.jpg" alt="" class="propertyImage">
        <div class="details">
            <div class="property-detail">Name : ${name}</div>
            <div class="property-detail">Description : ${des}</div>
            <div class="property-detail">Size: ${size} sq ft</div>
        </div>
        <button class="delete btn ">delete</button>`
    dataFolder.append(newProperty);
    let delBtn = newProperty.querySelector(".delete");
    delBtn.addEventListener("click", ()=>{
        newProperty.remove();
        searchByIdAndDelete(allPropertyArr,id);
        addArrToLocalStorage(allPropertyArr);
    });
    let dataObj = {
        id,
        name,
        des,
        size
    };
    if(myId===undefined){
        allPropertyArr.push(dataObj);
        addArrToLocalStorage(allPropertyArr);
    }
    // console.log(allPropertyArr);
}

function showFromArr(arr){
    for(x in arr){
        createProperty(arr[x].id, arr[x].name, arr[x].des, arr[x].size);
    }
}

function addArrToLocalStorage(arr){
    localStorage.setItem("propertyDB",JSON.stringify(arr));
}

function searchByIdAndDelete(arr, id){
    for(x in arr){
        if(arr[x].id === id){
            arr.splice(x,1);
            return;
        }
    }
}

function sortByKey(arr, key){
    if(key === 1){
        for(let i = 0; i < arr.length; i++){
            for(let j = i; j > 0; j--){
                if(arr[j].size < arr[j-1].size){
                    let temp = arr[j];
                    arr[j] = arr[j-1];
                    arr[j-1] = temp;
                }
            }
        }
    }else{
        for(let i = 0; i < arr.length; i++){
            for(let j = i; j > 0; j--){
                if(arr[j].size > arr[j-1].size){
                    let temp = arr[j];
                    arr[j] = arr[j-1];
                    arr[j-1] = temp;
                }
            }
        }
    }
}