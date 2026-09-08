const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle,
  Table, TableRow, TableCell, WidthType, ShadingType, PageBreak,
} = require('docx');

const PAGE = { size: { width: 11906, height: 16838 } }; // A4 portrait, DXA
const MARGIN = { top: 1000, right: 1080, bottom: 1000, left: 1080 };
const CONTENT_W = 11906 - 1080 - 1080; // 9746

// ---- palette ---------------------------------------------------------------
// Teal carries structure; terracotta is reserved for what must be read. Both
// resolve to distinct greys on a mono printer, which is what these will meet.
const INK = '1A1A1A';      // body text
const DEEP = '1F4E5F';     // headings, rules, table header text
const ACCENT = 'A8522C';   // the few things that must not be skimmed
const MUTED = '55686F';    // notes and secondary text
const TINT = 'E7EFF2';     // table header fill
const TINT_SOFT = 'F4F8F9';// panel fill
const TINT_WARM = 'FAF2EC';// panel fill under an accent rule
const LINE = 'A9BCC4';     // hairlines
const ACCENT_EDGE = { style: BorderStyle.SINGLE, size: 18, color: ACCENT };
// ----------------------------------------------------------------------------

const NONE = { style: BorderStyle.NONE, size: 0, color: 'auto' };
const RULE = { style: BorderStyle.SINGLE, size: 8, color: DEEP };
const HAIR = { style: BorderStyle.SINGLE, size: 4, color: LINE };

// ---------- helpers ----------

const t = (text, o = {}) => new TextRun({ text, ...o });

const p = (runs, o = {}) => new Paragraph({
  children: Array.isArray(runs) ? runs : [t(runs)],
  ...o,
});

const gap = (pts = 6) => new Paragraph({ children: [], spacing: { after: pts * 20 } });

const title = (text) => p([t(text, { bold: true, size: 30, color: DEEP })], {
  alignment: AlignmentType.CENTER,
  spacing: { after: 60 },
});

const subtitle = (text) => p([t(text, { size: 20, color: MUTED })], {
  alignment: AlignmentType.CENTER,
  spacing: { after: 80 },
});

// Section heading with a rule under it
const section = (text) => p([t(text.toUpperCase(), { bold: true, size: 22, color: DEEP })], {
  spacing: { before: 260, after: 120 },
  border: { bottom: RULE },
});

const note = (text, o = {}) => p([t(text, { size: 19, italics: true, color: MUTED })], {
  spacing: { after: 120 }, ...o,
});

const body = (text, o = {}) => p([t(text, { size: 21 })], { spacing: { after: 100 }, ...o });

// A numbered question. keepNext binds it to whatever follows -- without it
// Word will happily leave a question at the foot of one side and its answer
// lines on the other.
const q = (n, text) => p([t(`${n}.  `, { bold: true, size: 21 }), t(text, { size: 21 })], {
  spacing: { before: 120, after: 70 },
  keepNext: true,
  keepLines: true,
});

// Checkbox option
const box = (text, indent = 480) => p([t('☐   ', { size: 24 }), t(text, { size: 21 })], {
  indent: { left: indent },
  spacing: { after: 40 },
});

// Short options on one line, to keep the sheet to a single double-sided page
const boxRow = (opts, indent = 480) => p(
  opts.flatMap((o, i) => [
    t(i ? '     ☐   ' : '☐   ', { size: 24 }),
    t(o, { size: 21 }),
  ]),
  { indent: { left: indent }, spacing: { after: 40 } },
);

// Checkbox with a trailing write-on rule (for "Other: ____")
const boxLine = (text, indent = 480) => new Paragraph({
  children: [t('☐   ', { size: 24 }), t(text, { size: 21 })],
  indent: { left: indent },
  spacing: { after: 40 },
  border: { bottom: HAIR },
});

