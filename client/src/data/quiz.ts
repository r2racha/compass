/**
 * Style reminder — สมุดบันทึกนักเดินทาง: Japanese colored-pencil storybook,
 * gentle self-discovery. This is a playful work-style exploration only.
 * Eight work dimensions are each observed in multiple situations before an archetype is suggested.
 */
export type Dimension =
  | "strategy"
  | "operations"
  | "numbers"
  | "digital"
  | "communication"
  | "field"
  | "governance"
  | "publicImpact";

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

export type AvatarKey = "planner" | "operations" | "analyst" | "digital" | "communicator" | "field" | "governance" | "community";

export type WorkProfile = {
  id: string;
  title: string;
  nickname: string;
  summary: string;
  reflection: string;
  examples: string[];
  weights: ScoreVector;
  avatarKey: AvatarKey;
  accent: string;
};

export const zeroScores = (): ScoreVector => ({
  strategy: 0,
  operations: 0,
  numbers: 0,
  digital: 0,
  communication: 0,
  field: 0,
  governance: 0,
  publicImpact: 0,
});

const score = (...items: Array<[Dimension, number]>): ScoreVector => {
  const next = zeroScores();
  items.forEach(([dimension, value]) => { next[dimension] = value; });
  return next;
};

export const dimensionLabels: Record<Dimension, string> = {
  strategy: "มองภาพใหญ่และวางทางเลือก",
  operations: "จัดระบบให้ภารกิจเดินต่อ",
  numbers: "เก็บรายละเอียดและตัวเลขให้ชัด",
  digital: "ต่อข้อมูลและเครื่องมือให้ใช้ได้จริง",
  communication: "สื่อสารให้ผู้คนเข้าใจและร่วมมือ",
  field: "เริ่มจากบริบทจริงของพื้นที่และชุมชน",
  governance: "เห็นคุณค่าของกติกาและความเป็นธรรม",
  publicImpact: "อยากขยายโอกาสและการเข้าถึงของผู้คน",
};

