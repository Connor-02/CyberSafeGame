let emails = [
  /* ✅ EASY MODE */
  {
    sender: "no-reply@apex-solutions.com",
    actualDomain: "no-reply@securebanking-alert.org",
    subject: "URGENT: Verify your account immediately!",
    body: "Click here to avoid account suspension: http://fakebank-login.com",
    isScam: true,
    difficulty: "easy",
    reason: "The actual domain is securebanking-alert.org, which is not the official @apex-solutions.com domain."
  },
  {
    sender: "events@apex-solutions.com",
    actualDomain: "events@apex-solutions.com",
    subject: "Team Lunch This Friday",
    body: "Join us in the cafeteria at 12:30 PM for our monthly team lunch.",
    isScam: false,
    difficulty: "easy",
    reason: "This email is from the official @apex-solutions.com domain and contains normal internal event info."
  },
  {
    sender: "it-support@apex-solutions.com",
    actualDomain: "it-support@apex-solutions-help.com",
    subject: "Password Expiring Soon",
    body: "Reset your password now to keep your account active: http://malicious-link.com",
    isScam: true,
    difficulty: "easy",
    reason: "The sender shows @apex-solutions.com but hovers to apex-solutions-help.com, which is a fake domain."
  },
  {
    sender: "newsletter@apex-solutions.com",
    actualDomain: "newsletter@apex-solutions.com",
    subject: "Weekly Update",
    body: "Here’s what’s new this week at the office. No action needed.",
    isScam: false,
    difficulty: "easy",
    reason: "This is a normal internal newsletter from the official domain."
  },
  {
    sender: "rewards@apex-solutions.com",
    actualDomain: "rewards@apex-solutions-prizes.com",
    subject: "Claim Your $500 Gift Card!",
    body: "Click this link to claim your prize now: http://free-gift-card-now.com",
    isScam: true,
    difficulty: "easy",
    reason: "The address hovers to apex-solutions-prizes.com, which is not an official domain and is a known scam pattern."
  },

  /* 🟡 MEDIUM MODE */
  {
    sender: "hr@apex-solutions.com",
    actualDomain: "hr@apex-solutions.co",
    subject: "Annual Leave Policy Update",
    body: "Please review the attached document for updated leave policies.",
    isScam: true,
    difficulty: "medium",
    reason: "The hover domain ends in .co instead of .com, which is suspicious and not official."
  },
  {
    sender: "benefits@apex-solutions.com",
    actualDomain: "benefits@apex-solutions.com",
    subject: "Your Tax Forms Are Ready",
    body: "Download your forms here: https://apex-solutions.com/forms",
    isScam: false,
    difficulty: "medium",
    reason: "This email is from the official @apex-solutions.com domain and is a standard HR communication."
  },
  {
    sender: "security@apex-solutions.com",
    actualDomain: "security@apex-solutions.org",
    subject: "We Detected a Login From a New Device",
    body: "Click below to verify this activity. If this wasn’t you, we’ll lock your account.",
    isScam: true,
    difficulty: "medium",
    reason: "The actual domain is apex-solutions.org, not the company’s apex-solutions.com."
  },
  {
    sender: "ceo-office@apex-solutions.com",
    actualDomain: "ceo-office@apex-solutions.com",
    subject: "Confidential Strategy Notes",
    body: "Please review the attached confidential file before our next meeting.",
    isScam: false,
    difficulty: "medium",
    reason: "The sender and hover domain match the official @apex-solutions.com address."
  },
  {
    sender: "invoice@apex-solutions.com",
    actualDomain: "invoice@apex-solutions-pay.com",
    subject: "Invoice for last month’s services",
    body: "Kindly review and pay via this secure link: http://pay-now-secure.com",
    isScam: true,
    difficulty: "medium",
    reason: "The sender hovers to apex-solutions-pay.com, a fake payment domain."
  },

  /* 🔴 HARD MODE */
  {
    sender: "finance@apex-solutions.com",
    actualDomain: "finance@apex-solutions.com.au",
    subject: "Updated Vendor Payment Info",
    body: "Please update records with the new account details attached.",
    isScam: true,
    difficulty: "hard",
    reason: "The actual domain ends in .com.au instead of .com, which is not the official corporate domain."
  },
  {
    sender: "recruitment@apex-solutions.com",
    actualDomain: "recruitment@apex-solutions.com",
    subject: "Candidate Shortlist for Review",
    body: "Attached are the shortlisted resumes for your feedback.",
    isScam: false,
    difficulty: "hard",
    reason: "The address matches the official @apex-solutions.com domain and is safe."
  },
  {
    sender: "accounts@apex-solutions.com",
    actualDomain: "accounts@apex-solutions-support.com",
    subject: "Q3 Balance Confirmation",
    body: "Review and confirm your balance statement via: https://apex-solutions-payments-secure.com",
    isScam: true,
    difficulty: "hard",
    reason: "The hover domain shows apex-solutions-support.com which is not the official domain."
  },
  {
    sender: "team-updates@apex-solutions.com",
    actualDomain: "team-updates@apex-solutions.com",
    subject: "Department Change Notification",
    body: "Please acknowledge the department change effective next week.",
    isScam: false,
    difficulty: "hard",
    reason: "The email is from the official @apex-solutions.com address and is legitimate."
  },
  {
    sender: "support@apex-solutions.com",
    actualDomain: "support@apex-solutions-security.org",
    subject: "Security Patch Required",
    body: "Run the attached update to avoid data loss.",
    isScam: true,
    difficulty: "hard",
    reason: "The hover domain apex-solutions-security.org is not a valid company domain."
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
