/*
設計哲學：宋代文人雅集與手卷敘事美學。
本頁一切版面、色彩、動畫與資訊呈現，皆以「留白、手卷、紙墨印」為核心，避免制式置中投影片感。
*/
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookMarked,
  BookOpen,
  CheckCircle2,
  CircleHelp,
  Clock3,
  GraduationCap,
  House,
  Landmark,
  Leaf,
  Map,
  PenTool,
  Quote,
  ScrollText,
  Search,
  Sparkles,
  Trees,
  Users,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Button } from "@/components/ui/button";

type Slide = {
  id: number;
  tag: string;
  title: string;
  kicker: string;
  note: string;
};

const heroImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663446833182/midAdijwVheoMWi7RZWho6/taohuayuan-hero-landscape-678ZNVNSLZLUKdodnJN9Yo.webp";
const scrollImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663446833182/midAdijwVheoMWi7RZWho6/scroll-calligraphy-panel-VxXoimZESVfqzKPc8ibxxW.webp";
const villageImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663446833182/midAdijwVheoMWi7RZWho6/peach-village-scene-AnZ6GYgALduRWGNBnAJF3k.webp";
const sealImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663446833182/midAdijwVheoMWi7RZWho6/vermilion-seal-pattern-n7b4sw4sYiodt79B82eJfc.webp";
const jadeImage =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663446833182/midAdijwVheoMWi7RZWho6/jade-ink-ornament-2EngnW8XDrsHrKWPELJ4oD.webp";

const slides: Slide[] = [
  { id: 1, tag: "課題導入", title: "桃花源記", kicker: "陶潛筆下的理想世界", note: "先抓大意，再拆情節、主旨與手法。" },
  { id: 2, tag: "一分鐘讀懂", title: "這篇文章到底在說甚麼？", kicker: "漁人誤入桃花源，見到理想生活，最後再也找不到", note: "把長文先壓縮成三步故事線。" },
  { id: 3, tag: "作者", title: "陶潛是誰？", kicker: "東晉詩人、辭官歸隱、人格高潔", note: "理解作者，才會明白他為何寫桃花源。" },
  { id: 4, tag: "背景", title: "為甚麼會寫出桃花源？", kicker: "亂世現實，催生避世理想", note: "文章不只寫奇遇，也寄託作者心志。" },
  { id: 5, tag: "情節", title: "漁人是怎樣走進去的？", kicker: "沿溪 → 桃林 → 山口 → 洞中 → 桃花源", note: "跟着路線看，故事就不會亂。" },
  { id: 6, tag: "場景", title: "桃花源長甚麼樣？", kicker: "平曠、整齊、安靜、有人情味", note: "作者用極少文字畫出完整村落。" },
  { id: 7, tag: "人物", title: "村民有甚麼特點？", kicker: "率真、好客、與世隔絕", note: "他們的生活狀態正是主題的關鍵。" },
  { id: 8, tag: "結局", title: "為何最後找不到桃花源？", kicker: "可遇不可求，神秘感倍增", note: "結尾讓理想世界保持距離感。" },
  { id: 9, tag: "主旨", title: "作者真正想表達甚麼？", kicker: "嚮往和諧生活，也流露避亂隱逸之志", note: "桃花源不是普通景點，而是精神理想。" },
  { id: 10, tag: "布局", title: "文章結構有甚麼巧妙？", kicker: "前後略寫，中段詳寫，重點集中", note: "文章第二、三段是全篇核心。" },
  { id: 11, tag: "手法", title: "寫作技巧怎樣發揮效果？", kicker: "白描、留白、懸念、曲折", note: "短句不等於簡單，反而更耐讀。" },
  { id: 12, tag: "名句", title: "哪些句子最值得記？", kicker: "少字、多畫面、餘韻長", note: "學懂名句，也要學懂其表達力量。" },
  { id: 13, tag: "詞語", title: "必懂詞語一覽", kicker: "文言重點快記表", note: "考試常見詞義就在這一頁。" },
  { id: 14, tag: "小測", title: "你掌握到多少？", kicker: "用三題快速自我檢查", note: "先想答案，再按揭示。" },
  { id: 15, tag: "總結", title: "桃花源為何令人嚮往？", kicker: "因為現實不完美，人便會想像理想世界", note: "課堂最後，帶走一個核心觀念。" },
];