// Blank write-on lines.
// Built as a borderless table with ruled rows: adjacent paragraphs carrying
// identical borders merge into a single bordered block in Word and draw only
// one rule, so three "lines" rendered as one. Table rows cannot merge.
const lines = (count = 3) => {
  const rows = [];
  for (let i = 0; i < count; i += 1) {
    rows.push(new TableRow({
      cantSplit: true,
      height: { value: 460, rule: 'atLeast' },
      children: [new TableCell({
        width: { size: CONTENT_W, type: WidthType.DXA },
        borders: { top: NONE, bottom: HAIR, left: NONE, right: NONE },
        margins: { top: 0, bottom: 0, left: 200, right: 0 },
        children: [p([t(' ')])],
      })],
    }));
  }
  return [
    new Table({
      columnWidths: [CONTENT_W],
      width: { size: CONTENT_W, type: WidthType.DXA },
      borders: {
        top: NONE, bottom: NONE, left: NONE, right: NONE,
        insideHorizontal: NONE, insideVertical: NONE,
      },
      rows,
    }),
    gap(4),
  ];
};

const sub2 = (text) => p([t(text, { bold: true, size: 21, color: DEEP })], {
  spacing: { before: 180, after: 70 }, keepNext: true,
});

// Label followed by a rule that fills the line
const fieldLine = (label, o = {}) => new Paragraph({
  children: [t(label, { size: 21 })],
  spacing: { before: 120, after: 120 },
  border: { bottom: HAIR },
  ...o,
});

// Boxed callout
const callout = (paras, fill = TINT_SOFT, edge = null) => new Table({
  columnWidths: [CONTENT_W],
  width: { size: CONTENT_W, type: WidthType.DXA },
  rows: [new TableRow({
    children: [new TableCell({
      width: { size: CONTENT_W, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill },
      margins: { top: 160, bottom: 160, left: 200, right: 200 },
      borders: { top: HAIR, bottom: HAIR, right: HAIR, left: edge || RULE },
      children: paras,
    })],
  })],
});

const doc = (children) => new Document({
  styles: {
    default: { document: { run: { font: 'Calibri', size: 21, color: INK } } },
  },
  sections: [{ properties: { page: { ...PAGE, margin: MARGIN } }, children }],
});

// ================= SHEET 1 - REFLECTION =================

const reflection = doc([
  title('Institutions of Thought — AI in Education'),
  subtitle('San Jose Central School INSET  ·  10 September 2026'),
  p([t('REFLECTION', { bold: true, size: 26 })], {
    alignment: AlignmentType.CENTER,
    spacing: { after: 160 },
    border: { bottom: RULE },
  }),

  body('Please take about ten minutes.'),
  body('You do not have to write your name. Nothing here is evaluated, graded, or reported to anyone as your performance. Honest answers — including unflattering ones — are worth far more to us than kind ones.'),
  p([t('If something did not work today, this is the right place to say so.', { size: 21, bold: true })], { spacing: { after: 160 } }),

  fieldLine('Name (optional):'),
  note('Leave it blank if you prefer. If you do write it, tick what you are agreeing to — they are separate:'),
  box('Credit my materials to me'),
  box('You may ask me about this again later'),
  fieldLine('Learning area, or your role:', { spacing: { before: 160, after: 120 } }),
  note('If you are not a classroom teacher, answer everything below for the work you actually do. Where a question says “lesson” or “class”, read it as whatever you were making today.'),

  section('Part 1 — Quick marks'),
  note('Tick the boxes. This part takes two minutes.'),

  q(1, 'Before today, had you used AI tools?'),
  boxRow(['Never', 'Tried once or twice', 'Occasionally', 'Regularly']),

  q(2, 'When were you able to get the AI working with the workshop folder?'),
  box('By 10:30, when the workshop began'),
  box('Later in the morning'),
  box('Only in the afternoon'),
  box('Never, or not for most of the day'),
  note('Question 3 asks separately about help, so answer this one purely on timing.'),

  q(3, 'If you needed help, what was it for?  (Tick all that apply)'),
  box('Signing in to my account'),
  box('Connecting the app to the folder'),
  box('Ran out of free usage / hit a limit'),
  box('Did not know what to ask'),
  box('The laptop or connection itself'),
  box('I did not need help'),
  boxLine('Other:'),

  q(4, 'How many things did you make today that you would actually use?'),
  boxRow(['None yet', '1', '2 or 3', '4 or more']),

  q(5, 'Will you use something from today in your work this week?'),
  boxRow(['Yes, tomorrow', 'Yes, within the week', 'Maybe later', 'No']),

  q(6, 'How much of what the AI gave you needed changing before you would use it?'),
  boxRow(['Almost none', 'A little', 'About half', 'Most of it']),
  box('I could not use what it gave me'),

  section('Part 2 — In your own words'),
  note('Short answers are fine. One honest line beats a paragraph.'),

  q(7, 'What surprised you today?'),
  ...lines(3),

  q(8, 'What will you use tomorrow?'),
  ...lines(3),

  q(9, 'Where was the AI most helpful?'),
  ...lines(3),

  q(10, 'Where must teachers remain central — where should this never take over?'),
  ...lines(3),

  q(11, 'What did you try today that did NOT work, or that frustrated you?'),
  note('Please be blunt. This question improves the next one of these more than any other question on the page.'),
  ...lines(3),

  q(12, 'What would you like future teachers at this school to inherit from today?'),
  ...lines(3),

  p([t('Anything else? Ask for a second sheet — both sides of this one are used.', { size: 20, italics: true })], {
    spacing: { before: 140, after: 70 },
  }),
  p([t('Thank you.  Salamat po.', { bold: true, size: 22 })], {
    alignment: AlignmentType.CENTER,
    spacing: { before: 40 },
  }),
]);

