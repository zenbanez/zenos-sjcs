// Builds the program overview for the San Jose Central School INSET,
// 10 September 2026. Run:  npm install docx && node make-program-overview.js .
//
// Content is the steward's own "Institutions of Thought" facilitator guide,
// preserved. Nothing about the programme was invented here; the only additions
// are the header block and the participant requirements, both marked in the
// artifact README.

const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle,
  Table, TableRow, TableCell, WidthType, ShadingType, PageBreak,
} = require('docx');

const PAGE = { size: { width: 11906, height: 16838 } }; // A4 portrait
const MARGIN = { top: 1080, right: 1080, bottom: 1000, left: 1080 };
const W = 11906 - 1080 - 1080; // 9746

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
// ----------------------------------------------------------------------------

const RULE = { style: BorderStyle.SINGLE, size: 8, color: DEEP };
const THICK = { style: BorderStyle.SINGLE, size: 18, color: ACCENT };
const HAIR = { style: BorderStyle.SINGLE, size: 4, color: LINE };

const t = (text, o = {}) => new TextRun({ text, ...o });
const p = (runs, o = {}) => new Paragraph({
  children: Array.isArray(runs) ? runs : [t(runs)], ...o,
});
const gap = (pts = 6) => new Paragraph({ children: [], spacing: { after: pts * 20 } });

const section = (text) => p([t(text.toUpperCase(), { bold: true, size: 22, color: DEEP })], {
  spacing: { before: 300, after: 140 }, border: { bottom: RULE }, keepNext: true,
});
const sub = (text) => p([t(text, { bold: true, size: 21, color: DEEP })], {
  spacing: { before: 190, after: 70 }, keepNext: true,
});
const body = (text, o = {}) => p([t(text, { size: 21 })], { spacing: { after: 120 }, ...o });
const bullet = (text, o = {}) => p(
  [t('•   ', { size: 21 }), t(text, { size: 21 })],
  { indent: { left: 420, hanging: 200 }, spacing: { after: 70 }, ...o },
);

// Pull quote for the core message
const quote = (linesArr) => new Table({
  columnWidths: [W],
  width: { size: W, type: WidthType.DXA },
  rows: [new TableRow({
    cantSplit: true,
    children: [new TableCell({
      width: { size: W, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: TINT_WARM },
      margins: { top: 240, bottom: 240, left: 400, right: 400 },
      borders: {
        top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
        bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
        left: THICK,
        right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      },
      children: linesArr.map((l, i) => p([t(l, { size: 24, bold: true, color: DEEP })], {
        spacing: { after: i === linesArr.length - 1 ? 0 : 130 },
      })),
    })],
  })],
});

const cell = (content, o = {}) => new TableCell({
  width: { size: o.w, type: WidthType.DXA },
  margins: { top: 110, bottom: 110, left: 150, right: 150 },
  borders: { top: HAIR, bottom: HAIR, left: HAIR, right: HAIR },
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill } : undefined,
  verticalAlign: 'top',
  children: (Array.isArray(content) ? content : [content]).map((x, i, arr) => {
    const isBul = typeof x === 'string' && x.startsWith('- ');
    return p(
      isBul
        ? [t('•  ', { size: 19 }), t(x.slice(2), { size: 19 })]
        : [t(x, { size: 19, bold: !!o.bold, italics: !!o.italics, color: o.bold ? DEEP : INK })],
      {
        spacing: { after: i === arr.length - 1 ? 0 : 60 },
        indent: isBul ? { left: 220, hanging: 200 } : undefined,
      },
    );
  }),
});

// ---------------- header block ----------------

const headerRow = (label, value) => new TableRow({
  children: [
    new TableCell({
      width: { size: 2600, type: WidthType.DXA },
      margins: { top: 70, bottom: 70, left: 0, right: 150 },
      borders: {
        top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
        bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
        left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
        right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      },
      children: [p([t(label, { size: 20, color: MUTED })])],
    }),
    new TableCell({
      width: { size: 7146, type: WidthType.DXA },
      margins: { top: 70, bottom: 70, left: 0, right: 0 },
      borders: {
        top: { style: BorderStyle.NONE, size: 0, color: 'auto' },
        bottom: { style: BorderStyle.NONE, size: 0, color: 'auto' },
        left: { style: BorderStyle.NONE, size: 0, color: 'auto' },
        right: { style: BorderStyle.NONE, size: 0, color: 'auto' },
      },
      children: [p([t(value, { size: 21, bold: true, color: DEEP })])],
    }),
  ],
});

