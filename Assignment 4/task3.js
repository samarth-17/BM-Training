
let data = [];


function addData() {
    for (let i = 0; i < 500; i++) { 
        data.push({ data: "task 3", timestamp: Date.now() });
    }
    console.log("Added 500 objects. Total objects:", data.length);
}


const interval=setInterval(addData, 1000);

setInterval(() => {
    if (performance.memory) {
        console.log("Heap Memory Used:",performance.memory.usedJSHeapSize);
    }
}, 2000);


function cleanup() {
    console.log("Stopping memory leak...");
    data= []; // Empty the array to free memory
}


setTimeout(() => {
    clearInterval(interval); 
    cleanup(); 
}, 10000);


/* OUTPUT
Added 500 objects. Total objects: 500
Added 500 objects. Total objects: 1000
Added 500 objects. Total objects: 1500
Added 500 objects. Total objects: 2000
Added 500 objects. Total objects: 2500
Added 500 objects. Total objects: 3000
Added 500 objects. Total objects: 3500
Added 500 objects. Total objects: 4000
Added 500 objects. Total objects: 4500
Stopping memory leak...
*/