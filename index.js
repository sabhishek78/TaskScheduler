function scheduler(tasks,coolingTime){
    let tasksMap = new Map();
    for(let i=0;i<tasks.length;i++){
        let task=tasks[i];
        if(tasksMap.get(task)===undefined){
            tasksMap.set(task,1);
        }
        else{
            let value=tasksMap.get(task);
            value=value+1;
            tasksMap.set(task,value);
        }
    }
    let keys=Array.from(tasksMap.keys());
    keys.sort(function(a,b){return tasksMap.get(b)-tasksMap.get(a)});
    let tasksList=[];
    let keyPushed=false;
    let tasksListPushCount=0;
    while(tasksMap.size!==0){
        keyPushed=false;
        for(let i=0;i<keys.length;i++){
            if(!tasksList.includes(keys[i])){
                tasksList.push(keys[i]);
                tasksListPushCount++;
                if(tasksList.length>coolingTime){
                    tasksList.shift();
                }
                keyPushed=true;
                let value=tasksMap.get(keys[i]);
                value=value-1;
                tasksMap.set(keys[i],value);
                if(tasksMap.get(keys[i])===0){
                    tasksMap.delete(keys[i]);
                    i=i-1;
                }
                keys=Array.from(tasksMap.keys());
            }
        }
        if(!keyPushed){
            tasksList.push('idle');
            tasksListPushCount++;
            if(tasksList.length>coolingTime){
                tasksList.shift();
            }
        }
    }
    return tasksListPushCount;
}

 console.log(scheduler(["A","A","A","B","B"],4)===11);
console.log(scheduler(["A","A","A","B","B","B"],3)===10);
console.log(scheduler(["A","B","A","B","A","B"],3)===10);
console.log(scheduler(["A","A","A","B","B","B"],2)===8);
console.log(scheduler(["A","A","A","B","B","B"],3)===10);
console.log(scheduler(["A"],7)===1);
console.log(scheduler(["A","B"],7)===2);
console.log(scheduler(["A","B","A"],3)===5);
console.log(scheduler(["B","A","A"],3)===5);
console.log(scheduler(["B","A","A","B"],1)===4);
console.log(scheduler(["B","A","A"],3)===5);
console.log(scheduler(["B","A","A"],1)===3);
console.log(scheduler(["A","A"],0)===2);
console.log(scheduler(["B","A","A","A"],1)===5);
console.log(scheduler(["A","B","C","D"],1)===4);
console.log(scheduler(["A","A","A"],0)===3);
console.log(scheduler(["A","A","A"],5)===13);
console.log(scheduler(["A","A","B","B","A","A"],4)===16);


// Given a char array representing tasks CPU need to do. It contains capital letters A to Z where different letters represent different tasks. Tasks could be done without original order. Each task could be done in one interval. For each interval, CPU could finish one task or just be idle.

// However, there is a non-negative cooling interval n that means between two same tasks, there must be at least n intervals that CPU are doing different tasks or just be idle.

// You need to return the least number of intervals the CPU will take to finish all the given tasks.

// Examples
// Input: tasks = ["A","A","A","B","B","B"], n = 2
// Output: 8
// Explanation: A -> B -> idle -> A -> B -> idle -> A -> B.

// Input: tasks = ["A","A","A","B","B","B"], n = 3
// Output: 10
// Explanation: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.

// Input: ["A","A","A","B","B","B","C","D","E","F","G","H","I","J","K"], n = 7
// Output: 18
// Constraints:
// The number of tasks is in the range [1, 10000].
// The integer n is in the range [0, 100].
