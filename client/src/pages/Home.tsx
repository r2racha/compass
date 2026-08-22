/**
 * Style reminder — สมุดบันทึกนักเดินทาง: Japanese colored-pencil storybook,
 * ivory paper, sage trail, asymmetric composition, gentle self-discovery.
 * This page frames “สายไหนเหมาะกับคุณ” as a playful exploration, never an eligibility assessment.
 */
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import QRCode from "qrcode";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  Compass,
  Copy,
  Download,
  HeartHandshake,
  Info,
  MapPin,
  PenLine,
  RotateCcw,
  Share2,
  Sparkles,
} from "lucide-react";
import { useMemo, useState, type CSSProperties } from "react";
import {
  dimensionLabels,
  questions,
  rankWorkProfiles,
  type QuizOption,
  type ScoreVector,
  type WorkProfile,
  zeroScores,
} from "@/data/quiz";

const PLAY_URL = "https://r2racha.github.io/compass/";

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
  planner: pageAsset("avatar-planner.png", "/manus-storage/avatar-planner_a95835dd.png"),
  operations: pageAsset("avatar-operations.png", "/manus-storage/avatar-operations_af44dda8.png"),
  analyst: pageAsset("avatar-analyst.png", "/manus-storage/avatar-analyst_bb718191.png"),
  digital: pageAsset("avatar-digital.png", "/manus-storage/avatar-digital_88535d6f.png"),
  communicator: pageAsset("avatar-communicator.png", "/manus-storage/avatar-communicator_dc35cc16.png"),
  field: pageAsset("avatar-field.png", "/manus-storage/avatar-field_74b01597.png"),
  governance: pageAsset("avatar-governance.png", "/manus-storage/avatar-governance_1d37cc45.png"),
  community: pageAsset("avatar-community.png", "/manus-storage/avatar-community_2043e629.png"),
} as const;

const SCENE_ASSETS = {
  hero: pageAsset("hero-civic-journey.png", "/manus-storage/hero-civic-journey_d41c3619.png"),
  question: pageAsset("question-station-paper.png", "/manus-storage/question-station-paper_d7a081da.png"),
  result: pageAsset("results-compass-landscape.png", "/manus-storage/results-compass-landscape_466cf540.png"),
} as const;

const sceneStyle = (asset: string) => ({ "--scene-art": `url("${asset}")` }) as CSSProperties;

type Stage = "welcome" | "ready" | "quiz" | "result";
type ShareState = "idle" | "copied" | "shared" | "downloading";

const subtractScores = (current: ScoreVector, option: QuizOption): ScoreVector => {
  const next = { ...current };
  (Object.keys(option.scores) as Array<keyof ScoreVector>).forEach((key) => {
    next[key] -= option.scores[key];
  });
  return next;
};

const wrapCanvasText = (context: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  words.forEach((word) => {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  });
  if (line) lines.push(line);
  return lines;
};

const loadImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => {
  const image = new Image();
  image.onload = () => resolve(image);
  image.onerror = reject;
  image.src = src;
});

