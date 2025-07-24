let emails = [
  /* ✅ EASY MODE */
  {
    sender: "no-reply@apex-solutions.com",
    actualDomain: "no-reply@securebanking-alert.org",
    subject: "URGENT: Verify your account immediately!",
    body: "Click here to avoid account suspension: http://fakebank-login.com",
    isScam: true,
    difficulty: "easy",
    reason: "The actual domain is securebanking-alert.org, not the official @apex-solutions.com, and it contains a suspicious login link."
  },
  {
    sender: "events@apex-solutions.com",
    actualDomain: "events@apex-solutions.com",
    subject: "Team Lunch This Friday",
    body: "Join us in the cafeteria at 12:30 PM for our monthly team lunch.",
    isScam: false,
    difficulty: "easy",
    reason: "A standard internal event notice from the trusted domain."
  },
  {
    sender: "it-support@apex-solutions.com",
    actualDomain: "it-support@apex-solutions-help.com",
    subject: "Password Expiring Soon",
    body: "Reset your password now to keep your account active: http://malicious-link.com",
    isScam: true,
    difficulty: "easy",
    reason: "The hover domain is apex-solutions-help.com, not official, and the link provided is not a legitimate company site."
  },
  {
    sender: "newsletter@apex-solutions.com",
    actualDomain: "newsletter@apex-solutions.com",
    subject: "Weekly Update",
    body: "Here’s what’s new this week at the office. No action needed.",
    isScam: false,
    difficulty: "easy",
    reason: "A legitimate internal newsletter from the correct domain."
  },
  {
    sender: "rewards@apex-solutions.com",
    actualDomain: "rewards@apex-solutions-prizes.com",
    subject: "Claim Your $500 Gift Card!",
    body: "Click this link to claim your prize now: http://free-gift-card-now.com",
    isScam: true,
    difficulty: "easy",
    reason: "The email uses a fake prizes domain and requests you click a suspicious link."
  },

  /* 🟡 MEDIUM MODE */
  {
    sender: "hr-portal@apex-solutions.com",
    actualDomain: "hr-portal@apex-solutions.com",
    subject: "Annual review forms",
    body: "Download the form and reply with your bank details.",
    isScam: true,
    difficulty: "medium",
    reason: "The domain is correct, but HR would never ask for bank details via email."
  },
  {
    sender: "security@apex-solutions.com",
    actualDomain: "security@apex-solutions.org",
    subject: "We Detected a Login From a New Device",
    body: "Click below to verify this activity immediately: http://verify-now-login.cn",
    isScam: true,
    difficulty: "medium",
    reason: "The domain ends in .org, not official, and the link goes to a suspicious .cn site."
  },
  {
    sender: "it-maintenance@apex-solutions.com",
    actualDomain: "it-maintenance@apex-solutions.support-docs.com",
    subject: "Scheduled System Upgrade",
    body: "Confirm your account by logging in here: https://support-docs-login.net",
    isScam: true,
    difficulty: "medium",
    reason: "The root domain is support-docs.com, not apex-solutions.com, and it asks for login details unexpectedly."
  },
  {
    sender: "benefits@apex-solutions.com",
    actualDomain: "benefits@apex-solutions.com",
    subject: "Your Tax Forms Are Ready",
    body: "Download your forms here: https://apex-solutions.com/forms",
    isScam: false,
    difficulty: "medium",
    reason: "A safe HR communication from the correct domain."
  },
  {
    sender: "ceo-office@apex-solutions.com",
    actualDomain: "ceo-office@apex-solutions.com.co",
    subject: "Urgent Confidential Notes",
    body: "Open the attached zip file for confidential details.",
    isScam: true,
    difficulty: "medium",
    reason: "The actual domain ends in .com.co, not the official company domain, and the attachment is suspicious."
  },

  /* 🔴 HARD MODE */
  {
    sender: "finance@apex-solutions.com",
    actualDomain: "finance@apеx-solutions.com", // Cyrillic e
    subject: "Vendor Payment Confirmation",
    body: "Click here to verify invoice: http://secure-invoice-check.com",
    isScam: true,
    difficulty: "hard",
    reason: "The sender uses a Cyrillic 'е' in apex, and the link points to an untrusted third-party site."
  },
  {
    sender: "support@apex-solutions.com",
    actualDomain: "support@apex-solutions.com.secure-verify.cn",
    subject: "Mandatory Account Verification",
    body: "We require verification at https://secure-verify.cn/login",
    isScam: true,
    difficulty: "hard",
    reason: "Although it starts with apex-solutions.com, the root domain is secure-verify.cn and the link is unsafe."
  },
  {
    sender: "accounts@apex-solutions.com",
    actualDomain: "accounts@apex-solutlons.com", // L instead of i
    subject: "Balance Confirmation Needed",
    body: "Confirm your balance here: https://apex-solutlons.com.verify-now.net",
    isScam: true,
    difficulty: "hard",
    reason: "The domain uses an L instead of an i in solutions and the link goes to a non-company verify-now.net."
  },
  {
    sender: "legal@apex-solutions.com",
    actualDomain: "legal@apex-solutions.com",
    subject: "Immediate Action Required",
    body: "Send a scan of your passport and tax records for legal verification.",
    isScam: true,
    difficulty: "hard",
    reason: "Although the domain is correct, no legitimate department would request personal documents over email."
  },
  {
    sender: "team-updates@apex-solutions.com",
    actualDomain: "team-updates@apex-solutions.com",
    subject: "Department Change Notification",
    body: "Please acknowledge the department change effective next week.",
    isScam: false,
    difficulty: "hard",
    reason: "A genuine operational update from the official domain."
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

}

function checkAnswer(playerChoiceIsScam) {
  if (!currentEmail) return;
  const correct = currentEmail.isScam === playerChoiceIsScam;

  feedbackEl.textContent = correct ? "✅ Correct!" : "❌ Incorrect!";
  feedbackEl.style.color = correct ? "green" : "red";

  // Show the reason from the email object
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
