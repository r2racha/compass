/**
 * Style reminder — สมุดบันทึกนักเดินทาง: Japanese colored-pencil storybook,
 * gentle self-discovery. This is a playful career-exploration quiz only.
 */
export type Dimension = "strategy" | "operations" | "numbers" | "digital" | "people";

export type ScoreVector = Record<Dimension, number>;

export type QuizOption = {
  id: string;
  label: string;
  detail: string;
  scores: ScoreVector;
};

export type QuizQuestion = {
  id: number;
  chapter: string;
  scene: string;
  question: string;
  helper: string;
  options: QuizOption[];
};

export type WorkProfile = {
  id: string;
  title: string;
  nickname: string;
  summary: string;
  reflection: string;
  examples: string[];
  weights: ScoreVector;
  avatarKey: "planner" | "operations" | "analyst" | "digital" | "community";
  accent: string;
};

export const zeroScores = (): ScoreVector => ({
  strategy: 0,
  operations: 0,
  numbers: 0,
  digital: 0,
  people: 0,
});

const score = (...items: Array<[Dimension, number]>): ScoreVector => {
  const next = zeroScores();
  items.forEach(([dimension, value]) => {
    next[dimension] = value;
  });
  return next;
};

export const dimensionLabels: Record<Dimension, string> = {
  strategy: "มองภาพใหญ่และวางทางเลือก",
  operations: "จัดระบบให้ภารกิจเดินต่อ",
  numbers: "เก็บรายละเอียดและตัวเลขให้ชัด",
  digital: "ต่อข้อมูลและเครื่องมือให้ใช้ได้จริง",
  people: "ฟังคนและเชื่อมความร่วมมือ",
};

