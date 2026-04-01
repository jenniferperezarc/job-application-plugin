// Load saved data when popup opens
function loadData() {
  chrome.storage.local.get(null, (data) => {
    // Personal info
    document.getElementById('name').value = data.name || '';
    document.getElementById('address').value = data.address || '';
    document.getElementById('phone').value = data.phone || '';
    document.getElementById('email').value = data.email || '';
    document.getElementById('linkedin').value = data.linkedin || '';

    // TODO: load work history and answers (we'll add in next step)
  });
}

// Save personal info
document.getElementById('save-personal').addEventListener('click', () => {
  const personalData = {
    name: document.getElementById('name').value,
    address: document.getElementById('address').value,
    phone: document.getElementById('phone').value,
    email: document.getElementById('email').value,
    linkedin: document.getElementById('linkedin').value,
  };

  chrome.storage.local.set(personalData, () => {
    showStatus('Personal info saved!');
  });
});

// Show temporary status message
function showStatus(msg) {
  const statusEl = document.getElementById('status');
  statusEl.textContent = msg;
  setTimeout(() => statusEl.textContent = '', 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', loadData);