// ================= SHEET 2 - DAY LOG =================

const scheduleRows = [
  ['Welcome', '8:00'],
  ['Session 1 — Changing landscape', '8:30'],
  ['Session 2 — Demonstration', '9:15'],
  ['Guided Workshop', '10:30'],
  ['Collaborative Lesson Design', '1:00'],
  ['AI Beyond Lesson Planning', '2:30'],
  ['School as a Learning Institution', '3:15'],
  ['Reflection', '4:15'],
];

const COLS = [5346, 2200, 2200];

const cell = (text, o = {}) => new TableCell({
  width: { size: o.w, type: WidthType.DXA },
  margins: { top: 80, bottom: 80, left: 120, right: 120 },
  borders: { top: HAIR, bottom: HAIR, left: HAIR, right: HAIR },
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill } : undefined,
  children: [p([t(text, { size: 20, bold: !!o.bold })])],
});

const scheduleTable = new Table({
  columnWidths: COLS,
  width: { size: CONTENT_W, type: WidthType.DXA },
  rows: [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        cell('Block', { w: COLS[0], bold: true, fill: TINT }),
        cell('Planned', { w: COLS[1], bold: true, fill: TINT }),
        cell('Actual', { w: COLS[2], bold: true, fill: TINT }),
      ],
    }),
    ...scheduleRows.map(([name, planned]) => new TableRow({
      cantSplit: true,
      children: [
        cell(name, { w: COLS[0] }),
        cell(planned, { w: COLS[1] }),
        cell('', { w: COLS[2] }),
      ],
    })),
  ],
});

const CLIFF = [4746, 2500, 2500];

const cliffTable = (heading, rows) => new Table({
  columnWidths: CLIFF,
  width: { size: CONTENT_W, type: WidthType.DXA },
  rows: [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        cell(heading, { w: CLIFF[0], bold: true, fill: TINT }),
        cell('Count', { w: CLIFF[1], bold: true, fill: TINT }),
        cell('Out of', { w: CLIFF[2], bold: true, fill: TINT }),
      ],
    }),
    ...rows.map((label) => new TableRow({
      cantSplit: true,
      children: [
        cell(label, { w: CLIFF[0] }),
        cell('', { w: CLIFF[1] }),
        cell('', { w: CLIFF[2] }),
      ],
    })),
  ],
});

const TALLY = [5346, 4400];
const tallyTable = new Table({
  columnWidths: TALLY,
  width: { size: CONTENT_W, type: WidthType.DXA },
  rows: [
    new TableRow({
      tableHeader: true,
      cantSplit: true,
      children: [
        cell('Reason for the request', { w: TALLY[0], bold: true, fill: TINT }),
        cell('Tally', { w: TALLY[1], bold: true, fill: TINT }),
      ],
    }),
    ...[
      'Signing in / account problem',
      'Phone or email verification',
      'Connecting app to the folder',
      'Ran out of free usage',
      'Did not know what to ask',
      'Laptop, power, or Wi-Fi',
      'Something else',
    ].map((label) => new TableRow({
      cantSplit: true,
      children: [
        cell(label, { w: TALLY[0] }),
        cell('', { w: TALLY[1] }),
      ],
    })),
  ],
});

