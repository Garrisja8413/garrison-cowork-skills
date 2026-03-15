/**
 * Motion for Default Judgment Generator
 *
 * Usage: node generate-motion-for-default.js input.json output.docx
 *
 * Input JSON fields:
 *   state, county, court, caseNumber,
 *   plaintiffs (string), defendants (string),
 *   clientRole ("Plaintiffs" or "Plaintiff"),
 *   complaintFilingDate, summonReturnFilingDate, serviceDate,
 *   affiantName, certificateOfServiceDate, certificateOfServiceMethod
 */

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, AlignmentType,
  TabStopType, TabStopPosition, UnderlineType, BorderStyle
} = require("docx");

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Usage: node generate-motion-for-default.js input.json output.docx");
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(inputFile, "utf8"));

// Validate required fields
const required = [
  "state", "county", "court", "caseNumber",
  "plaintiffs", "defendants", "clientRole",
  "complaintFilingDate", "summonReturnFilingDate", "serviceDate",
  "affiantName", "certificateOfServiceDate", "certificateOfServiceMethod"
];
for (const f of required) {
  if (!data[f]) {
    console.error(`Missing required field: ${f}`);
    process.exit(1);
  }
}

// Formatting constants matching the example document
const FONT = "Century Schoolbook";
const FONT_SIZE = 24; // 12pt in half-points
const LINE_SPACING_DOUBLE = 480; // double spacing in twips (240 twips per line at 12pt)

function run(text, opts = {}) {
  return new TextRun({
    text,
    font: FONT,
    size: FONT_SIZE,
    ...opts,
  });
}

function emptyPara(opts = {}) {
  return new Paragraph({
    children: [run("")],
    ...opts,
  });
}

// Build caption block
const captionParagraphs = [
  new Paragraph({ children: [run(`STATE OF ${data.state}`)] }),
  new Paragraph({ children: [run(`COUNTY OF ${data.county}`)] }),
  new Paragraph({ children: [run(data.court)] }),
  emptyPara(),
  // Case number indented to ~4 inches (5760 twips)
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
  new Paragraph({ children: [run(`${data.defendants};`)] }),
  emptyPara(),
  new Paragraph({ children: [run("Defendants.")] }),
  emptyPara(),
];

// Title
const titleParagraph = new Paragraph({
  alignment: AlignmentType.CENTER,
  children: [
    run("MOTION FOR DEFAULT JUDGMENT", {
      bold: true,
      underline: { type: UnderlineType.SINGLE },
    }),
  ],
});

// Body paragraphs — justified, double-spaced
function bodyPara(children, opts = {}) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: LINE_SPACING_DOUBLE },
    children,
    ...opts,
  });
}

const introText = `Pursuant to Rule 1-055 NMRA, which allows for the entry of default judgment when a party against whom affirmative relief is sought has failed to plead or otherwise defend, ${data.clientRole}, ${data.plaintiffs}, hereby move for entry of default judgment against Defendants, ${data.defendants}, and in support thereof, state as follows:`;

const bodyParagraphs = [
  emptyPara(),
  // Introductory paragraph with first-line indent
  bodyPara([run(introText)], { indent: { firstLine: 720 } }),
  bodyPara([run(`1. A Complaint against Defendants was filed in this cause on ${data.complaintFilingDate}.`)], { indent: { firstLine: 720 } }),
  bodyPara([
    run(`2. Jurisdiction over the Defendants was obtained by Service of Process as evidenced by the Summons Return filed in this proceeding on ${data.summonReturnFilingDate}, showing that the Summons and Complaint were delivered to the Defendants on `),
    run(data.serviceDate, { bold: true }),
    run("."),
  ], { indent: { firstLine: 720 } }),
  bodyPara([run("3. The Defendants have failed to file an Answer or any other responsive pleading within the time required by law and the rules of this Court for such filing and have also failed to file any motion for enlargement of time within which to answer.")], { indent: { firstLine: 720 } }),
  bodyPara([run("4. The Defendants have failed to appear in this action, and the Defendants are now in default.")], { indent: { firstLine: 720 } }),
  emptyPara({ spacing: { line: LINE_SPACING_DOUBLE } }),
  bodyPara([run(`5. ${data.clientRole} are entitled to entry of a default judgment against the Defendants for the relief prayed for in the Complaint.`)], { indent: { firstLine: 720 } }),
  bodyPara([run(`6. In further support of this Motion, an Affidavit of ${data.affiantName} is filed concurrently with this Motion and is incorporated by reference herein.`)], { indent: { firstLine: 720 } }),
  bodyPara([run(`WHEREFORE, ${data.clientRole} pray that this Court enter a default judgment against the Defendants, jointly and severally, for the relief prayed for in the Complaint, and for such other and further relief as the Court deems just and proper.`)], { indent: { firstLine: 720 } }),
  bodyPara([run("Respectfully submitted,")]),
];

// Signature block
const signatureBlock = [
  emptyPara(),
  new Paragraph({
    children: [
      run("/s/ Jake A. Garrison", { underline: { type: UnderlineType.SINGLE } }),
      run("\t\t", { underline: { type: UnderlineType.SINGLE } }),
    ],
  }),
  new Paragraph({ children: [run("The Garrison Law Firm, LLC")] }),
  new Paragraph({ children: [run("1212 Pennsylvania St. NE")] }),
  new Paragraph({ children: [run("Albuquerque, NM 87110")] }),
  new Paragraph({ children: [run("Phone: (505) 293-2710")] }),
  new Paragraph({ children: [run("Fax: (505) 214-5764")] }),
  new Paragraph({ children: [run("E-Mail: jake@garrisonlawnm.com")] }),
  new Paragraph({ children: [run(`Attorney for ${data.clientRole}`)] }),
];

// Certificate of Service
const certificateOfService = [
  emptyPara(),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [run("CERTIFICATE OF SERVICE", { bold: true })],
  }),
  emptyPara({ alignment: AlignmentType.JUSTIFIED }),
  new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    children: [
      run(`This certifies that on this ${data.certificateOfServiceDate}, a true and correct copy of the foregoing pleading was ${data.certificateOfServiceMethod}.`),
    ],
  }),
  emptyPara({ alignment: AlignmentType.JUSTIFIED }),
  emptyPara(),
  new Paragraph({ children: [run("THE GARRISON LAW FIRM, LLC")] }),
  emptyPara(),
  new Paragraph({
    children: [
      run("/s/ Jake A. Garrison", { underline: { type: UnderlineType.SINGLE } }),
      run("\t\t\t", { underline: { type: UnderlineType.SINGLE } }),
    ],
  }),
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
          margin: { top: 1440, bottom: 1080, left: 1440, right: 1440 },
        },
      },
      children: [
        ...captionParagraphs,
        titleParagraph,
        ...bodyParagraphs,
        ...signatureBlock,
        ...certificateOfService,
      ],
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(outputFile, buffer);
  console.log(`Generated: ${outputFile}`);
});
