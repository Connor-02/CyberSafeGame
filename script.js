let emails = [
  /* ✅ EASY MODE */
  {
    sender: "no-reply@apex-solutions.com",
    actualDomain: "no-reply@apex-solutions-alerts.com",
    subject: "Action Needed: Update Security Preferences",
    body: "We’ve improved our security settings. Please update your preferences here: https://apex-solutions-alerts.com/security-update",
    isScam: true,
    difficulty: "easy",
    reason: "The email appears official, but the domain apex-solutions-alerts.com is not the real company domain."
  },
  {
    sender: "events@apex-solutions.com",
    actualDomain: "events@apex-solutions.com",
    subject: "New Holiday Schedule Released",
    body: "The 2025 holiday schedule is attached as a PDF for your reference.",
    isScam: false,
    difficulty: "easy",
    reason: "A legitimate internal announcement with no suspicious requests."
  },
  {
    sender: "it-support@apex-solutions.com",
    actualDomain: "it-support@apexsolutions.com",
    subject: "Password Rotation Notice",
    body: "Your password is due for rotation. Reset here: https://apexsolutions.com-passwordreset.info",
    isScam: true,
    difficulty: "easy",
    reason: "The domain is missing the hyphen and the reset link goes to a non‑company domain."
  },
  {
    sender: "newsletter@apex-solutions.com",
    actualDomain: "newsletter@apex-solutions.com",
    subject: "Monthly Updates",
    body: "Catch up on company news and upcoming projects. No action required.",
    isScam: false,
    difficulty: "easy",
    reason: "Internal newsletter from a verified domain."
  },
  {
    sender: "rewards@apex-solutions.com",
    actualDomain: "rewards@solutions-apex.com",
    subject: "Congratulations! You’ve Earned a Gift",
    body: "Claim your reward here: https://solutions-apex.com/redeem",
    isScam: true,
    difficulty: "easy",
    reason: "The root domain is solutions-apex.com, not apex-solutions.com."
  },

  /* 🟡 MEDIUM MODE */
  {
    sender: "hr-portal@apex-solutions.com",
    actualDomain: "hr-portal@apex-solutions.com",
    subject: "Update Your Payroll Information",
    body: "Our records show your payroll details need verification. Submit them via this secure form: https://apex-solutions.com.payroll-verify.net",
    isScam: true,
    difficulty: "medium",
    reason: "The link pretends to be part of the company but is actually under payroll-verify.net."
  },
  {
    sender: "internal-survey@apex-solutions.com",
    actualDomain: "internal-survey@apex-solutions.com",
    subject: "Quarterly Engagement Survey",
    body: "We value your input. Complete the official survey here: https://apex-solutions.com/hr/survey2025",
    isScam: false,
    difficulty: "medium",
    reason: "Legitimate internal survey from the correct domain with a valid HTTPS link."
  },
  {
    sender: "payroll@apex-solutions.com",
    actualDomain: "payroll@apex-payments.com",
    subject: "Bank Details Confirmation",
    body: "Please reply with your account number and BSB to confirm payment.",
    isScam: true,
    difficulty: "medium",
    reason: "Requests sensitive info directly in the reply, which a legitimate payroll team would never do."
  },
  {
    sender: "ceo.office@apex-solutions.com",
    actualDomain: "ceo.office@apex-solutions-support.com",
    subject: "Immediate Action Required – Wire Transfer",
    body: "We’re closing a deal. I need you to process a wire transfer in the next hour. Reply when ready.",
    isScam: true,
    difficulty: "medium",
    reason: "Uses urgency and authority impersonation. No link is present but still a scam."
  },
  {
    sender: "benefits@apex-solutions.com",
    actualDomain: "benefits@apex-solutions.com",
    subject: "New Insurance Options Available",
    body: "See the updated plan details: https://apex-solutions.com/benefits/2025",
    isScam: false,
    difficulty: "medium",
    reason: "Legitimate HR email from the correct domain."
  },

  /* 🔴 HARD MODE */
  {
    sender: "finance@apex-solutions.com",
    actualDomain: "finance@аpex-solutions.com",
    subject: "Q2 Reconciliation Required",
    body: "Our auditors need confirmation. Upload documents securely: https://аpex-solutions.com.auditing-portal.net",
    isScam: true,
    difficulty: "hard",
    reason: "Uses a Cyrillic 'a' and a misleading secure upload link."
  },
  {
    sender: "legal@apex-solutions.com",
    actualDomain: "legal@apex-solutions.com",
    subject: "Updated Contract Template",
    body: "Download the updated template: https://apex-solutions.com/resources/contracts",
    isScam: false,
    difficulty: "hard",
    reason: "Legitimate internal resource link from the correct domain."
  },
  {
    sender: "audit-team@apex-solutions.com",
    actualDomain: "audit-team@apex-solutions.info",
    subject: "Important Financial Records",
    body: "See attached financial_report.xlsm and enable macros to view details.",
    isScam: true,
    difficulty: "hard",
    reason: "Attachment requires enabling macros, which is a common malware tactic."
  },
  {
    sender: "hr@apex-solutlons.com",
    actualDomain: "hr@apex-solutlons.com",
    subject: "Your Annual Leave Request",
    body: "We need your bank card details to process leave payments. Reply with your card number.",
    isScam: true,
    difficulty: "hard",
    reason: "Domain uses a lowercase L instead of i, and requests card details in reply."
  },
  {
    sender: "support@apex-solutions.com",
    actualDomain: "support@apex-solutions.com.secure-login-check.net",
    subject: "Security Portal Update",
    body: "Click here to confirm: https://apex-solutions.com.secure-login-check.net/confirm",
    isScam: true,
    difficulty: "hard",
    reason: "Link visually appears safe but actually goes to secure-login-check.net."
  }
];