const headerBlock = new Table({
  columnWidths: [2600, 7146],
  width: { size: W, type: WidthType.DXA },
  rows: [
    headerRow('Programme', 'One-day In-Service Training'),
    headerRow('Date', '10 September 2026'),
    headerRow('Venue', 'San Jose Central School'),
    headerRow('Participants', 'Teaching and non-teaching personnel'),
    headerRow('Facilitator', 'Zen Bañez'),
  ],
});

// ---------------- programme table ----------------

const PC = [1500, 2900, 5346];

const programme = [
  ['8:00 – 8:30', 'Welcome and context', [
    'Set expectations, introduce the workshop, and remove anxiety about AI.',
    '“Today’s goal is not learning AI. Today’s goal is learning how AI can help us become better educators.”',
  ]],
  ['8:30 – 9:15', 'Session 1 — The changing landscape of education', [
    '- Why AI matters',
    '- Current educational realities',
    '- Teachers as navigators',
    '- Human judgment',
    'Real classroom examples. Prompts are not discussed at this stage.',
  ]],
  ['9:15 – 10:15', 'Session 2 — AI for tomorrow’s lesson', [
    'Live demonstration, created from scratch: a lesson plan, a Daily Lesson Log, and learning activities.',
    'The facilitator thinks aloud, deliberately critiques the AI’s suggestions, and models professional judgment.',
  ]],
  ['10:15 – 10:30', 'Break', []],
  ['10:30 – 12:00', 'Guided workshop', [
    'Participants create tomorrow’s DLL, a lesson plan, and activities.',
    'Support staff circulate continuously.',
    'Success metric: every participant leaves with something usable tomorrow.',
  ]],
  ['12:00 – 1:00', 'Lunch', []],
  ['1:00 – 2:30', 'Collaborative lesson design', [
    'Participants work by learning area, producing lesson banks, assessments, worksheets, rubrics, and presentations.',
    'Collaboration is encouraged; duplicate work is discouraged.',
  ]],
  ['2:30 – 3:00', 'AI beyond lesson planning', [
    'Brief demonstrations: presentation generation, quizzes, worksheets, rubrics, reading materials, and parent communication.',
  ]],
  ['3:00 – 3:15', 'Break', []],
  ['3:15 – 4:15', 'The school as a learning institution', [
    'The conceptual centrepiece.',
    'How the day’s outputs become institutional knowledge, shared resources, visual summaries, executive reports, and future starting points.',
    'Introduces the idea of schools learning together.',
  ]],
  ['4:15 – 4:45', 'Reflection', [
    'What surprised you? What will you use tomorrow? Where is AI most helpful? Where must teachers remain central? What would you like future teachers to inherit?',
    'Participant insights are captured.',
  ]],
  ['4:45 – 5:00', 'Closing', []],
];

const programmeTable = new Table({
  columnWidths: PC,
  width: { size: W, type: WidthType.DXA },
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell('Time', { w: PC[0], bold: true, fill: TINT }),
        cell('Session', { w: PC[1], bold: true, fill: TINT }),
        cell('Coverage', { w: PC[2], bold: true, fill: TINT }),
      ],
    }),
    ...programme.map(([time, name, cov]) => {
      const isBreak = cov.length === 0;
      return new TableRow({
        cantSplit: true,
        children: [
          cell(time, { w: PC[0], bold: true, fill: isBreak ? TINT_SOFT : undefined }),
          cell(name, { w: PC[1], bold: !isBreak, italics: isBreak, fill: isBreak ? TINT_SOFT : undefined }),
          cell(isBreak ? '' : cov, { w: PC[2], fill: isBreak ? TINT_SOFT : undefined }),
        ],
      });
    }),
  ],
});

