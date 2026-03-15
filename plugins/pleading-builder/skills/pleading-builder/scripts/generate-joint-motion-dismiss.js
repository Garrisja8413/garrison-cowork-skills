/**
 * Joint Motion to Dismiss Generator
 *
 * Usage: node generate-joint-motion-dismiss.js input.json output.docx
 *
 * Input JSON fields:
 *   state, county, court, caseNumber,
 *   plaintiffs (string), defendants (string),
 *   clientRole ("Plaintiff" / "Defendants"),
 *   dismissalType ("with prejudice" / "without prejudice"),
 *   supportingParagraphs (array of strings),
 *   feesProvision (string),
 *   opposingPartyName, opposingPartyAddress, opposingPartyCityStateZip,
 *   opposingPartyPhone, opposingPartyRole
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  UnderlineType, PageBreak
} = require("docx");

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node generate-joint-motion-dismiss.js input.json output.docx");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

const required = [
  "state", "county", "court", "caseNumber",
  "plaintiffs", "defendants", "clientRole",
  "dismissalType", "supportingParagraphs", "feesProvision"
];
// Pro se opposing party fields required only when opposingCounsel is not provided
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

// --- Determine party references ---
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
function buildCaption() {
  return [
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
}

// --- Firm signature block ---
function buildFirmSigBlock() {
  return [
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
}

// --- Opposing party approval block ---
// If opposingCounsel object is provided, format like firm sig block.
// Otherwise, format as pro se with signature line.
function buildApprovalBlock() {
  const oc = data.opposingCounsel;
  if (oc) {
    // Represented by counsel — mirror firm signature block format
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
  // Pro se — signature line for party to sign
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

// --- COME NOW paragraph ---
const plaintiffNamesNatural = plaintiffNames.map(n => {
  // Title case for body text
  return n.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}).join(" and ");

const defendantNamesNatural = defendantNames.map(n => {
  return n.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
}).join(" and ");

const comeNowText = `COME NOW Plaintiff ${plaintiffNamesNatural} and Defendants ${defendantNamesNatural} (collectively, the "Parties"), and jointly move this Court to dismiss this action ${data.dismissalType}. In support of this Motion, the Parties state as follows:`;

const whereforeText = `WHEREFORE, the Parties respectfully request that this Court enter an Order dismissing this action ${data.dismissalType}, ${data.feesProvision}.`;

// --- Build body paragraphs ---
const motionBody = [
  emptyPara(),
  // COME NOW
  new Paragraph({
    spacing: { line: LINE_SPACING_DOUBLE, after: 240 },
    indent: { firstLine: 720 },
    children: [run(comeNowText)],
  }),
];

// Numbered supporting paragraphs
for (let i = 0; i < data.supportingParagraphs.length; i++) {
  motionBody.push(
    new Paragraph({
      spacing: { line: LINE_SPACING_DOUBLE, after: 240 },
      indent: { firstLine: 720 },
      children: [run(`${i + 1}. ${data.supportingParagraphs[i]}`)],
    })
  );
}

// WHEREFORE
motionBody.push(
  new Paragraph({
    spacing: { line: LINE_SPACING_DOUBLE, after: 240 },
    indent: { firstLine: 720 },
    children: [run(whereforeText)],
  })
);

// --- Assemble motion page ---
const motionTitle = new Paragraph({
  alignment: AlignmentType.CENTER,
  spacing: { after: 480 },
  children: [
    titleRun(`JOINT MOTION TO DISMISS ${dismissalUpper}`, {
      bold: true,
      underline: { type: UnderlineType.SINGLE },
    }),
  ],
});

const motionPage = [
  ...buildCaption(),
  motionTitle,
  ...motionBody,
  ...buildFirmSigBlock(),
  ...buildApprovalBlock(),
];

// --- Build document ---
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
      children: motionPage,
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputFile, buffer);
  console.log(`Generated: ${outputFile}`);
});