export const questions: QuizQuestion[] = [
  {
    id: 1,
    chapter: "ด่านที่ 1",
    scene: "โจทย์ที่ยังไม่ชัด",
    question: "เมื่อได้รับเรื่องใหม่ที่ยังจับต้นชนปลายไม่ถูก คุณมักเริ่มอย่างไร",
    helper: "เลือกสิ่งที่ทำได้เป็นธรรมชาติที่สุด",
    options: [
      { id: "q1-a", label: "แยกเป้าหมาย ปัญหา และภาพรวมก่อน", detail: "อยากเห็นว่าควรไปทางไหน", scores: score(["strategy", 3], ["digital", 1]) },
      { id: "q1-b", label: "จัดคน จัดขั้นตอน แล้วทำให้งานเริ่มเดิน", detail: "อยากให้ทุกส่วนรู้ว่าต้องทำอะไร", scores: score(["operations", 3], ["people", 1]) },
      { id: "q1-c", label: "หาข้อมูลและตัวเลขที่เชื่อถือได้", detail: "อยากตัดสินใจบนรายละเอียดที่ชัด", scores: score(["numbers", 2], ["digital", 2]) },
      { id: "q1-d", label: "ฟังคนที่ได้รับผลกระทบก่อน", detail: "อยากเข้าใจเรื่องจริงจากคนจริง", scores: score(["people", 3], ["strategy", 1]) },
    ],
  },
  {
    id: 2,
    chapter: "ด่านที่ 2",
    scene: "รายงานหนาเตอะ",
    question: "เมื่อเจอรายงานข้อมูลยาวหลายหน้า คุณอยากทำสิ่งใดที่สุด",
    helper: "ไม่ต้องเลือกสิ่งที่ดูเก่ง เลือกสิ่งที่คุณอยากเริ่มทำ",
    options: [
      { id: "q2-a", label: "หาสาระสำคัญและเสนอภาพรวม", detail: "เปลี่ยนข้อมูลเป็นทางเลือกที่ใช้ได้", scores: score(["strategy", 3], ["digital", 1]) },
      { id: "q2-b", label: "ตรวจตัวเลขและจุดที่ไม่สอดคล้อง", detail: "อยากให้ฐานข้อมูลถูกต้องก่อน", scores: score(["numbers", 3], ["digital", 1]) },
      { id: "q2-c", label: "จัดไฟล์และกระบวนการให้อ่านง่ายขึ้น", detail: "อยากให้คนต่อไปใช้งานได้ลื่น", scores: score(["operations", 2], ["digital", 2]) },
      { id: "q2-d", label: "เล่าให้คนทั่วไปเข้าใจได้ในไม่กี่ประโยค", detail: "อยากให้ข้อมูลไปถึงคนที่ต้องใช้", scores: score(["people", 3], ["strategy", 1]) },
    ],
  },
  {
    id: 3,
    chapter: "ด่านที่ 3",
    scene: "โปรเจกต์ที่เริ่มสะดุด",
    question: "ถ้าโครงการที่ทำอยู่เริ่มช้ากว่าแผน คุณอยากช่วยแบบไหน",
    helper: "เลือกบทบาทที่คุณจะหยิบมาทำเองโดยไม่ต้องรอใครบอก",
    options: [
      { id: "q3-a", label: "ย้อนดูสมมติฐานและปรับทางเลือก", detail: "ให้การแก้ปัญหากลับมามีทิศทาง", scores: score(["strategy", 3], ["numbers", 1]) },
      { id: "q3-b", label: "แตกงานใหม่และคุยกับเจ้าของงาน", detail: "ให้ทุกฝ่ายเห็นจุดที่ต้องขยับ", scores: score(["operations", 3], ["people", 1]) },
      { id: "q3-c", label: "ทำ dashboard เล็ก ๆ ให้เห็นคอขวด", detail: "ให้ทีมเห็นปัญหาจากข้อมูลเดียวกัน", scores: score(["digital", 3], ["numbers", 1]) },
      { id: "q3-d", label: "ถามหน้างานว่าจุดไหนยากจริง", detail: "ให้แผนแก้ไม่หลุดจากชีวิตจริง", scores: score(["people", 2], ["operations", 2]) },
    ],
  },
  {
    id: 4,
    chapter: "ด่านที่ 4",
    scene: "งานที่ต้องละเอียด",
    question: "ความละเอียดแบบใดที่คุณยินดีใช้เวลาให้เป็นพิเศษ",
    helper: "เลือกสิ่งที่ทำแล้วรู้สึกว่า “อยากให้ถูกตั้งแต่ต้น”",
    options: [
      { id: "q4-a", label: "ความเชื่อมโยงของข้อมูลและเหตุผล", detail: "ทุกข้อสรุปควรมีที่มา", scores: score(["strategy", 2], ["numbers", 2]) },
      { id: "q4-b", label: "ลำดับงาน เอกสาร และการส่งต่อ", detail: "งานที่ดีควรไปต่อได้โดยไม่สะดุด", scores: score(["operations", 3], ["numbers", 1]) },
      { id: "q4-c", label: "สูตร ตัวเลข และรายการย่อย", detail: "ความคลาดเคลื่อนเล็กน้อยก็สำคัญ", scores: score(["numbers", 3], ["digital", 1]) },
      { id: "q4-d", label: "ประสบการณ์ของคนที่มาใช้บริการ", detail: "คำอธิบายหนึ่งบรรทัดเปลี่ยนความรู้สึกได้", scores: score(["people", 3], ["operations", 1]) },
    ],
  },
  {
    id: 5,
    chapter: "ด่านที่ 5",
    scene: "ทีมที่เห็นต่าง",
    question: "เมื่อทีมมีความเห็นไม่ตรงกัน คุณมักช่วยให้ไปต่ออย่างไร",
    helper: "เลือกสิ่งที่คุณอยากทำ ไม่ใช่สิ่งที่คิดว่าควรทำ",
    options: [
      { id: "q5-a", label: "พากลับไปดูเป้าหมายและหลักฐานร่วมกัน", detail: "ให้ภาพเดียวกันนำการตัดสินใจ", scores: score(["strategy", 3], ["numbers", 1]) },
      { id: "q5-b", label: "สรุปงานและกำหนดคนรับผิดชอบใหม่", detail: "ให้คำคุยกลายเป็นแผนที่เดินได้", scores: score(["operations", 3], ["people", 1]) },
      { id: "q5-c", label: "ทำต้นแบบหรือเครื่องมือให้เห็นภาพ", detail: "ลองก่อนคุยยาว", scores: score(["digital", 3], ["strategy", 1]) },
      { id: "q5-d", label: "ฟังแต่ละฝ่ายและหาจุดร่วม", detail: "ให้ทุกคนรู้สึกว่าเสียงของตนมีที่ยืน", scores: score(["people", 3], ["operations", 1]) },
    ],
  },
  {
    id: 6,
    chapter: "ด่านที่ 6",
    scene: "งบประมาณจำกัด",
    question: "ถ้าต้องเลือกใช้ทรัพยากรที่มีจำกัด คุณสนุกกับส่วนไหน",
    helper: "นึกถึงวิธีคิดที่คุณไว้ใจเมื่อต้องเลือกสิ่งสำคัญ",
    options: [
      { id: "q6-a", label: "จัดลำดับตามผลกระทบระยะยาว", detail: "อยากให้ทรัพยากรไปสู่จุดที่สำคัญ", scores: score(["strategy", 3], ["people", 1]) },
      { id: "q6-b", label: "ทำตารางตัวเลขให้เปรียบเทียบได้ชัด", detail: "อยากเห็นความคุ้มค่าจากข้อมูล", scores: score(["numbers", 3], ["digital", 1]) },
      { id: "q6-c", label: "วางขั้นตอนติดตามให้ทุกอย่างตรวจสอบได้", detail: "อยากให้งานโปร่งใสและต่อเนื่อง", scores: score(["operations", 3], ["numbers", 1]) },
      { id: "q6-d", label: "คุยกับผู้เกี่ยวข้องว่าอะไรจำเป็นที่สุด", detail: "อยากให้การตัดสินใจไม่ทิ้งใครไว้ข้างหลัง", scores: score(["people", 3], ["strategy", 1]) },
    ],
  },
  {
    id: 7,
    chapter: "ด่านที่ 7",
    scene: "บริการใหม่",
    question: "หากหน่วยงานจะทำบริการใหม่ คุณอยากรับบทบาทใด",
    helper: "เลือกบทบาทที่ฟังแล้วรู้สึกอยากลงมือทันที",
    options: [
      { id: "q7-a", label: "วิเคราะห์ปัญหาและภาพความสำเร็จ", detail: "อยากออกแบบทิศทางให้ชัดก่อน", scores: score(["strategy", 3], ["people", 1]) },
      { id: "q7-b", label: "จัด flow งานหลังบ้านให้ทุกฝ่ายทำร่วมกันได้", detail: "อยากให้บริการไม่ติดขัดระหว่างทาง", scores: score(["operations", 3], ["digital", 1]) },
      { id: "q7-c", label: "ทำระบบหรือข้อมูลให้ผู้ใช้ใช้สะดวก", detail: "อยากเปลี่ยนเรื่องยากให้ใช้งานง่าย", scores: score(["digital", 3], ["people", 1]) },
      { id: "q7-d", label: "ทดลองคุยกับผู้ใช้และเก็บข้อเสนอแนะ", detail: "อยากให้บริการตอบโจทย์คนจริง", scores: score(["people", 3], ["strategy", 1]) },
    ],
  },
  {
    id: 8,
    chapter: "ด่านที่ 8",
    scene: "วันทำงานที่มีพลัง",
    question: "วันทำงานแบบไหนทำให้คุณรู้สึกว่าเวลาผ่านเร็ว",
    helper: "ไม่ต้องเลือกสิ่งที่ดูดี เลือกสิ่งที่อยากเจอซ้ำได้",
    options: [
      { id: "q8-a", label: "คิด เขียน และทำข้อเสนอจากภาพใหญ่", detail: "ชอบต่อเรื่องเล็กให้เห็นทิศทาง", scores: score(["strategy", 3], ["numbers", 1]) },
      { id: "q8-b", label: "คุมรายละเอียดให้หลายงานเดินพร้อมกัน", detail: "ชอบเห็นความวุ่นวายกลายเป็นระบบ", scores: score(["operations", 3], ["people", 1]) },
      { id: "q8-c", label: "อยู่กับตาราง ตัวเลข หรือระบบข้อมูล", detail: "ชอบหาคำตอบจากรายละเอียด", scores: score(["numbers", 2], ["digital", 2]) },
      { id: "q8-d", label: "คุยกับผู้คนและช่วยคลี่คลายเรื่องยาก", detail: "ชอบเห็นคนเข้าใจและไปต่อได้", scores: score(["people", 3], ["operations", 1]) },
    ],
  },
  {
    id: 9,
    chapter: "ด่านที่ 9",
    scene: "สิ่งที่อยากพัฒนา",
    question: "เรื่องใดทำให้คุณอยากเข้าไปทำให้ดีขึ้นเป็นพิเศษ",
    helper: "เลือกจากความรู้สึกที่อยากขยับ แม้ไม่มีใครสั่ง",
    options: [
      { id: "q9-a", label: "แผนดี ๆ ที่ยังไม่กลายเป็นการทำงานจริง", detail: "อยากช่วยพาภาพฝันไปถึงการลงมือ", scores: score(["strategy", 2], ["operations", 2]) },
      { id: "q9-b", label: "งานที่คนทำเยอะแต่ขั้นตอนยังวกวน", detail: "อยากออกแบบระบบให้ใช้พลังน้อยลง", scores: score(["operations", 2], ["digital", 2]) },
      { id: "q9-c", label: "ตัวเลขหรือข้อมูลที่มีแต่คนยังใช้ไม่เป็น", detail: "อยากทำให้ข้อมูลช่วยตัดสินใจได้", scores: score(["digital", 3], ["numbers", 1]) },
      { id: "q9-d", label: "คนที่ยังเข้าถึงข้อมูลหรือบริการยาก", detail: "อยากทำให้ทุกคนรู้สึกว่าไม่ถูกทิ้งไว้ข้างหลัง", scores: score(["people", 3], ["strategy", 1]) },
    ],
  },
  {
    id: 10,
    chapter: "ด่านสุดท้าย",
    scene: "รอยยิ้มตอนเลิกงาน",
    question: "ตอนจบวัน คุณอยากภูมิใจกับอะไรที่สุด",
    helper: "นี่คือเข็มทิศข้อสุดท้าย เลือกสิ่งที่ทำแล้วรู้สึกว่าใช่",
    options: [
      { id: "q10-a", label: "ทีมมีทิศทางที่ชัดขึ้น", detail: "เราเห็นภาพว่าจะไปต่ออย่างไร", scores: score(["strategy", 3], ["people", 1]) },
      { id: "q10-b", label: "เรื่องที่วุ่นวายถูกจัดให้เดินต่อได้", detail: "ทุกคนรู้หน้าที่และงานไม่ตกหล่น", scores: score(["operations", 3], ["numbers", 1]) },
      { id: "q10-c", label: "คำตอบที่ได้แม่นยำและตรวจสอบได้", detail: "รายละเอียดที่ดีช่วยให้งานน่าเชื่อถือ", scores: score(["numbers", 3], ["digital", 1]) },
      { id: "q10-d", label: "ใครบางคนเข้าใจและได้รับความช่วยเหลือ", detail: "งานของเราทำให้วันของเขาง่ายขึ้น", scores: score(["people", 3], ["operations", 1]) },
    ],
  },
];