export const questions: QuizQuestion[] = [
  {
    id: 1, chapter: "ด่านที่ 1", scene: "โจทย์ที่ยังไม่ชัด",
    question: "เมื่อได้รับเรื่องใหม่ที่ยังจับต้นชนปลายไม่ถูก คุณมักเริ่มอย่างไร",
    helper: "เลือกสิ่งที่ทำได้เป็นธรรมชาติที่สุด",
    options: [
      { id: "q1-a", label: "แยกเป้าหมาย ปัญหา และภาพรวมก่อน", detail: "อยากเห็นว่าควรไปทางไหน", scores: score(["strategy", 3], ["digital", 1]) },
      { id: "q1-b", label: "จัดคน จัดขั้นตอน แล้วทำให้งานเริ่มเดิน", detail: "อยากให้ทุกส่วนรู้ว่าต้องทำอะไร", scores: score(["operations", 3], ["communication", 1]) },
      { id: "q1-c", label: "หาข้อมูลและตัวเลขที่เชื่อถือได้", detail: "อยากตัดสินใจบนรายละเอียดที่ชัด", scores: score(["numbers", 3], ["governance", 1]) },
      { id: "q1-d", label: "ฟังคนที่ได้รับผลกระทบก่อน", detail: "อยากเข้าใจเรื่องจริงจากคนจริง", scores: score(["publicImpact", 3], ["field", 1]) },
    ],
  },
  {
    id: 2, chapter: "ด่านที่ 2", scene: "รายงานหนาเตอะ",
    question: "เมื่อเจอรายงานข้อมูลยาวหลายหน้า คุณอยากทำสิ่งใดที่สุด",
    helper: "ไม่ต้องเลือกสิ่งที่ดูเก่ง เลือกสิ่งที่คุณอยากเริ่มทำ",
    options: [
      { id: "q2-a", label: "หาสาระสำคัญและเสนอภาพรวม", detail: "เปลี่ยนข้อมูลเป็นทางเลือกที่ใช้ได้", scores: score(["strategy", 3], ["numbers", 1]) },
      { id: "q2-b", label: "ตรวจตัวเลขและจุดที่ไม่สอดคล้อง", detail: "อยากให้ฐานข้อมูลถูกต้องก่อน", scores: score(["numbers", 3], ["governance", 1]) },
      { id: "q2-c", label: "ทำแดชบอร์ดหรือเครื่องมือให้อ่านง่าย", detail: "อยากให้ข้อมูลถูกใช้ต่อได้จริง", scores: score(["digital", 3], ["operations", 1]) },
      { id: "q2-d", label: "เล่าให้คนทั่วไปเข้าใจในไม่กี่ประโยค", detail: "อยากให้ข้อมูลไปถึงคนที่ต้องใช้", scores: score(["communication", 3], ["publicImpact", 1]) },
    ],
  },
  {
    id: 3, chapter: "ด่านที่ 3", scene: "โปรเจกต์ที่เริ่มสะดุด",
    question: "ถ้าโครงการที่ทำอยู่เริ่มช้ากว่าแผน คุณอยากช่วยแบบไหน",
    helper: "เลือกบทบาทที่คุณจะหยิบมาทำเองโดยไม่ต้องรอใครบอก",
    options: [
      { id: "q3-a", label: "ย้อนดูสมมติฐานและปรับทางเลือก", detail: "ให้การแก้ปัญหากลับมามีทิศทาง", scores: score(["strategy", 3], ["numbers", 1]) },
      { id: "q3-b", label: "แตกงานใหม่และคุยกับเจ้าของงาน", detail: "ให้ทุกฝ่ายเห็นจุดที่ต้องขยับ", scores: score(["operations", 3], ["communication", 1]) },
      { id: "q3-c", label: "ทำแผนภาพข้อมูลให้เห็นคอขวด", detail: "ให้ทีมเห็นปัญหาจากข้อมูลเดียวกัน", scores: score(["digital", 3], ["numbers", 1]) },
      { id: "q3-d", label: "ถามหน้างานว่าจุดไหนยากจริง", detail: "ให้แผนแก้ไม่หลุดจากชีวิตจริง", scores: score(["field", 3], ["publicImpact", 1]) },
    ],
  },
  {
    id: 4, chapter: "ด่านที่ 4", scene: "งบประมาณจำกัด",
    question: "ถ้าต้องเลือกใช้ทรัพยากรที่มีจำกัด คุณสนุกกับส่วนไหน",
    helper: "นึกถึงวิธีคิดที่คุณไว้ใจเมื่อต้องเลือกสิ่งสำคัญ",
    options: [
      { id: "q4-a", label: "จัดลำดับตามผลกระทบระยะยาว", detail: "อยากให้ทรัพยากรไปสู่จุดที่สำคัญ", scores: score(["strategy", 3], ["publicImpact", 1]) },
      { id: "q4-b", label: "ทำตารางตัวเลขให้เปรียบเทียบได้ชัด", detail: "อยากเห็นความคุ้มค่าจากข้อมูล", scores: score(["numbers", 3], ["governance", 1]) },
      { id: "q4-c", label: "วางขั้นตอนติดตามให้ตรวจสอบได้", detail: "อยากให้งานโปร่งใสและต่อเนื่อง", scores: score(["governance", 3], ["operations", 1]) },
      { id: "q4-d", label: "คุยกับผู้เกี่ยวข้องว่าอะไรจำเป็นที่สุด", detail: "อยากให้การตัดสินใจไม่ทิ้งใครไว้ข้างหลัง", scores: score(["publicImpact", 3], ["communication", 1]) },
    ],
  },
  {
    id: 5, chapter: "ด่านที่ 5", scene: "ทีมที่เห็นต่าง",
    question: "เมื่อทีมมีความเห็นไม่ตรงกัน คุณมักช่วยให้ไปต่ออย่างไร",
    helper: "เลือกสิ่งที่คุณอยากทำ ไม่ใช่สิ่งที่คิดว่าควรทำ",
    options: [
      { id: "q5-a", label: "พากลับไปดูเป้าหมายและหลักฐานร่วมกัน", detail: "ให้ภาพเดียวกันนำการตัดสินใจ", scores: score(["strategy", 3], ["numbers", 1]) },
      { id: "q5-b", label: "สรุปงานและกำหนดคนรับผิดชอบใหม่", detail: "ให้คำคุยกลายเป็นแผนที่เดินได้", scores: score(["operations", 3], ["communication", 1]) },
      { id: "q5-c", label: "ฟังแต่ละฝ่ายและหาจุดร่วม", detail: "ให้ทุกคนรู้สึกว่าเสียงของตนมีที่ยืน", scores: score(["communication", 3], ["publicImpact", 1]) },
      { id: "q5-d", label: "ย้ำหลักเกณฑ์ที่ทุกฝ่ายใช้ร่วมกัน", detail: "ให้ข้อสรุปยุติธรรมและอธิบายได้", scores: score(["governance", 3], ["operations", 1]) },
    ],
  },
  {
    id: 6, chapter: "ด่านที่ 6", scene: "บริการใหม่",
    question: "หากหน่วยงานจะทำบริการใหม่ คุณอยากรับบทบาทใด",
    helper: "เลือกบทบาทที่ฟังแล้วรู้สึกอยากลงมือทันที",
    options: [
      { id: "q6-a", label: "ต่อระบบและข้อมูลให้ใช้สะดวก", detail: "อยากเปลี่ยนเรื่องยากให้ใช้งานง่าย", scores: score(["digital", 3], ["publicImpact", 1]) },
      { id: "q6-b", label: "จัด flow งานหลังบ้านให้ทุกฝ่ายทำร่วมกันได้", detail: "อยากให้บริการไม่ติดขัดระหว่างทาง", scores: score(["operations", 3], ["digital", 1]) },
      { id: "q6-c", label: "อธิบายขั้นตอนให้คนเข้าใจและกล้าลอง", detail: "อยากลดความกังวลก่อนใช้บริการ", scores: score(["communication", 3], ["publicImpact", 1]) },
      { id: "q6-d", label: "ไปดูการใช้จริงในพื้นที่ก่อนตัดสินใจ", detail: "อยากให้บริการตอบโจทย์ชีวิตจริง", scores: score(["field", 3], ["publicImpact", 1]) },
    ],
  },
  {
    id: 7, chapter: "ด่านที่ 7", scene: "เสียงจากชุมชน",
    question: "หากชุมชนบอกว่าโครงการยังไม่ตรงกับชีวิตจริง คุณอยากทำอะไรต่อ",
    helper: "เลือกวิธีที่คุณอยากเริ่มในวันพรุ่งนี้",
    options: [
      { id: "q7-a", label: "ลงพื้นที่ฟังเรื่องราวและข้อจำกัดให้มากขึ้น", detail: "บริบทจริงคือข้อมูลสำคัญ", scores: score(["field", 3], ["communication", 1]) },
      { id: "q7-b", label: "ดูว่ากลุ่มไหนยังเข้าไม่ถึงประโยชน์", detail: "อยากให้โครงการไม่ทิ้งใครไว้ข้างหลัง", scores: score(["publicImpact", 3], ["communication", 1]) },
      { id: "q7-c", label: "เก็บข้อมูลการใช้บริการมาหาจุดที่ติดขัด", detail: "อยากเห็นปัญหาในภาพรวม", scores: score(["digital", 3], ["field", 1]) },
      { id: "q7-d", label: "ทบทวนเป้าหมายและออกแบบทางเลือกใหม่", detail: "อยากให้โครงการกลับมามีทิศทาง", scores: score(["strategy", 3], ["publicImpact", 1]) },
    ],
  },
  {
    id: 8, chapter: "ด่านที่ 8", scene: "จุดเสี่ยงที่เจอระหว่างทาง",
    question: "คุณพบขั้นตอนเล็ก ๆ ที่อาจทำให้เกิดความไม่เป็นธรรม คุณอยากเริ่มจากอะไร",
    helper: "เลือกสิ่งที่คุณรู้สึกว่าควรทำก่อนที่สุด",
    options: [
      { id: "q8-a", label: "ตรวจหลักฐานและเงื่อนไขให้ครบ", detail: "อยากให้ทุกอย่างอธิบายได้", scores: score(["governance", 3], ["numbers", 1]) },
      { id: "q8-b", label: "วางจุดตรวจในขั้นตอนงาน", detail: "อยากป้องกันปัญหาก่อนเกิดซ้ำ", scores: score(["operations", 3], ["governance", 1]) },
      { id: "q8-c", label: "อธิบายผลกระทบให้ทีมเข้าใจร่วมกัน", detail: "อยากให้การแก้ไขเกิดจากความเข้าใจ", scores: score(["communication", 3], ["governance", 1]) },
      { id: "q8-d", label: "ถามว่าคนใช้บริการเจออะไรบ้าง", detail: "อยากเห็นผลกระทบที่อยู่หลังตัวเลข", scores: score(["publicImpact", 3], ["field", 1]) },
    ],
  },
  {
    id: 9, chapter: "ด่านที่ 9", scene: "วันทำงานที่มีพลัง",
    question: "วันทำงานแบบไหนทำให้คุณรู้สึกว่าเวลาผ่านเร็ว",
    helper: "ไม่ต้องเลือกสิ่งที่ดูดี เลือกสิ่งที่อยากเจอซ้ำได้",
    options: [
      { id: "q9-a", label: "คิด เขียน และต่อเรื่องเล็กให้เห็นทิศทาง", detail: "ชอบเห็นภาพใหญ่ค่อย ๆ ชัดขึ้น", scores: score(["strategy", 3], ["numbers", 1]) },
      { id: "q9-b", label: "คุมรายละเอียดให้หลายงานเดินพร้อมกัน", detail: "ชอบเห็นความวุ่นวายกลายเป็นระบบ", scores: score(["operations", 3], ["communication", 1]) },
      { id: "q9-c", label: "อยู่กับตาราง ตัวเลข หรือระบบข้อมูล", detail: "ชอบหาคำตอบจากรายละเอียด", scores: score(["numbers", 2], ["digital", 2]) },
      { id: "q9-d", label: "ลงไปคุยและช่วยคลี่คลายเรื่องที่คนเจอจริง", detail: "ชอบเห็นการเปลี่ยนแปลงจับต้องได้", scores: score(["field", 3], ["publicImpact", 1]) },
    ],
  },
  {
    id: 10, chapter: "ด่านที่ 10", scene: "เสียงร้องเรียน",
    question: "มีคนบอกว่ากติกาเดิมทำให้เขาเข้าถึงบริการยาก คุณอยากช่วยแบบไหน",
    helper: "เลือกจุดที่คุณอยากเข้าไปทำให้ดีขึ้น",
    options: [
      { id: "q10-a", label: "ตรวจว่ากติกายังยุติธรรมและมีเหตุผลไหม", detail: "อยากให้มาตรฐานคุ้มครองทุกฝ่าย", scores: score(["governance", 3], ["publicImpact", 1]) },
      { id: "q10-b", label: "แปลกติกาเป็นคำอธิบายที่เข้าใจง่าย", detail: "อยากลดกำแพงจากภาษายาก ๆ", scores: score(["communication", 3], ["publicImpact", 1]) },
      { id: "q10-c", label: "ไปดูว่าคนในพื้นที่ติดตรงไหน", detail: "อยากเห็นเงื่อนไขที่เอกสารอาจไม่บอก", scores: score(["field", 3], ["publicImpact", 1]) },
      { id: "q10-d", label: "จัดขั้นตอนใหม่ให้ลดการเดินเรื่องซ้ำ", detail: "อยากให้การใช้บริการเป็นไปได้จริง", scores: score(["operations", 3], ["governance", 1]) },
    ],
  },
  {
    id: 11, chapter: "ด่านที่ 11", scene: "เครื่องมือใหม่บนโต๊ะ",
    question: "ทีมอยากใช้เครื่องมือใหม่เพื่อทำงานให้ดีขึ้น คุณสนใจส่วนไหนที่สุด",
    helper: "เลือกบทบาทที่คุณคิดว่าตัวเองจะเพลินกับมัน",
    options: [
      { id: "q11-a", label: "ออกแบบข้อมูลให้ระบบตอบคำถามได้", detail: "ข้อมูลที่ดีช่วยให้คนตัดสินใจง่ายขึ้น", scores: score(["digital", 3], ["numbers", 1]) },
      { id: "q11-b", label: "วางวิธีใช้ให้เข้ากับงานจริงของทีม", detail: "เครื่องมือที่ดีต้องไม่เพิ่มภาระ", scores: score(["operations", 3], ["digital", 1]) },
      { id: "q11-c", label: "มองว่ามันช่วยเป้าหมายใหญ่ของหน่วยงานอย่างไร", detail: "อยากให้เครื่องมือไม่หลุดจากทิศทาง", scores: score(["strategy", 3], ["numbers", 1]) },
      { id: "q11-d", label: "ทำคู่มือให้คนหลากหลายกลุ่มใช้ได้", detail: "อยากให้เทคโนโลยีไม่ทิ้งใครไว้ข้างหลัง", scores: score(["communication", 3], ["publicImpact", 1]) },
    ],
  },
  {
    id: 12, chapter: "ด่านที่ 12", scene: "เหตุเร่งด่วน",
    question: "เมื่อเกิดเรื่องเร่งด่วนที่มีข้อมูลยังไม่ครบ คุณอยากรับผิดชอบตรงไหน",
    helper: "ไม่มีคำตอบถูกผิด ลองนึกถึงสิ่งที่คุณอยากหยิบขึ้นมาทำ",
    options: [
      { id: "q12-a", label: "รวมคนและแบ่งงานให้ตอบสนองได้ทัน", detail: "อยากให้ทุกฝ่ายรู้ว่าใครทำอะไร", scores: score(["operations", 3], ["strategy", 1]) },
      { id: "q12-b", label: "ไปดูหน้างานและรับฟังความต้องการจริง", detail: "อยากให้การตัดสินใจไม่หลุดบริบท", scores: score(["field", 3], ["communication", 1]) },
      { id: "q12-c", label: "ตั้งเงื่อนไขให้ช่วยเร็วแต่ยังเป็นธรรม", detail: "อยากบาลานซ์ความเร็วกับความรับผิดชอบ", scores: score(["governance", 3], ["operations", 1]) },
      { id: "q12-d", label: "ทำภาพข้อมูลสั้น ๆ ให้เห็นสถานการณ์เดียวกัน", detail: "อยากให้ทีมใช้ข้อมูลชุดเดียวกัน", scores: score(["digital", 3], ["numbers", 1]) },
    ],
  },
  {
    id: 13, chapter: "ด่านที่ 13", scene: "เรื่องยากที่ต้องเล่า",
    question: "หากต้องอธิบายเรื่องซับซ้อนให้คนหลากหลายกลุ่มเข้าใจ คุณอยากเริ่มจากอะไร",
    helper: "เลือกวิธีที่ทำแล้วรู้สึกว่าเรื่องจะเคลื่อนไปข้างหน้า",
    options: [
      { id: "q13-a", label: "ฟังว่าผู้รับสารสงสัยหรือกังวลตรงไหน", detail: "อยากเริ่มจากภาษาของคนฟัง", scores: score(["communication", 3], ["publicImpact", 1]) },
      { id: "q13-b", label: "ทำตัวอย่างหรือเครื่องมือให้ลองใช้", detail: "อยากให้เรื่องยากกลายเป็นภาพที่จับต้องได้", scores: score(["digital", 3], ["communication", 1]) },
      { id: "q13-c", label: "เรียงเหตุผลและผลลัพธ์ให้เห็นภาพใหญ่", detail: "อยากให้คนเข้าใจว่าทำไมเรื่องนี้สำคัญ", scores: score(["strategy", 3], ["communication", 1]) },
      { id: "q13-d", label: "เช็กข้อมูลอ้างอิงและขอบเขตที่สื่อสารได้", detail: "อยากให้สิ่งที่บอกมีความรับผิดชอบ", scores: score(["governance", 3], ["numbers", 1]) },
    ],
  },
  {
    id: 14, chapter: "ด่านที่ 14", scene: "ขั้นตอนที่วกวน",
    question: "คุณพบว่างานเดิมใช้เวลานานเพราะขั้นตอนซ้ำกัน คุณอยากพัฒนาอย่างไร",
    helper: "เลือกสิ่งที่คุณคิดว่าน่าลองขยับก่อน",
    options: [
      { id: "q14-a", label: "ร่าง flow ใหม่และทดลองให้ทีมใช้", detail: "อยากทำให้เส้นทางงานสั้นและชัด", scores: score(["operations", 3], ["digital", 1]) },
      { id: "q14-b", label: "แยกจุดที่ต้องควบคุมออกจากขั้นตอนที่ตัดได้", detail: "อยากเร็วขึ้นโดยไม่เสียความเป็นธรรม", scores: score(["governance", 3], ["numbers", 1]) },
      { id: "q14-c", label: "ถามผู้ใช้บริการว่าติดขัดตรงไหนมากที่สุด", detail: "อยากเริ่มจากสิ่งที่กระทบคนจริง", scores: score(["field", 3], ["publicImpact", 1]) },
      { id: "q14-d", label: "เชื่อมให้เห็นว่างานที่ดีขึ้นพาเป้าหมายไหนไปต่อ", detail: "อยากให้การแก้ไม่ใช่แค่เร็วขึ้นชั่วคราว", scores: score(["strategy", 3], ["operations", 1]) },
    ],
  },
  {
    id: 15, chapter: "ด่านที่ 15", scene: "ภาพความสำเร็จ",
    question: "ถ้าได้เลือกผลลัพธ์หนึ่งอย่างจากงานของคุณ คุณอยากเห็นอะไรที่สุด",
    helper: "เลือกภาพที่ทำให้คุณรู้สึกภูมิใจจริง ๆ",
    options: [
      { id: "q15-a", label: "ผู้คนเข้าถึงโอกาสหรือบริการได้มากขึ้น", detail: "อยากเห็นผลกระทบที่ไม่ทิ้งใครไว้ข้างหลัง", scores: score(["publicImpact", 3], ["field", 1]) },
      { id: "q15-b", label: "หน่วยงานมีทิศทางและหลักฐานตัดสินใจที่ชัดขึ้น", detail: "อยากเห็นภาพใหญ่พางานไปต่อ", scores: score(["strategy", 3], ["governance", 1]) },
      { id: "q15-c", label: "คนที่เคยสับสนเข้าใจเรื่องสำคัญได้จริง", detail: "อยากเห็นความเข้าใจเปลี่ยนเป็นการลงมือ", scores: score(["communication", 3], ["publicImpact", 1]) },
      { id: "q15-d", label: "ข้อมูลและระบบช่วยให้คนทำงานเบาขึ้น", detail: "อยากเห็นเครื่องมือช่วยงานประจำวัน", scores: score(["digital", 3], ["operations", 1]) },
    ],
  },
  {
    id: 16, chapter: "ด่านสุดท้าย", scene: "รอยยิ้มตอนเลิกงาน",
    question: "ตอนจบวัน คุณอยากภูมิใจกับอะไรที่สุด",
    helper: "นี่คือเข็มทิศข้อสุดท้าย เลือกสิ่งที่ทำแล้วรู้สึกว่าใช่",
    options: [
      { id: "q16-a", label: "ทีมมีแผนและทางเลือกที่ชัดขึ้น", detail: "เราเห็นภาพว่าจะไปต่ออย่างไร", scores: score(["strategy", 3], ["governance", 1]) },
      { id: "q16-b", label: "เรื่องที่วุ่นวายถูกจัดให้เดินต่อได้", detail: "ทุกคนรู้หน้าที่และงานไม่ตกหล่น", scores: score(["operations", 3], ["digital", 1]) },
      { id: "q16-c", label: "คำตอบที่ได้แม่นยำและตรวจสอบได้", detail: "รายละเอียดที่ดีช่วยให้งานน่าเชื่อถือ", scores: score(["numbers", 3], ["governance", 1]) },
      { id: "q16-d", label: "ใครบางคนเข้าใจและเข้าถึงสิ่งที่ต้องการ", detail: "งานของเราทำให้วันของเขาง่ายขึ้น", scores: score(["publicImpact", 3], ["communication", 1]) },
    ],
  },
];

