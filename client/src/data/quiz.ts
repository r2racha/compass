/**
 * Style reminder — สมุดบันทึกนักเดินทาง: แบบประเมินเป็นการสำรวจความสอดคล้อง
 * กับงาน ไม่ใช่การรับรองคุณสมบัติหรือผลการสอบราชการ
 */
export type Dimension =
  | "strategy"
  | "coordination"
  | "regulation"
  | "quantitative"
  | "dataDigital"
  | "publicCommunication"
  | "fieldDevelopment"
  | "protection";

export type SubjectGroup =
  | "law"
  | "publicSocial"
  | "management"
  | "finance"
  | "digital"
  | "data"
  | "engineering"
  | "architecture"
  | "science"
  | "agriEnvironment"
  | "health"
  | "communication"
  | "unsure";

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

export type Position = {
  id: string;
  officialCode: string;
  title: string;
  family: string;
  summary: string;
  difference: string;
  subjects: SubjectGroup[];
  professionalRequirement?: string;
  weights: ScoreVector;
  compareWith: string;
};

export const zeroScores = (): ScoreVector => ({
  strategy: 0,
  coordination: 0,
  regulation: 0,
  quantitative: 0,
  dataDigital: 0,
  publicCommunication: 0,
  fieldDevelopment: 0,
  protection: 0,
});

const score = (...items: Array<[Dimension, number]>): ScoreVector => {
  const next = zeroScores();
  items.forEach(([dimension, value]) => {
    next[dimension] = value;
  });
  return next;
};

export const subjectGroups: Array<{ id: SubjectGroup; label: string; shortLabel: string }> = [
  { id: "law", label: "กฎหมาย", shortLabel: "กฎหมาย" },
  { id: "publicSocial", label: "รัฐศาสตร์ / รัฐประศาสนศาสตร์ / สังคมศาสตร์", shortLabel: "รัฐศาสตร์และสังคมศาสตร์" },
  { id: "management", label: "บริหารธุรกิจ / การจัดการ / ทรัพยากรมนุษย์", shortLabel: "บริหารและการจัดการ" },
  { id: "finance", label: "บัญชี / การเงิน / เศรษฐศาสตร์", shortLabel: "การเงิน บัญชี และเศรษฐศาสตร์" },
  { id: "digital", label: "คอมพิวเตอร์ / เทคโนโลยีสารสนเทศ / ข้อมูล", shortLabel: "คอมพิวเตอร์และดิจิทัล" },
  { id: "data", label: "สถิติ / คณิตศาสตร์ / วิทยาศาสตร์ข้อมูล", shortLabel: "สถิติและข้อมูล" },
  { id: "engineering", label: "วิศวกรรมศาสตร์", shortLabel: "วิศวกรรมศาสตร์" },
  { id: "architecture", label: "สถาปัตยกรรม / ผังเมือง / ภูมิสถาปัตย์", shortLabel: "สถาปัตยกรรมและผังเมือง" },
  { id: "science", label: "วิทยาศาสตร์", shortLabel: "วิทยาศาสตร์" },
  { id: "agriEnvironment", label: "เกษตร / สิ่งแวดล้อม / ทรัพยากรธรรมชาติ", shortLabel: "เกษตรและสิ่งแวดล้อม" },
  { id: "health", label: "สุขภาพและสาธารณสุข", shortLabel: "สุขภาพและสาธารณสุข" },
  { id: "communication", label: "นิเทศศาสตร์ / อักษรศาสตร์ / มนุษยศาสตร์", shortLabel: "การสื่อสารและมนุษยศาสตร์" },
  { id: "unsure", label: "ยังไม่แน่ใจ — ดูผลสำรวจโดยไม่กรองวุฒิ", shortLabel: "ยังไม่กรองวุฒิ" },
];

export const dimensionLabels: Record<Dimension, string> = {
  strategy: "วิเคราะห์และวางแผน",
  coordination: "จัดระบบและประสานงาน",
  regulation: "กฎหมาย ระเบียบ และความถูกต้อง",
  quantitative: "ตัวเลขและการเงิน",
  dataDigital: "ข้อมูลและดิจิทัล",
  publicCommunication: "สื่อสารและบริการประชาชน",
  fieldDevelopment: "พัฒนาและทำงานกับพื้นที่",
  protection: "คุ้มครองสิทธิและประโยชน์สาธารณะ",
};

