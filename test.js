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

let arr = [{size:1},{size:11},{size:7},{size:4},{size:10},{size:3},{size:111},{size:19}];

console.log(arr);
sortByKey(arr, 1);
console.log(arr);
sortByKey(arr,0);
console.log(arr);