const routeSteps = [
  { label: "緣溪行", detail: "捕魚迷路，忘路遠近" },
  { label: "逢桃林", detail: "景色奇美，引起好奇" },
  { label: "見山口", detail: "小口微光，神秘莫測" },
  { label: "入桃源", detail: "豁然開朗，見村舍田園" },
];

const authorTimeline = [
  { age: "29歲", event: "入仕途", detail: "任參軍、彭澤令等職" },
  { age: "41歲", event: "辭官歸隱", detail: "不為五斗米折腰" },
  { age: "之後", event: "躬耕田園", detail: "不再任官，堅守氣節" },
  { age: "63歲", event: "病逝柴桑", detail: "世稱靖節先生" },
];

const contextCards = [
  { title: "時代現實", text: "晉宋之際政局混亂，社會不安。", icon: Landmark },
  { title: "作者心志", text: "陶潛不願隨波逐流，傾向歸隱。", icon: PenTool },
  { title: "作品寄意", text: "桃花源既可視作理想社會，也可看作避世象徵。", icon: Leaf },
];

const villageHighlights = [
  "土地平曠，屋舍儼然",
  "良田、美池、桑竹之屬",
  "阡陌交通，雞犬相聞",
  "黃髮垂髫，並怡然自樂",
];

const villagerTraits = [
  { title: "與世隔絕", text: "先世避秦時亂而入，不知有漢，無論魏晉。" },
  { title: "真率好客", text: "見漁人即設酒殺雞作食，村人又各復延至其家。" },
  { title: "珍視安定", text: "『不足為外人道也』表明他們不願受外界打擾。" },
];

const themePie = [
  { name: "理想生活", value: 36, color: "#8d2f2a" },
  { name: "避亂隱逸", value: 28, color: "#4f5d50" },
  { name: "神秘感", value: 20, color: "#b88a52" },
  { name: "人情味", value: 16, color: "#748c88" },
];

const structureData = [
  { part: "偶遇桃林", value: 12 },
  { part: "桃源景象", value: 31 },
  { part: "村民交往", value: 31 },
  { part: "再尋不得", value: 14 },
  { part: "後無問津", value: 12 },
];

const techniqueCards = [
  { title: "以漁人行蹤串連全文", text: "故事線清楚，學生容易掌握先後次序。", icon: Map },
  { title: "白描寫景", text: "只用幾句，已寫出桃林與村落的畫面感。", icon: Trees },
  { title: "情節曲折", text: "找到、失去、再尋不獲，張力層層推進。", icon: Search },
  { title: "善於留白", text: "很多地方不明說，反而更耐人尋味。", icon: Sparkles },
];

const quoteRows = [
  {
    quote: "芳草鮮美，落英繽紛",
    point: "只用八字，寫出色彩、氣味與動感。",
  },
  {
    quote: "土地平曠，屋舍儼然",
    point: "對偶短句，立即勾勒整齊安定的居住空間。",
  },
  {
    quote: "問今是何世，乃不知有漢，無論魏、晉",
    point: "一句突顯與世隔絕之久，也拉高故事奇異感。",
  },
  {
    quote: "不足為外人道也",
    point: "顯示村民珍惜現有生活，不願被外界打擾。",
  },
];

const vocabRows = [
  ["緣", "沿着、順着"],
  ["窮", "窮盡"],
  ["儼然", "整齊的樣子"],
  ["阡陌", "田間縱橫小路"],
  ["怡然自樂", "安樂愉快的樣子"],
  ["問津", "尋訪、探問路徑"],
];