export const questions: QuizQuestion[] = [
  {
    id: 1, chapter: "หมุดหมายที่ 1", scene: "โจทย์แรกบนแผนที่", question: "เมื่อได้รับโจทย์ใหม่ที่ยังไม่ชัด คุณอยากเริ่มจากอะไร", helper: "เลือกสิ่งที่เป็นธรรมชาติที่สุดของคุณ",
    options: [
      { id: "q1-a", label: "แยกปัญหา เป้าหมาย และผลที่อยากเห็น", detail: "เพื่อวางภาพรวมและทางเลือก", scores: score(["strategy", 3], ["dataDigital", 1]) },
      { id: "q1-b", label: "รวบรวมคนและกำหนดขั้นตอนทำงาน", detail: "เพื่อให้งานเริ่มเดินได้ทันที", scores: score(["coordination", 3], ["publicCommunication", 1]) },
      { id: "q1-c", label: "ตรวจกรอบกฎหมาย ระเบียบ และเงื่อนไข", detail: "เพื่อไม่ให้จุดเริ่มต้นคลาดเคลื่อน", scores: score(["regulation", 3], ["protection", 1]) },
      { id: "q1-d", label: "ฟังบริบทจากผู้ได้รับผลกระทบก่อน", detail: "เพื่อให้โจทย์ไม่หลุดจากชีวิตจริง", scores: score(["fieldDevelopment", 2], ["publicCommunication", 2]) },
    ],
  },
  {
    id: 2, chapter: "หมุดหมายที่ 2", scene: "รายงานที่มีตัวเลขเต็มหน้า", question: "เมื่อเจอรายงานข้อมูลจำนวนมาก คุณอยากทำสิ่งใด", helper: "นึกถึงวิธีที่ทำให้คุณอยากอ่านต่อ ไม่ใช่แค่อ่านจบ",
    options: [
      { id: "q2-a", label: "หาความหมายและแนวโน้มที่ซ่อนอยู่", detail: "อยากเปลี่ยนข้อมูลเป็นข้อเสนอที่ใช้ได้", scores: score(["dataDigital", 2], ["strategy", 2]) },
      { id: "q2-b", label: "ตรวจตัวเลขและความเชื่อมโยงของรายการ", detail: "อยากให้ข้อมูลถูกต้องตั้งแต่ฐาน", scores: score(["quantitative", 3], ["regulation", 1]) },
      { id: "q2-c", label: "จัดระเบียบไฟล์ให้ทุกคนใช้ร่วมกันง่าย", detail: "อยากให้ข้อมูลไม่ติดอยู่กับคนใดคนหนึ่ง", scores: score(["coordination", 2], ["dataDigital", 2]) },
      { id: "q2-d", label: "สรุปให้คนทั่วไปเข้าใจได้ในไม่กี่ประโยค", detail: "อยากให้ข้อมูลไปถึงคนที่ต้องใช้จริง", scores: score(["publicCommunication", 3], ["dataDigital", 1]) },
    ],
  },
  {
    id: 3, chapter: "หมุดหมายที่ 3", scene: "เอกสารที่ต้องรอบคอบ", question: "งานเอกสารแบบใดที่ทำให้คุณรู้สึกภูมิใจเมื่อทำเสร็จ", helper: "เลือกจากสิ่งที่คุณอยากตรวจทานด้วยตัวเอง",
    options: [
      { id: "q3-a", label: "แผนงานหรือข้อเสนอโครงการที่มีเหตุผลครบ", detail: "เห็นภาพตั้งแต่ปัญหาถึงผลลัพธ์", scores: score(["strategy", 3], ["regulation", 1]) },
      { id: "q3-b", label: "เอกสารการเงินที่ตัวเลขตรงและตรวจสอบได้", detail: "ทุกรายการมีที่มาที่ไป", scores: score(["quantitative", 3], ["regulation", 1]) },
      { id: "q3-c", label: "เอกสารราชการที่ทำให้หลายฝ่ายทำงานต่อได้", detail: "รายละเอียดชัด การประสานไม่สะดุด", scores: score(["coordination", 3], ["regulation", 1]) },
      { id: "q3-d", label: "คำชี้แจงที่ตอบข้อสงสัยของประชาชนได้", detail: "อ่านแล้วรู้ว่าต้องทำอะไรต่อ", scores: score(["publicCommunication", 3], ["protection", 1]) },
    ],
  },
  {
    id: 4, chapter: "หมุดหมายที่ 4", scene: "เรื่องที่ผู้รับบริการกำลังกังวล", question: "หากผู้รับบริการมาพร้อมเรื่องที่ซับซ้อน คุณอยากช่วยอย่างไร", helper: "ไม่มีคำตอบที่ดีกว่า เลือกบทบาทที่คุณอยากรับจริง",
    options: [
      { id: "q4-a", label: "อธิบายสิทธิ ขั้นตอน และทางเลือกอย่างเข้าใจง่าย", detail: "เพื่อให้เขาตัดสินใจได้ด้วยข้อมูล", scores: score(["publicCommunication", 3], ["regulation", 1]) },
      { id: "q4-b", label: "ตรวจข้อเท็จจริงและหลักเกณฑ์อย่างเป็นธรรม", detail: "เพื่อให้ทุกฝ่ายได้รับการปฏิบัติที่ถูกต้อง", scores: score(["regulation", 2], ["protection", 2]) },
      { id: "q4-c", label: "ประสานหน่วยงานหรือคนที่ช่วยต่อได้", detail: "เพื่อไม่ให้เรื่องหยุดอยู่แค่จุดรับเรื่อง", scores: score(["coordination", 2], ["protection", 2]) },
      { id: "q4-d", label: "ไปทำความเข้าใจบริบทของพื้นที่หรือครอบครัว", detail: "เพื่อให้ความช่วยเหลือเหมาะกับสถานการณ์จริง", scores: score(["fieldDevelopment", 2], ["protection", 2]) },
    ],
  },
  {
    id: 5, chapter: "หมุดหมายที่ 5", scene: "โครงการที่เริ่มติดขัด", question: "เมื่อโครงการล่าช้ากว่าแผน คุณอยากทำอะไรเป็นอย่างแรก", helper: "เลือกสิ่งที่คุณจะหยิบมาทำก่อนโดยไม่ต้องมีใครบอก",
    options: [
      { id: "q5-a", label: "ย้อนดูสมมติฐานและปรับแผนให้ตรงจุด", detail: "เพื่อให้การแก้ปัญหามีทิศทาง", scores: score(["strategy", 3], ["dataDigital", 1]) },
      { id: "q5-b", label: "แตกงานใหม่และคุยกับเจ้าของงานแต่ละส่วน", detail: "เพื่อให้ทุกคนเห็นจุดที่ต้องขยับ", scores: score(["coordination", 3], ["publicCommunication", 1]) },
      { id: "q5-c", label: "ดูว่ามีเงื่อนไขหรือขั้นตอนใดที่ทำให้ติด", detail: "เพื่อไม่ให้แก้โดยข้ามหลักเกณฑ์", scores: score(["regulation", 2], ["coordination", 2]) },
      { id: "q5-d", label: "ลงไปฟังหน้างานว่าความจริงต่างจากแผนอย่างไร", detail: "เพื่อให้แผนแก้ไขใช้งานได้จริง", scores: score(["fieldDevelopment", 3], ["strategy", 1]) },
    ],
  },
  {
    id: 6, chapter: "หมุดหมายที่ 6", scene: "งานที่ต้องใช้ความละเอียด", question: "ความละเอียดแบบไหนที่คุณยินดีใช้เวลาให้มากเป็นพิเศษ", helper: "เลือกสิ่งที่ทำแล้วรู้สึกว่า “ต้องให้ถูกตั้งแต่ต้น”",
    options: [
      { id: "q6-a", label: "ตัวเลข รายการ และเอกสารเบิกจ่าย", detail: "เพราะความคลาดเคลื่อนเล็กน้อยมีผลมาก", scores: score(["quantitative", 3], ["regulation", 1]) },
      { id: "q6-b", label: "หลักฐาน ข้อเท็จจริง และข้อกฎหมาย", detail: "เพราะข้อสรุปต้องยืนอยู่บนฐานที่ตรวจสอบได้", scores: score(["regulation", 3], ["protection", 1]) },
      { id: "q6-c", label: "ชุดข้อมูลและตรรกะของรายงาน", detail: "เพราะข้อมูลที่ดีพาไปสู่การตัดสินใจที่ดี", scores: score(["dataDigital", 3], ["strategy", 1]) },
      { id: "q6-d", label: "รายละเอียดความต้องการของผู้คนแต่ละกลุ่ม", detail: "เพราะบริบทต่างกันทำให้วิธีช่วยต่างกัน", scores: score(["protection", 2], ["publicCommunication", 2]) },
    ],
  },
  {
    id: 7, chapter: "หมุดหมายที่ 7", scene: "มองภาพของวันทำงาน", question: "วันทำงานที่มีพลังสำหรับคุณใกล้กับข้อใด", helper: "ไม่ต้องเลือกสิ่งที่ดูดี เลือกสิ่งที่อยากเจอซ้ำได้",
    options: [
      { id: "q7-a", label: "ได้คิด วิเคราะห์ และเขียนข้อเสนอเชิงเหตุผล", detail: "มีเวลาจัดระเบียบความคิดให้ชัด", scores: score(["strategy", 3], ["dataDigital", 1]) },
      { id: "q7-b", label: "ได้ทำให้หลายคนและหลายงานเดินเข้าหากัน", detail: "งานคืบหน้าเพราะทุกฝ่ายเข้าใจกัน", scores: score(["coordination", 3], ["publicCommunication", 1]) },
      { id: "q7-c", label: "ได้ตรวจความถูกต้องและป้องกันความเสี่ยง", detail: "รู้สึกมั่นใจเมื่องานมีมาตรฐาน", scores: score(["regulation", 3], ["protection", 1]) },
      { id: "q7-d", label: "ได้พบพื้นที่หรือกลุ่มเป้าหมายจริง", detail: "เห็นผลของงานกับผู้คนหรือชุมชน", scores: score(["fieldDevelopment", 3], ["publicCommunication", 1]) },
    ],
  },
  {
    id: 8, chapter: "หมุดหมายที่ 8", scene: "เมื่อต้องตัดสินใจจากข้อมูล", question: "หากข้อมูลจากหลายแหล่งให้คำตอบไม่ตรงกัน คุณจะทำอย่างไร", helper: "เลือกวิธีที่คุณไว้ใจที่สุดเมื่อความชัดเจนยังไม่มา",
    options: [
      { id: "q8-a", label: "สร้างกรอบวิเคราะห์แล้วทดสอบข้อสมมติฐาน", detail: "เพื่อตัดสินใจจากภาพรวมที่เป็นระบบ", scores: score(["strategy", 2], ["dataDigital", 2]) },
      { id: "q8-b", label: "ตรวจแหล่งที่มาและตัวเลขทีละรายการ", detail: "เพื่อหาว่าจุดใดทำให้ผลต่างกัน", scores: score(["quantitative", 2], ["dataDigital", 2]) },
      { id: "q8-c", label: "ดูข้อกฎหมายหรือหลักเกณฑ์ที่ใช้เป็นฐาน", detail: "เพื่อให้การตัดสินใจไม่หลุดจากกรอบ", scores: score(["regulation", 3], ["strategy", 1]) },
      { id: "q8-d", label: "เชิญคนที่เกี่ยวข้องมาคุยถึงข้อเท็จจริงร่วมกัน", detail: "เพื่อได้ข้อมูลที่มองไม่เห็นจากเอกสาร", scores: score(["coordination", 2], ["publicCommunication", 2]) },
    ],
  },
  {
    id: 9, chapter: "หมุดหมายที่ 9", scene: "การสื่อสารเรื่องยาก", question: "คุณอยากรับบทบาทใดเมื่อต้องสื่อสารเรื่องราชการที่เข้าใจยาก", helper: "เลือกบทบาทที่คุณคิดว่าน่าจะทำแล้วรู้สึกเป็นตัวเอง",
    options: [
      { id: "q9-a", label: "แปลประเด็นให้คนทั่วไปเข้าใจและตัดสินใจได้", detail: "ทำให้ข้อมูลสำคัญไม่อยู่แค่ในเอกสาร", scores: score(["publicCommunication", 3], ["protection", 1]) },
      { id: "q9-b", label: "จัดหลักฐานและตอบคำถามอย่างมีที่มา", detail: "ทำให้คำอธิบายมีน้ำหนักและตรวจสอบได้", scores: score(["regulation", 2], ["dataDigital", 2]) },
      { id: "q9-c", label: "วางสารหลักและเป้าหมายของการสื่อสาร", detail: "ทำให้คนเห็นว่าเรื่องนี้สำคัญอย่างไร", scores: score(["strategy", 2], ["publicCommunication", 2]) },
      { id: "q9-d", label: "รวบรวมข้อสงสัยจากหลายฝ่ายมาปรับรูปแบบบริการ", detail: "ทำให้การสื่อสารแก้ปัญหาได้จริง", scores: score(["coordination", 2], ["publicCommunication", 2]) },
    ],
  },
  {
    id: 10, chapter: "หมุดหมายที่ 10", scene: "พื้นที่ที่กำลังเปลี่ยน", question: "หากชุมชนหนึ่งต้องการพัฒนา คุณอยากมีส่วนช่วยแบบใด", helper: "เลือกสิ่งที่คุณอยากลงมือทำมากที่สุด",
    options: [
      { id: "q10-a", label: "อ่านข้อมูลพื้นที่และร่วมวางแผนระยะยาว", detail: "เพื่อให้ทรัพยากรไปอยู่ตรงจุดที่สำคัญ", scores: score(["strategy", 2], ["fieldDevelopment", 2]) },
      { id: "q10-b", label: "ชวนกลุ่มและเครือข่ายมาลองทำงานร่วมกัน", detail: "เพื่อให้การเปลี่ยนแปลงเป็นของคนในพื้นที่", scores: score(["fieldDevelopment", 3], ["publicCommunication", 1]) },
      { id: "q10-c", label: "มองหากลุ่มที่อาจยังเข้าไม่ถึงบริการหรือสิทธิ", detail: "เพื่อให้ความช่วยเหลือไม่ทิ้งใครไว้ข้างหลัง", scores: score(["protection", 3], ["fieldDevelopment", 1]) },
      { id: "q10-d", label: "จัดระบบโครงการ ผู้รับผิดชอบ และการติดตาม", detail: "เพื่อให้สิ่งที่ตั้งใจเกิดขึ้นต่อเนื่อง", scores: score(["coordination", 2], ["strategy", 2]) },
    ],
  },
  {
    id: 11, chapter: "หมุดหมายที่ 11", scene: "ความเสี่ยงเล็ก ๆ ที่ไม่ควรมองข้าม", question: "เมื่อพบขั้นตอนที่อาจทำให้เกิดความเสียหาย คุณอยากทำอย่างไร", helper: "เลือกแนวทางที่คุณคิดว่าปกป้องงานได้ดีที่สุด",
    options: [
      { id: "q11-a", label: "ทบทวนกฎ ระเบียบ และจุดที่ต้องแก้ไข", detail: "เพื่อให้กระบวนการถูกต้องและเป็นธรรม", scores: score(["regulation", 3], ["protection", 1]) },
      { id: "q11-b", label: "ประเมินความเสี่ยงและออกแบบจุดควบคุม", detail: "เพื่อป้องกันปัญหาก่อนเกิดจริง", scores: score(["regulation", 2], ["quantitative", 2]) },
      { id: "q11-c", label: "ทำข้อมูลให้เห็นผลกระทบและเสนอทางเลือก", detail: "เพื่อให้ผู้ตัดสินใจเห็นภาพชัด", scores: score(["strategy", 2], ["dataDigital", 2]) },
      { id: "q11-d", label: "คุยกับผู้ปฏิบัติงานว่าขั้นตอนไหนใช้จริงยาก", detail: "เพื่อให้การแก้ไขไม่เพิ่มภาระเกินจำเป็น", scores: score(["coordination", 2], ["fieldDevelopment", 2]) },
    ],
  },
  {
    id: 12, chapter: "หมุดหมายที่ 12", scene: "เมื่อระบบดิจิทัลต้องตอบโจทย์คน", question: "หากหน่วยงานจะทำบริการดิจิทัลใหม่ คุณอยากรับบทบาทใด", helper: "เลือกสิ่งที่อยากมีส่วนร่วมมากที่สุด",
    options: [
      { id: "q12-a", label: "ออกแบบหรือปรับระบบให้ทำงานได้ดี", detail: "สนใจโครงสร้างและการใช้งานจริง", scores: score(["dataDigital", 3], ["coordination", 1]) },
      { id: "q12-b", label: "ใช้ข้อมูลดูว่าเรื่องใดควรแก้ก่อนหลัง", detail: "สนใจการตัดสินใจจากหลักฐาน", scores: score(["dataDigital", 2], ["strategy", 2]) },
      { id: "q12-c", label: "ทำให้หน้าจอและคำอธิบายเป็นมิตรกับผู้ใช้", detail: "สนใจประสบการณ์ของประชาชน", scores: score(["publicCommunication", 2], ["protection", 2]) },
      { id: "q12-d", label: "เชื่อมความต้องการของหลายฝ่ายให้เป็นขั้นตอนเดียว", detail: "สนใจให้ระบบใช้ได้จริงในทุกจุด", scores: score(["coordination", 3], ["dataDigital", 1]) },
    ],
  },
  {
    id: 13, chapter: "หมุดหมายที่ 13", scene: "ผลกระทบที่มองไกลกว่าวันนี้", question: "เรื่องใดทำให้คุณอยากเข้าไปช่วยเป็นพิเศษ", helper: "เลือกจากสิ่งที่คุณรู้สึกว่าอยากปกป้องหรือพัฒนา",
    options: [
      { id: "q13-a", label: "สุขภาพและคุณภาพชีวิตของคนในชุมชน", detail: "สนใจผลลัพธ์ที่จับต้องได้กับผู้คน", scores: score(["protection", 3], ["fieldDevelopment", 1]) },
      { id: "q13-b", label: "สิ่งแวดล้อมและทรัพยากรที่ใช้ร่วมกัน", detail: "สนใจผลกระทบระยะยาวต่อสาธารณะ", scores: score(["protection", 2], ["fieldDevelopment", 2]) },
      { id: "q13-c", label: "การเข้าถึงสิทธิและความเป็นธรรม", detail: "สนใจทำให้กติกาใช้กับทุกคนได้จริง", scores: score(["regulation", 2], ["protection", 2]) },
      { id: "q13-d", label: "โอกาสทางอาชีพและการพึ่งพาตนเอง", detail: "สนใจพัฒนาคนและกลุ่มให้ไปต่อได้", scores: score(["fieldDevelopment", 3], ["publicCommunication", 1]) },
    ],
  },
  {
    id: 14, chapter: "หมุดหมายที่ 14", scene: "กระดานวางงบ", question: "เมื่อต้องเลือกใช้งบประมาณอย่างจำกัด คุณอยากช่วยแบบใด", helper: "เลือกวิธีคิดที่คุณเชื่อว่ารับผิดชอบต่อทรัพยากรที่สุด",
    options: [
      { id: "q14-a", label: "วิเคราะห์ความคุ้มค่าและตัวเลขอย่างละเอียด", detail: "มองว่าตัวเลขช่วยให้เห็นทางเลือกชัด", scores: score(["quantitative", 3], ["strategy", 1]) },
      { id: "q14-b", label: "จัดลำดับโครงการให้สอดคล้องเป้าหมายหลัก", detail: "มองว่าทิศทางสำคัญก่อนการกระจายทรัพยากร", scores: score(["strategy", 3], ["quantitative", 1]) },
      { id: "q14-c", label: "ตรวจขั้นตอนและเอกสารให้เป็นไปตามระเบียบ", detail: "มองว่าความโปร่งใสคือฐานสำคัญ", scores: score(["regulation", 3], ["quantitative", 1]) },
      { id: "q14-d", label: "รวมความต้องการจากหลายฝ่ายให้เห็นข้อจำกัดร่วมกัน", detail: "มองว่าทรัพยากรต้องถูกใช้โดยเข้าใจบริบท", scores: score(["coordination", 2], ["publicCommunication", 2]) },
    ],
  },
  {
    id: 15, chapter: "หมุดหมายที่ 15", scene: "บทสนทนาที่เห็นต่าง", question: "เมื่อทีมเห็นต่างกันอย่างมาก คุณมักช่วยให้ไปต่ออย่างไร", helper: "เลือกบทบาทที่คุณอยากทำเอง ไม่ใช่สิ่งที่คนอื่นคาดหวัง",
    options: [
      { id: "q15-a", label: "พากลับไปดูเป้าหมายและหลักฐานร่วมกัน", detail: "เพื่อให้เหตุผลนำความเห็นส่วนตัว", scores: score(["strategy", 2], ["dataDigital", 2]) },
      { id: "q15-b", label: "ฟังแต่ละฝ่ายและหาจุดที่ทำงานร่วมกันได้", detail: "เพื่อให้ทุกคนรู้สึกว่าเสียงของตนมีที่ยืน", scores: score(["publicCommunication", 2], ["coordination", 2]) },
      { id: "q15-c", label: "ย้ำหลักเกณฑ์และขอบเขตที่ต้องยึดร่วมกัน", detail: "เพื่อให้ข้อสรุปไม่หลุดจากความรับผิดชอบ", scores: score(["regulation", 3], ["coordination", 1]) },
      { id: "q15-d", label: "ชวนทดลองทางเลือกเล็ก ๆ แล้วเรียนรู้จากผล", detail: "เพื่อให้ความเห็นต่างกลายเป็นการพัฒนา", scores: score(["fieldDevelopment", 2], ["strategy", 2]) },
    ],
  },
  {
    id: 16, chapter: "หมุดหมายที่ 16", scene: "ความรู้ที่อยากเรียนเพิ่ม", question: "หัวข้อใดน่าจะทำให้คุณอยากลงลึกด้วยตัวเอง", helper: "เลือกจากความอยากรู้อยากเห็น ไม่ต้องคิดเรื่องสาขาที่เรียนมา",
    options: [
      { id: "q16-a", label: "นโยบายสาธารณะ การวางแผน และการประเมินผล", detail: "อยากเข้าใจการเปลี่ยนภาพใหญ่ให้เป็นงานจริง", scores: score(["strategy", 3], ["dataDigital", 1]) },
      { id: "q16-b", label: "กฎหมาย ระเบียบ สิทธิ และความเป็นธรรม", detail: "อยากเข้าใจว่ากติกานำมาใช้กับสถานการณ์จริงอย่างไร", scores: score(["regulation", 3], ["protection", 1]) },
      { id: "q16-c", label: "บัญชี งบประมาณ ความเสี่ยง และการควบคุม", detail: "อยากเข้าใจกลไกที่ทำให้ทรัพยากรใช้ได้อย่างโปร่งใส", scores: score(["quantitative", 3], ["regulation", 1]) },
      { id: "q16-d", label: "ข้อมูล ระบบดิจิทัล และการออกแบบบริการ", detail: "อยากใช้เทคโนโลยีแก้ปัญหาที่คนเจอจริง", scores: score(["dataDigital", 3], ["publicCommunication", 1]) },
    ],
  },
  {
    id: 17, chapter: "หมุดหมายที่ 17", scene: "การทำงานใกล้ประชาชน", question: "คุณอยากเห็นผลลัพธ์แบบใดเกิดขึ้นจากงานของคุณ", helper: "เลือกความเปลี่ยนแปลงที่คุณอยากเห็นบ่อยที่สุด",
    options: [
      { id: "q17-a", label: "ประชาชนเข้าใจข้อมูลและเข้าถึงบริการได้ง่ายขึ้น", detail: "งานสื่อสารที่ดีช่วยลดความสับสน", scores: score(["publicCommunication", 3], ["protection", 1]) },
      { id: "q17-b", label: "กลุ่มหรือชุมชนจัดการปัญหาของตนได้เข้มแข็งขึ้น", detail: "การเปลี่ยนแปลงเกิดจากการทำร่วมกัน", scores: score(["fieldDevelopment", 3], ["publicCommunication", 1]) },
      { id: "q17-c", label: "คนที่อาจถูกมองข้ามได้รับสิทธิและการคุ้มครอง", detail: "บริการภาครัฐมีความเป็นธรรมมากขึ้น", scores: score(["protection", 3], ["regulation", 1]) },
      { id: "q17-d", label: "นโยบายหรือโครงการสร้างผลที่ยั่งยืนในวงกว้าง", detail: "การตัดสินใจวันนี้มีผลดีต่อวันข้างหน้า", scores: score(["strategy", 3], ["fieldDevelopment", 1]) },
    ],
  },
  {
    id: 18, chapter: "หมุดหมายที่ 18", scene: "บทบาทในทีม", question: "เมื่อทำงานเป็นทีม บทบาทใดมักทำให้คุณมีพลัง", helper: "เลือกบทบาทที่คุณยินดีรับซ้ำในหลายโครงการ",
    options: [
      { id: "q18-a", label: "คนสรุปโจทย์และชี้ทางเลือกจากข้อมูล", detail: "ช่วยให้ทีมตัดสินใจได้อย่างมีเหตุผล", scores: score(["strategy", 2], ["dataDigital", 2]) },
      { id: "q18-b", label: "คนคุมแผน ประสาน และพางานข้ามเส้นชัย", detail: "ช่วยให้แต่ละส่วนต่อกันได้จริง", scores: score(["coordination", 3], ["publicCommunication", 1]) },
      { id: "q18-c", label: "คนทบทวนความถูกต้องและชี้จุดเสี่ยง", detail: "ช่วยให้ทีมไม่พลาดเรื่องสำคัญ", scores: score(["regulation", 2], ["quantitative", 2]) },
      { id: "q18-d", label: "คนรับฟังผู้ใช้หรือพื้นที่แล้วสะท้อนกลับสู่ทีม", detail: "ช่วยให้ทีมไม่หลุดจากสิ่งที่คนต้องการจริง", scores: score(["fieldDevelopment", 2], ["protection", 2]) },
    ],
  },
  {
    id: 19, chapter: "หมุดหมายที่ 19", scene: "จุดเปลี่ยนของงาน", question: "สถานการณ์ใดทำให้คุณรู้สึกอยากลงมือแก้มากที่สุด", helper: "เลือกสิ่งที่ทำให้คุณอยากขยับโดยไม่ต้องรอคำสั่ง",
    options: [
      { id: "q19-a", label: "นโยบายดีแต่ยังไม่มีแผนทำงานที่ชัด", detail: "อยากช่วยเปลี่ยนเจตนาให้เป็นการปฏิบัติ", scores: score(["strategy", 3], ["coordination", 1]) },
      { id: "q19-b", label: "คนทำงานต้องใช้เวลามากกับขั้นตอนซ้ำซ้อน", detail: "อยากทำให้ระบบกระชับและใช้ได้จริง", scores: score(["coordination", 2], ["dataDigital", 2]) },
      { id: "q19-c", label: "มีความเสี่ยงที่อาจกระทบสิทธิหรือทรัพยากรสาธารณะ", detail: "อยากให้ปัญหาถูกพบก่อนจะลุกลาม", scores: score(["protection", 2], ["regulation", 2]) },
      { id: "q19-d", label: "ข้อมูลที่สำคัญมีอยู่แต่คนยังใช้ไม่เป็น", detail: "อยากทำให้ข้อมูลกลายเป็นเครื่องมือจริง", scores: score(["dataDigital", 3], ["publicCommunication", 1]) },
    ],
  },
  {
    id: 20, chapter: "หมุดหมายที่ 20", scene: "เส้นทางที่อยากยืนอยู่", question: "คุณอยากอยู่ใกล้กับอะไรในงานประจำมากที่สุด", helper: "เลือกสิ่งที่คุณอยากเห็นและสัมผัสเป็นประจำ",
    options: [
      { id: "q20-a", label: "เป้าหมายของประเทศ โครงการ และตัวชี้วัด", detail: "อยากเห็นภาพเชิงนโยบายที่เชื่อมกัน", scores: score(["strategy", 3], ["quantitative", 1]) },
      { id: "q20-b", label: "เอกสารระบบ คน และการประสานงานหลายฝ่าย", detail: "อยากทำให้ภารกิจเดินได้ลื่นไหล", scores: score(["coordination", 3], ["regulation", 1]) },
      { id: "q20-c", label: "ตัวเลข ข้อมูล ระบบสารสนเทศ หรือรายงาน", detail: "อยากสร้างคำตอบจากรายละเอียดที่ตรวจสอบได้", scores: score(["dataDigital", 2], ["quantitative", 2]) },
      { id: "q20-d", label: "ผู้คน กลุ่มเป้าหมาย หรือพื้นที่ที่เปลี่ยนแปลง", detail: "อยากเห็นว่างานของเรากระทบชีวิตจริงอย่างไร", scores: score(["fieldDevelopment", 2], ["publicCommunication", 2]) },
    ],
  },
  {
    id: 21, chapter: "หมุดหมายที่ 21", scene: "เข็มทิศเล่มสุดท้าย", question: "ประโยคใดใกล้กับเหตุผลที่คุณอยากทำงานราชการที่สุด", helper: "คำตอบสุดท้าย เลือกสิ่งที่คุณเชื่อจริง ๆ",
    options: [
      { id: "q21-a", label: "อยากช่วยให้การตัดสินใจของรัฐมีเหตุผลและมองไกล", detail: "สนใจการวางทิศทางที่ดีขึ้น", scores: score(["strategy", 3], ["dataDigital", 1]) },
      { id: "q21-b", label: "อยากทำให้บริการและระบบงานของรัฐดีขึ้นทุกวัน", detail: "สนใจความเปลี่ยนแปลงที่เกิดจากการจัดการที่ดี", scores: score(["coordination", 2], ["dataDigital", 2]) },
      { id: "q21-c", label: "อยากให้กติกาใช้ได้อย่างถูกต้อง เป็นธรรม และโปร่งใส", detail: "สนใจการคุ้มครองสิทธิและผลประโยชน์สาธารณะ", scores: score(["regulation", 2], ["protection", 2]) },
      { id: "q21-d", label: "อยากทำงานใกล้ผู้คนหรือพื้นที่และเห็นชีวิตดีขึ้น", detail: "สนใจผลของงานที่สัมผัสได้จริง", scores: score(["fieldDevelopment", 2], ["publicCommunication", 2]) },
    ],
  },
];

