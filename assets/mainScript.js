 const loadAllIssue = ()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res)=>res.json())
        .then((json)=>{
            allIssues=json.data;
        displayIssue(allIssues)
        });
 };

 let allIssues =[];
 const filterIssue = (status)=>{
    if(status=="all")
    {
        displayIssue(allIssues);
        return;
    }
     
    const filtered = allIssues.filter(
        issue=>issue.status=== status
    );
    
displayIssue(filtered);

 };
 const activeBtn = (btns)=>{
const button = document.querySelectorAll(".filter-btn");
// console.log(button);
    button.forEach(btn=>{
        btn.classList.remove("bg-[#4A00FF]","text-white");
    });
    if(btns==="all")
    button[0].classList.add("bg-[#4A00FF]","text-white");
    if(btns==="open")
    button[1].classList.add("bg-[#4A00FF]","text-white");
    if(btns==="closed")
    button[2].classList.add("bg-[#4A00FF]","text-white");
 };
 const displayIssue = (issues)=>{
    let containerId = document.getElementById("all-issue-container");
     const countIssue = document.getElementById("countIssue");
    countIssue.innerText=allIssues.length +" "+ "Issues";
    let count = 0;
    containerId.innerHTML = "";
    for(const issue of issues)
    {
        // console.log(issue);
        let borderColor = "";
        let iconS = "";
        if(issue.status==="open"){
            borderColor="border-green-600";
            iconS =`<i class="fa-regular fa-circle-check" style="color: rgb(99, 230, 190);"></i>`;
            count++;
            countIssue.innerHTML=count + " " +"Issue";
            
        }
        else{
            borderColor="border-purple-500";
            iconS=`<i class="fa-solid fa-circle-xmark" style="color: rgb(177, 151, 252);"></i>`;
            count++;
            countIssue.innerHTML=count + " "+"Issue";

        }
        let bgColor = "";
        if(issue.priority==="high")
        {
            bgColor="text-red-500";
            bgColor="bg-red-200";
        }
        else if(issue.priority==="medium")
        {
            bgColor="text-yellow-500";
            bgColor="bg-yellow-200";
        }
        else{
            bgColor="text-purple-500";
            bgColor="bg-purple-200";
        }
        const containerDiv = document.createElement("div");
        containerDiv.innerHTML = `  <div class="bg-white rounded-sm border-t-4 ${borderColor} shadow p-2 space-y-4">
        <div class="flex justify-between items-center">
            <div class="w-10 h-10 rounded-full items-center justify-center pt-2">${iconS}</div>
            <span class="rounded-3xl ${bgColor} px-3 py-1 font-semibold">${issue.priority}</span>
        </div>
        <h2 class="font-bold px-2 text-xl mb-2
        line-clamp-1">${issue.title}</h2>
        <p class="text-gray-500 mb-2 line-clamp-2">${issue.description}</p>
        <div class="flex gap-1 mb-2 items-center whitespace-nowrap">
            <span class=" text-red-500 rounded-3xl flex items-center px-1 bg-[#FECACA] "><i class="fa-solid fa-bug"></i>${issue.labels[0]}</span>
            <div class="flex items-center  rounded-3xl px-1 text-[#D97706] bg-amber-100">
                <i class="fa-regular fa-life-ring"></i>
            <span class="">${issue.labels[1]}</span>
        </div>
        </div>
        <hr class="text-gray-200 mb-2">
        <p class="text-gray-500">#${issue.author}</p>
     <p class="text-gray-500">${new Date(issue.createdAt).toLocaleDateString()}</p>
    </div>`;
    containerId.append(containerDiv);
    }

 };
 loadAllIssue();
