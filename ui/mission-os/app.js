const state = {
  os: [
    {
      os_id: "NEXUM",
      status: "Active",
      root_path: "/mission-os/os/NEXUM",
      structure: { memory: "ok", projects: "ok", ops: "ok", logs: "ok" },
      lastBoundary: { result: "pass", path: "projects/PRJ-0001", time: "2026-03-04 07:20" }
    },
    {
      os_id: "CONSTRUCTION",
      status: "Draft",
      root_path: "/mission-os/os/CONSTRUCTION",
      structure: { memory: "ok", projects: "ok", ops: "ok", logs: "ok" },
      lastBoundary: { result: "fail", path: "../NEXUM/secrets", time: "2026-03-04 07:22" }
    }
  ],
  events: [
    { time: "2026-03-04 07:22", os: "CONSTRUCTION", result: "BLOCKED", path: "../NEXUM/secrets" },
    { time: "2026-03-04 07:20", os: "NEXUM", result: "PASS", path: "projects/PRJ-0001" }
  ]
};

const osSelect = document.getElementById("osSelect");
const views = document.querySelectorAll(".view");
const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    views.forEach((v) => v.classList.remove("active"));
    document.getElementById(btn.dataset.view).classList.add("active");
  });
});

function renderOverview() {
  document.getElementById("osCount").textContent = String(state.os.length);
  document.getElementById("activeCount").textContent = String(state.os.filter((o) => o.status === "Active").length);
  document.getElementById("alertCount").textContent = String(state.events.filter((e) => e.result !== "PASS").length);
}

function renderEvents() {
  const tbody = document.getElementById("eventsTable");
  tbody.innerHTML = "";
  state.events.forEach((e) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${e.time}</td><td>${e.os}</td><td>${e.result}</td><td>${e.path}</td>`;
    tbody.appendChild(tr);
  });
}

function renderOsOptions() {
  osSelect.innerHTML = "";
  state.os.forEach((o) => {
    const opt = document.createElement("option");
    opt.value = o.os_id;
    opt.textContent = o.os_id;
    osSelect.appendChild(opt);
  });
}

function renderSelectedOs(osId) {
  const item = state.os.find((o) => o.os_id === osId) || state.os[0];
  document.getElementById("activeStatus").textContent = `Status: ${item.status}`;
  document.getElementById("osIdentity").textContent = `${item.os_id} — ${item.root_path}`;

  const ul = document.getElementById("structureHealth");
  ul.innerHTML = "";
  Object.entries(item.structure).forEach(([k, v]) => {
    const li = document.createElement("li");
    li.className = v === "ok" ? "status-ok" : "status-bad";
    li.textContent = `${k}: ${v}`;
    ul.appendChild(li);
  });

  document.getElementById("lastBoundary").textContent = `${item.lastBoundary.time} — ${item.lastBoundary.result.toUpperCase()} (${item.lastBoundary.path})`;
}

osSelect.addEventListener("change", (e) => renderSelectedOs(e.target.value));

renderOverview();
renderEvents();
renderOsOptions();
renderSelectedOs(state.os[0].os_id);
