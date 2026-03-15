/**
 * Default Judgment (Proposed Order) Generator
 *
 * Usage: node generate-default-judgment.js input.json output.docx
 *
 * Input JSON fields:
 *   state, county, court, caseNumber,
 *   plaintiffs, defendants, clientRole,
 *   findings (array of strings — each is one numbered finding),
 *   orders (array of strings — each is one numbered order),
 *   judgeName, judgeTitle
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, UnderlineType
} = require("docx");

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node generate-default-judgment.js input.json output.docx");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

const required = [
  "state", "county", "court", "caseNumber",
  "plaintiffs", "defendants", "clientRole",
  "findings", "orders", "judgeName", "judgeTitle"
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

// Caption — standard firm format
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

// Title
const title = new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [
    run("DEFAULT JUDGMENT", {
      bold: true,
      underline: { type: UnderlineType.SINGLE },
    }),
  ],
});

// Intro
const intro = new Paragraph({
  spacing: { line: LINE_SPACING_DOUBLE },
  indent: { firstLine: 720 },
  children: [
    run(`THIS MATTER comes before the Court on ${data.clientRole}' Motion for Default Judgment. The Court, having reviewed the Motion, the Affidavit in support thereof, the record and argument of counsel, and being otherwise fully advised in the premises, FINDS:`),
  ],
});

// Numbered findings
const findingParas = data.findings.map((text, i) => {
  return new Paragraph({
    spacing: { line: LINE_SPACING_DOUBLE },
    indent: { firstLine: 720 },
    children: [
      run(`${i + 1}.`),
      run(`\t${text}`),
    ],
  });
});

// Transition
const transition = new Paragraph({
  spacing: { line: 276 },
  indent: { firstLine: 720 },
  children: [run("IT IS THEREFORE ORDERED, ADJUDGED, AND DECREED:", { bold: true })],
});

// Numbered orders
const orderParas = data.orders.map((text, i) => {
  return new Paragraph({
    spacing: { line: LINE_SPACING_DOUBLE },
    indent: { firstLine: 720 },
    children: [
      run(`${i + 1}.`),
      run(`\t${text}`),
    ],
  });
});

// IT IS SO ORDERED + Judge block
const judgeBlock = [
  new Paragraph({ children: [run("IT IS SO ORDERED.", { bold: true })] }),
  new Paragraph({
    indent: { left: 4320 },
    children: [run("_________________________________")],
  }),
  new Paragraph({
    indent: { left: 4320 },
    children: [run(data.judgeName)],
  }),
  new Paragraph({
    indent: { left: 4320 },
    children: [run(data.judgeTitle)],
  }),
];

// Attorney signature
const attorneyBlock = [
  new Paragraph({ children: [run("Respectfully Submitted by:")] }),
  new Paragraph({ children: [run("___/s/ Jake A. Garrison___")] }),
  new Paragraph({ children: [run("Jake A. Garrison")] }),
  new Paragraph({ children: [run("The Garrison Law Firm, LLC")] }),
  new Paragraph({ children: [run("1212 Pennsylvania St. NE")] }),
  new Paragraph({ children: [run("Albuquerque, NM 87110")] }),
  new Paragraph({ children: [run("Phone: (505) 293-2710")] }),
  new Paragraph({ children: [run("jake@garrisonlawnm.com")] }),
  new Paragraph({ children: [run(`Attorney for ${data.clientRole}`)] }),
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
    children: [
      ...caption, title, intro, ...findingParas,
      transition, ...orderParas,
      ...judgeBlock, ...attorneyBlock,
    ],
  }],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputFile, buffer);
  console.log(`Generated: ${outputFile}`);
});
