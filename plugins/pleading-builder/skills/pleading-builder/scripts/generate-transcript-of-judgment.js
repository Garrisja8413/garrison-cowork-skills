/**
 * Transcript of Judgment Generator
 *
 * Usage: node generate-transcript-of-judgment.js input.json output.docx
 *
 * Input JSON fields:
 *   state, county, court, caseNumber,
 *   plaintiffs (string), defendants (string),
 *   amountOfJudgment, dateOfJudgment, howSatisfied,
 *   natureOfAction, judgmentCreditors, judgmentDebtors,
 *   date, attorneyBlock (multiline string)
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, TabStopType
} = require("docx");

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node generate-transcript-of-judgment.js input.json output.docx");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

const required = [
  "state", "county", "court", "caseNumber",
  "plaintiffs", "defendants",
  "dateOfJudgment", "natureOfAction",
  "judgmentCreditors", "judgmentDebtors", "date"
];
for (const f of required) {
  if (!data[f]) {
    console.error(`Missing required field: ${f}`);
    process.exit(1);
  }
}

// Formatting constants matching the example document
const FONT = "Times New Roman";
const FONT_SIZE = 20; // 10pt in half-points

function run(text, opts = {}) {
  return new TextRun({ text, font: FONT, size: FONT_SIZE, ...opts });
}

function emptyPara(opts = {}) {
  return new Paragraph({ children: [run("")], ...opts });
}

// Standard border for tables
const border = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
const borders = { top: border, bottom: border, left: border, right: border };
const cellMargins = { top: 40, bottom: 40, left: 80, right: 80 };

// Helper to create table cells
function headerCell(text, width) {
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    margins: cellMargins,
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [run(text, { bold: true })],
      }),
    ],
  });
}

function dataCell(textOrChildren, width) {
  const children = typeof textOrChildren === "string"
    ? [new Paragraph({ children: [run(textOrChildren)] })]
    : textOrChildren.map(t => new Paragraph({ children: [run(t)] }));
  return new TableCell({
    borders,
    width: { size: width, type: WidthType.DXA },
    margins: cellMargins,
    children,
  });
}

// Table widths (content area: 8.5" - 2" margins = 6.5" = 9360 twips)
const TABLE_WIDTH = 9360;
const COL3_WIDTH = Math.floor(TABLE_WIDTH / 3); // 3120 each
const COL3_WIDTHS = [3120, 3120, 3120];
const COL2_WIDTHS = [3120, 6240]; // 1/3 and 2/3

// Caption block — top three lines left-aligned per firm style
const captionParagraphs = [
  new Paragraph({ alignment: AlignmentType.LEFT, children: [run(`STATE OF ${data.state}`)] }),
  new Paragraph({ alignment: AlignmentType.LEFT, children: [run(`COUNTY OF ${data.county}`)] }),
  new Paragraph({ alignment: AlignmentType.LEFT, children: [run(data.court)] }),
  new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 120, after: 120 },
    children: [run(`No. ${data.caseNumber}`)],
  }),
  // Party block
  new Paragraph({ children: [run(`${data.plaintiffs},`)] }),
  emptyPara(),
  new Paragraph({ children: [run("Plaintiffs,")] }),
  emptyPara(),
  new Paragraph({ children: [run("v.")] }),
  emptyPara(),
  new Paragraph({ children: [run(`${data.defendants},`)] }),
  emptyPara(),
  new Paragraph({ children: [run("Defendants.")] }),
  emptyPara(),
  // Title centered after parties
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 160 },
    children: [run("TRANSCRIPT OF JUDGMENT", { bold: true })],
  }),
];

// Table 1: Amount / Date / How Satisfied
const table1 = new Table({
  width: { size: TABLE_WIDTH, type: WidthType.DXA },
  columnWidths: COL3_WIDTHS,
  rows: [
    new TableRow({ children: [
      headerCell("AMOUNT OF JUDGMENT", 3120),
      headerCell("DATE OF JUDGMENT", 3120),
      headerCell("HOW SATISFIED AND REMARKS", 3120),
    ]}),
    new TableRow({ children: [
      dataCell(data.amountOfJudgment || "", 3120),
      dataCell(data.dateOfJudgment, 3120),
      dataCell(data.howSatisfied || "", 3120),
    ]}),
  ],
});

// Table 2: Nature of Action / Creditors / Debtors
const debtorLines = data.judgmentDebtors.split("\n").filter(l => l.trim());
const creditorLines = data.judgmentCreditors.split("\n").filter(l => l.trim());
const table2 = new Table({
  width: { size: TABLE_WIDTH, type: WidthType.DXA },
  columnWidths: COL3_WIDTHS,
  rows: [
    new TableRow({ children: [
      headerCell("NATURE OF ACTION:", 3120),
      headerCell("JUDGMENT CREDITOR(S):", 3120),
      headerCell("JUDGMENT DEBTOR(S):", 3120),
    ]}),
    new TableRow({ children: [
      dataCell(data.natureOfAction, 3120),
      dataCell(creditorLines, 3120),
      dataCell(debtorLines, 3120),
    ]}),
  ],
});

// Table 3: Date / Attorney
const attorneyLines = (data.attorneyBlock || "Jake A. Garrison (Sup. Ct. No. 07182)\nThe Garrison Law Firm, LLC\n1212 Pennsylvania St. NE\nAlbuquerque, NM  87110\n(505) 293-2710 / (505) 214-5764 fax\njake@garrisonlawnm.com").split("\n");
const table3 = new Table({
  width: { size: TABLE_WIDTH, type: WidthType.DXA },
  columnWidths: COL2_WIDTHS,
  rows: [
    new TableRow({ children: [
      headerCell("DATE:", 3120),
      headerCell("ATTORNEY FOR JUDGMENT CREDITOR:", 6240),
    ]}),
    new TableRow({ children: [
      dataCell(data.date, 3120),
      dataCell(attorneyLines, 6240),
    ]}),
  ],
});

// Clerk certification
const clerkSection = [
  emptyPara({ spacing: { before: 120 } }),
  emptyPara({ spacing: { before: 120 } }),
  emptyPara({ spacing: { before: 160 } }),
  new Paragraph({
    alignment: AlignmentType.LEFT,
    children: [run(`I, _________________________, Clerk of the District Court of the State of ${data.state}, within and for the County of ${data.county}, do hereby certify that the foregoing is a true transcript of judgment of said Court, now of record in my office.`)],
  }),
  emptyPara({ spacing: { before: 120 } }),
  new Paragraph({
    alignment: AlignmentType.LEFT,
    children: [run("IN WITNESS WHEREOF, I have hereunto set my hand and seal of said Court this _____ day of _____________________, 20_____.")],
  }),
  emptyPara({ spacing: { before: 240 } }),
  new Paragraph({ alignment: AlignmentType.LEFT, children: [run("_______________________________________")] }),
  new Paragraph({ alignment: AlignmentType.LEFT, children: [run("Clerk of the District Court")] }),
  new Paragraph({ alignment: AlignmentType.LEFT, children: [run(`${data.county} County, ${data.state === "NEW MEXICO" ? "New Mexico" : data.state}`)] }),
];

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
        table1,
        table2,
        table3,
        ...clerkSection,
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputFile, buffer);
  console.log(`Generated: ${outputFile}`);
});
