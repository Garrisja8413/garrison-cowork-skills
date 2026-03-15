/**
 * Affidavit of Non-Military Service Generator
 *
 * Usage: node generate-affidavit-non-military.js input.json output.docx
 *
 * Input JSON fields:
 *   state, county, court, caseNumber,
 *   plaintiffs, defendants, clientRole,
 *   targetDefendant, affiantName, dated
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, UnderlineType
} = require("docx");

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node generate-affidavit-non-military.js input.json output.docx");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

const required = [
  "state", "county", "court", "caseNumber",
  "plaintiffs", "defendants", "clientRole",
  "targetDefendant", "affiantName", "dated"
];
for (const f of required) {
  if (!data[f]) {
    console.error(`Missing required field: ${f}`);
    process.exit(1);
  }
}

const FONT = "Century Schoolbook";
const FONT_SIZE = 24;
const LINE_SPACING_DOUBLE = 480;

function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: FONT_SIZE, ...opts });
}

function emptyPara(opts = {}) {
  return new Paragraph({ children: [run("")], ...opts });
}

// Caption â case number on Plaintiff line via tabs
// Caption â standard firm format
const caption = [
  new Paragraph({ children: [run(`STATE OF ${data.state}`)] }),
  new Paragraph({ children: [run(`COUNTY OF ${data.county}`)] }),
  new Paragraph({ children: [run(data.court)] }),
  emptyPara(),
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

// Title â two lines
const titleLines = [
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      run("AFFIDAVIT OF NON-MILITARY SERVICE", {
        bold: true,
        underline: { type: UnderlineType.SINGLE },
      }),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      run(`(${data.targetDefendant})`, {
        bold: true,
        underline: { type: UnderlineType.SINGLE },
      }),
    ],
  }),
];

// Body
const body = [
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: LINE_SPACING_DOUBLE },
    indent: { firstLine: 720 },
    children: [
      run(`I, ${data.affiantName}, being first duly sworn, depose and state that:`),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: LINE_SPACING_DOUBLE },
    children: [
      run(`1. I am the attorney for ${data.clientRole} in this action. This Affidavit is made for the purpose of securing an entry of default against Defendant ${data.targetDefendant} for failure to answer or otherwise responsibly plead in this cause as required by law and in support of the Motion for Default Judgment against ${data.targetDefendant} filed herewith.`),
    ],
  }),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: LINE_SPACING_DOUBLE },
    children: [
      run(`2. In compliance with the Service Members Civil Relief Act of 2003, as amended, I made this Affidavit based on the facts available to the affiant, including personal knowledge, verification with the U.S. Department of Defense Manpower Data Center (DMDC) database when possible, and other relevant inquiry. ${data.clientRole} has no information available to them, including the social security number or date of birth of ${data.targetDefendant} such that a search of the Defense Manpower Data Center would produce any accurate results.`),
    ],
  }),
  new Paragraph({
    spacing: { line: LINE_SPACING_DOUBLE },
    indent: { firstLine: 720 },
    children: [
      run("I AFFIRM UNDER PENALTY OF PERJURY under the laws of the State of New Mexico that all of the above statements are true and correct."),
    ],
  }),
  new Paragraph({
    spacing: { line: LINE_SPACING_DOUBLE },
    indent: { firstLine: 720 },
    children: [
      run("Dated: "),
      run(data.dated),
    ],
  }),
];

// Signature block
const sigBlock = [
  new Paragraph({ children: [run("GARRISON LAW FIRM, P.A.")] }),
  new Paragraph({
    spacing: { line: 259 },
    children: [
      run(`/s/${data.affiantName}`, { underline: { type: UnderlineType.SINGLE } }),
      run("\t\t\t", { underline: { type: UnderlineType.SINGLE } }),
    ],
  }),
  new Paragraph({ spacing: { line: 259 }, children: [run(data.affiantName)] }),
  new Paragraph({ spacing: { line: 259 }, children: [run("1212 Pennsylvania St. NE")] }),
  new Paragraph({ spacing: { line: 259 }, children: [run("Albuquerque, New Mexico 87110")] }),
  new Paragraph({ spacing: { line: 259 }, children: [run("Telephone: (505) 293-2710")] }),
  new Paragraph({ spacing: { line: 259 }, children: [run(`Attorney for ${data.clientRole}`)] }),
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
        margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 },
      },
    },
    children: [...caption, ...titleLines, ...body, ...sigBlock],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputFile, buffer);
  console.log(`Generated: ${outputFile}`);
});
