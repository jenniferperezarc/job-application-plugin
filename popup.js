async function loadAndShow() {
  const data = await chrome.storage.local.get(null);
  let html = '';

  // Personal Info
  if (data.name || data.email) {
    html += `<div class="section"><strong>Personal Info</strong><br>`;
    if (data.name) html += `Name: ${data.name} <button class="copy-btn" onclick="copyText('${data.name}')">Copy</button><br>`;
    if (data.phone) html += `Phone: ${data.phone} <button class="copy-btn" onclick="copyText('${data.phone}')">Copy</button><br>`;
    if (data.email) html += `Email: ${data.email} <button class="copy-btn" onclick="copyText('${data.email}')">Copy</button><br>`;
    if (data.address) html += `Address: ${data.address}<br>`;
    html += `</div>`;
  }

  // Work History
  const work = data.workHistory ? JSON.parse(data.workHistory) : [];
  if (work.length) {
    html += `<div class="section"><strong>Work History</strong>`;
    work.forEach((w, i) => {
      html += `<div class="item">${w.title} at ${w.company}<br>`;
      if (w.startDate) html += `${w.startDate} - ${w.endDate || 'Present'}<br>`;
      if (w.description) html += `${w.description}<br>`;
      html += `<button class="copy-btn" onclick="copyText('${w.title} at ${w.company}')">Copy Title+Company</button></div>`;
    });
    html += `</div>`;
  }

  // Saved Answers
  const answers = data.savedAnswers ? JSON.parse(data.savedAnswers) : [];
  if (answers.length) {
    html += `<div class="section"><strong>Saved Answers</strong>`;
    answers.forEach((ans, i) => {
      html += `<div class="item">${ans.substring(0, 120)}${ans.length>120?'...':''}<br><button class="copy-btn" onclick="copyText('${ans.replace(/'/g, "\\'")}')">Copy Answer</button></div>`;
    });
    html += `</div>`;
  }

  document.getElementById('content').innerHTML = html || '<p>No data yet. Open jobsave.html to add info.</p>';
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    const btns = document.querySelectorAll('button');
    btns.forEach(b => { if (b.textContent === 'Copy') b.textContent = 'Copied!'; });
    setTimeout(() => location.reload(), 1500);
  });
}

loadAndShow();