// ---------------- document ----------------

const doc = new Document({
  styles: { default: { document: { run: { font: 'Calibri', size: 21, color: INK } } } },
  sections: [{
    properties: { page: { ...PAGE, margin: MARGIN } },
    children: [

      p([t('INSTITUTIONS OF THOUGHT', { bold: true, size: 36, color: DEEP })], {
        alignment: AlignmentType.CENTER, spacing: { after: 70 },
      }),
      p([t('AI in Education', { size: 26, color: DEEP })], {
        alignment: AlignmentType.CENTER, spacing: { after: 120 },
      }),
      p([t('PROGRAMME OVERVIEW', { bold: true, size: 20, color: ACCENT })], {
        alignment: AlignmentType.CENTER, spacing: { after: 200 },
        border: { top: RULE, bottom: RULE },
      }),

      headerBlock,

      section('Purpose'),
      body('This workshop is intentionally different from a traditional AI seminar.'),
      body('The objective is not to teach teachers how to write prompts.'),
      body('The objective is to help teachers experience a different way of working — one in which Artificial Intelligence supports professional judgment, collaboration, and institutional learning.'),
      sub('Participants should leave with'),
      bullet('practical classroom materials;'),
      bullet('confidence using AI; and'),
      bullet('an appreciation that schools themselves can become learning institutions.'),

      section('Core message'),
      quote([
        'AI should not replace teachers.',
        'AI should strengthen teachers, strengthen schools, and strengthen the institution.',
      ]),

      section('Learning outcomes'),
      body('By the end of the workshop, participants should be able to:'),
      bullet('produce classroom-ready instructional materials using AI;'),
      bullet('critically evaluate AI-generated outputs;'),
      bullet('improve lesson planning efficiency;'),
      bullet('collaborate using shared AI-supported workflows; and'),
      bullet('appreciate how institutional knowledge can accumulate over time.'),

      section('Philosophy'),
      body('Reinforced throughout the day:'),
      bullet('Human judgment remains essential.'),
      bullet('AI accelerates preparation — not professional responsibility.'),
      bullet('Every teacher contributes to the school’s collective capability.'),
      bullet('Good work should outlive the individual who created it.'),

      p([new PageBreak()]),

      section('Programme of activities'),
      programmeTable,

      p([new PageBreak()]),

      section('Facilitation approach'),
      sub('Avoided'),
      bullet('AI hype', { keepNext: true }),
      bullet('Fear-based messaging', { keepNext: true }),
      bullet('Technical jargon', { keepNext: true }),
      bullet('Prompt engineering rabbit holes'),
      sub('Prioritised'),
      bullet('Practical classroom value'),
      bullet('Reflection'),
      bullet('Dialogue'),
      bullet('Collaboration'),

      section('What participants bring'),
      bullet('A laptop.'),
      bullet('The Codex desktop application, installed and signed in ahead of the day.'),
      body('Workshop materials — the school’s own curriculum guides and templates, together with a printed starting guide — are provided on the day, on a USB stick. No repository account, software installation, or network access is required at the venue.', { spacing: { before: 100 } }),
      body('Participants who have not installed and signed in beforehand can be helped on the day, but the morning runs on the assumption that most have. Support staff are present throughout the first working block for exactly this.', { spacing: { after: 100 } }),

      section('Success indicators'),
      body('The workshop succeeds when participants leave saying:'),
      quote(['“I can use this tomorrow.”']),
      gap(8),
      body('The workshop excels when participants also realise:'),
      quote(['“Our school can become smarter together.”']),

      section('Closing thought'),
      body('Technology changes. Educational tools change.'),
      body('But the purpose of education remains constant: to leave behind better conditions for those who follow.'),
    ],
  }],
});

const OUT = process.argv[2] || '.';
(async () => {
  fs.writeFileSync(`${OUT}/INSET-Programme-Overview.docx`, await Packer.toBuffer(doc));
  console.log('wrote INSET-Programme-Overview.docx');
})();
