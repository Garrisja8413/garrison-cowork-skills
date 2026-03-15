/**
 * Certificate as to State of Record / Notice of Non-Appearance Generator
 *
 * Usage: node generate-cert-notice.js input.json output.docx
 *
 * Input JSON fields:
 *   state, county, court, courtOrdinal (e.g. "Eleventh"),
 *   caseNumber, plaintiffs, defendants, clientRole,
 *   targetDefendant, complaintTitle, complaintFilingDate,
 *   processIssuedDate, serviceDate, serviceMethod,
 *   witnessMonth, witnessYear
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, UnderlineType,
  TabStopType
} = require("docx");

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node generate-cert-notice.js input.json output.docx");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

const required = [
  "state", "county", "court", "courtOrdinal", "caseNumber",
  "plaintiffs", "defendants", "clientRole",
  "targetDefendant", "complaintTitle", "complaintFilingDate",
  "processIssuedDate", "serviceDate", "serviceMethod",
  "witnessMonth", "witnessYear"
];
for (const f of required) {
  if (!data[f]) {
    console.error(`Missing required field: ${f}`);
    process.exit(1);
  }
}

const FONT = "Century Schoolbook";
const FONT_SIZE = 24; // 12pt
const LINE_SPACING_DOUBLE = 480;

function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: FONT_SIZE, ...opts });
}

function emptyPara(opts = {}) {
  return new Paragraph({ children: [run("")], ...opts });
}

// Caption â standard firm format matching Motion for Default
const caption = [
  new Paragraph({ children: [run(`STATE OF ${data.state}`)] }),
  new Paragraph({ children: [run(`COUNTY OF ${data.county}`)] }),
  new Paragraph({ children: [run(data.court)] }),
  emptyPara(),
  // Case number on its own line, indented ~2.5"
  new Paragraph({
    children: [run(`No. ${data.caseNumber}`)],
    indent: { left: 5760 },
  }),
  emptyPara(),
  new Paragraph({ children: [run(`${data.plaintiffs};`)] }),
  emptyPara(),
  new Paragraph({ children: [run(`${data.clientRole},`)] }),
  emptyPara(),
  new Paragraph({ children: [run("vs.")] }),
  emptyPara(),
  // Split defendants across lines if provided as newline-separated
  ...(() => {
    const defLines = data.defendants.split("\n").filter(l => l.trim());
    if (defLines.length > 1) {
      return defLines.map((line, i) => {
        const suffix = i === defLines.length - 1 ? ";" : "";
        return new Paragraph({ children: [run(line.trim() + suffix)] });
      });
    }
    return [new Paragraph({ children: [run(`${data.defendants};`)] })];
  })(),
  emptyPara(),
  new Paragraph({ children: [run("Defendants.")] }),
  emptyPara(),
];

// Title
const title = new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [
    run("CERTIFICATE AS TO THE STATE OF THE RECORD", {
      bold: true,
      underline: { type: UnderlineType.SINGLE },
    }),
    run(" AND NOTICE OF NON-APPEARANCE", {
      bold: true,
      underline: { type: UnderlineType.SINGLE },
    }),
  ],
});

// County name in mixed case for body text
const countyMixed = data.county.charAt(0) + data.county.slice(1).toLowerCase();

// Body â numbered paragraphs
const body = [
  emptyPara(),
  // Opening paragraph with 0.5" first-line indent
  new Paragraph({
    spacing: { line: LINE_SPACING_DOUBLE },
    indent: { firstLine: 720 },
    children: [
      run(`I, the undersigned, Clerk of the ${data.courtOrdinal} Judicial District Court of the County of ${countyMixed}, State of New Mexico, do hereby certify that:`),
    ],
  }),
  // 1. Complaint filing
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: LINE_SPACING_DOUBLE },
    indent: { firstLine: 720 },
    children: [
      run(`1. ${data.clientRole.endsWith("s") ? data.clientRole + "'" : data.clientRole + "'s"} ${data.complaintTitle} (the "Complaint") was filed in my office on ${data.complaintFilingDate};`),
    ],
  }),
  // 2. Process and service
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: LINE_SPACING_DOUBLE },
    indent: { firstLine: 720 },
    children: [
      run(`2. That process was issued for Defendant, ${data.targetDefendant} on ${data.processIssuedDate}; and that it appears from the return made that proper service of the Summons and Complaint was made on ${data.serviceDate}, by ${data.serviceMethod} a copy of the Summons and Complaint to Defendant ${data.targetDefendant}.`),
    ],
  }),
  // 3. No appearance
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: LINE_SPACING_DOUBLE },
    indent: { firstLine: 720 },
    children: [
      run(`3. I further certify that no appearance by ${data.targetDefendant} has been filed in my office or of record.`),
    ],
  }),
  emptyPara({ spacing: { line: LINE_SPACING_DOUBLE } }),
  emptyPara({ spacing: { line: LINE_SPACING_DOUBLE } }),
  // Witness clause with 0.5" first-line indent
  new Paragraph({
    spacing: { line: LINE_SPACING_DOUBLE },
    indent: { firstLine: 720 },
    children: [
      run(`IN WITNESS WHEREFORE, I have hereunto set my hand and the Seal of said Court this ___ day of ${data.witnessMonth} 20${data.witnessYear}.`),
    ],
  }),
];

// Clerk signature block
const clerkBlock = [
  emptyPara(),
  new Paragraph({
    indent: { left: 2160 },
    children: [run(`CLERK OF THE ${data.court.toUpperCase()} COURT`)],
  }),
  emptyPara(),
  emptyPara(),
  emptyPara(),
  new Paragraph({ children: [run("(COURT SEAL)")] }),
  emptyPara(),
  new Paragraph({
    indent: { firstLine: 5040 },
    children: [
      run("By:  "),
      run("\t", { underline: { type: UnderlineType.SINGLE } }),
    ],
  }),
  new Paragraph({
    indent: { firstLine: 5760 },
    children: [run("Deputy")],
  }),
];

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
        margin: { top: 1440, bottom: 1080, left: 1440, right: 1440 },
      },
    },
    children: [...caption, title, ...body, ...clerkBlock],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputFile, buffer);
  console.log(`Generated: ${outputFile}`);
});
