 const loadAllIssue = ()=>{
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res)=>res.json())
        .then((json)=>displayIssue(json.data));
    
 };
 const displayIssue = (issues)=>{
    let containerId = document.getElementById("all-issue-container");
    containerId.innerHTML = "";
    for(const issue of issues)
    {
        // console.log(issue);
        let borderColor = "";
        if(issue.status==="open"){
            borderColor="border-green-600";
        }
        else{
            borderColor="border-purple-500";
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
            <div class="w-10 h-10 rounded-full items-center justify-center pt-2"><border-green-600 img src="./Open-Status.png" alt=""></div>
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
