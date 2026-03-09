 const loading = document.getElementById("loadingSpinner");
 const loadAllIssue = ()=>{
    loading.classList.remove("hidden");
    loading.classList.add("flex");
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res)=>res.json())
        .then((json)=>{
            allIssues=json.data;
            loading.classList.add("hidden");
        displayIssue(allIssues)
        });
 };
 const searchInfo = document.getElementById("search-btn");
    searchInfo.addEventListener("keyup",function(e){
        const textSearch = e.target.value.trim();
        if(textSearch=== "")
        {
            displayIssue(allIssues);
            return;
        }

        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${textSearch}`)
        .then(res=>res.json())
        .then(data => {
            displayIssue(data.data)
        });
    });
    // new-issue button
    const newBtn=document.getElementById("new-btn");
    newBtn.addEventListener("click",() =>{

        document.getElementById("search-btn").value="";
        displayIssue(allIssues);
    });
 //modal display
    async function openModal(id) {
    const res =await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
    const data = await res.json();
    displayModal(data.data)        
    }
    const displayModal = (model)=>{
     const modalDetails = document.getElementById("modal-details");
     document.getElementById("my_modal_5").showModal();
     {
//   "status": "success",
//   "message": "Issue fetched successfully",
//   "data": {
//     "id": 33,
//     "title": "Add bulk operations support",
//     "description": "Allow users to perform bulk actions like delete, update status on multiple items at once.",
//     "status": "open",
//     "labels": [
//       "enhancement"
//     ],
//     "priority": "low",
//     "author": "bulk_barry",
//     "assignee": "",
//     "createdAt": "2024-02-02T10:00:00Z",
//     "updatedAt": "2024-02-02T10:00:00Z"
  
}
    modalDetails.innerHTML = `
    
    <h3 class="text-lg font-bold" id="modal-title">${model.title}</h3>
    <div class="flex gap-2 mb-4 text-sm">
        <span class="rounded-full ${model.status==="open"? "bg-green-500":"bg-purple-500"} text-white px-3 py-1">${model.status}</span>
        <p class="text-gray-500 pt-1" id="modal-author">. Opened by ${model.author}</p>
        <p class="text-gray-500 pt-1" id="modal-date" > . ${new Date(model.createdAt).toLocaleDateString()}</p>
    </div>
    <div class="flex gap-1 mb-2 items-center whitespace-nowrap">
            <span class=" text-red-500 rounded-3xl flex items-center px-1 bg-[#FECACA] "><i class="fa-solid fa-bug"></i>${model.labels[0]}</span>
            <div class="flex items-center  rounded-3xl px-1 text-[#D97706] bg-amber-100">
                <i class="fa-regular fa-life-ring"></i>
            <span class="" id="modal-labels">${model.labels[1]}</span>
        </div>
        </div>
        <p class="text-gray-500 " id="modal-description">${model.description}</p>
        <div class="flex justify-between items-center space-y-2 text-sm text-gray-500 bg-gray-300 rounded-lg w-[80%] p-3">
            <div>
                <p>Assignee:</p>
                <p id="modal-assignee">${model.assignee}</p>
            </div>
            <div >
                <p>Priority:</p>
              <p id="modal-priority">${model.priority}</p>
            </div>
        </div>
    
    
    
    `;

    };

 let allIssues =[];
 const filterIssue = (status)=>{
    activeBtn(status);
    document.getElementById("search-btn").value="";
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
 const activeBtn = (status)=>{

const button = document.querySelectorAll(".filter-btn");
// console.log(button);
    button.forEach(btn=>{
        btn.classList.remove("bg-[#4A00FF]","text-white");
    });
    document.querySelector(`[onclick="filterIssue('${status}')"]`)
    // if(btns==="all")
    // button[0].classList.add("bg-[#4A00FF]","text-white");
    // if(btns==="open")
    // button[1].classList.add("bg-[#4A00FF]","text-white");
    // if(btns==="closed")
    // button[2].classList.add("bg-[#4A00FF]","text-white");
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
        containerDiv.innerHTML = `  <div class="bg-white rounded-sm border-t-4 ${borderColor} shadow p-2 space-y-4"  onclick="openModal('${issue.id}')">
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
