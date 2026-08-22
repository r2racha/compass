/**
 * Style reminder — สมุดบันทึกนักเดินทาง: Japanese colored-pencil storybook,
 * ivory paper, sage trail, asymmetric composition, gentle self-discovery.
 */
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronLeft,
  Compass,
  Download,
  HeartHandshake,
  Info,
  MapPin,
  PenLine,
  RotateCcw,
  Scale,
  Share2,
  Sparkles,
} from "lucide-react";
import { useMemo, useState, type CSSProperties } from "react";
import {
  dimensionLabels,
  positions,
  questions,
  rankPositions,
  subjectGroups,
  type QuizOption,
  type ScoreVector,
  type SubjectGroup,
  zeroScores,
} from "@/data/quiz";
import { catalogGroups, scopedAcademicRoles, type CatalogGroupId } from "@/data/ocscCatalog";

const IS_GITHUB_PAGES = import.meta.env.VITE_GITHUB_PAGES === "true";
const pageAsset = (fileName: string, manusPath: string) => IS_GITHUB_PAGES ? `${import.meta.env.BASE_URL}images/${fileName}` : manusPath;

const ASSETS = {
  logo: pageAsset("compass-mark.png", "/manus-storage/compass-mark_81d0b870.png"),
  lineQr: pageAsset("line-contact-qr.png", "/manus-storage/line-contact-qr_eb89b25f.png"),
  welcome: pageAsset("avatar-welcome.png", "/manus-storage/avatar-welcome_4e263376.png"),
  pointing: pageAsset("avatar-pointing.png", "/manus-storage/avatar-pointing_22490f0e.png"),
  explain: pageAsset("avatar-explain.png", "/manus-storage/avatar-explain_991915a9.png"),
  greeting: pageAsset("avatar-greeting.png", "/manus-storage/avatar-greeting_0f2839e0.png"),
  celebrate: pageAsset("avatar-celebrate.png", "/manus-storage/avatar-celebrate_cbcc0af4.png"),
} as const;

const SCENE_ASSETS = {
  hero: pageAsset("hero-civic-journey.png", "/manus-storage/hero-civic-journey_d41c3619.png"),
  question: pageAsset("question-station-paper.png", "/manus-storage/question-station-paper_d7a081da.png"),
  result: pageAsset("results-compass-landscape.png", "/manus-storage/results-compass-landscape_466cf540.png"),
} as const;

const sceneStyle = (asset: string) => ({ "--scene-art": `url("${asset}")` }) as CSSProperties;

type Stage = "welcome" | "ready" | "quiz" | "result";

const subtractScores = (current: ScoreVector, option: QuizOption): ScoreVector => {
  const next = { ...current };
  (Object.keys(option.scores) as Array<keyof ScoreVector>).forEach((key) => {
    next[key] -= option.scores[key];
  });
  return next;
};