const quizItems = [
  {
    question: "哪一項最能概括《桃花源記》的主旨？",
    options: ["稱讚太守辦事認真", "嚮往和諧淳樸的理想生活", "批評漁人不懂捕魚", "介紹秦朝服飾"],
    answer: "答案：B。文章透過桃花源寄託對理想社會與隱逸生活的嚮往。",
  },
  {
    question: "村民說『不足為外人道也』，最主要反映甚麼？",
    options: ["他們不懂說話", "他們討厭漁人", "他們珍惜平靜生活，不想受打擾", "他們忘了回家的路"],
    answer: "答案：C。這句反映他們珍視與世隔絕的安定狀態。",
  },
  {
    question: "本文最突出的寫景手法是甚麼？",
    options: ["誇張", "白描", "諷刺", "排比議論"],
    answer: "答案：B。作者以簡潔文字勾勒景象，留下大量想像空間。",
  },
];

function SectionBadge({ icon: Icon, label }: { icon: typeof BookOpen; label: string }) {
  return (
    <div className="section-badge">
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </div>
  );
}

function SlideFrame({ slide, children, background }: { slide: Slide; children: React.ReactNode; background?: string }) {
  return (
    <section
      className="slide-panel"
      style={background ? { backgroundImage: `linear-gradient(90deg, rgba(250,246,238,0.95), rgba(250,246,238,0.88)), url(${background})` } : undefined}
    >
      <div className="slide-head">
        <div>
          <p className="slide-tag">{slide.tag}</p>
          <h2 className="slide-title">{slide.title}</h2>
        </div>
        <p className="slide-kicker">{slide.kicker}</p>
      </div>
      <div className="slide-body">{children}</div>
      <div className="slide-foot">{slide.note}</div>
    </section>
  );
}

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [revealed, setRevealed] = useState<number[]>([]);
  const currentSlide = slides[current];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
        setCurrent((prev) => Math.min(prev + 1, slides.length - 1));
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        setCurrent((prev) => Math.max(prev - 1, 0));
      }
      if (event.key === "Home") setCurrent(0);
      if (event.key === "End") setCurrent(slides.length - 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current]);

  const toggleReveal = (index: number) => {
    setRevealed((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]));
  };

  return (
    <div className="lesson-app">
      <aside className="lesson-rail">
        <div className="rail-brand">
          <ScrollText className="h-5 w-5" />
          <div>
            <p>中三中文古風簡報</p>
            <h1>《桃花源記》</h1>
          </div>
        </div>

        <div className="rail-copy">
          <p>設計主軸：宋代文人手卷、宣紙留白、墨色與朱印節奏。</p>
        </div>

        <div className="rail-progress-card">
          <div className="rail-progress-meta">
            <span>進度</span>
            <strong>
              {current + 1}/{slides.length}
            </strong>
          </div>
          <div className="ink-progress">
            <span style={{ width: `${progress}%` }} />
          </div>
        </div>

        <nav className="chapter-nav" aria-label="章節導航">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              className={`chapter-item ${index === current ? "is-active" : ""}`}
              onClick={() => setCurrent(index)}
            >
              <span className="chapter-index">{String(slide.id).padStart(2, "0")}</span>
              <span className="chapter-meta">
                <small>{slide.tag}</small>
                <strong>{slide.title}</strong>
              </span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="presentation-wrap">
        <header className="lesson-topbar">
          <div className="topbar-copy">
            <span className="topbar-chip">Form 3 Chinese</span>
            <p>可用方向鍵切換，適合課堂投影與自學瀏覽。</p>
          </div>
          <div className="topbar-actions">
            <Button className="ink-button ghost-button" onClick={() => setCurrent((prev) => Math.max(prev - 1, 0))}>
              <ArrowLeft className="mr-2 h-4 w-4" /> 上一頁
            </Button>
            <Button className="ink-button" onClick={() => setCurrent((prev) => Math.min(prev + 1, slides.length - 1))}>
              下一頁 <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="presentation-stage-shell">
          <div className="presentation-stage">
            {currentSlide.id === 1 && (
              <section className="cover-slide" style={{ backgroundImage: `linear-gradient(90deg, rgba(250,246,238,0.72), rgba(250,246,238,0.88) 38%, rgba(250,246,238,0.98) 64%), url(${heroImage})` }}>
                <div className="cover-text">
                  <SectionBadge icon={BookMarked} label="古文課核心篇章" />
                  <h2>桃花源記</h2>
                  <p className="cover-subtitle">跟着漁人的腳步，進入一個與戰亂、權力與喧囂隔絕的理想世界。</p>
                  <div className="cover-points">
                    <div>
                      <strong>作者</strong>
                      <span>陶潛</span>
                    </div>
                    <div>
                      <strong>主題</strong>
                      <span>理想社會與隱逸之志</span>
                    </div>
                    <div>
                      <strong>本課焦點</strong>
                      <span>情節、主旨、寫作手法</span>
                    </div>
                  </div>
                </div>
                <div className="cover-side-card">
                  <p className="cover-side-title">三個學習目標</p>
                  <ul>
                    <li>迅速掌握全文故事線</li>
                    <li>分辨桃花源的理想特質</li>
                    <li>指出文章如何寫得神秘又好看</li>
                  </ul>
                </div>
              </section>
            )}

            {currentSlide.id === 2 && (
              <SlideFrame slide={currentSlide} background={scrollImage}>
                <div className="three-steps-grid">
                  {[
                    { step: "01", title: "誤入", desc: "漁人捕魚迷路，忽然遇見桃花林。", icon: Search },
                    { step: "02", title: "遇見", desc: "穿過山口，竟見田園村落與安樂人家。", icon: House },
                    { step: "03", title: "失去", desc: "回去後再尋不得，桃花源成為理想象徵。", icon: Sparkles },
                  ].map(({ step, title, desc, icon: Icon }) => (
                    <article key={step} className="step-card">
                      <div className="step-top">
                        <span>{step}</span>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3>{title}</h3>
                      <p>{desc}</p>
                    </article>
                  ))}
                </div>
                <div className="inline-quote">
                  <Quote className="h-5 w-5" />
                  <p>先把全文縮成一句話：<strong>偶遇理想世界，卻無法長久擁有。</strong></p>
                </div>
              </SlideFrame>
            )}

            {currentSlide.id === 3 && (
              <SlideFrame slide={currentSlide}>
                <div className="split-layout">
                  <div className="portrait-card" style={{ backgroundImage: `linear-gradient(180deg, rgba(250,246,238,0.78), rgba(250,246,238,0.94)), url(${jadeImage})` }}>
                    <SectionBadge icon={GraduationCap} label="作者人格是理解主旨的鑰匙" />
                    <h3>陶潛</h3>
                    <p>東晉末詩人，志趣高尚，性情率真。曾入仕，後辭官歸隱，成為中國文學中最具代表性的隱逸作家之一。</p>
                    <div className="portrait-quote">
                      <strong>關鍵人物印象</strong>
                      <span>不為五斗米折腰</span>
                    </div>
                  </div>
                  <div className="timeline-card">
                    {authorTimeline.map((item) => (
                      <div key={item.age} className="timeline-item">
                        <div className="timeline-age">{item.age}</div>
                        <div>
                          <h4>{item.event}</h4>
                          <p>{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SlideFrame>
            )}

            {currentSlide.id === 4 && (
              <SlideFrame slide={currentSlide} background={sealImage}>
                <div className="context-grid">
                  {contextCards.map(({ title, text, icon: Icon }) => (
                    <article key={title} className="context-card">
                      <Icon className="h-5 w-5" />
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
                <div className="summary-strip">
                  <strong>一句總結：</strong>
                  <span>現實越混亂，作者越渴望一個沒有戰亂、壓迫與權力鬥爭的世界。</span>
                </div>
              </SlideFrame>
            )}

            {currentSlide.id === 5 && (
              <SlideFrame slide={currentSlide}>
                <div className="route-layout">
                  <div className="route-path">
                    {routeSteps.map((item, index) => (
                      <div key={item.label} className="route-step">
                        <div className="route-node">{index + 1}</div>
                        <div>
                          <h3>{item.label}</h3>
                          <p>{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="route-image-card" style={{ backgroundImage: `linear-gradient(180deg, rgba(250,246,238,0.18), rgba(250,246,238,0.22)), url(${heroImage})` }}>
                    <div className="route-image-copy">
                      <SectionBadge icon={Map} label="故事線不能亂" />
                      <p>作者以漁人的「行蹤」串連全文，所以掌握路線，便掌握了全文結構。</p>
                    </div>
                  </div>
                </div>
              </SlideFrame>
            )}

            {currentSlide.id === 6 && (
              <SlideFrame slide={currentSlide}>
                <div className="image-feature-layout">
                  <div className="feature-image" style={{ backgroundImage: `url(${villageImage})` }} />
                  <div className="feature-points-card">
                    <SectionBadge icon={Trees} label="景中見人，人中見景" />
                    <ul className="feature-points-list">
                      {villageHighlights.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                    <div className="feature-note">
                      這些描寫合起來，不只是「美景」，更是一個**安定、整齊、有秩序、有人情味**的生活世界。
                    </div>
                  </div>
                </div>
              </SlideFrame>
            )}

            {currentSlide.id === 7 && (
              <SlideFrame slide={currentSlide} background={scrollImage}>
                <div className="traits-grid">
                  {villagerTraits.map((trait) => (
                    <article key={trait.title} className="trait-card">
                      <Users className="h-5 w-5" />
                      <h3>{trait.title}</h3>
                      <p>{trait.text}</p>
                    </article>
                  ))}
                </div>
                <div className="callout-band">
                  <strong>村民形象 = 主題顯影</strong>
                  <span>他們不是陪襯角色，而是桃花源理想社會的直接證明。</span>
                </div>
              </SlideFrame>
            )}

            {currentSlide.id === 8 && (
              <SlideFrame slide={currentSlide} background={heroImage}>
                <div className="ending-layout">
                  <div className="ending-card dark-ink">
                    <Clock3 className="h-5 w-5" />
                    <h3>漁人回去後</h3>
                    <p>雖然處處誌之，向太守報告，派人再尋，仍然迷路失敗。</p>
                  </div>
                  <div className="ending-card dark-ink">
                    <BookOpen className="h-5 w-5" />
                    <h3>劉子驥規往</h3>
                    <p>名士也想前往尋訪，卻未果，後來更病終。</p>
                  </div>
                  <div className="ending-card accent-ink">
                    <Sparkles className="h-5 w-5" />
                    <h3>文學效果</h3>
                    <p>桃花源於是由「地方」提升為「理想」：可遇，不可強求。</p>
                  </div>
                </div>
              </SlideFrame>
            )}

            {currentSlide.id === 9 && (
              <SlideFrame slide={currentSlide}>
                <div className="chart-layout">
                  <div className="chart-card">
                    <SectionBadge icon={Leaf} label="主旨分量圖" />
                    <ResponsiveContainer width="100%" height={280}>
                      <PieChart>
                        <Pie data={themePie} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={54} outerRadius={88} paddingAngle={3}>
                          {themePie.map((entry) => (
                            <Cell key={entry.name} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: number) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="theme-copy-card">
                    <h3>核心不是「仙境傳說」，而是理想生活想像</h3>
                    <ul>
                      <li>嚮往和平、安定、和諧的社會。</li>
                      <li>寄託遠離亂世、追求隱逸的心志。</li>
                      <li>透過可遇不可求的結局，保留理想的距離與神秘。</li>
                    </ul>
                  </div>
                </div>
              </SlideFrame>
            )}

            {currentSlide.id === 10 && (
              <SlideFrame slide={currentSlide} background={sealImage}>
                <div className="chart-layout wide">
                  <div className="theme-copy-card">
                    <h3>詳略安排非常精準</h3>
                    <ul>
                      <li>前段只用少量篇幅交代偶遇桃林。</li>
                      <li>中段集中描寫景色與村民，是全篇重心。</li>
                      <li>後段迅速收束，以「再尋不得」製造餘韻。</li>
                    </ul>
                  </div>
                  <div className="chart-card">
                    <SectionBadge icon={BookMarked} label="結構比重" />
                    <ResponsiveContainer width="100%" height={280}>
                      <BarChart data={structureData} margin={{ top: 16, right: 12, left: 0, bottom: 8 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#c9bda8" />
                        <XAxis dataKey="part" tick={{ fill: "#5d4b3f", fontSize: 12 }} />
                        <YAxis tick={{ fill: "#5d4b3f", fontSize: 12 }} />
                        <Tooltip formatter={(value: number) => `${value}%`} />
                        <Bar dataKey="value" radius={[10, 10, 2, 2]} fill="#8d2f2a" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </SlideFrame>
            )}

            {currentSlide.id === 11 && (
              <SlideFrame slide={currentSlide}>
                <div className="tech-grid">
                  {techniqueCards.map(({ title, text, icon: Icon }) => (
                    <article key={title} className="tech-card">
                      <Icon className="h-5 w-5" />
                      <h3>{title}</h3>
                      <p>{text}</p>
                    </article>
                  ))}
                </div>
              </SlideFrame>
            )}

            {currentSlide.id === 12 && (
              <SlideFrame slide={currentSlide} background={scrollImage}>
                <div className="quote-table">
                  {quoteRows.map((row) => (
                    <div key={row.quote} className="quote-row">
                      <div className="quote-text">{row.quote}</div>
                      <div className="quote-point">{row.point}</div>
                    </div>
                  ))}
                </div>
              </SlideFrame>
            )}

            {currentSlide.id === 13 && (
              <SlideFrame slide={currentSlide}>
                <div className="vocab-layout">
                  <div className="vocab-table-card">
                    <div className="vocab-table-head">
                      <span>詞語</span>
                      <span>意思</span>
                    </div>
                    {vocabRows.map(([word, meaning]) => (
                      <div key={word} className="vocab-table-row">
                        <strong>{word}</strong>
                        <span>{meaning}</span>
                      </div>
                    ))}
                  </div>
                  <div className="vocab-tip-card" style={{ backgroundImage: `linear-gradient(180deg, rgba(250,246,238,0.92), rgba(250,246,238,0.98)), url(${jadeImage})` }}>
                    <SectionBadge icon={PenTool} label="溫習技巧" />
                    <p>記詞語時，不只背意思，也要連同文中語境一起記，例如：</p>
                    <ul>
                      <li>「窮其林」不是貧窮，而是**走到盡頭**。</li>
                      <li>「問津」原指問渡口，後引申為**尋訪路徑**。</li>
                    </ul>
                  </div>
                </div>
              </SlideFrame>
            )}

            {currentSlide.id === 14 && (
              <SlideFrame slide={currentSlide} background={sealImage}>
                <div className="quiz-grid">
                  {quizItems.map((item, index) => (
                    <article key={item.question} className="quiz-card">
                      <div className="quiz-head">
                        <CircleHelp className="h-5 w-5" />
                        <h3>{item.question}</h3>
                      </div>
                      <ul>
                        {item.options.map((option) => (
                          <li key={option}>{option}</li>
                        ))}
                      </ul>
                      <Button className="ink-button ghost-button mt-auto" onClick={() => toggleReveal(index)}>
                        {revealed.includes(index) ? "收起答案" : "揭示答案"}
                      </Button>
                      {revealed.includes(index) && (
                        <div className="answer-box">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>{item.answer}</span>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </SlideFrame>
            )}

            {currentSlide.id === 15 && (
              <SlideFrame slide={currentSlide} background={jadeImage}>
                <div className="finale-layout">
                  <div className="finale-main">
                    <SectionBadge icon={Sparkles} label="帶走這句話" />
                    <h3>桃花源真正迷人的，不只是風景，而是它代表了一種人對安定與純樸的渴望。</h3>
                    <p>
                      陶潛透過一段看似平靜的奇遇，讓我們看見：當現實世界充滿混亂與壓力時，人心便會自然追問——有沒有另一種更好的生活？
                    </p>
                  </div>
                  <div className="finale-points">
                    <div>
                      <strong>故事線</strong>
                      <span>誤入、相遇、失去</span>
                    </div>
                    <div>
                      <strong>主題</strong>
                      <span>理想社會、避亂隱逸</span>
                    </div>
                    <div>
                      <strong>手法</strong>
                      <span>白描、懸念、留白</span>
                    </div>
                  </div>
                </div>
              </SlideFrame>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
