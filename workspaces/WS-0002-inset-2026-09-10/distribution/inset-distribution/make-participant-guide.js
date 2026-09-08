// Builds the printed participant day guide for the San Jose Central School
// INSET, 10 September 2026. Run:  npm install docx && node make-participant-guide.js .
//
// Design matches the capture instruments so the day's paper reads as one set.

const fs = require('fs');
const {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle,
  Table, TableRow, TableCell, WidthType, ShadingType, PageBreak,
} = require('docx');

const PAGE = { size: { width: 11906, height: 16838 } }; // A4 portrait, DXA
const MARGIN = { top: 1000, right: 1080, bottom: 1000, left: 1080 };
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
const ACCENT_EDGE = { style: BorderStyle.SINGLE, size: 18, color: ACCENT };
const PROMPT_SPINE = { style: BorderStyle.SINGLE, size: 18, color: DEEP };
// ----------------------------------------------------------------------------

const NONE = { style: BorderStyle.NONE, size: 0, color: 'auto' };
const RULE = { style: BorderStyle.SINGLE, size: 8, color: DEEP };
const HAIR = { style: BorderStyle.SINGLE, size: 4, color: LINE };

const t = (text, o = {}) => new TextRun({ text, ...o });
const p = (runs, o = {}) => new Paragraph({
  children: Array.isArray(runs) ? runs : [t(runs)], ...o,
});
const gap = (pts = 6) => new Paragraph({ children: [], spacing: { after: pts * 20 } });

const title = (text) => p([t(text, { bold: true, size: 32, color: DEEP })], {
  alignment: AlignmentType.CENTER, spacing: { after: 60 },
});
const subtitle = (text) => p([t(text, { size: 20, color: MUTED })], {
  alignment: AlignmentType.CENTER, spacing: { after: 100 },
});
const section = (text) => p([t(text.toUpperCase(), { bold: true, size: 22, color: DEEP })], {
  spacing: { before: 280, after: 130 }, border: { bottom: RULE }, keepNext: true,
});
const sub = (text) => p([t(text, { bold: true, size: 21, color: DEEP })], {
  spacing: { before: 200, after: 70 }, keepNext: true,
});
const body = (text, o = {}) => p([t(text, { size: 21 })], { spacing: { after: 110 }, ...o });
const note = (text) => p([t(text, { size: 19, italics: true, color: MUTED })], {
  spacing: { after: 120 },
});
const bullet = (text, o = {}) => p(
  [t('•   ', { size: 21 }), t(text, { size: 21, ...(o.run || {}) })],
  { indent: { left: 420, hanging: 200 }, spacing: { after: 70 } },
);
const step = (n, text) => p(
  [t(`${n}.  `, { bold: true, size: 21 }), t(text, { size: 21 })],
  { indent: { left: 420, hanging: 260 }, spacing: { after: 90 } },
);

// A prompt the teacher can copy, set apart from the surrounding text
const prompt = (linesArr) => new Table({
  columnWidths: [W],
  width: { size: W, type: WidthType.DXA },
  rows: [new TableRow({
    cantSplit: true,
    children: [new TableCell({
      width: { size: W, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill: TINT_SOFT },
      margins: { top: 140, bottom: 140, left: 240, right: 200 },
      borders: { top: HAIR, bottom: HAIR, left: PROMPT_SPINE, right: HAIR },
      children: linesArr.map((l, i) => p([t(l, { size: 21, font: 'Consolas' })],
        { spacing: { after: i === linesArr.length - 1 ? 0 : 60 } })),
    })],
  })],
});

const callout = (paras, fill = TINT_SOFT, edge = null) => new Table({
  columnWidths: [W],
  width: { size: W, type: WidthType.DXA },
  rows: [new TableRow({
    cantSplit: true,
    children: [new TableCell({
      width: { size: W, type: WidthType.DXA },
      shading: { type: ShadingType.CLEAR, fill },
      margins: { top: 170, bottom: 170, left: 220, right: 220 },
      borders: {
        top: HAIR, bottom: HAIR, right: HAIR,
        left: edge || RULE,
      },
      children: paras,
    })],
  })],
});

