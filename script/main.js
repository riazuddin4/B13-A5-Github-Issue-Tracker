const cardContainer = document.getElementById("card-container");
const buttons = document.querySelectorAll(".filter-btn");
const issueCount = document.getElementById("issue-count");


const issueDetailsModal = document.getElementById("issue-details-modal");
const modalTitle = document.getElementById("modalTitle");
const modalStatus = document.getElementById("modalStatus");
const modalPriority = document.getElementById("modalPriority");
const modalLabels = document.getElementById("modalLabels");
const modalDescription = document.getElementById("modalDescription");
const modalFooter = document.getElementById("modalFooter");

let issues = [];

async function loadIssues() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();

    issues = data.data;

    renderIssues(issues);
}

loadIssues();

// function renderIssues(issueList) {
//     cardContainer.innerHTML = "";
//     issueCount.innerText = `${issueList.length} Issues`;

//     issueList.forEach((issue) => {

//         const priorityColor =
//             issue.priority === "high"
//                 ? "border-red-500"
//                 : issue.priority === "medium"
//                     ? "border-yellow-500"
//                     : "border-purple-500";

//         const statusColor =
//             issue.status === "open" ? "border-green-500" : "border-purple-500";

//         // const labels = issue.labels
//         //   .map(
//         //     (label) =>
//         //       `<span class="badge badge-outline badge-warning">${label}</span>`
//         //   )
//         //   .join("");
//         const labels = issue.labels?.map(
//             (label) => `<span class="badge badge-outline badge-warning">${label}</span>`
//         ).join("") || "";

//         const card = `
//     <div class="card bg-white border-t-4 ${priorityColor} shadow-md p-4">

//     <div class="flex justify-between items-center mb-2">

//     <div class="w-5 h-5 flex items-center justify-center rounded-full border ${statusColor}">
//       <div class="w-2 h-2 ${issue.status === "open" ? "bg-green-500" : "bg-purple-500"
//             } rounded-full"></div>
//     </div>

//     <span class="text-xs px-3 py-1 rounded-full bg-red-100 text-red-500 font-semibold">
//       ${issue.priority}
//     </span>

//     </div>

//     <h3 class="font-semibold text-sm">${issue.title}</h3>

//     <p class="text-xs text-gray-500 mt-1">
//       ${issue.description}
//     </p>

//     <div class="flex gap-2 mt-3">
//       ${labels}
//     </div>

//     <div class="text-xs text-gray-400 mt-4">
//       #${issue.id} by ${issue.author} <br>
//       ${issue.createdAt}
//     </div>

//     </div>
//     `;

//         cardContainer.innerHTML += card;
        
//     });

    
// }

// const buttons = document.querySelectorAll("button");


function renderIssues(issueList) {
    cardContainer.innerHTML = "";
    issueCount.innerText = `${issueList.length} Issues`;

    issueList.forEach((issue) => {
        const priorityColor =
            issue.priority === "high"
                ? "border-red-500"
                : issue.priority === "medium"
                    ? "border-yellow-500"
                    : "border-purple-500";

        const statusColor =
            issue.status === "open" ? "border-green-500" : "border-purple-500";

        const labels = issue.labels?.map(
            (label) => `<span class="badge badge-outline badge-warning">${label}</span>`
        ).join("") || "";

        // Create card as a DOM element
        const card = document.createElement("div");
        card.className = `card bg-white border-t-4 ${priorityColor} shadow-md p-4 cursor-pointer`;
        card.innerHTML = `
            <div class="flex justify-between items-center mb-2">
                <div class="w-5 h-5 flex items-center justify-center rounded-full border ${statusColor}">
                  <div class="w-2 h-2 ${issue.status === "open" ? "bg-green-500" : "bg-purple-500"} rounded-full"></div>
                </div>
                <span class="text-xs px-3 py-1 rounded-full bg-red-100 text-red-500 font-semibold">${issue.priority}</span>
            </div>
            <h3 class="font-semibold text-sm">${issue.title}</h3>
            <p class="text-xs text-gray-500 mt-1">${issue.description}</p>
            <div class="flex gap-2 mt-3">${labels}</div>
            <div class="text-xs text-gray-400 mt-4">#${issue.id} by ${issue.author} <br>${issue.createdAt}</div>
        `;

        // Add click event to open modal
        card.addEventListener("click", () => {
            modalTitle.textContent = issue.title;
            modalStatus.textContent = issue.status;
            modalPriority.textContent = issue.priority;
            modalLabels.innerHTML = labels;
            modalDescription.textContent = issue.description;
            modalFooter.textContent = `#${issue.id} by ${issue.author} on ${issue.createdAt}`;
            issueDetailsModal.showModal();
        });

        // Append card to container
        cardContainer.appendChild(card);
    });
}


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






function toggleStyle(id) {
    const allFilterBtn = document.getElementById('all-filter-btn');
    const openFilterBtn = document.getElementById('open-filter-btn');
    const closedFilterBtn = document.getElementById('closed-filter-btn');

    const buttons = [allFilterBtn, openFilterBtn, closedFilterBtn];

    buttons.forEach(btn => {
        btn.classList.remove('bg-blue-700', 'text-white');
        btn.classList.add('bg-gray-300', 'text-black');
    });

    const selected = document.getElementById(id);
    selected.classList.remove('bg-gray-300', 'text-black');
    selected.classList.add('bg-blue-700', 'text-white');

    // Filter issues
    if (id === 'all-filter-btn') {
        renderIssues(issues);
    } else if (id === 'open-filter-btn') {
        renderIssues(issues.filter(issue => issue.status === 'open'));
    } else if (id === 'closed-filter-btn') {
        renderIssues(issues.filter(issue => issue.status === 'closed'));
    }
}


