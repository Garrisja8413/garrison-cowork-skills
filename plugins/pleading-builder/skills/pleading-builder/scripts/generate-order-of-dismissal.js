/**
 * Order of Dismissal (Proposed) Generator
 *
 * Usage: node generate-order-of-dismissal.js input.json output.docx
 *
 * Input JSON fields:
 *   state, county, court, caseNumber,
 *   plaintiffs (string), defendants (string),
 *   clientRole ("Plaintiff" / "Defendants"),
 *   dismissalType ("with prejudice" / "without prejudice"),
 *   feesProvision (string),
 *   opposingPartyName, opposingPartyAddress, opposingPartyCityStateZip,
 *   opposingPartyPhone, opposingPartyRole
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  UnderlineType
} = require("docx");

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node generate-order-of-dismissal.js input.json output.docx");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

const required = [
  "state", "county", "court", "caseNumber",
  "plaintiffs", "defendants", "clientRole",
  "dismissalType", "feesProvision"
];
if (!data.opposingCounsel) {
  required.push("opposingPartyName", "opposingPartyAddress",
    "opposingPartyCityStateZip", "opposingPartyPhone", "opposingPartyRole");
}
for (const f of required) {
  if (!data[f] && data[f] !== 0) {
    console.error(`Missing required field: ${f}`);
    process.exit(1);
  }
}

const FONT = "Century Schoolbook";
const FONT_SIZE = 24; // 12pt
const TITLE_SIZE = 26; // 13pt
const LINE_SPACING_DOUBLE = 480;

function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: FONT_SIZE, ...opts });
}

function titleRun(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: TITLE_SIZE, ...opts });
}

function emptyPara(opts = {}) {
  return new Paragraph({ children: [run("")], ...opts });
}

const plaintiffNames = data.plaintiffs.split("\n").map(n => n.trim()).filter(Boolean);
const defendantNames = data.defendants.split("\n").map(n => n.trim()).filter(Boolean);
const dismissalUpper = data.dismissalType.toUpperCase();

// Build plaintiff display for caption
const plaintiffCaptionLines = [];
for (let i = 0; i < plaintiffNames.length; i++) {
  const suffix = i < plaintiffNames.length - 1 ? " and" : ",";
  plaintiffCaptionLines.push(
    new Paragraph({ children: [run(plaintiffNames[i].toUpperCase() + suffix)] })
  );
}

// Build defendant display for caption
const defendantCaptionLines = [];
for (let i = 0; i < defendantNames.length; i++) {
  const suffix = i < defendantNames.length - 1 ? " and" : ",";
  defendantCaptionLines.push(
    new Paragraph({ children: [run(defendantNames[i].toUpperCase() + suffix)] })
  );
}

// --- Standard caption ---
const captionParagraphs = [
  new Paragraph({ children: [run(`STATE OF ${data.state}`)] }),
  new Paragraph({ children: [run(`COUNTY OF ${data.county}`)] }),
  new Paragraph({ children: [run(data.court)] }),
  emptyPara(),
  new Paragraph({
    children: [run(`No. ${data.caseNumber}`)],
    indent: { left: 5760 },
  }),
  emptyPara(),
  ...plaintiffCaptionLines,
  emptyPara(),
  new Paragraph({ children: [run(`${data.clientRole},`)] }),
  emptyPara(),
  new Paragraph({ children: [run("vs.")] }),
  emptyPara(),
  ...defendantCaptionLines,
  emptyPara(),
  new Paragraph({ children: [run("Defendants.")] }),
  emptyPara(),
];

// --- Title ---
const titleParagraph = new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 480 },
  children: [
    titleRun(`ORDER OF DISMISSAL ${dismissalUpper}`, {
      bold: true,
      underline: { type: UnderlineType.SINGLE },
    }),
  ],
});

// --- Order body ---
const recitalText = `THIS MATTER having come before the Court on the Joint Motion to Dismiss ${data.dismissalType} filed by the Parties, and the Court having reviewed the Motion and being otherwise sufficiently advised in the premises:`;

const orderText = `IT IS HEREBY ORDERED that the above-captioned action is DISMISSED ${dismissalUpper}, ${data.feesProvision}.`;

const bodyParagraphs = [
  new Paragraph({
    spacing: { line: LINE_SPACING_DOUBLE },
    indent: { firstLine: 720 },
    children: [run(recitalText)],
  }),
  new Paragraph({
    spacing: { line: LINE_SPACING_DOUBLE },
    indent: { firstLine: 720 },
    children: [run(orderText)],
  }),
  new Paragraph({
    spacing: { before: 480 },
    children: [run("IT IS SO ORDERED.", { bold: true })],
  }),
];

// --- Judge signature block ---
const judgeBlock = [
  new Paragraph({
    spacing: { before: 480 },
    children: [run("_________________________________")],
  }),
  new Paragraph({ children: [run("DISTRICT COURT JUDGE")] }),
  emptyPara(),
  new Paragraph({
    spacing: { before: 240 },
    children: [run("Date: _____________")],
  }),
];

// --- Firm signature block ---
const firmSigBlock = [
  new Paragraph({
    spacing: { before: 480, after: 120 },
    children: [run("Respectfully submitted,")],
  }),
  new Paragraph({
    spacing: { before: 360 },
    children: [run("THE GARRISON LAW FIRM, LLC", { bold: true })],
  }),
  new Paragraph({
    children: [
      run("/s/ Jake A. Garrison", { underline: { type: UnderlineType.SINGLE } }),
      run("\t", { underline: { type: UnderlineType.SINGLE } }),
    ],
  }),
  new Paragraph({ children: [run("Jake A. Garrison, Esq.")] }),
  new Paragraph({ children: [run("1212 Pennsylvania St. NE")] }),
  new Paragraph({ children: [run("Albuquerque, NM 87110")] }),
  new Paragraph({ children: [run("Phone: (505) 293-2710")] }),
  new Paragraph({
    spacing: { after: 120 },
    children: [run(`Attorney for ${data.clientRole}`, { italics: true })],
  }),
];

// --- Opposing party approval block ---
// If opposingCounsel object is provided, format like firm sig block.
// Otherwise, format as pro se with signature line.
function buildApprovalBlock() {
  const oc = data.opposingCounsel;
  if (oc) {
    return [
      new Paragraph({
        spacing: { before: 480, after: 120 },
        children: [run("Approved:")],
      }),
      new Paragraph({
        spacing: { before: 360 },
        children: [run(oc.firmName || "", { bold: true })],
      }),
      new Paragraph({
        children: [
          run(`/s/ ${oc.attorneyName}`, { underline: { type: UnderlineType.SINGLE } }),
          run("\t", { underline: { type: UnderlineType.SINGLE } }),
        ],
      }),
      new Paragraph({ children: [run(`${oc.attorneyName}, Esq.`)] }),
      new Paragraph({ children: [run(oc.address)] }),
      new Paragraph({ children: [run(oc.cityStateZip)] }),
      new Paragraph({ children: [run(`Phone: ${oc.phone}`)] }),
      new Paragraph({
        spacing: { after: 120 },
        children: [run(oc.role || `Attorney for ${data.clientRole === "Defendants" ? "Plaintiff" : "Defendants"}`, { italics: true })],
      }),
    ];
  }
  return [
    new Paragraph({
      spacing: { before: 480 },
      children: [run("Approved:")],
    }),
    new Paragraph({
      spacing: { before: 480 },
      children: [run("________________________________")],
    }),
    new Paragraph({ children: [run(data.opposingPartyName)] }),
    new Paragraph({ children: [run(data.opposingPartyAddress)] }),
    new Paragraph({ children: [run(data.opposingPartyCityStateZip)] }),
    new Paragraph({ children: [run(`Phone: ${data.opposingPartyPhone}`)] }),
    new Paragraph({
      spacing: { after: 120 },
      children: [run(data.opposingPartyRole, { italics: true })],
    }),
  ];
}
const approvalBlock = buildApprovalBlock();

// --- Assemble document ---
const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: FONT, size: FONT_SIZE },
      },
    },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
        },
      },
      children: [
        ...captionParagraphs,
        titleParagraph,
        ...bodyParagraphs,
        ...judgeBlock,
        ...firmSigBlock,
        ...approvalBlock,
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputFile, buffer);
  console.log(`Generated: ${outputFile}`);
});