export default function Home() {
  const [stage, setStage] = useState<Stage>("welcome");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [scores, setScores] = useState<ScoreVector>(zeroScores);
  const [subject, setSubject] = useState<SubjectGroup>("unsure");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [catalogQuery, setCatalogQuery] = useState("");
  const [catalogGroup, setCatalogGroup] = useState<CatalogGroupId | "all">("all");

  const currentQuestion = questions[questionIndex];
  const rankedPositions = useMemo(() => rankPositions(scores, subject), [scores, subject]);
  const primaryPosition = rankedPositions[0];
  const comparisonPosition = positions.find((position) => position.id === primaryPosition?.compareWith) ?? rankedPositions[1];
  const selectedSubject = subjectGroups.find((group) => group.id === subject) ?? subjectGroups.at(-1)!;
  const topDimensions = useMemo(
    () => (Object.entries(scores) as Array<[keyof ScoreVector, number]>).sort((left, right) => right[1] - left[1]).slice(0, 3),
    [scores],
  );
  const catalogRoles = useMemo(() => {
    const normalizedQuery = catalogQuery.trim().toLocaleLowerCase("th-TH");
    return scopedAcademicRoles.filter((role) => {
      const matchesGroup = catalogGroup === "all" || role.groupId === catalogGroup;
      const matchesQuery = !normalizedQuery || role.title.toLocaleLowerCase("th-TH").includes(normalizedQuery);
      return matchesGroup && matchesQuery;
    });
  }, [catalogGroup, catalogQuery]);
  const progress = stage === "result" ? 100 : (questionIndex / questions.length) * 100;

  const startQuiz = () => {
    setStage("quiz");
    setQuestionIndex(0);
  };

  const chooseAnswer = (option: QuizOption) => {
    if (selectedId) return;
    setSelectedId(option.id);

    window.setTimeout(() => {
      setAnswers((current) => [...current, option]);
      setScores((current) => {
        const next = { ...current };
        (Object.keys(option.scores) as Array<keyof ScoreVector>).forEach((key) => {
          next[key] += option.scores[key];
        });
        return next;
      });
      if (questionIndex === questions.length - 1) {
        setStage("result");
      } else {
        setQuestionIndex((current) => current + 1);
      }
      setSelectedId(null);
    }, 300);
  };

  const goBack = () => {
    if (questionIndex === 0) {
      setStage("ready");
      return;
    }
    const previousAnswer = answers.at(-1);
    if (!previousAnswer) return;
    setAnswers((current) => current.slice(0, -1));
    setScores((current) => subtractScores(current, previousAnswer));
    setQuestionIndex((current) => Math.max(0, current - 1));
  };

  const restart = () => {
    setStage("welcome");
    setQuestionIndex(0);
    setAnswers([]);
    setScores(zeroScores());
    setSubject("unsure");
    setSelectedId(null);
    setCopied(false);
  };

  const copySummary = async () => {
    if (!primaryPosition) return;
    const summary = `เข็มทิศราชการของฉัน: ${primaryPosition.title}\nงานที่น่าลองสำรวจ: ${primaryPosition.summary}\nผลลัพธ์นี้เป็นแนวทางสำรวจงาน ไม่ใช่การรับรองคุณสมบัติสมัครงาน`;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="journey-shell">
      <header className="site-header">
        <button className="brand-lockup" onClick={restart} aria-label="กลับสู่หน้าแรก">
          <span className="brand-mark"><img src={ASSETS.logo} alt="" /></span>
          <span className="brand-wordmark">
            <strong>เข็มทิศข้าราชการ ก.พ.</strong>
            <small>ค้นหาตำแหน่งที่น่าลองในแบบของคุณ</small>
          </span>
        </button>
        <div className="header-note"><PenLine size={16} strokeWidth={1.8} /><span>21 คำถามแบบสถานการณ์</span></div>
      </header>

      <main>
        <AnimatePresence mode="wait">
          {stage === "welcome" && (
            <motion.section className="hero-scene" key="welcome" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.34, ease: [0.23, 1, 0.32, 1] }}>
              <div className="hero-painting" aria-hidden="true" style={sceneStyle(SCENE_ASSETS.hero)} />
              <span className="notebook-seam" aria-hidden="true" />
              <div className="hero-route-system" aria-hidden="true">
                <svg viewBox="0 0 1200 650" preserveAspectRatio="none"><path d="M 10 566 C 165 596, 260 570, 350 510 S 486 412, 623 428 S 782 384, 773 286 S 948 179, 1185 260" /></svg>
                <span className="route-marker route-marker-start">01</span><span className="route-marker route-marker-middle">02</span><span className="route-marker route-marker-end"><Compass size={15} /></span>
                <span className="route-note route-note-start">เริ่มจากวิธีทำงานของคุณ</span><span className="route-note route-note-end">ตำแหน่งที่น่าลอง</span>
              </div>
              <div className="hero-washi hero-washi-left" aria-hidden="true">สมุดเทียบตำแหน่ง</div><div className="hero-washi hero-washi-right" aria-hidden="true">ระดับปฏิบัติการ</div>
              <div className="hero-copy">
                <div className="eyebrow"><Sparkles size={15} /> สำหรับผู้สนใจตำแหน่งประเภทวิชาการ</div>
                <h1>ตำแหน่งไหน<br /><em>เหมาะกับวิธีทำงานของคุณ?</em></h1>
                <p className="hero-description">สำรวจตำแหน่งราชการระดับปฏิบัติการจากสถานการณ์ทำงานจริง แล้วเปรียบเทียบทางเลือกที่คนมักลังเลระหว่างกันอย่างเป็นรูปธรรม</p>
                <Button className="journey-button" onClick={() => setStage("ready")}>เปิดแผนที่ตำแหน่ง <ArrowRight size={19} /></Button>
                <p className="reassurance"><HeartHandshake size={16} /> ใช้เพื่อสำรวจความถนัด ไม่ใช่การรับรองคุณสมบัติสมัครงาน</p>
              </div>
              <div className="hero-guide"><div className="speech-bubble"><small>ผู้พาเดินทาง</small>เราจะค่อย ๆ ดูว่า<br />งานแบบไหนเหมาะกับคุณ</div><img src={ASSETS.greeting} alt="อวตารข้าราชการทักทาย" /></div>
              <div className="route-start"><span />เริ่มออกเดิน</div>
            </motion.section>
          )}

          {stage === "ready" && (
            <motion.section className="ready-scene expanded-ready" key="ready" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
              <div className="ready-route-system" aria-hidden="true"><span>01</span><i /><span>02</span><i /><span>03</span></div>
              <div className="ready-guide"><img src={ASSETS.welcome} alt="อวตารเชิญชวนเริ่มแบบทดสอบ" /></div>
              <div className="ready-note tape-note">
                <div className="eyebrow"><MapPin size={15} /> ก่อนออกเดิน</div>
                <h2>เลือกกลุ่มสาขาวิชา<br />ถ้าอยากให้ช่วยเรียงผล</h2>
                <p>ข้ามได้เลยนะครับ คำตอบนี้ช่วยเพียงบอกความเกี่ยวข้องเบื้องต้นของตำแหน่ง ไม่ใช้ตัดสิทธิ์ และต้องตรวจคุณสมบัติจากประกาศรับสมัครจริงเสมอ</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="catalog-trigger"><BookOpen size={17} /><span>ดูสารบัญสายงาน ก.พ.</span><b>{scopedAcademicRoles.length} สายงาน</b></button>
                  </DialogTrigger>
                  <DialogContent className="ocsc-catalog-dialog">
                    <DialogHeader>
                      <p className="catalog-source">สำนักงาน ก.พ. · มาตรฐานกำหนดตำแหน่งประเภทวิชาการ</p>
                      <DialogTitle>สารบัญสายงานที่ใช้สำรวจต่อได้</DialogTitle>
                      <DialogDescription>แสดง {scopedAcademicRoles.length} สายงานภายในขอบเขตเว็บไซต์ โดยตัดสายการศึกษาและงานส่งเสริมการปกครองท้องถิ่นตามขอบเขตที่เลือกไว้ ผลแบบทดสอบยังแนะนำเฉพาะตำแหน่งที่มีโมเดลลักษณะงานครบถ้วน</DialogDescription>
                    </DialogHeader>
                    <div className="catalog-controls">
                      <input value={catalogQuery} onChange={(event) => setCatalogQuery(event.target.value)} placeholder="ค้นหาชื่อสายงาน เช่น การเงิน, เกษตร, วิศวกรรม" aria-label="ค้นหาสายงาน" />
                      <div className="catalog-filter-list" role="group" aria-label="กรองกลุ่มสายงาน">
                        <button className={catalogGroup === "all" ? "is-active" : ""} onClick={() => setCatalogGroup("all")}>ทั้งหมด</button>
                        {catalogGroups.map((group) => <button key={group.id} className={catalogGroup === group.id ? "is-active" : ""} onClick={() => setCatalogGroup(group.id)}>{group.shortLabel}</button>)}
                      </div>
                    </div>
                    <div className="catalog-result-summary">พบ {catalogRoles.length} สายงาน</div>
                    <div className="catalog-list" aria-live="polite">
                      {catalogRoles.map((role) => <span key={role.code}>{role.title}</span>)}
                    </div>
                    <a className="catalog-reference" href="https://knowledge.ocsc.go.th/th/standard-position/all/" target="_blank" rel="noreferrer">ตรวจสอบมาตรฐานกำหนดตำแหน่งและคุณสมบัติจากสำนักงาน ก.พ. ↗</a>
                  </DialogContent>
                </Dialog>
                <div className="subject-grid" role="group" aria-label="กลุ่มสาขาวิชา">
                  {subjectGroups.map((group) => (
                    <button key={group.id} className={`subject-option ${subject === group.id ? "is-selected" : ""}`} onClick={() => setSubject(group.id)}>
                      {subject === group.id && <Check size={13} />}<span>{group.label}</span>
                    </button>
                  ))}
                </div>
                <div className="readiness-grid compact-grid"><div><b>21</b><span>คำถามสถานการณ์</span></div><div><b>28</b><span>ตำแหน่งแกนกลาง</span></div><div><b>3</b><span>ผลลัพธ์ที่น่าลอง</span></div></div>
                <div className="ready-actions"><Button variant="ghost" className="quiet-button" onClick={() => setStage("welcome")}><ChevronLeft size={18} /> กลับ</Button><Button className="journey-button" onClick={startQuiz}>เริ่มสำรวจตัวเอง <ArrowRight size={19} /></Button></div>
              </div>
            </motion.section>
          )}

          {stage === "quiz" && currentQuestion && (
            <motion.section className="quiz-scene" key={`question-${currentQuestion.id}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
              <div className="quiz-background" aria-hidden="true" style={sceneStyle(SCENE_ASSETS.question)} />
              <div className="quiz-topbar"><Button variant="ghost" className="quiet-button compact" onClick={goBack}><ChevronLeft size={18} /> ย้อนกลับ</Button><div className="progress-cluster"><div className="progress-copy"><span>การเดินทาง</span><b>{questionIndex + 1} / {questions.length}</b></div><div className="pencil-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div></div></div>
              <div className="question-layout">
                <aside className="question-guide"><img src={questionIndex % 2 === 0 ? ASSETS.pointing : ASSETS.explain} alt="อวตารกำลังแนะนำคำถาม" /><p>ลองตอบจากงานที่<br />อยากทำจริงนะครับ</p></aside>
                <article className="question-paper"><div className="paper-header"><span>{currentQuestion.chapter}</span><span>{currentQuestion.scene}</span></div><div className="question-icon"><Compass size={25} /></div><h2>{currentQuestion.question}</h2><p className="question-helper">{currentQuestion.helper}</p><div className="answer-list">{currentQuestion.options.map((option, index) => <button key={option.id} className={`answer-card ${selectedId === option.id ? "is-selected" : ""}`} onClick={() => chooseAnswer(option)} disabled={Boolean(selectedId)}><span className="answer-number">0{index + 1}</span><span className="answer-copy"><b>{option.label}</b><small>{option.detail}</small></span><span className="answer-arrow"><ArrowRight size={18} /></span></button>)}</div></article>
              </div>
              <div className="quiz-route-label"><span /> เลือกทางที่รู้สึกเป็นธรรมชาติ</div>
            </motion.section>
          )}

          {stage === "result" && primaryPosition && comparisonPosition && (
            <motion.section className="result-scene position-result" key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}>
              <div className="result-landscape" aria-hidden="true" style={sceneStyle(SCENE_ASSETS.result)} />
              <div className="result-header"><div className="eyebrow"><Sparkles size={15} /> บทสุดท้าย — ตำแหน่งที่น่าลอง</div><h2>เห็นร่องรอยของคุณ<br /><em>บนแผนที่ตำแหน่ง</em></h2></div>
              <div className="result-grid">
                <article className="result-card position-card"><div className="result-tag"><Compass size={17} /> อันดับ 1 จากคำตอบที่คุณเลือก</div><p className="archetype">{primaryPosition.family}</p><h3>{primaryPosition.title}</h3><p className="profile-subtitle">{primaryPosition.summary}</p><div className="trait-row"><span>{selectedSubject.shortLabel}</span><span>ความสอดคล้อง {primaryPosition.match}%</span></div><div className="reflection-card"><PenLine size={19} /><p>{primaryPosition.difference}</p></div></article>
                <aside className="result-side-note tape-note"><h4>คุณน่าจะมีพลัง<br />กับงานแบบนี้</h4><ul>{topDimensions.map(([dimension]) => <li key={dimension}><Check size={16} />{dimensionLabels[dimension]}</li>)}</ul><p className="side-note-foot">สาขาที่เลือกช่วยเรียงความเกี่ยวข้องของตำแหน่งเท่านั้น ไม่ได้ยืนยันคุณสมบัติในการสมัคร</p></aside>
              </div>
              <section className="comparison-card"><div className="comparison-heading"><Scale size={20} /><span>ถ้าลังเลระหว่างสองตำแหน่ง</span></div><div className="comparison-pair"><article><p>ตำแหน่งที่คุณได้อันดับ 1</p><h4>{primaryPosition.title}</h4><span>{primaryPosition.difference}</span></article><div className="versus-mark">เทียบกับ</div><article><p>ตำแหน่งที่ใกล้เคียง</p><h4>{comparisonPosition.title}</h4><span>{comparisonPosition.difference}</span></article></div></section>
              <section className="all-paths position-ranking" aria-label="ตำแหน่งที่น่าลองสำรวจ"><div className="all-paths-heading"><span>3 ตำแหน่งที่น่าลองสำรวจต่อ</span><p>เรียงจากความสอดคล้องของรูปแบบงาน</p></div><div className="role-ranking-list">{rankedPositions.slice(0, 3).map((position, index) => <article className="role-rank" key={position.id}><span className="path-order">0{index + 1}</span><div><b>{position.title}</b><small>{position.family}</small></div><strong>{position.match}%</strong></article>)}</div></section>
              <div className="result-footer"><div className="footer-guide"><img src={ASSETS.celebrate} alt="อวตารร่วมแสดงความยินดี" /><p>ใช้ผลนี้เป็นจุดตั้งต้น<br />แล้วค่อยไปอ่านประกาศจริงครับ</p></div><div className="result-actions"><Button variant="ghost" className="quiet-button" onClick={restart}><RotateCcw size={18} /> ลองตอบอีกครั้ง</Button><Button className="journey-button" onClick={copySummary}>{copied ? <Check size={18} /> : <Share2 size={18} />}{copied ? "คัดลอกแล้ว" : "คัดลอกผลลัพธ์"}</Button></div></div>
              <div className="result-route-system" aria-hidden="true"><span>01</span><i /><span><Compass size={13} /></span><i /><span>✓</span></div>
              <p className="disclaimer"><Info size={12} /> ผลลัพธ์นี้เป็นการสำรวจความสอดคล้องของรูปแบบงานกับตำแหน่งข้าราชการประเภทวิชาการระดับปฏิบัติการ ไม่ใช่การรับรองคุณสมบัติหรือการคาดการณ์ผลสอบ โปรดตรวจสาขาวิชา คุณสมบัติเฉพาะ และรายละเอียดจากประกาศรับสมัครของหน่วยงานจริงเสมอ โดยดูมาตรฐานกำหนดตำแหน่งจาก <a href="https://knowledge.ocsc.go.th/th/standard-position/officer/" target="_blank" rel="noreferrer">สำนักงาน ก.พ.</a></p>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
      <footer className="site-footer">
        {(stage === "welcome" || stage === "result") && (
          <section className="contact-footer-card" aria-label="ช่องทางติดต่อ Road to Kharachakar">
            <div className="contact-footer-copy">
              <span className="contact-kicker">เพจ ทางมุ่งสู่ข้าราชการ Road to Kharachakar</span>
              <h2>สนใจ “ชีทสรุปสอบราชการ<br />แบบเข้าใจง่าย”</h2>
              <p className="contact-line-id">ติดต่อ LINE ID <strong>@891kiemx</strong></p>
            </div>
            <div className="contact-qr-wrap">
              <img src={ASSETS.lineQr} alt="QR Code สำหรับเพิ่มเพื่อน LINE ID @891kiemx" />
              <a className="qr-download" href={ASSETS.lineQr} download="QR-Line-891kiemx.png"><Download size={15} /> ดาวน์โหลด QR Code</a>
            </div>
          </section>
        )}
        <div className="footer-signoff"><span className="footer-line" /><p>เข็มทิศราชการ <i>—</i> ค่อย ๆ รู้จักวิธีทำงานของตัวเอง แล้วค่อยเลือกทางที่อยากไป</p><span className="footer-line" /></div>
      </footer>
    </div>
  );
}
