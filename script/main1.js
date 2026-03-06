// console.log("main")

// const tabs = document.querySelectorAll(".tab-btn");

// tabs.forEach(tab => {
//     tab.addEventListener("click", () => {

//         tabs.forEach(t => {
//             t.classList.remove("bg-purple-600","text-white");
//             t.classList.add("bg-white","text-gray-500");
//         });

//         tab.classList.remove("bg-white","text-gray-500");
//         tab.classList.add("bg-purple-600","text-white");

//     });
// });





// function getPriorityColor(priority){

//     if(priority === "HIGH"){
//         return "border-red-500";
//     }

//     if(priority === "MEDIUM"){
//         return "border-yellow-500";
//     }

//     if(priority === "LOW"){
//         return "border-purple-500";
//     }

// };



// const issues = [

// {
//     id:1,
//     title:"Fix Navigation Menu On Mobile Devices",
//     description:"The navigation menu doesn't collapse properly...",
//     priority:"HIGH",
//     labels:["BUG","HELP WANTED"],
//     author:"john_doe",
//     date:"1/15/2024"
// },

// {
//     id:2,
//     title:"Fix Navigation Menu On Mobile Devices",
//     description:"The navigation menu doesn't collapse properly...",
//     priority:"MEDIUM",
//     labels:["BUG"],
//     author:"john_doe",
//     date:"1/15/2024"
// }

// ];



// const container = document.getElementById("issues-container");

// issues.forEach(issue => {

// const card = `
// <div class="card bg-white border-t-4 ${getPriorityColor(issue.priority)} shadow-md p-4">

// <h3 class="font-semibold text-sm">${issue.title}</h3>

// <p class="text-xs text-gray-500 mt-1">
// ${issue.description}
// </p>

// </div>
// `;

// container.innerHTML += card;

// });




const issues = [
  {
    id: 1,
    title: "Fix Navigation Menu On Mobile Devices",
    description:
      "The navigation menu doesn't collapse properly on mobile devices...",
    priority: "HIGH",
    status: "open",
    labels: ["BUG", "HELP WANTED"],
    author: "john_doe",
    date: "1/15/2024",
  },
  {
    id: 2,
    title: "Improve Login UI",
    description: "Login page UI needs improvement for better UX",
    priority: "MEDIUM",
    status: "closed",
    labels: ["ENHANCEMENT"],
    author: "john_doe",
    date: "1/14/2024",
  },
];

const container = document.querySelector(".grid");

function renderIssues(issueList) {
  container.innerHTML = "";

  issueList.forEach((issue) => {
    const priorityColor =
      issue.priority === "HIGH"
        ? "border-red-500"
        : issue.priority === "MEDIUM"
        ? "border-yellow-500"
        : "border-purple-500";

    const statusColor =
      issue.status === "open" ? "border-green-500" : "border-purple-500";

    const labels = issue.labels
      .map(
        (label) =>
          `<span class="badge badge-outline badge-warning">${label}</span>`
      )
      .join("");

    const card = `
        <div class="card bg-white border-t-4 ${priorityColor} shadow-md p-4">

        <div class="flex justify-between items-center mb-2">

        <div class="w-5 h-5 flex items-center justify-center rounded-full border ${statusColor}">
            <div class="w-2 h-2 ${
              issue.status === "open" ? "bg-green-500" : "bg-purple-500"
            } rounded-full"></div>
        </div>

        <span class="text-xs px-3 py-1 rounded-full bg-red-100 text-red-500 font-semibold">
            ${issue.priority}
        </span>

        </div>

        <h3 class="font-semibold text-sm">${issue.title}</h3>

        <p class="text-xs text-gray-500 mt-1">
        ${issue.description}
        </p>

        <div class="flex gap-2 mt-3">
        ${labels}
        </div>

        <div class="text-xs text-gray-400 mt-4">
        #${issue.id} by ${issue.author} <br>
        ${issue.date}
        </div>

        </div>
        `;

    container.innerHTML += card;
  });
}

renderIssues(issues);

const buttons = document.querySelectorAll("button");

buttons[1].addEventListener("click", () => {
  const openIssues = issues.filter((issue) => issue.status === "open");
  renderIssues(openIssues);
});

buttons[2].addEventListener("click", () => {
  const closedIssues = issues.filter((issue) => issue.status === "closed");
  renderIssues(closedIssues);
});

buttons[0].addEventListener("click", () => {
  renderIssues(issues);
});

const searchInput = document.querySelector("input");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();

  const filtered = issues.filter((issue) =>
    issue.title.toLowerCase().includes(value)
  );

  renderIssues(filtered);
});