export const workProfiles: WorkProfile[] = [
  {
    id: "planner",
    title: "นักวางเส้นทาง",
    nickname: "คนมองภาพใหญ่ให้เห็นทางไปต่อ",
    summary: "คุณมีพลังเมื่อได้เปลี่ยนโจทย์ที่ซับซ้อนให้กลายเป็นแผนและทางเลือกที่ชัดขึ้น",
    reflection: "ลองสำรวจงานที่ต้องคิดเชิงระบบ วางทิศทาง หรือเชื่อมข้อมูลสู่ข้อเสนอ",
    examples: ["วิเคราะห์นโยบายและแผน", "พัฒนาระบบราชการ", "วิชาการสถิติ"],
    weights: score(["strategy", 3], ["operations", 1], ["numbers", 1]),
    avatarKey: "planner",
    accent: "#407c78",
  },
  {
    id: "operations",
    title: "นักพาระบบเดิน",
    nickname: "คนที่เปลี่ยนเรื่องยุ่งให้เดินหน้าได้",
    summary: "คุณน่าจะสนุกกับการจัดระบบ ประสานคน และเก็บรายละเอียดให้งานหลายชิ้นต่อกันอย่างลื่นไหล",
    reflection: "ลองสำรวจงานที่มีจังหวะของการจัดการภารกิจ คน เอกสาร และโครงการ",
    examples: ["จัดการงานทั่วไป", "ทรัพยากรบุคคล", "วิชาการพัสดุ"],
    weights: score(["operations", 3], ["people", 1], ["numbers", 1]),
    avatarKey: "operations",
    accent: "#b66a4c",
  },
  {
    id: "analyst",
    title: "นักจับเข็มตัวเลข",
    nickname: "คนที่เห็นความหมายในรายละเอียด",
    summary: "คุณมีความสุขกับการทำให้ตัวเลข ข้อมูล และหลักฐานเรียบร้อยพอที่จะใช้ตัดสินใจได้อย่างมั่นใจ",
    reflection: "ลองสำรวจงานที่อยู่กับงบประมาณ การเงิน บัญชี หรือการตรวจสอบรายละเอียด",
    examples: ["วิชาการเงินและบัญชี", "วิชาการคลัง", "วิชาการตรวจสอบภายใน"],
    weights: score(["numbers", 3], ["digital", 1], ["strategy", 1]),
    avatarKey: "analyst",
    accent: "#b5883e",
  },
  {
    id: "digital",
    title: "นักต่อจิ๊กซอว์ดิจิทัล",
    nickname: "คนที่ทำให้ข้อมูลและเครื่องมือช่วยคนได้จริง",
    summary: "คุณน่าจะตื่นเต้นเมื่อได้ต่อระบบ ข้อมูล และเครื่องมือให้กลายเป็นวิธีทำงานที่ง่ายขึ้นสำหรับทุกคน",
    reflection: "ลองสำรวจงานที่เกี่ยวกับระบบสารสนเทศ ข้อมูล หรือการออกแบบบริการดิจิทัล",
    examples: ["วิชาการคอมพิวเตอร์", "วิชาการเทคโนโลยีสารสนเทศ", "วิชาการสถิติ"],
    weights: score(["digital", 3], ["numbers", 1], ["operations", 1]),
    avatarKey: "digital",
    accent: "#3d6f8e",
  },
  {
    id: "community",
    title: "นักเชื่อมใจผู้คน",
    nickname: "คนที่ทำให้เรื่องราชการใกล้ชีวิตขึ้น",
    summary: "คุณมีพลังเมื่อได้ฟังผู้คน ทำเรื่องยากให้เข้าใจ และชวนหลายฝ่ายสร้างทางออกที่ใช้ได้จริง",
    reflection: "ลองสำรวจงานที่เชื่อมผู้คน พื้นที่ การสื่อสาร หรือการพัฒนาชุมชน",
    examples: ["ประชาสัมพันธ์", "วิชาการพัฒนาชุมชน", "วิชาการแรงงาน"],
    weights: score(["people", 3], ["operations", 1], ["strategy", 1]),
    avatarKey: "community",
    accent: "#628554",
  },
];

export const rankWorkProfiles = (scores: ScoreVector): Array<WorkProfile & { match: number }> => {
  const maximum = Object.values(scores).reduce((total, value) => total + value, 0) || 1;
  return workProfiles
    .map((profile) => {
      const weighted = (Object.keys(scores) as Dimension[]).reduce(
        (total, dimension) => total + scores[dimension] * profile.weights[dimension],
        0,
      );
      const weightTotal = Object.values(profile.weights).reduce((total, value) => total + value, 0) || 1;
      const match = Math.max(58, Math.min(98, Math.round(56 + (weighted / (maximum * weightTotal)) * 54)));
      return { ...profile, match };
    })
    .sort((left, right) => right.match - left.match);
};