const cell = (text, o = {}) => new TableCell({
  width: { size: o.w, type: WidthType.DXA },
  margins: { top: 90, bottom: 90, left: 130, right: 130 },
  borders: { top: HAIR, bottom: HAIR, left: HAIR, right: HAIR },
  shading: o.fill ? { type: ShadingType.CLEAR, fill: o.fill } : undefined,
  children: (Array.isArray(text) ? text : [text]).map((x, i) => p(
    [t(x, { size: 19, bold: !!o.bold, color: o.bold ? DEEP : INK })],
    { spacing: { after: i === (Array.isArray(text) ? text.length : 1) - 1 ? 0 : 50 } },
  )),
});

// ---------------- schedule ----------------

const SC = [2000, 4200, 3546];
const scheduleRows = [
  ['8:00', 'Welcome and context', 'Just listen. Nothing to set up yet.'],
  ['8:30', 'The changing landscape of education', 'Listen. Ask anything.'],
  ['9:15', 'AI for tomorrow’s lesson — demonstration', 'Watch. Notice where the facilitator disagrees with the AI.'],
  ['10:15', 'Break', 'Set up now if you have not: copy the folder, open Codex, sign in.'],
  ['10:30', 'Guided workshop', 'You work. Make tomorrow’s DLL and lesson plan.'],
  ['12:00', 'Lunch', 'Hand in whatever is ready.'],
  ['1:00', 'Collaborative lesson design', 'Work with your learning area. Do not duplicate.'],
  ['2:30', 'AI beyond lesson planning', 'Watch. Quizzes, worksheets, letters, slides.'],
  ['3:00', 'Break', 'Hand in everything else.'],
  ['3:15', 'The school as a learning institution', 'See what the room made together.'],
  ['4:15', 'Reflection', 'You will be given a sheet.'],
  ['4:45', 'Closing', ''],
];

const scheduleTable = new Table({
  columnWidths: SC,
  width: { size: W, type: WidthType.DXA },
  rows: [
    new TableRow({
      tableHeader: true,
      children: [
        cell('Time', { w: SC[0], bold: true, fill: TINT }),
        cell('What is happening', { w: SC[1], bold: true, fill: TINT }),
        cell('What you do', { w: SC[2], bold: true, fill: TINT }),
      ],
    }),
    ...scheduleRows.map(([a, b, c]) => new TableRow({
      children: [
        cell(a, { w: SC[0], bold: true }),
        cell(b, { w: SC[1] }),
        cell(c, { w: SC[2], fill: (c.startsWith('You work') || c.startsWith('Hand in') || c.startsWith('Work with')) ? TINT_SOFT : undefined }),
      ],
    })),
  ],
});

// ---------------- document ----------------

