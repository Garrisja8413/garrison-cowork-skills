/**
 * Notice of Hearing (Proposed) Generator
 *
 * Usage: node generate-notice-of-hearing.js input.json output.docx
 *
 * Input JSON fields (required):
 *   state, county, court, caseNumber,
 *   plaintiffs, defendants, clientRole,
 *   judgeName, hearingPlace, mattersToBeHeard
 *
 * Optional:
 *   hearingDate, hearingTime, hearingLength, partiesEntitledToNotice
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, UnderlineType,
  TabStopPosition, TabStopType
} = require("docx");

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node generate-notice-of-hearing.js input.json output.docx");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

const required = [
  "state", "county", "court", "caseNumber",
  "plaintiffs", "defendants", "clientRole",
  "judgeName", "hearingPlace", "mattersToBeHeard"
];
for (const f of required) {
  if (!data[f]) {
    console.error(`Missing required field: ${f}`);
    process.exit(1);
  }
}

const FONT = "Century Schoolbook";
const FONT_SIZE = 24; // 12pt

function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: FONT_SIZE, ...opts });
}

function emptyPara(opts = {}) {
  return new Paragraph({ children: [run("")], ...opts });
}

// Underlined blank line using tabs
function blankUnderlineTabs(count) {
  const tabs = [];
  for (let i = 0; i < count; i++) {
    tabs.push(run("\t", { underline: { type: UnderlineType.SINGLE } }));
  }
  return tabs;
}

// --- Caption (bold state/county/court per sample) ---
const caption = [
  new Paragraph({ children: [run(`STATE OF ${data.state}`, { bold: true })] }),
  new Paragraph({ children: [run(`COUNTY OF ${data.county}`, { bold: true })] }),
  new Paragraph({ children: [run(data.court, { bold: true })] }),
  emptyPara(),
  new Paragraph({ children: [run(data.plaintiffs)] }),
  emptyPara(),
  new Paragraph({ children: [run(`\t${data.clientRole},`)] }),
  new Paragraph({
    children: [
      run("vs."),
      run("\t\t\t\t\t\t\tNo. "),
      run(data.caseNumber),
    ],
  }),
  emptyPara(),
  ...(() => {
    const defLines = data.defendants.split("\n").filter(l => l.trim());
    return defLines.map((line) => new Paragraph({ children: [run(line.trim())] }));
  })(),
  emptyPara(),
  new Paragraph({ children: [run(`\tDefendants.`)] }),
];

// --- Title ---
const title = [
  emptyPara(),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      run("NOTICE OF HEARING", {
        bold: true,
        underline: { type: UnderlineType.SINGLE },
      }),
    ],
  }),
  emptyPara(),
];

// --- Body ---
const body = [];

// Opening line
body.push(
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    children: [
      run(`A hearing in this case is set before Judge ${data.judgeName} as follows:`),
    ],
  }),
  emptyPara()
);

// Date of hearing
const dateVal = data.hearingDate || "";
body.push(
  new Paragraph({
    children: [
      run("Date of hearing:"),
      ...(dateVal
        ? [run(`\t${dateVal}`)]
        : blankUnderlineTabs(10)
      ),
    ],
  }),
  emptyPara()
);

// Time of hearing
const timeVal = data.hearingTime || "";
body.push(
  new Paragraph({
    children: [
      run("Time of hearing:"),
      ...(timeVal
        ? [run(`\t${timeVal}`)]
        : blankUnderlineTabs(10)
      ),
    ],
  }),
  emptyPara()
);

// Length of hearing
const lengthVal = data.hearingLength || "";
body.push(
  new Paragraph({
    children: [
      run("Length of hearing:"),
      ...(lengthVal
        ? [run(`\t${lengthVal}`)]
        : blankUnderlineTabs(10)
      ),
    ],
  }),
  emptyPara()
);

// Place of hearing
body.push(
  new Paragraph({
    indent: { left: 1371, hanging: 1371 },
    children: [
      run("Place of hearing: "),
      run(`\t${data.hearingPlace}`),
    ],
  }),
  emptyPara()
);

// Matter(s) to be heard
body.push(
  new Paragraph({
    indent: { left: 2286, hanging: 2286 },
    children: [
      run("Matter(s) to be heard:"),
      run("\t"),
      run(data.mattersToBeHeard),
    ],
  }),
  emptyPara()
);

// Court signature block
body.push(
  new Paragraph({
    indent: { firstLine: 2286 },
    children: [
      run("By ____________________________________ "),
    ],
  }),
  new Paragraph({
    children: [
      run("\t\t\t\t\t\t\t"),
      run("TRIAL COURT ASSISTANT"),
    ],
  }),
  emptyPara()
);

// Parties entitled to notice
body.push(
  new Paragraph({
    children: [run("Parties entitled to Notice:", { bold: true })],
  }),
  emptyPara()
);

const parties = data.partiesEntitledToNotice || [];
if (parties.length > 0) {
  parties.forEach((p) => {
    body.push(new Paragraph({ children: [run(p)] }));
  });
} else {
  body.push(emptyPara());
  body.push(emptyPara());
}

// Footer note
body.push(
  emptyPara(),
  new Paragraph({
    children: [
      run("*Cell phones and other electronic devices are not allowed in the courthouse. ", {
        bold: true,
        italics: true,
      }),
    ],
  })
);

// --- Assemble document ---
const doc = new Document({
  styles: {
    default: {
      document: { run: { font: FONT, size: FONT_SIZE } },
    },
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
      },
    },
    children: [...caption, ...title, ...body],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputFile, buffer);
  console.log(`Generated: ${outputFile}`);
});
