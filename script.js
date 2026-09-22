const STUDENTS = {
  "25105108041": {
    name: "Mani kumar",
    program: "B.Tech Computer Science",
    semester: "Semester 3",
    courses: [
      { code: "CS301", name: "Data Structures & Algorithms", credits: 4, marks: 29, max: 30 },
      { code: "CS302", name: "Digital electronic", credits: 4, marks: 26, max: 30 },
      { code: "CS303", name: "Operating Systems", credits: 4, marks: 28, max: 30 },
      { code: "CS304", name: "jawa", credits: 3, marks: 23, max: 30 },
      { code: "MA305", name: "Discrete Mathematics", credits: 3, marks: 25, max: 30 },
      { code: "HS306", name: "UHV", credits: 2, marks: 28, max: 30 },
    ],
  },
  
  "25105108026": {
    name: "anshuman kumar",
    program: "B.Tech Computer Science",
    semester: "Semester 3",
    courses: [
      { code: "CS301", name: "Data Structures & Algorithms", credits: 4, marks: 27, max: 30 },
      { code: "CS302", name: "Digital electronic", credits: 4, marks: 26, max: 30 },
      { code: "CS303", name: "Operating Systems", credits: 4, marks: 25, max: 30 },
      { code: "CS304", name: "jawa", credits: 3, marks: 23, max: 30 },
      { code: "MA305", name: "Discrete Mathematics", credits: 3, marks: 29, max: 30 },
      { code: "HS306", name: "UHV", credits: 2, marks: 28, max: 30 },
    ],
  },

  "25105108024": {
    name: "abhishek kumar",
    program: "B.Tech Computer Science",
    semester: "Semester 3",
    courses: [
      { code: "CS301", name: "Data Structures & Algorithms", credits: 4, marks: 28, max: 30 },
      { code: "CS302", name: "Digital electronic", credits: 4, marks: 27, max: 30 },
      { code: "CS303", name: "Operating Systems", credits: 4, marks: 25, max: 30 },
      { code: "CS304", name: "jawa", credits: 3, marks: 23, max: 30 },
      { code: "MA305", name: "Discrete Mathematics", credits: 3, marks: 26, max: 30 },
      { code: "HS306", name: "UHV", credits: 2, marks: 28, max: 30 },
    ],
  },

  "25105108028": {
    name: "ishu kumar",
    program: "B.Tech Computer Science",
    semester: "Semester 3",
    courses: [
      { code: "CS301", name: "Data Structures & Algorithms", credits: 4, marks: 28, max: 30 },
      { code: "CS302", name: "Digital electronic", credits: 4, marks: 25, max: 30 },
      { code: "CS303", name: "Operating Systems", credits: 4, marks: 25, max: 30 },
      { code: "CS304", name: "jawa", credits: 3, marks: 25, max: 30 },
      { code: "MA305", name: "Discrete Mathematics", credits: 3, marks: 26, max: 30 },
      { code: "HS306", name: "UHV", credits: 2, marks: 27, max: 30 },
    ],
  },

  "25105108006": {
    name: "Abhishek kumar",
    program: "B.Tech Computer Science",
    semester: "Semester 3",
    courses: [
      { code: "CS301", name: "Data Structures & Algorithms", credits: 4, marks: 27, max: 30 },
      { code: "CS302", name: "Digital electronic", credits: 4, marks: 26, max: 30 },
      { code: "CS303", name: "Operating Systems", credits: 4, marks: 25, max: 30 },
      { code: "CS304", name: "jawa", credits: 3, marks: 25, max: 30 },
      { code: "MA305", name: "Discrete Mathematics", credits: 3, marks: 24, max: 30 },
      { code: "HS306", name: "UHV", credits: 2, marks: 27, max: 30 },
    ],
  },
};

const rollNumbers = Object.keys(STUDENTS);
let selectedRoll = null;

const bandColor = {
  distinction: { fg: "#5C7A52", bg: "#E6ECE0" },
  good:        { fg: "#3A5B8C", bg: "#E2E9F1" },
  average:     { fg: "#A6792B", bg: "#F3E8D4" },
  fail:        { fg: "#9A2B25", bg: "#F3DEDC" },
};

// College grading scale (10-point)
function gradeFor(pct) {
  if (pct >= 90) return { letter: "O", point: 10, band: "distinction" };
  if (pct >= 80) return { letter: "A+", point: 9, band: "distinction" };
  if (pct >= 70) return { letter: "A", point: 8, band: "good" };
  if (pct >= 60) return { letter: "B+", point: 7, band: "good" };
  if (pct >= 50) return { letter: "B", point: 6, band: "average" };
  if (pct >= 40) return { letter: "C", point: 5, band: "average" };
  if (pct >= 33) return { letter: "P", point: 4, band: "average" };
  return { letter: "F", point: 0, band: "fail" };
}

function classFor(sgpa) {
  if (sgpa >= 9) return "Distinction";
  if (sgpa >= 7.5) return "First class with honours";
  if (sgpa >= 6) return "First class";
  if (sgpa >= 5) return "Second class";
  if (sgpa >= 4) return "Pass class";
  return "Not qualified";
}