const doc = new Document({
  styles: { default: { document: { run: { font: 'Calibri', size: 21, color: INK } } } },
  sections: [{
    properties: { page: { ...PAGE, margin: MARGIN } },
    children: [

      title('Institutions of Thought'),
      subtitle('AI in Education  ·  San Jose Central School  ·  10 September 2026'),
      p([t('YOUR GUIDE FOR THE DAY', { bold: true, size: 22 })], {
        alignment: AlignmentType.CENTER, spacing: { after: 170 }, border: { bottom: RULE },
      }),

      body('Keep this beside your laptop. You will not need all of it at once — each section tells you when it matters.'),

      callout([
        p([t('Today is not a seminar about AI.', { bold: true, size: 22 })], { spacing: { after: 100 } }),
        p([t('It is a day of making things you can use tomorrow. By five o’clock you should be leaving with lesson materials for your own classes — not notes about lesson materials.', { size: 21 })]),
      ]),

      gap(6),
      sub('You do not need to be good with computers'),
      body('You do not need to know what to type. Everything you need is in this booklet and in the folder on your laptop.'),
      body('If you get stuck, raise your hand. That is what the support team is for, and asking early is much faster than working it out alone. Nobody is behind, and nobody is being assessed today.'),

      section('Your day at a glance'),
      scheduleTable,

      p([new PageBreak()]),

      section('Getting started — three steps'),
      note('Do this during the 10:15 break if you have not already. It takes a few minutes.'),

      step(1, 'Copy the workshop folder from the USB stick to your Desktop. Do not work from the USB — it is slow, and pulling it out by accident can lose your work. Then pass the stick on.'),
      step(2, 'Open the Codex desktop app you installed before today and sign in. Then open the SJCS-Workshop folder you copied to your Desktop, as your project or working folder.'),
      note('If you have not signed in before today, do that first — it is the step most likely to hold you up, and it is much quicker with help than without. If you are not sure how, raise your hand. This is the one step where asking beats trying.'),
      step(3, 'Ask your first question — the ones below are written for you to copy.'),

      sub('What is in the folder'),
      bullet('references — our school’s own curriculum guides and templates. The AI reads these, which is why what you get back matches the forms we actually use instead of something generic from the internet.'),
      bullet('my-work — where you save everything you make today.'),
      bullet('guides — the same questions and checks printed in this booklet.'),

      section('One rule about what you type'),
      callout([
        p([t('Do not type a learner’s name, a parent’s name, an address, or a contact number into the AI.', { bold: true, size: 21, color: ACCENT })], { spacing: { after: 100 } }),
        p([t('You will often want to describe a real situation — a child who is struggling, a family going through something hard. Describe it without naming anyone: “a learner who has missed a lot of school recently”, “a section that is behind in reading”.', { size: 21 })], { spacing: { after: 90 } }),
        p([t('You can hold the real name in your head. The lesson still works. Nothing you know about a child needs to be typed anywhere today — and check a file once more for names before you hand it in.', { size: 21 })]),
      ], TINT_WARM, ACCENT_EDGE),

      section('10:30 — the guided workshop'),
      body('This is your first block of real work. Aim for one thing you would genuinely teach tomorrow. If you get two, good. Quality beats quantity today.'),

      sub('Start here'),
      prompt([
        'Using the templates and curriculum guides in the references',
        'folder, prepare a Daily Lesson Log for [Grade __] [Subject]',
        'on the topic [topic].',
        '',
        'Follow our school’s template exactly. Our class period is',
        '[__] minutes.',
      ]),

      gap(6),
      sub('Then a full lesson plan'),
      prompt([
        'Using the references folder, write a lesson plan for',
        '[Grade __] [Subject] on [topic].',
        '',
        'Include the objectives, the materials we will need, the',
        'activities in order with timing, and how I will check whether',
        'they understood it.',
        '',
        'Assume a class of [__] learners in a room with [describe what',
        'you actually have — blackboard only, one TV, no projector].',
      ]),

      gap(6),
      sub('Then activities'),
      prompt([
        'Make three activities for [Grade __] [Subject] on [topic].',
        'One for learners who are struggling, one for the middle of',
        'the class, and one for learners who finish early.',
        '',
        'Use materials that cost nothing or almost nothing.',
      ]),

      gap(8),
      callout([
        p([t('If the answer is not what you wanted, do not start over.', { bold: true, size: 21 })], { spacing: { after: 100 } }),
        p([t('Say what is wrong in ordinary words — “this is too long for a 50-minute period”, “we have no projector”, “my learners cannot read at this level yet” — and ask again.', { size: 21 })], { spacing: { after: 90 } }),
        p([t('Three rounds of that will get you further than thirty minutes spent trying to write the perfect first question.', { size: 21 })]),
      ]),

      section('Before you save — seven checks'),
      body('The AI will give you something that looks finished. Looking finished and being usable are different things. This takes about two minutes.'),
      note('You are not checking whether the AI did a good job. You are deciding whether you will put your name on it.'),

      step(1, 'Does it match our curriculum? Check the competency against the guide in the references folder.'),
      step(2, 'Will it fit the period? Add up the timings. AI plans are almost always too long.'),
      step(3, 'Do we actually have the materials? Cross out anything needing equipment, printing, or internet we do not have.'),
      step(4, 'Is the reading level right — not for Grade 5 in general, but for your Grade 5, the one in front of you in September?'),
      step(5, 'Is anything simply wrong? Check facts, dates, and any computation. The AI states wrong things with exactly the same confidence as right ones.'),
      step(6, 'Is it local? Ask it to swap foreign examples for our own barangay, our own prices, our own names.'),
      step(7, 'What does it not know? The learner who lost a parent last month. The section that missed Tuesday because of the storm. The three who share one textbook. Put that into the lesson yourself, as you review it — not into the AI, and never with a name attached.'),

      gap(6),
      callout([
        p([t('The test that matters', { bold: true, size: 21 })], { spacing: { after: 100 } }),
        p([t('Before you save it: would you be comfortable if a fellow teacher opened this next year and taught from it without asking you anything?', { size: 21 })], { spacing: { after: 90 } }),
        p([t('If yes, save it — someone probably will. If no, it is not finished, and now you know exactly what to fix.', { size: 21 })]),
      ]),

      section('Saving and handing in'),
      sub('Name your files like this'),
      prompt(['Subject_Grade_Topic_WhatItIs_YourFamilyName', '',
              'Math_G4_Fractions_DLL_Dela-Cruz',
              'Math_G4_Fractions_Quiz_Dela-Cruz',
              'English_G6_Persuasive-Writing_LessonPlan_Abad']),
      note('The “what it is” part matters more than it looks. Without it, the lesson log and the quiz you made for the same topic get the same name, and saving the second can quietly replace the first.'),
      body('Save everything in the my-work folder. Not in Downloads, not loose on the Desktop.', { spacing: { before: 120, after: 110 } }),
      sub('Then check it actually saved'),
      body('Ask for the file to be saved into my-work with the name you chose. Then open the my-work folder yourself and open the file. Seeing the text in the chat window is not the same as having a file, and it is a miserable thing to discover at 4:00 that a morning’s work was never written anywhere.'),
      note('At the end of the day these go into one place for the whole school. A folder where you can see at a glance that someone already made a Grade 4 fractions lesson saves the next teacher an hour.'),

      sub('Two collection points'),
      bullet('Before lunch — whatever is ready.'),
      bullet('Before the 3:00 break — everything else.'),
      body('You will be told how. It takes under a minute and nothing technical is involved.'),

      sub('Three things worth knowing'),
      bullet('Handing something in does not mean it is published or that anyone will grade it. It means it stops living only on your laptop.'),
      bullet('If you would rather not share something, that is completely fine. Say so, or simply do not hand that file in.'),
      bullet('You keep everything you made. The folder is yours — take it home on your laptop.'),

      p([new PageBreak()]),

      section('1:00 — working with your learning area'),
      body('The afternoon block is deliberately different. Sit with the others who teach what you teach.'),
      body('The point is not to work faster in parallel. It is to stop making the same thing twice. Before you begin, agree who is taking which topic — five different worksheets are worth far more to this school than five versions of the same one.'),
      sub('Things worth making together'),
      bullet('A lesson bank for a unit, split between you'),
      bullet('Assessments and answer keys'),
      bullet('Worksheets and reading materials'),
      bullet('Rubrics you would all be willing to use'),

      section('If something goes wrong'),
      sub('The AI stops responding, or says you have reached a limit'),
      body('Raise your hand. Do not restart, uninstall, or create a new account — that usually makes it worse and costs you the rest of the block. There are other ways to keep working.'),
      p([t('Nothing you have saved in my-work is lost when this happens.', { size: 21, bold: true })], { spacing: { after: 130 } }),
      sub('You do not know what to ask'),
      body('Go back to the questions on page 2 and use one exactly as written, changing only the parts in brackets. They are there so you never have to start from a blank screen.'),
      sub('The AI gives you something that seems wrong'),
      body('It probably is. Say so plainly and ask again. Being able to tell is professional judgement, and it is the part of today that matters most.'),

      section('If your role is not classroom teaching'),
      body('Some of today’s wording assumes a class and a grade, because most of the room has one. If you do not, the day still applies — use the same questions for the work you actually do: forms and letters you write often, materials you prepare for others, records you keep, guidance sessions you plan.'),
      body('Where this guide says “lesson” or “class”, read it as whatever you were making today. The reflection sheet has a line for your role, and nothing on it counts a missing lesson plan as a failure.'),

      section('4:15 — reflection'),
      body('You will be given a sheet with a few questions. Ten minutes of writing, then we talk.'),
      body('You do not have to write your name. Honest answers — including unflattering ones — are worth far more to us than kind ones. One of the questions asks what did NOT work today. Please be blunt: that question shapes the next one of these more than any other.'),

      gap(10),
      callout([
        p([t('We are not simply creating lesson plans.', { bold: true, size: 23, color: DEEP })], {
          alignment: AlignmentType.CENTER, spacing: { after: 110 },
        }),
        p([t('We are building better conditions for the teachers and learners who will come after us.', { bold: true, size: 23 })], {
          alignment: AlignmentType.CENTER,
        }),
      ], TINT),
    ],
  }],
});

const OUT = process.argv[2] || '.';
(async () => {
  fs.writeFileSync(`${OUT}/INSET-Participant-Day-Guide.docx`, await Packer.toBuffer(doc));
  console.log('wrote INSET-Participant-Day-Guide.docx');
})();
