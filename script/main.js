const cardContainer = document.getElementById("card-container");
const buttons = document.querySelectorAll(".filter-btn");

let issues = [];

async function loadIssues() {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();

  issues = data.data;

  renderIssues(issues);
}

loadIssues();