const input = document.getElementById("roll-input");
const dropdown = document.getElementById("dropdown");
const errorMsg = document.getElementById("error-msg");

function renderDropdown() {
  const q = input.value.trim().toUpperCase();
  const matches = !q
    ? rollNumbers
    : rollNumbers.filter(
        (r) => r.includes(q) || STUDENTS[r].name.toUpperCase().includes(q)
      );

  dropdown.innerHTML = "";
  if (matches.length === 0) {
    dropdown.classList.remove("open");
    return;
  }
  matches.forEach((r) => {
    const row = document.createElement("div");
    row.className = "dropdown-row";
    row.innerHTML = `<span class="roll">${r}</span><span class="name">${STUDENTS[r].name}</span>`;
    row.addEventListener("click", () => {
      input.value = r;
      lookup(r);
    });
    dropdown.appendChild(row);
  });
  dropdown.classList.add("open");
}

input.addEventListener("input", () => {
  errorMsg.style.display = "none";
  renderDropdown();
});
input.addEventListener("focus", renderDropdown);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") lookup(input.value);
});
document.addEventListener("click", (e) => {
  if (!e.target.closest(".search-box")) dropdown.classList.remove("open");
});
document.getElementById("view-btn").addEventListener("click", () => lookup(input.value));

function lookup(roll) {
  const clean = (roll || "").trim().toUpperCase();
  if (!clean) {
    showError("Enter a roll number to continue.");
    return;
  }
  if (!STUDENTS[clean]) {
    showError(`No record found for roll number ${clean}.`);
    selectedRoll = null;
    renderResult();
    return;
  }
  errorMsg.style.display = "none";
  selectedRoll = clean;
  dropdown.classList.remove("open");
  renderResult();
}

function showError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.display = "block";
}

function renderResult() {
  const card = document.getElementById("result-card");
  const empty = document.getElementById("empty-state");

  if (!selectedRoll) {
    card.style.display = "none";
    empty.style.display = "block";
    return;
  }

  const student = STUDENTS[selectedRoll];
  const obtained = student.courses.reduce((s, x) => s + x.marks, 0);
  const max = student.courses.reduce((s, x) => s + x.max, 0);
  const pct = (obtained / max) * 100;

  const totalCredits = student.courses.reduce((s, x) => s + x.credits, 0);
  const creditPoints = student.courses.reduce((s, x) => {
    const p = (x.marks / x.max) * 100;
    return s + x.credits * gradeFor(p).point;
  }, 0);
  const sgpa = creditPoints / totalCredits;

  const passed = student.courses.every((c) => c.marks / c.max >= 0.33);
  const best = student.courses.reduce((a, b) => (b.marks / b.max > a.marks / a.max ? b : a));

  const rowsHtml = student.courses
    .map((c) => {
      const p = (c.marks / c.max) * 100;
      const g = gradeFor(p);
      const col = bandColor[g.band];
      return `<tr>
        <td>${c.name}<br><span class="code">${c.code} · ${c.credits} credits</span></td>
        <td class="num">${c.marks}</td>
        <td class="num max">${c.max}</td>
        <td class="num"><span class="grade-chip" style="background:${col.bg};color:${col.fg}">${g.letter}</span></td>
      </tr>`;
    })
    .join("");

  const barsHtml = student.courses
    .map((c) => {
      const p = (c.marks / c.max) * 100;
      const g = gradeFor(p);
      const col = bandColor[g.band];
      return `<div class="bar-row">
        <span class="subj">${c.name}</span>
        <div class="bar-track"><div class="bar-fill" style="width:${p}%;background:${col.fg}"></div></div>
        <span class="pct">${Math.round(p)}%</span>
      </div>`;
    })
    .join("");

  card.innerHTML = `
    <div class="result-header">
      <div>
        <h2>${student.name}</h2>
        <p>${student.program}</p>
        <p>${student.semester} · Registration no. ${selectedRoll}</p>
      </div>
      <div class="status-pill ${passed ? "pass" : "fail"}">
        ${passed
          ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>'
          : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="m15 9-6 6M9 9l6 6"></path></svg>'}
        ${passed ? "Passed" : "Not passed"}
      </div>
    </div>

    <div class="marks-section">
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th class="num">Marks obtained</th>
            <th class="num">Out of</th>
            <th class="num">Grade</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
      <div class="bars">${barsHtml}</div>
    </div>

    <div class="summary-grid">
      <div class="summary-cell">
        <p class="label">Total marks</p>
        <p class="value">${obtained} / ${max}</p>
      </div>
      <div class="summary-cell">
        <p class="label">Percentage</p>
        <p class="value">${pct.toFixed(1)}%</p>
      </div>
      <div class="summary-cell">
        <p class="label">SGPA</p>
        <p class="value">${sgpa.toFixed(2)}</p>
      </div>
      <div class="summary-cell">
        <p class="label">Classification</p>
        <p class="value small">${classFor(sgpa)}</p>
      </div>
      <div class="summary-cell">
        <p class="label">Best course</p>
        <p class="value small">${best.name}</p>
      </div>
    </div>
  `;

  card.style.display = "block";
  empty.style.display = "none";
}