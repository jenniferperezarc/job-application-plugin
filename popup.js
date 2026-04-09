document.addEventListener("DOMContentLoaded", () => {
  function showStatus(message) {
    alert(message);
  }

  async function loadPersonalInfo() {
    const data = await chrome.storage.local.get([
      "name",
      "address",
      "phone",
      "email"
    ]);

    document.getElementById("name").value = data.name || "";
    document.getElementById("address").value = data.address || "";
    document.getElementById("phone").value = data.phone || "";
    document.getElementById("email").value = data.email || "";
  }

  async function loadWorkHistory() {
    const data = await chrome.storage.local.get(["workHistory"]);
    const workList = document.getElementById("work-list");

    workList.innerHTML = "";

    (data.workHistory || []).forEach((entry) => {
      const div = document.createElement("div");
      div.className = "item";
      div.innerHTML = `
        <strong>${entry.title || ""}</strong><br>
        ${entry.company || ""}<br>
        ${entry.companyAddress ? entry.companyAddress + "<br>" : ""}
        ${entry.startDate || ""} to ${entry.endDate || "Present"}<br>
        ${entry.selfEmployed ? "Self-employed<br>" : ""}
        ${entry.description || ""}
      `;
      workList.appendChild(div);
    });
  }

  document.getElementById("save-personal").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;

    await chrome.storage.local.set({
      name,
      address,
      phone,
      email
    });

    showStatus("Personal info saved");
  });

  document.getElementById("save-work").addEventListener("click", async () => {
    const newEntry = {
      title: document.getElementById("job-title").value,
      company: document.getElementById("company").value,
      companyAddress: document.getElementById("company-address").value,
      startDate: document.getElementById("start-date").value,
      endDate: document.getElementById("end-date").value,
      selfEmployed: document.getElementById("self-employed").checked,
      description: document.getElementById("job-desc").value
    };

    const data = await chrome.storage.local.get(["workHistory"]);
    const updated = [...(data.workHistory || []), newEntry];

    await chrome.storage.local.set({
      workHistory: updated
    });

    await loadWorkHistory();
    showStatus("Work history saved");
  });

  loadPersonalInfo();
  loadWorkHistory();
});