let filteredEmails = [],
  currentEmail = null,
  score = 0,
  totalAnswered = 0;

const emailListEl = document.getElementById('emailList');
const emailContentEl = document.getElementById('emailContent');
const actionsEl = document.getElementById('actions');
const feedbackEl = document.getElementById('feedback');
const scoreValueEl = document.getElementById('scoreValue');
const gameContainer = document.querySelector('.game-container');
const summaryEl = document.querySelector('.summary');
const finalScoreEl = document.getElementById('finalScore');
const playAgainBtn = document.getElementById('playAgainBtn');
const startBtn = document.getElementById('startGameBtn');
const reasonEl = document.getElementById('reason');


startBtn.disabled = false;

document.getElementById('startGameBtn').addEventListener('click', startGame);
document.getElementById('safeBtn').addEventListener('click', () => checkAnswer(false));
document.getElementById('scamBtn').addEventListener('click', () => checkAnswer(true));
playAgainBtn.addEventListener('click', resetGame);

function startGame() {
  const difficulty = document.querySelector('input[name="difficulty"]:checked').value;
  filteredEmails = emails.filter(e => e.difficulty === difficulty);

  if (filteredEmails.length === 0) {
    alert('No emails found for difficulty: ' + difficulty);
    return;
  }

  renderInbox();
  document.querySelector('.level-select').style.display = 'none';
  gameContainer.style.display = 'flex';
  summaryEl.style.display = 'none';

  // Clear old feedback
  feedbackEl.textContent = '';
  reasonEl.textContent = '';
  actionsEl.style.display = 'none';
}

function renderInbox() {
  emailListEl.innerHTML = '';
  filteredEmails.forEach((email, index) => {
    const li = document.createElement('li');
    li.classList.add('email-item');
    li.innerHTML = `
      <div class="email-sender">${email.sender}</div>
      <div class="email-subject">${email.subject}</div>
      <div class="email-preview">${email.body.slice(0, 60)}...</div>
    `;
    li.addEventListener('click', () => openEmail(index));
    emailListEl.appendChild(li);
  });
}

function openEmail(index) {
  currentEmail = filteredEmails[index];

  // Use actualDomain for tooltip
  const hoverDomain = currentEmail.actualDomain || currentEmail.sender;

  emailContentEl.innerHTML = `
    <strong>From:</strong> 
    <span class="sender-tooltip" title="Actual domain: ${hoverDomain}">
      ${currentEmail.sender}
    </span><br>
    <strong>Subject:</strong> ${currentEmail.subject}<br><br>
    ${currentEmail.body}
  `;

  actionsEl.style.display = 'block';
  feedbackEl.textContent = '';
  reasonEl.textContent = ''; // ✅ clear reason each time a new email is opened

  // ✅ Re‑enable buttons for this new email
  document.getElementById('safeBtn').disabled = false;
  document.getElementById('scamBtn').disabled = false;

}

function checkAnswer(playerChoiceIsScam) {
  if (!currentEmail) return;

  // Disable both buttons so no reselection
  document.getElementById('safeBtn').disabled = true;
  document.getElementById('scamBtn').disabled = true;

  const correct = currentEmail.isScam === playerChoiceIsScam;
  feedbackEl.innerHTML = correct ? "✅ <span>Correct!</span>" : "❌ <span>Incorrect!</span>";
  feedbackEl.style.color = correct ? "green" : "red";

  if (currentEmail.reason) {
    reasonEl.textContent = currentEmail.reason;
  } else {
    reasonEl.textContent = "";
  }

  totalAnswered++;
  if (correct) score++;
  scoreValueEl.textContent = score;
  filteredEmails = filteredEmails.filter(e => e !== currentEmail);
  renderInbox();

  if (filteredEmails.length === 0) {
    endLevel();
  }
}


function endLevel() {
  gameContainer.style.display = 'none';
  summaryEl.style.display = 'block';
  finalScoreEl.textContent = `You scored ${score} out of ${totalAnswered}!`;
}

function resetGame() {
  document.querySelector('.level-select').style.display = 'block';
  gameContainer.style.display = 'none';
  summaryEl.style.display = 'none';
  reasonEl.textContent = '';
  feedbackEl.textContent = '';
}

// draggable window
(function () {
  const windowEl = document.getElementById('emailWindow');
  const titleBar = document.getElementById('titleBar');
  let offsetX = 0,
    offsetY = 0,
    isDragging = false;

  titleBar.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - windowEl.offsetLeft;
    offsetY = e.clientY - windowEl.offsetTop;
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', e => {
    if (!isDragging) return;
    windowEl.style.left = (e.clientX - offsetX) + 'px';
    windowEl.style.top = (e.clientY - offsetY) + 'px';
    windowEl.style.transform = 'none';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = 'auto';
  });
})();