export const positions: Position[] = [
  { id: "policy", officialCode: "3-1-012", title: "นักวิเคราะห์นโยบายและแผนปฏิบัติการ", family: "วางแผนและขับเคลื่อนภารกิจ", summary: "วิเคราะห์ปัญหา แผน โครงการ ตัวชี้วัด และติดตามผล", difference: "เด่นที่การตั้งโจทย์และมองภาพรวม มากกว่าการคุมงานธุรการรายวัน", subjects: ["publicSocial", "management", "finance"], weights: score(["strategy", 5], ["dataDigital", 3], ["coordination", 2]), compareWith: "general-management" },
  { id: "public-sector-dev", officialCode: "3-1-011", title: "นักพัฒนาระบบราชการปฏิบัติการ", family: "วางแผนและขับเคลื่อนภารกิจ", summary: "ปรับปรุงกระบวนการและบริการภาครัฐให้คล่องตัวขึ้น", difference: "ใกล้นโยบายและแผน แต่เน้นออกแบบระบบงานและการเปลี่ยนแปลงองค์กร", subjects: ["publicSocial", "management", "digital"], weights: score(["strategy", 4], ["coordination", 4], ["dataDigital", 3]), compareWith: "policy" },
  { id: "budget", officialCode: "3-2-003", title: "นักวิเคราะห์งบประมาณปฏิบัติการ", family: "วางแผนและขับเคลื่อนภารกิจ", summary: "วิเคราะห์งบประมาณ ความคุ้มค่า และข้อเสนอเชิงตัวเลข", difference: "ใช้การวิเคราะห์เชิงนโยบายร่วมกับความละเอียดด้านงบประมาณมากกว่านักวิเคราะห์นโยบายและแผน", subjects: ["finance", "publicSocial", "data"], weights: score(["strategy", 4], ["quantitative", 5], ["regulation", 2]), compareWith: "policy" },
  { id: "statistics", officialCode: "3-1-019", title: "นักวิชาการสถิติปฏิบัติการ", family: "วางแผนและขับเคลื่อนภารกิจ", summary: "เก็บ จัดการ วิเคราะห์ และสื่อสารข้อมูลเชิงสถิติ", difference: "เน้นความน่าเชื่อถือของข้อมูลและการวิเคราะห์เชิงปริมาณมากกว่างานพัฒนาระบบดิจิทัล", subjects: ["data", "digital", "finance"], weights: score(["dataDigital", 5], ["quantitative", 4], ["strategy", 3]), compareWith: "computer" },
  { id: "economics", officialCode: "3-2-018", title: "นักวิชาการเศรษฐกิจปฏิบัติการ", family: "วางแผนและขับเคลื่อนภารกิจ", summary: "วิเคราะห์เศรษฐกิจ นโยบาย และข้อมูลเชิงปริมาณ", difference: "ใช้บริบทเศรษฐกิจและตัวเลขเข้มข้นกว่างานนโยบายทั่วไป", subjects: ["finance", "data", "publicSocial"], weights: score(["strategy", 4], ["quantitative", 4], ["dataDigital", 3]), compareWith: "budget" },
  { id: "general-management", officialCode: "3-1-004", title: "นักจัดการงานทั่วไปปฏิบัติการ", family: "บริหารงานให้ระบบเดิน", summary: "ประสานงาน หนังสือราชการ ประชุม และงานสนับสนุนภารกิจ", difference: "เด่นที่ทำให้คน ขั้นตอน และงานประจำเดินต่อกัน มากกว่างานวิเคราะห์เชิงนโยบาย", subjects: ["publicSocial", "management"], weights: score(["coordination", 5], ["regulation", 3], ["publicCommunication", 2]), compareWith: "policy" },
  { id: "hr", officialCode: "3-1-006", title: "นักทรัพยากรบุคคลปฏิบัติการ", family: "บริหารงานให้ระบบเดิน", summary: "สนับสนุนระบบคน การสรรหา การพัฒนา และการประสานบุคลากร", difference: "ใกล้นักจัดการงานทั่วไป แต่มีแกนหลักอยู่ที่ระบบและการพัฒนาคน", subjects: ["management", "publicSocial"], weights: score(["coordination", 4], ["publicCommunication", 3], ["regulation", 2]), compareWith: "general-management" },
  { id: "finance-accounting", officialCode: "3-2-006", title: "นักวิชาการเงินและบัญชีปฏิบัติการ", family: "บริหารงานให้ระบบเดิน", summary: "ดูแลการเงิน การเบิกจ่าย บัญชี และเอกสารการเงิน", difference: "ครอบคลุมกระบวนการเงินทั้งต้นทางและปลายทาง มากกว่างานบัญชีเฉพาะด้าน", subjects: ["finance"], weights: score(["quantitative", 5], ["regulation", 4], ["coordination", 2]), compareWith: "accounting" },
  { id: "accounting", officialCode: "3-2-012", title: "นักวิชาการบัญชีปฏิบัติการ", family: "บริหารงานให้ระบบเดิน", summary: "จัดทำและวิเคราะห์ระบบบัญชีและรายงานทางการเงิน", difference: "ลงลึกการบันทึกและรายงานบัญชีมากกว่านักวิชาการเงินและบัญชี", subjects: ["finance"], weights: score(["quantitative", 5], ["regulation", 3], ["dataDigital", 2]), compareWith: "finance-accounting" },
  { id: "procurement", officialCode: "3-1-016", title: "นักวิชาการพัสดุปฏิบัติการ", family: "บริหารงานให้ระบบเดิน", summary: "จัดซื้อจัดจ้าง สัญญา พัสดุ และการควบคุมกระบวนการ", difference: "เน้นการเดินกระบวนการจัดซื้อจัดจ้างและเอกสารสัญญา", subjects: ["management", "finance", "law"], weights: score(["coordination", 4], ["regulation", 4], ["quantitative", 2]), compareWith: "finance-accounting" },
  { id: "internal-audit", officialCode: "3-2-009", title: "นักวิชาการตรวจสอบภายในปฏิบัติการ", family: "บริหารงานให้ระบบเดิน", summary: "ประเมินความเสี่ยง ตรวจสอบ และเสนอแนวทางควบคุมภายใน", difference: "เน้นค้นหาความเสี่ยงของระบบ มากกว่างานให้ความเห็นด้านกฎหมายโดยตรง", subjects: ["finance", "law", "management"], weights: score(["regulation", 5], ["quantitative", 4], ["strategy", 2]), compareWith: "legal" },
  { id: "legal", officialCode: "3-1-008", title: "นิติกรปฏิบัติการ", family: "สิทธิ ระเบียบ และบริการประชาชน", summary: "ตีความกฎหมาย ระเบียบ ตรวจเอกสาร และให้ความเห็นทางกฎหมาย", difference: "เน้นข้อกฎหมายและการให้ความเห็น มากกว่าการตรวจความเสี่ยงทางระบบ", subjects: ["law"], weights: score(["regulation", 5], ["protection", 3], ["publicCommunication", 2]), compareWith: "internal-audit" },
  { id: "revenue", officialCode: "3-2-021", title: "นักวิชาการสรรพากรปฏิบัติการ", family: "สิทธิ ระเบียบ และบริการประชาชน", summary: "บริการและพิจารณาประเด็นภาษี ตรวจเอกสาร และอธิบายหลักเกณฑ์", difference: "ใช้หลักเกณฑ์ภาษีควบคู่การบริการประชาชนและตัวเลข", subjects: ["finance", "law"], weights: score(["regulation", 4], ["quantitative", 4], ["publicCommunication", 2]), compareWith: "tax" },
  { id: "tax", officialCode: "3-2-015", title: "นักวิชาการภาษีปฏิบัติการ", family: "สิทธิ ระเบียบ และบริการประชาชน", summary: "สนับสนุนงานภาษีและการปฏิบัติตามหลักเกณฑ์", difference: "ใกล้งานสรรพากร แต่ใช้ได้กับภารกิจภาษีและการวิเคราะห์กติกาที่กว้างกว่า", subjects: ["finance", "law"], weights: score(["regulation", 4], ["quantitative", 4], ["strategy", 2]), compareWith: "revenue" },
  { id: "labour", officialCode: "3-8-017", title: "นักวิชาการแรงงานปฏิบัติการ", family: "สิทธิ ระเบียบ และบริการประชาชน", summary: "ให้ข้อมูลสิทธิแรงงาน ประสานการคุ้มครอง และวิเคราะห์ประเด็นแรงงาน", difference: "เชื่อมงานสิทธิและระเบียบกับการสื่อสารและบริการต่อผู้คน", subjects: ["publicSocial", "law"], weights: score(["publicCommunication", 4], ["protection", 4], ["regulation", 3]), compareWith: "social-development" },
  { id: "land", officialCode: "3-8-014", title: "นักวิชาการที่ดินปฏิบัติการ", family: "สิทธิ ระเบียบ และบริการประชาชน", summary: "พิจารณาเอกสารและประเด็นสิทธิในที่ดิน รวมถึงบริการข้อมูลประชาชน", difference: "ใช้ข้อเท็จจริงและสิทธิในที่ดินมากกว่างานนิติกรรมภายในทั่วไป", subjects: ["law", "publicSocial"], weights: score(["regulation", 4], ["protection", 3], ["publicCommunication", 2]), compareWith: "legal" },
  { id: "transport", officialCode: "3-3-006", title: "นักวิชาการขนส่งปฏิบัติการ", family: "สิทธิ ระเบียบ และบริการประชาชน", summary: "สนับสนุนบริการและกำกับระบบขนส่งตามภารกิจของหน่วยงาน", difference: "ผสมงานบริการและกำกับระบบเฉพาะด้านขนส่ง", subjects: ["engineering"], weights: score(["regulation", 3], ["publicCommunication", 3], ["coordination", 2]), compareWith: "engineer" },
  { id: "agriculture", officialCode: "3-4-001", title: "นักวิชาการเกษตรปฏิบัติการ", family: "ส่งเสริมและพัฒนาคนหรือพื้นที่", summary: "ส่งเสริมองค์ความรู้เกษตร วิเคราะห์ปัญหา และทำงานกับพื้นที่", difference: "เน้นองค์ความรู้เกษตรและการใช้ในพื้นที่ มากกว่างานพัฒนากลุ่มหรือสวัสดิการสังคม", subjects: ["agriEnvironment"], weights: score(["fieldDevelopment", 5], ["publicCommunication", 3], ["strategy", 2]), compareWith: "community-development" },
  { id: "cooperative", officialCode: "3-2-022", title: "นักวิชาการสหกรณ์ปฏิบัติการ", family: "ส่งเสริมและพัฒนาคนหรือพื้นที่", summary: "ส่งเสริมหรือกำกับความเข้มแข็งของสหกรณ์และสมาชิก", difference: "ใช้การพัฒนากลุ่มควบคู่ความเข้าใจด้านบัญชีและเศรษฐกิจสหกรณ์", subjects: ["finance", "management", "agriEnvironment"], weights: score(["fieldDevelopment", 4], ["coordination", 3], ["quantitative", 2]), compareWith: "community-development" },
  { id: "community-development", officialCode: "3-8-015", title: "นักวิชาการพัฒนาชุมชนปฏิบัติการ", family: "ส่งเสริมและพัฒนาคนหรือพื้นที่", summary: "ทำงานกับกลุ่ม ชุมชน เครือข่าย และการพัฒนาเศรษฐกิจชุมชน", difference: "เน้นความเข้มแข็งของกลุ่มและเศรษฐกิจชุมชน มากกว่างานช่วยเหลือรายกรณี", subjects: ["publicSocial", "management"], weights: score(["fieldDevelopment", 5], ["publicCommunication", 4], ["coordination", 2]), compareWith: "social-development" },
  { id: "social-development", officialCode: "3-8-008", title: "นักวิชาการพัฒนาสังคมปฏิบัติการ", family: "ส่งเสริมและพัฒนาคนหรือพื้นที่", summary: "พัฒนาคุณภาพชีวิต บริการสังคม และการประสานความช่วยเหลือ", difference: "เน้นสิทธิ กลุ่มเปราะบาง และการเข้าถึงบริการ มากกว่าการรวมกลุ่มพัฒนาเศรษฐกิจชุมชน", subjects: ["publicSocial", "health"], weights: score(["protection", 5], ["publicCommunication", 3], ["fieldDevelopment", 3]), compareWith: "community-development" },
  { id: "skills-development", officialCode: "3-8-016", title: "นักวิชาการพัฒนาฝีมือแรงงานปฏิบัติการ", family: "ส่งเสริมและพัฒนาคนหรือพื้นที่", summary: "สนับสนุนการพัฒนาทักษะอาชีพและผู้รับบริการ", difference: "เน้นการเรียนรู้และทักษะอาชีพมากกว่างานคุ้มครองสิทธิแรงงาน", subjects: ["publicSocial", "management", "engineering"], weights: score(["fieldDevelopment", 4], ["publicCommunication", 3], ["coordination", 3]), compareWith: "labour" },
  { id: "environment", officialCode: "3-8-023", title: "นักวิชาการสิ่งแวดล้อมปฏิบัติการ", family: "กำกับ คุ้มครอง และผลกระทบต่อสาธารณะ", summary: "วิเคราะห์และติดตามผลกระทบต่อสิ่งแวดล้อม รวมถึงงานมาตรการคุ้มครอง", difference: "เน้นผลกระทบของกิจกรรมต่อทรัพยากรและสาธารณะ", subjects: ["agriEnvironment", "science"], weights: score(["protection", 4], ["fieldDevelopment", 3], ["dataDigital", 2]), compareWith: "scientist" },
  { id: "public-health", officialCode: "3-6-015", title: "นักวิชาการสาธารณสุขปฏิบัติการ", family: "กำกับ คุ้มครอง และผลกระทบต่อสาธารณะ", summary: "สนับสนุนงานส่งเสริม ป้องกัน และคุ้มครองสุขภาพประชาชน", difference: "เน้นสุขภาพและการป้องกันโรคในประชาชน มากกว่างานผลกระทบสิ่งแวดล้อม", subjects: ["health"], professionalRequirement: "ตรวจใบอนุญาตหรือคุณสมบัติเฉพาะด้านสุขภาพตามประกาศ", weights: score(["protection", 5], ["fieldDevelopment", 3], ["publicCommunication", 3]), compareWith: "medical-science" },
  { id: "food-drug", officialCode: "3-6-017", title: "นักวิชาการอาหารและยาปฏิบัติการ", family: "กำกับ คุ้มครอง และผลกระทบต่อสาธารณะ", summary: "สนับสนุนมาตรการคุ้มครองผู้บริโภคด้านอาหาร ยา และผลิตภัณฑ์สุขภาพ", difference: "ใช้ความรู้ผลิตภัณฑ์สุขภาพและการกำกับคุ้มครองผู้บริโภคเข้มข้น", subjects: ["health", "science"], professionalRequirement: "ตรวจใบอนุญาตหรือคุณสมบัติเฉพาะด้านสุขภาพตามประกาศ", weights: score(["protection", 4], ["regulation", 3], ["fieldDevelopment", 2]), compareWith: "public-health" },
  { id: "industry", officialCode: "3-2-023", title: "นักวิชาการอุตสาหกรรมปฏิบัติการ", family: "กำกับ คุ้มครอง และผลกระทบต่อสาธารณะ", summary: "สนับสนุนหรือกำกับภารกิจด้านอุตสาหกรรม มาตรฐาน และผู้ประกอบการ", difference: "เชื่อมภารกิจอุตสาหกรรม มาตรฐาน และการส่งเสริมผู้ประกอบการ", subjects: ["engineering"], weights: score(["regulation", 3], ["strategy", 2], ["fieldDevelopment", 2]), compareWith: "engineer" },
  { id: "computer", officialCode: "3-1-013", title: "นักวิชาการคอมพิวเตอร์ปฏิบัติการ", family: "ข้อมูล ดิจิทัล และการสื่อสารสาธารณะ", summary: "วิเคราะห์ พัฒนา หรือดูแลระบบคอมพิวเตอร์ตามภารกิจหน่วยงาน", difference: "เน้นระบบและการแก้ปัญหาเชิงเทคนิคมากกว่างานสถิติหรือการสื่อสารข้อมูล", subjects: ["digital"], weights: score(["dataDigital", 5], ["coordination", 2], ["strategy", 2]), compareWith: "statistics" },
  { id: "it", officialCode: "3-1-015", title: "นักวิชาการเทคโนโลยีสารสนเทศปฏิบัติการ", family: "ข้อมูล ดิจิทัล และการสื่อสารสาธารณะ", summary: "วางหรือสนับสนุนการใช้เทคโนโลยีสารสนเทศและบริการดิจิทัล", difference: "เน้นการนำเทคโนโลยีไปใช้กับภารกิจและบริการของหน่วยงาน", subjects: ["digital"], weights: score(["dataDigital", 5], ["strategy", 2], ["publicCommunication", 2]), compareWith: "computer" },
  { id: "public-relations", officialCode: "3-3-005", title: "นักประชาสัมพันธ์ปฏิบัติการ", family: "ข้อมูล ดิจิทัล และการสื่อสารสาธารณะ", summary: "สื่อสารข้อมูลภารกิจรัฐ ผลิตเนื้อหา และประสานสื่อหรือประชาชน", difference: "เน้นสารและความเข้าใจของกลุ่มเป้าหมาย มากกว่างานเผยแพร่เชิงถ่ายทอดองค์ความรู้", subjects: ["communication", "publicSocial"], weights: score(["publicCommunication", 5], ["coordination", 3], ["dataDigital", 2]), compareWith: "publishing" },
  { id: "publishing", officialCode: "3-3-007", title: "นักวิชาการเผยแพร่ปฏิบัติการ", family: "ข้อมูล ดิจิทัล และการสื่อสารสาธารณะ", summary: "ถ่ายทอดความรู้ จัดสื่อหรือกิจกรรมเผยแพร่ให้กลุ่มเป้าหมาย", difference: "เน้นการทำให้คนเรียนรู้และนำไปใช้ มากกว่างานสื่อสารภาพลักษณ์หรือสื่อมวลชน", subjects: ["communication", "publicSocial"], weights: score(["publicCommunication", 4], ["fieldDevelopment", 2], ["coordination", 2]), compareWith: "public-relations" },
  { id: "engineer", officialCode: "3-7-015", title: "วิศวกรปฏิบัติการ", family: "วิศวกรรมและโครงสร้างพื้นฐาน", summary: "วิเคราะห์ ออกแบบ ควบคุม หรือสนับสนุนงานวิศวกรรมตามภารกิจหน่วยงาน", difference: "ใช้พื้นฐานวิศวกรรมเพื่อแก้ปัญหาทางเทคนิค มากกว่างานวิเคราะห์นโยบายทั่วไป", subjects: ["engineering"], professionalRequirement: "ตรวจสาขาวิศวกรรมเฉพาะทางและใบอนุญาตประกอบวิชาชีพเมื่อประกาศกำหนด", weights: score(["dataDigital", 4], ["regulation", 3], ["coordination", 2]), compareWith: "civil-engineer" },
  { id: "civil-engineer", officialCode: "3-7-022", title: "วิศวกรโยธาปฏิบัติการ", family: "วิศวกรรมและโครงสร้างพื้นฐาน", summary: "สนับสนุนงานโยธา โครงสร้าง และการควบคุมงานตามภารกิจหน่วยงาน", difference: "เน้นโครงสร้างและงานภาคสนามโยธามากกว่าวิศวกรรมภาพรวม", subjects: ["engineering"], professionalRequirement: "ตรวจสาขาวิศวกรรมโยธาและใบอนุญาตประกอบวิชาชีพเมื่อประกาศกำหนด", weights: score(["fieldDevelopment", 4], ["regulation", 3], ["dataDigital", 2]), compareWith: "engineer" },
  { id: "architect", officialCode: "3-7-028", title: "สถาปนิกปฏิบัติการ", family: "สถาปัตยกรรมและผังเมือง", summary: "วิเคราะห์ ออกแบบ หรือควบคุมงานสถาปัตยกรรมตามภารกิจหน่วยงาน", difference: "เน้นการออกแบบพื้นที่และอาคาร มากกว่างานวิเคราะห์ผังเมืองเชิงนโยบาย", subjects: ["architecture"], professionalRequirement: "ตรวจสาขาสถาปัตยกรรมและใบอนุญาตประกอบวิชาชีพเมื่อประกาศกำหนด", weights: score(["strategy", 3], ["fieldDevelopment", 3], ["coordination", 2]), compareWith: "urban-planner" },
  { id: "urban-planner", officialCode: "3-8-001", title: "นักผังเมืองปฏิบัติการ", family: "สถาปัตยกรรมและผังเมือง", summary: "วิเคราะห์และวางแผนการใช้พื้นที่หรือการพัฒนาเมืองตามภารกิจหน่วยงาน", difference: "เน้นระบบพื้นที่และการพัฒนาเมืองมากกว่างานออกแบบอาคารรายโครงการ", subjects: ["architecture"], weights: score(["strategy", 4], ["fieldDevelopment", 3], ["regulation", 2]), compareWith: "architect" },
  { id: "scientist", officialCode: "3-5-010", title: "นักวิทยาศาสตร์ปฏิบัติการ", family: "วิทยาศาสตร์และการคุ้มครองสาธารณะ", summary: "วิเคราะห์ ทดสอบ หรือประยุกต์ความรู้วิทยาศาสตร์ตามภารกิจหน่วยงาน", difference: "เน้นกระบวนการและหลักฐานทางวิทยาศาสตร์มากกว่างานสิ่งแวดล้อมเชิงพื้นที่", subjects: ["science"], weights: score(["dataDigital", 4], ["regulation", 2], ["protection", 2]), compareWith: "environment" },
  { id: "medical-science", officialCode: "3-6-018", title: "นักวิทยาศาสตร์การแพทย์ปฏิบัติการ", family: "วิทยาศาสตร์และสุขภาพ", summary: "สนับสนุนงานวิทยาศาสตร์การแพทย์และการคุ้มครองสุขภาพตามภารกิจหน่วยงาน", difference: "เน้นความรู้วิทยาศาสตร์การแพทย์และงานห้องปฏิบัติการมากกว่าสาธารณสุขเชิงพื้นที่", subjects: ["health", "science"], professionalRequirement: "ตรวจคุณวุฒิและเงื่อนไขวิชาชีพเฉพาะตามประกาศ", weights: score(["dataDigital", 4], ["protection", 3], ["regulation", 2]), compareWith: "public-health" },
];

const magnitude = (vector: ScoreVector) => Math.sqrt(Object.values(vector).reduce((sum, value) => sum + value * value, 0));
const dotProduct = (left: ScoreVector, right: ScoreVector) => (Object.keys(left) as Dimension[]).reduce((sum, key) => sum + left[key] * right[key], 0);

export const rankPositions = (userScores: ScoreVector, subject: SubjectGroup) => {
  const userMagnitude = magnitude(userScores) || 1;
  const eligiblePositions = subject === "unsure" ? positions : positions.filter((position) => position.subjects.includes(subject));
  return eligiblePositions
    .map((position) => {
      const similarity = dotProduct(userScores, position.weights) / (userMagnitude * magnitude(position.weights));
      return { ...position, match: Math.min(99, Math.round(similarity * 100)) };
    })
    .sort((left, right) => right.match - left.match);
};