export const workProfiles: WorkProfile[] = [
  {
    id: "planner", title: "นักวางภาพใหญ่", nickname: "คนที่ต่อเรื่องกระจัดกระจายให้เห็นทางไปต่อ",
    summary: "คุณมีพลังเมื่อได้เปลี่ยนโจทย์ที่ซับซ้อนให้กลายเป็นเป้าหมาย ทางเลือก และแผนที่ชัดขึ้น",
    reflection: "ลองสำรวจงานที่ต้องคิดเชิงระบบ วางทิศทาง หรือเชื่อมข้อมูลสู่ข้อเสนอ",
    examples: ["วิเคราะห์นโยบายและแผน", "พัฒนาระบบราชการ", "วิชาการสถิติ"],
    weights: score(["strategy", 0.6], ["numbers", 0.25], ["governance", 0.15]), avatarKey: "planner", accent: "#407c78",
  },
  {
    id: "operations", title: "นักพาระบบเดิน", nickname: "คนที่เปลี่ยนเรื่องยุ่งให้เดินหน้าได้",
    summary: "คุณน่าจะสนุกกับการจัดระบบ ประสานคน และเก็บรายละเอียดให้งานหลายชิ้นต่อกันอย่างลื่นไหล",
    reflection: "ลองสำรวจงานที่มีจังหวะของการจัดการภารกิจ คน เอกสาร และโครงการ",
    examples: ["จัดการงานทั่วไป", "ทรัพยากรบุคคล", "วิชาการพัสดุ"],
    weights: score(["operations", 0.6], ["communication", 0.25], ["governance", 0.15]), avatarKey: "operations", accent: "#b66a4c",
  },
  {
    id: "analyst", title: "นักจับเข็มตัวเลข", nickname: "คนที่เห็นความหมายในรายละเอียด",
    summary: "คุณมีความสุขกับการทำให้ตัวเลข ข้อมูล และหลักฐานเรียบร้อยพอที่จะใช้ตัดสินใจได้อย่างมั่นใจ",
    reflection: "ลองสำรวจงานที่อยู่กับงบประมาณ การเงิน บัญชี หรือการตรวจสอบรายละเอียด",
    examples: ["วิชาการเงินและบัญชี", "วิชาการคลัง", "วิชาการตรวจสอบภายใน"],
    weights: score(["numbers", 0.6], ["governance", 0.25], ["strategy", 0.15]), avatarKey: "analyst", accent: "#b5883e",
  },
  {
    id: "digital", title: "นักต่อจิ๊กซอว์ดิจิทัล", nickname: "คนที่ทำให้ข้อมูลและเครื่องมือช่วยคนได้จริง",
    summary: "คุณน่าจะตื่นเต้นเมื่อได้ต่อระบบ ข้อมูล และเครื่องมือให้กลายเป็นวิธีทำงานที่ง่ายขึ้นสำหรับทุกคน",
    reflection: "ลองสำรวจงานที่เกี่ยวกับระบบสารสนเทศ ข้อมูล หรือการออกแบบบริการดิจิทัล",
    examples: ["วิชาการคอมพิวเตอร์", "วิชาการเทคโนโลยีสารสนเทศ", "วิชาการสถิติ"],
    weights: score(["digital", 0.6], ["strategy", 0.25], ["operations", 0.15]), avatarKey: "digital", accent: "#3d6f8e",
  },
  {
    id: "communicator", title: "นักสื่อสารสาธารณะ", nickname: "คนที่ทำให้เรื่องยากกลายเป็นเรื่องที่ทุกคนเข้าใจ",
    summary: "คุณมีพลังเมื่อได้ฟังคำถาม แปลเรื่องซับซ้อน และสร้างความเข้าใจที่พาคนหลายกลุ่มไปต่อได้",
    reflection: "ลองสำรวจงานสื่อสารสาธารณะ ประชาสัมพันธ์ หรือการออกแบบข้อมูลเพื่อผู้ใช้",
    examples: ["ประชาสัมพันธ์", "วิชาการสารสนเทศ", "วิชาการวัฒนธรรม"],
    weights: score(["communication", 0.6], ["publicImpact", 0.25], ["operations", 0.15]), avatarKey: "communicator", accent: "#9b6b8e",
  },
  {
    id: "field", title: "นักขับเคลื่อนพื้นที่", nickname: "คนที่เริ่มจากเรื่องจริงเพื่อสร้างทางออกที่ใช้ได้",
    summary: "คุณมีพลังเมื่อได้เห็นบริบทจริง ฟังผู้คน และชวนหลายฝ่ายสร้างวิธีที่เหมาะกับพื้นที่",
    reflection: "ลองสำรวจงานที่เชื่อมพื้นที่ ชุมชน การพัฒนา และการลงมือกับผู้คนจริง ๆ",
    examples: ["วิชาการพัฒนาชุมชน", "วิชาการพัฒนาสังคม", "ส่งเสริมการเกษตร"],
    weights: score(["field", 0.6], ["communication", 0.25], ["publicImpact", 0.15]), avatarKey: "field", accent: "#728f55",
  },
  {
    id: "governance", title: "ผู้พิทักษ์กติกา", nickname: "คนที่ทำให้การตัดสินใจอธิบายได้และเป็นธรรม",
    summary: "คุณให้ความสำคัญกับหลักเกณฑ์ ความเสี่ยง และรายละเอียดที่ทำให้งานน่าเชื่อถือสำหรับทุกฝ่าย",
    reflection: "ลองสำรวจงานที่เกี่ยวกับกฎหมาย การกำกับดูแล การคุ้มครองสิทธิ หรือการตรวจสอบ",
    examples: ["นิติการ", "วิชาการยุติธรรม", "คุ้มครองผู้บริโภค"],
    weights: score(["governance", 0.6], ["numbers", 0.25], ["operations", 0.15]), avatarKey: "governance", accent: "#675f83",
  },
  {
    id: "community", title: "ผู้เปิดโอกาสให้ผู้คน", nickname: "คนที่มองเห็นว่าบริการที่ดีควรไปถึงทุกคน",
    summary: "คุณมีพลังเมื่อได้ขยายสิทธิ โอกาส และการเข้าถึงให้คนที่อาจถูกมองข้ามได้ไปต่ออย่างมั่นใจ",
    reflection: "ลองสำรวจงานด้านสวัสดิการ แรงงาน การคุ้มครองสิทธิ หรือบริการที่กระทบชีวิตผู้คน",
    examples: ["วิชาการแรงงาน", "สวัสดิการสังคม", "คุ้มครองสิทธิและเสรีภาพ"],
    weights: score(["publicImpact", 0.6], ["communication", 0.25], ["field", 0.15]), avatarKey: "community", accent: "#628554",
  },
];

const maximumScores = questions.reduce((maximums, question) => {
  (Object.keys(maximums) as Dimension[]).forEach((dimension) => {
    maximums[dimension] += Math.max(...question.options.map((option) => option.scores[dimension]));
  });
  return maximums;
}, zeroScores());

export type RankedWorkProfile = WorkProfile & { score: number };

export const rankWorkProfiles = (scores: ScoreVector): RankedWorkProfile[] => {
  const normalized = (Object.keys(scores) as Dimension[]).reduce((next, dimension) => {
    next[dimension] = maximumScores[dimension] ? (scores[dimension] / maximumScores[dimension]) * 100 : 0;
    return next;
  }, zeroScores());

  return workProfiles
    .map((profile) => {
      const profileScore = (Object.keys(normalized) as Dimension[]).reduce(
        (total, dimension) => total + normalized[dimension] * profile.weights[dimension],
        0,
      );
      return { ...profile, score: Math.round(profileScore * 10) / 10 };
    })
    .sort((left, right) => right.score - left.score);
};