const dayLog = doc([
  title('Facilitator Day Log'),
  subtitle('San Jose Central School INSET  ·  10 September 2026'),
  gap(4),

  callout([
    p([t('This sheet is not for the facilitator to fill.', { bold: true, size: 22, color: ACCENT })], { spacing: { after: 100 } }),
    p([t('Zen will be teaching, demonstrating, and troubleshooting all day. He cannot also be counting. Give this to a support person before 8:00 and ask them to keep it with them. It takes about five minutes of attention across the whole day.', { size: 20 })], { spacing: { after: 140 } }),
    new Paragraph({
      children: [t('Kept by: ', { size: 21, bold: true })],
      border: { bottom: HAIR },
      spacing: { before: 60, after: 40 },
    }),
  ], TINT_WARM, ACCENT_EDGE),

  gap(8),
  note('Why this exists: the first outing on 12 August produced a good account of what happened, but only from memory. The attendance, the proportions, and the "about half the day" for setup are all recollection. They are probably close. Nobody can check. Six numbers written down today make the next one of these a design problem instead of a guess.'),

  section('A — The room'),
  fieldLine('Personnel present at 8:30:'),
  fieldLine('Teaching:                                        Non-teaching:'),
  fieldLine('Laptops in the room:'),
  fieldLine('Laptops with the AI app already installed on arrival:'),
  note('This is the pre-work check. It tells us whether asking people to install beforehand actually works.'),

  section('B — Readiness and the 10:30 cliff'),
  p([t('This is the most important section on the page.', { size: 21, bold: true })], { spacing: { after: 100 } }),
  body('Two different things are being counted here. Do not merge them. Walk the room and count; do not estimate.'),

  sub2('B1 — Ready: app open, signed in, folder opened'),
  note('Participants are not asked to set up before the 10:15 break, so a low count earlier means they are following the guide — not that anything is wrong.'),
  cliffTable('Checkpoint', ['By 9:15  (early starters only — optional)', 'By 10:30  (this is the one that matters)']),

  sub2('B2 — Producing: has saved at least one output'),
  note('Only meaningful once the workshop has begun.'),
  cliffTable('Checkpoint', ['By 11:00', 'By 12:00', 'By 14:30']),

  gap(8),
  note('“Out of” means people, not laptops. If two people share one machine that is two people — note any sharing here.'),
  ...lines(1),
  fieldLine('Time the LAST person got working:'),
  body('If someone never got working, note it here and why:'),
  ...lines(2),

  section('C — Help requests'),
  note('One mark per request. Rough is fine.', { keepNext: true }),
  tallyTable,
  gap(8),
  fieldLine('Time of the FIRST "ran out of free usage":'),
  fieldLine('Roughly how many hit a usage limit by day’s end:'),
  note('On 12 August this was a real constraint. If it bites again we need to know when, not whether.'),

  section('D — Collection'),
  fieldLine('Files handed in before lunch:'),
  fieldLine('Files handed in before the 3:00 break:'),
  fieldLine('People who handed in nothing:'),
  fieldLine('People who explicitly declined:'),
  note('Declining is fine and expected. We count it so we do not mistake an opt-out for a failure.'),

  section('E — What stopped the room'),
  note('Anything that halted more than two or three people at once. Time it, name it, one line.'),
  ...lines(4),

  p([new PageBreak()]),

  section('F — Schedule: planned versus actual'),
  scheduleTable,
  gap(8),
  body('Any block that had to be cut or shortened, and what was dropped:'),
  ...lines(2),

  section('G — One honest line'),
  body('From the person keeping this sheet, not the facilitator. What would you fix first if this ran again next week?'),
  ...lines(3),

  section('H — Anything else'),
  note('Overheard remarks, a moment worth remembering, something that worked unexpectedly well. Rough notes are fine — nobody will read this expecting prose.'),
  ...lines(6),

  callout([
    p([t('Hand this sheet back to Zen at the end of the day. Do not photograph and send it — it may carry names.', { size: 20, bold: true, color: ACCENT })]),
  ], TINT_WARM, ACCENT_EDGE),
]);

// ---------- write ----------

const OUT = process.argv[2];

(async () => {
  fs.writeFileSync(`${OUT}/INSET-Reflection-Sheet.docx`, await Packer.toBuffer(reflection));
  fs.writeFileSync(`${OUT}/INSET-Facilitator-Day-Log.docx`, await Packer.toBuffer(dayLog));
  console.log('wrote both documents');
})();