export default function Home() {
  const [stage, setStage] = useState<Stage>("welcome");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizOption[]>([]);
  const [scores, setScores] = useState<ScoreVector>(zeroScores);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [shareState, setShareState] = useState<ShareState>("idle");

  const currentQuestion = questions[questionIndex];
  const rankedProfiles = useMemo(() => rankWorkProfiles(scores), [scores]);
  const primaryProfile = rankedProfiles[0];
  const closeProfiles = useMemo(() => {
    if (!primaryProfile) return [];
    return rankedProfiles.filter((profile) => primaryProfile.score - profile.score <= 5).slice(0, 3);
  }, [primaryProfile, rankedProfiles]);
  const isBlendedProfile = closeProfiles.length > 1;
  const topDimensions = useMemo(
    () => (Object.entries(scores) as Array<[keyof ScoreVector, number]>).sort((left, right) => right[1] - left[1]).slice(0, 3),
    [scores],
  );
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
      if (questionIndex === questions.length - 1) setStage("result");
      else setQuestionIndex((current) => current + 1);
      setSelectedId(null);
    }, 260);
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
    setSelectedId(null);
    setShareState("idle");
  };

  const shareCopy = (profile: WorkProfile) => `ฉันได้ “${profile.title}” จากแบบทดสอบสายไหนเหมาะกับคุณ\n${profile.nickname}\nมาเล่นด้วยกัน: ${PLAY_URL}`;

  const createShareCard = async (profile: WorkProfile): Promise<Blob> => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("ไม่สามารถสร้างการ์ดได้");

    context.fillStyle = "#fffaf1";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = profile.accent;
    context.globalAlpha = 0.1;
    context.beginPath();
    context.arc(940, 130, 260, 0, Math.PI * 2);
    context.fill();
    context.beginPath();
    context.arc(100, 1230, 320, 0, Math.PI * 2);
    context.fill();
    context.globalAlpha = 1;

    context.strokeStyle = "#d3c5ac";
    context.lineWidth = 4;
    context.setLineDash([12, 12]);
    context.beginPath();
    context.moveTo(92, 172);
    context.bezierCurveTo(330, 95, 508, 245, 695, 180);
    context.bezierCurveTo(855, 125, 900, 286, 1010, 240);
    context.stroke();
    context.setLineDash([]);

    context.fillStyle = "#567065";
    context.font = "600 32px Mali, sans-serif";
    context.fillText("เข็มทิศข้าราชการ", 88, 108);
    context.fillStyle = "#283d37";
    context.font = "700 60px Mali, sans-serif";
    context.fillText("สายไหนเหมาะกับคุณ", 88, 285);
    context.fillStyle = "#7f6b58";
    context.font = "500 30px Mali, sans-serif";
    context.fillText("ผลลัพธ์จากแบบทดสอบสนุก ๆ", 92, 335);

    try {
      const avatar = await loadImage(ASSETS[profile.avatarKey]);
      context.drawImage(avatar, 574, 300, 420, 560);
    } catch {
      context.fillStyle = profile.accent;
      context.globalAlpha = 0.2;
      context.beginPath();
      context.arc(790, 560, 210, 0, Math.PI * 2);
      context.fill();
      context.globalAlpha = 1;
    }

    context.fillStyle = profile.accent;
    context.fillRect(88, 485, 54, 8);
    context.fillStyle = "#283d37";
    context.font = "700 72px Mali, sans-serif";
    context.fillText(profile.title, 88, 590);
    context.fillStyle = "#55625c";
    context.font = "500 34px Mali, sans-serif";
    const summaryLines = wrapCanvasText(context, profile.summary, 500);
    summaryLines.slice(0, 4).forEach((line, index) => context.fillText(line, 90, 668 + index * 48));

    context.fillStyle = "#f2e8d7";
    context.fillRect(88, 900, 905, 210);
    context.fillStyle = "#6b5949";
    context.font = "600 28px Mali, sans-serif";
    context.fillText("สายงานที่น่าลองสำรวจ", 126, 960);
    context.fillStyle = "#2d423a";
    context.font = "700 34px Mali, sans-serif";
    profile.examples.forEach((example, index) => context.fillText(`• ${example}`, 126, 1016 + index * 42));

    const qrData = await QRCode.toDataURL(PLAY_URL, { width: 180, margin: 1, color: { dark: "#2d423a", light: "#fffaf1" } });
    const qr = await loadImage(qrData);
    context.fillStyle = "#2d423a";
    context.fillRect(0, 1174, canvas.width, 176);
    context.drawImage(qr, 862, 1172, 164, 164);
    context.fillStyle = "#fffaf1";
    context.font = "700 34px Mali, sans-serif";
    context.fillText("มาเล่นด้วยกัน", 90, 1244);
    context.font = "500 27px Mali, sans-serif";
    context.fillText("r2racha.github.io/compass", 90, 1292);

    return new Promise((resolve, reject) => canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error("ไม่สามารถสร้างไฟล์การ์ดได้"))), "image/png"));
  };

  const shareResult = async () => {
    if (!primaryProfile) return;
    setShareState("downloading");
    const text = shareCopy(primaryProfile);
    try {
      const card = await createShareCard(primaryProfile);
      const file = new File([card], "สายไหนเหมาะกับคุณ.png", { type: "image/png" });
      if (navigator.share && (!navigator.canShare || navigator.canShare({ files: [file] }))) {
        await navigator.share({ title: "สายไหนเหมาะกับคุณ", text, url: PLAY_URL, files: [file] });
        setShareState("shared");
      } else {
        await navigator.clipboard.writeText(text);
        setShareState("copied");
      }
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setShareState("copied");
      } catch {
        setShareState("idle");
      }
    }
    window.setTimeout(() => setShareState("idle"), 2400);
  };

  const downloadShareCard = async () => {
    if (!primaryProfile) return;
    setShareState("downloading");
    try {
      const card = await createShareCard(primaryProfile);
      const href = URL.createObjectURL(card);
      const link = document.createElement("a");
      link.href = href;
      link.download = "สายไหนเหมาะกับคุณ.png";
      link.click();
      URL.revokeObjectURL(href);
      setShareState("shared");
    } catch {
      setShareState("idle");
    }
    window.setTimeout(() => setShareState("idle"), 1800);
  };

  const copyPlayLink = async () => {
    try {
      await navigator.clipboard.writeText(PLAY_URL);
      setShareState("copied");
      window.setTimeout(() => setShareState("idle"), 1800);
    } catch {
      setShareState("idle");
    }
  };

  return (
    <div className="journey-shell playful-quiz-shell">
      <header className="site-header">
        <button className="brand-lockup" onClick={restart} aria-label="กลับสู่หน้าแรก">
          <span className="brand-mark"><img src={ASSETS.logo} alt="" /></span>
          <span className="brand-wordmark"><strong>เข็มทิศข้าราชการ</strong><small>สายไหนเหมาะกับคุณ?</small></span>
        </button>
        <div className="header-note"><PenLine size={16} strokeWidth={1.8} /><span>16 คำถามชวนสำรวจตัวเอง</span></div>
      </header>

      <main>
        <AnimatePresence mode="wait">
          {stage === "welcome" && (
            <motion.section className="hero-scene" key="welcome" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.34, ease: [0.23, 1, 0.32, 1] }}>
              <div className="hero-painting" style={sceneStyle(SCENE_ASSETS.hero)} aria-hidden="true" />
              <span className="notebook-seam" aria-hidden="true" />
              <div className="hero-route-system" aria-hidden="true"><svg viewBox="0 0 1200 650" preserveAspectRatio="none"><path d="M 10 566 C 165 596, 260 570, 350 510 S 486 412, 623 428 S 782 384, 773 286 S 948 179, 1185 260" /></svg><span className="route-marker route-marker-start">01</span><span className="route-marker route-marker-middle">02</span><span className="route-marker route-marker-end"><Compass size={15} /></span><span className="route-note route-note-start">วิธีทำงานของคุณ</span><span className="route-note route-note-end">ผลลัพธ์ของคุณ</span></div>
              <div className="hero-washi hero-washi-right" aria-hidden="true">แชร์ชวนเพื่อนได้</div>
              <div className="hero-copy">
                <div className="eyebrow"><Sparkles size={15} /> แบบทดสอบชวนสำรวจตัวเอง</div>
                <h1>สายไหน<br /><em>เหมาะกับคุณ?</em></h1>
                <p className="hero-description">เลือกคำตอบจากสถานการณ์ทำงานสั้น ๆ แล้วดูว่าคุณน่าจะมีพลังกับงานแบบไหนในโลกข้าราชการ</p>
                <Button className="journey-button" onClick={() => setStage("ready")}>เริ่มค้นหาสายของคุณ <ArrowRight size={19} /></Button>
                <p className="reassurance"><HeartHandshake size={16} /> เล่นสนุกเพื่อสำรวจตัวเอง</p>
              </div>
              <div className="hero-guide"><div className="speech-bubble"><small>ผู้พาเดินทาง</small>ลองเลือกจากสิ่งที่<br />เป็นตัวคุณจริง ๆ นะ</div><img src={ASSETS.greeting} alt="อวตารข้าราชการทักทาย" /></div>
              <div className="route-start"><span />เริ่มออกเดิน</div>
            </motion.section>
          )}

          {stage === "ready" && (
            <motion.section className="ready-scene expanded-ready" key="ready" initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
              <div className="ready-route-system" aria-hidden="true"><span>01</span><i /><span>02</span><i /><span>03</span></div>
              <div className="ready-guide"><img src={ASSETS.welcome} alt="อวตารเชิญชวนเริ่มแบบทดสอบ" /></div>
              <div className="ready-note tape-note">
                <div className="eyebrow"><MapPin size={15} /> ก่อนออกเดิน</div>
                <h2>ตอบจากสิ่งที่คุณ<br />อยากทำจริง ๆ</h2>
                <p>ชวนสำรวจลักษณะงานที่น่าจะถูกจริตคุณ</p>
                <div className="playful-profile-preview" aria-label="บทบาทงานที่อาจพบ"><span>วางแผน</span><span>จัดการ</span><span>ตัวเลข</span><span>ดิจิทัล</span><span>สื่อสาร</span><span>พื้นที่</span><span>กติกา</span><span>ผู้คน</span></div>
                <div className="readiness-grid compact-grid"><div><b>16</b><span>คำถามสถานการณ์</span></div><div><b>8</b><span>บทบาทการทำงาน</span></div><div><b>3</b><span>สายงานน่าลอง</span></div></div>
                <div className="ready-actions"><Button variant="ghost" className="quiet-button" onClick={() => setStage("welcome")}><ChevronLeft size={18} /> กลับ</Button><Button className="journey-button" onClick={startQuiz}>เริ่มตอบคำถาม <ArrowRight size={19} /></Button></div>
              </div>
            </motion.section>
          )}

          {stage === "quiz" && currentQuestion && (
            <motion.section className="quiz-scene" key={`question-${currentQuestion.id}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }} transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}>
              <div className="quiz-background" style={sceneStyle(SCENE_ASSETS.question)} aria-hidden="true" />
              <div className="quiz-topbar"><Button variant="ghost" className="quiet-button compact" onClick={goBack}><ChevronLeft size={18} /> ย้อนกลับ</Button><div className="progress-cluster"><div className="progress-copy"><span>การเดินทาง</span><b>{questionIndex + 1} / {questions.length}</b></div><div className="pencil-progress" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${progress}%` }} /></div></div></div>
              <div className="question-layout"><aside className="question-guide"><img src={questionIndex % 2 === 0 ? ASSETS.pointing : ASSETS.explain} alt="อวตารกำลังแนะนำคำถาม" /><p>ลองตอบจากสิ่งที่<br />อยากทำจริงนะ</p></aside><article className="question-paper"><div className="paper-header"><span>{currentQuestion.chapter}</span><span>{currentQuestion.scene}</span></div><div className="question-icon"><Compass size={25} /></div><h2>{currentQuestion.question}</h2><p className="question-helper">{currentQuestion.helper}</p><div className="answer-list">{currentQuestion.options.map((option, index) => <button key={option.id} className={`answer-card ${selectedId === option.id ? "is-selected" : ""}`} onClick={() => chooseAnswer(option)} disabled={Boolean(selectedId)}><span className="answer-number">0{index + 1}</span><span className="answer-copy"><b>{option.label}</b><small>{option.detail}</small></span><span className="answer-arrow"><ArrowRight size={18} /></span></button>)}</div></article></div>
              <div className="quiz-route-label"><span /> เลือกทางที่รู้สึกเป็นธรรมชาติ</div>
            </motion.section>
          )}

          {stage === "result" && primaryProfile && (
            <motion.section className="result-scene playful-result" key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.38, ease: [0.23, 1, 0.32, 1] }}>
              <div className="result-landscape" style={sceneStyle(SCENE_ASSETS.result)} aria-hidden="true" />
              <div className="result-header"><div className="eyebrow"><Sparkles size={15} /> ผลลัพธ์จากวิธีที่คุณเลือก</div><h2>{isBlendedProfile ? <>คุณมีสไตล์ผสม<br /><em>{closeProfiles.slice(0, 2).map((profile) => profile.title).join(" × ")}</em></> : <>บทบาทที่ใกล้เคียง<br /><em>{primaryProfile.title}</em></>}</h2></div>
              <div className="result-grid playful-result-grid">
                <article className="result-card archetype-card" style={{ "--profile-accent": primaryProfile.accent } as React.CSSProperties}>
                  <div className="result-tag"><Compass size={17} /> บทบาทที่ใกล้เคียงที่สุด</div>
                  <div className="archetype-top"><div><p className="archetype">{primaryProfile.nickname}</p><h3>{primaryProfile.title}</h3><p className="profile-subtitle">{primaryProfile.summary}</p></div><img className="archetype-avatar" src={ASSETS[primaryProfile.avatarKey]} alt={`อวตาร${primaryProfile.title}`} /></div>
                  <div className="reflection-card"><PenLine size={19} /><p>{primaryProfile.reflection}</p></div>
                  <div className="example-role-list"><span>ตัวอย่างสายงานที่น่าลองสำรวจ</span><div>{primaryProfile.examples.map((example) => <b key={example}>{example}</b>)}</div></div>
                </article>
                <aside className="result-side-note tape-note"><h4>สิ่งที่คำตอบของคุณ<br />บอกเรา</h4><ul>{topDimensions.map(([dimension]) => <li key={dimension}><Check size={16} />{dimensionLabels[dimension]}</li>)}</ul><p className="side-note-foot">นี่เป็นคำชวนให้สำรวจตัวเอง ไม่ได้ชี้ขาดว่าคุณเหมาะหรือสมัครงานใดได้</p></aside>
              </div>
              <section className="all-paths playful-ranking" aria-label="บทบาทที่ใกล้เคียง"><div className="all-paths-heading"><span>อีก 2 บทบาทที่น่าลองสำรวจ</span><p>คะแนนใกล้เคียงกันไม่ได้แปลว่าคุณต้องเลือกได้เพียงแบบเดียว</p></div><div className="profile-ranking-list">{rankedProfiles.slice(1, 3).map((profile, index) => <article className="profile-rank" key={profile.id}><img src={ASSETS[profile.avatarKey]} alt="" /><span className="path-order">0{index + 2}</span><div><b>{profile.title}</b><small>{profile.nickname}</small></div><strong>ใกล้เคียง</strong></article>)}</div></section>
              <section className="practice-callout" aria-label="ลิงก์ทำข้อสอบราชการ"><p>อยากลองทำข้อสอบราชการไหม?</p><a href="https://swiy.co/wsu/" target="_blank" rel="noreferrer">กดลิ้งค์นี้เลย <ArrowRight size={16} /><small>https://swiy.co/wsu/</small></a></section>
              <section className="share-card-section" aria-label="แชร์ผลลัพธ์"><div><p className="share-kicker">ชวนเพื่อนมาเล่นด้วยกัน</p><h3>แชร์การ์ดของคุณ<br />พร้อมลิงก์กลับมาเล่นได้เลย</h3><p>ปุ่มแชร์จะส่งรูปการ์ดพร้อมลิงก์เว็บไซต์ และในการ์ดมี QR ให้สแกนกลับมาเล่นได้เสมอ</p></div><div className="share-actions"><Button className="journey-button" onClick={shareResult} disabled={shareState === "downloading"}><Share2 size={18} />{shareState === "downloading" ? "กำลังทำการ์ด..." : shareState === "shared" ? "แชร์แล้ว" : shareState === "copied" ? "คัดลอกลิงก์แล้ว" : "แชร์ผลของฉัน"}</Button><Button variant="outline" className="share-outline-button" onClick={downloadShareCard} disabled={shareState === "downloading"}><Download size={17} /> ดาวน์โหลดการ์ด</Button><button className="copy-link-button" onClick={copyPlayLink}><Copy size={15} /> คัดลอกลิงก์เล่น</button></div></section>
              <div className="result-footer"><div className="footer-guide"><img src={ASSETS.celebrate} alt="อวตารร่วมแสดงความยินดี" /><p>เก็บผลนี้ไว้เป็น<br />ไอเดียสนุก ๆ นะ</p></div><Button variant="ghost" className="quiet-button" onClick={restart}><RotateCcw size={18} /> ลองตอบอีกครั้ง</Button></div>
              <div className="result-route-system" aria-hidden="true"><span>01</span><i /><span><Compass size={13} /></span><i /><span>✓</span></div>
              <p className="disclaimer"><Info size={12} /> แบบทดสอบนี้ออกแบบเพื่อสำรวจรูปแบบการทำงานที่คุณชอบ ผลลัพธ์และชื่อสายงานเป็นเพียงแนวคิดสำหรับลองค้นคว้าต่อ ไม่ใช่การประเมินสิทธิสมัครหรือคำแนะนำด้านอาชีพเฉพาะบุคคล</p>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      <footer className="site-footer">
        {(stage === "welcome" || stage === "result") && <section className="contact-footer-card" aria-label="ช่องทางติดต่อ Road to Kharachakar"><div className="contact-footer-copy"><span className="contact-kicker">เพจ ทางมุ่งสู่ข้าราชการ Road to Kharachakar</span><h2>สนใจ “ชีทสรุปสอบราชการ<br />แบบเข้าใจง่าย”</h2><p className="contact-line-id">ติดต่อ LINE ID <strong>@891kiemx</strong></p></div><div className="contact-qr-wrap"><img src={ASSETS.lineQr} alt="QR Code สำหรับเพิ่มเพื่อน LINE ID @891kiemx" /><a className="qr-download" href={ASSETS.lineQr} download="QR-Line-891kiemx.png"><Download size={15} /> ดาวน์โหลด QR Code</a></div></section>}
        <div className="footer-signoff"><span className="footer-line" /><p>เข็มทิศราชการ <i>—</i> ค่อย ๆ รู้จักวิธีทำงานของตัวเอง แล้วค่อยเลือกทางที่อยากไป</p><span className="footer-line" /></div>
      </footer>
    </div>
  );
}
