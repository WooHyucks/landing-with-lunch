"use client";

import { useState, useEffect, useRef } from "react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Star,
  Truck,
  Clock,
  CheckCircle2,
  Menu,
  X,
  MapPin,
  Phone,
  Instagram,
  Youtube,
  UtensilsCrossed,
  Sparkles,
  Gift,
  Timer,
  Smile,
  MessageCircle,
  Hospital,
  Briefcase,
  Store,
  Coffee,
  Heart,
  TicketPercent,
  BadgeCheck,
  MousePointerClick,
  Send,
} from "lucide-react";

const heroFood = "/images/KakaoTalk_Photo_2026-04-01-17-50-43_003.jpeg";
const bentoFlatlay = "/images/KakaoTalk_Photo_2026-04-01-17-50-43_002.jpeg";
const bentoArtistic = "/images/KakaoTalk_Photo_2026-04-01-17-50-43_006.jpeg";
const saladBowl = "/images/KakaoTalk_Photo_2026-04-01-17-50-43_001.jpeg";
const sandwich = "/images/KakaoTalk_Photo_2026-04-01-17-50-43_007.jpeg";
const brochureFood = "/images/KakaoTalk_Photo_2026-04-01-18-00-35_002.jpeg";

const ORANGE = "#EB5722";

const testimonials = [
  {
    quote:
      "점심시간마다 밖에 나가서 줄 서는 게 은근히 스트레스였는데, 위드런치로 바꾸고 나서 직원들이 훨씬 여유롭게 쉬게 됐어요.",
    author: "김현진",
    role: "병원 행정팀",
    company: "강남구 내과",
    rating: 5,
  },
  {
    quote:
      "매일 ‘오늘 뭐 먹지?’ 고민하는 시간이 줄었어요. 도시락이 정해진 시간에 오니까 점심시간이 훨씬 깔끔해졌습니다.",
    author: "박성우",
    role: "운영 매니저",
    company: "분당 오피스",
    rating: 5,
  },
  {
    quote:
      "매장에서 점심 먹으러 나가기가 애매했는데, 도시락을 받아보니까 훨씬 편합니다. 3일 체험하고 바로 정기 이용했어요.",
    author: "이지연",
    role: "매장 관리자",
    company: "성수동 스튜디오",
    rating: 5,
  },
];

const lunchPains = [
  {
    icon: Smile,
    emoji: "😵‍💫",
    title: "오늘 점심 뭐 먹지?",
    desc: "매일 반복되는 메뉴 고민, 위드런치가 줄여드려요.",
  },
  {
    icon: Timer,
    emoji: "⏰",
    title: "나가서 먹을 시간이 아까울 때",
    desc: "줄 서고 이동하는 시간을 아껴 점심시간을 더 여유롭게.",
  },
  {
    icon: UtensilsCrossed,
    emoji: "🍱",
    title: "매일 다른 도시락",
    desc: "질리지 않도록 다양한 메뉴를 정해진 시간에 받아보세요.",
  },
  {
    icon: Gift,
    emoji: "🎁",
    title: "3일 먹으면 공짜 쿠폰",
    desc: "처음이라면 부담 없이 3일 먼저 경험해보세요.",
  },
];

export function LandingPage() {
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [current, setCurrent] = useState(0);
  const [painIndex, setPainIndex] = useState(0);
  const [couponOpen, setCouponOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    headcount: "",
    location: "",
    serviceType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });

    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const lastShownDate = localStorage.getItem("withlunch_coupon_modal_date");

    if (lastShownDate === today) return;

    const modalTimer = setTimeout(() => {
      setCouponOpen(true);
      localStorage.setItem("withlunch_coupon_modal_date", today);
    }, 1200);

    return () => clearTimeout(modalTimer);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(
      () => setCurrent((p) => (p + 1) % testimonials.length),
      5000
    );

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const painTimer = setInterval(() => {
      setPainIndex((p) => (p + 1) % lunchPains.length);
    }, 2800);

    return () => clearInterval(painTimer);
  }, []);

  const go = (d: 1 | -1) => {
    if (timerRef.current) clearInterval(timerRef.current);

    setCurrent((p) => (p + d + testimonials.length) % testimonials.length);

    timerRef.current = setInterval(
      () => setCurrent((p) => (p + 1) % testimonials.length),
      5000
    );
  };

  const closeCouponToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("withlunch_coupon_modal_date", today);
    setCouponOpen(false);
  };

  const services = [
    {
      no: "01",
      icon: Hospital,
      title: "병원 점심\n도시락 배송",
      desc:
        "진료와 업무로 바쁜 병원 직원분들을 위해 정해진 시간에 도시락을 배송합니다. 밖에 나가지 않아도 든든한 점심을 챙길 수 있어요.",
      tags: ["점심시간 절약", "정시 배송", "메뉴 고민 없음"],
      img: bentoFlatlay,
      badge: "병원 추천",
    },
    {
      no: "02",
      icon: Briefcase,
      title: "직장 점심\n정기 배송",
      desc:
        "매일 점심 메뉴를 고르고 이동하는 시간을 줄여드립니다. 사무실에서 편하게 받아보는 따뜻한 한 끼를 경험하세요.",
      tags: ["매일 다른 메뉴", "사무실 배송", "3인 이상 가능"],
      img: bentoArtistic,
      badge: "직장 인기",
    },
    {
      no: "03",
      icon: Store,
      title: "가게·매장\n점심 도시락",
      desc:
        "점심시간에도 자리를 비우기 어려운 매장, 학원, 소형 사업장을 위한 도시락 배송 서비스입니다.",
      tags: ["소규모 가능", "시간 절약", "간편 주문"],
      img: saladBowl,
      badge: "소규모 가능",
    },
  ];

  const metrics = [
    {
      value: "30분+",
      label: "점심시간 절약",
      sub: "saved lunch time",
      icon: Timer,
    },
    {
      value: "0번",
      label: "메뉴 고민",
      sub: "no menu stress",
      icon: Smile,
    },
    {
      value: "3일",
      label: "체험 후 쿠폰",
      sub: "trial coupon",
      icon: TicketPercent,
    },
    {
      value: "매일",
      label: "다른 메뉴",
      sub: "rotating menu",
      icon: UtensilsCrossed,
    },
  ];

  return (
    <div
      className="bg-[#F8F7F5] text-[#1A1A1A] overflow-x-hidden"
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Noto Sans KR', sans-serif",
      }}
    >
      {/* NAV */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-200 ${
          scrolled
            ? "bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]"
            : "bg-white/90 backdrop-blur-md"
        }`}
      >
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: ORANGE }}
            >
              <UtensilsCrossed
                className="w-4 h-4 text-white"
                strokeWidth={2.2}
              />
            </div>
            <span className="font-extrabold text-base tracking-tight text-[#1A1A1A]">
              위드런치
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-7">
            {[
              { label: "도시락 메뉴", href: "#menu" },
              { label: "이용 방법", href: "#how" },
              { label: "3일 쿠폰", href: "#coupon" },
              { label: "문의하기", href: "#contact" },
            ].map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="text-[13px] font-medium text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:15778517"
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              1577-8517
            </a>
            <button
              onClick={() => setCouponOpen(true)}
              className="flex items-center gap-1.5 text-white text-[13px] font-bold px-4 py-2 rounded-lg transition-all hover:opacity-90"
              style={{ background: ORANGE }}
            >
              3일 쿠폰 받기 <Gift className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            className="lg:hidden p-1.5"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {navOpen && (
          <div className="lg:hidden bg-white border-t border-black/[0.06] px-6 py-5 space-y-4">
            {[
              { label: "도시락 메뉴", href: "#menu" },
              { label: "이용 방법", href: "#how" },
              { label: "3일 쿠폰", href: "#coupon" },
              { label: "문의하기", href: "#contact" },
            ].map((n) => (
              <a
                key={n.label}
                href={n.href}
                className="block text-sm text-[#1A1A1A]/70"
                onClick={() => setNavOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <button
              onClick={() => {
                setNavOpen(false);
                setCouponOpen(true);
              }}
              className="w-full flex justify-center items-center gap-2 text-white text-sm font-bold py-3 rounded-xl"
              style={{ background: ORANGE }}
            >
              3일 쿠폰 받기
              <Gift className="w-4 h-4" />
            </button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="pt-16 min-h-screen grid lg:grid-cols-[1fr_1fr] overflow-hidden">
        <div className="bg-[#141414] flex flex-col justify-center px-10 lg:px-16 xl:px-40 py-20 lg:py-0 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg,#fff 0px,#fff 1px,transparent 1px,transparent 48px), repeating-linear-gradient(90deg,#fff 0px,#fff 1px,transparent 1px,transparent 48px)",
            }}
          />

          <div
            className="absolute top-24 right-12 w-28 h-28 rounded-full blur-3xl opacity-20"
            style={{ background: ORANGE }}
          />

          <div className="relative z-10 max-w-[560px]">
            <div
              className="inline-flex items-center gap-2 mb-8 text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border soft-pulse"
              style={{
                color: ORANGE,
                borderColor: `${ORANGE}40`,
                background: `${ORANGE}12`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: ORANGE }}
              />
              점심시간을 아껴주는 도시락 정기배송
            </div>

            <h1 className="text-[2.75rem] lg:text-[3.5rem] xl:text-[4rem] font-extrabold text-white leading-[1.08] tracking-[-0.03em] mb-6">
              오늘 점심 뭐 먹지?
              <br />
              <span style={{ color: ORANGE }}>그 고민,</span>
              <br />
              위드런치가 끝내드릴게요
            </h1>

            <p className="text-white/55 text-base lg:text-[17px] leading-relaxed mb-8 font-normal">
              병원, 사무실, 매장에서 바쁜 점심시간마다
              <br className="hidden lg:block" />
              밖에 나가고 줄 서는 시간을 줄여드립니다.
              <br className="hidden lg:block" />
              매일 다른 도시락을 정해진 시간에 받아보세요.
            </p>

            <div className="bg-white/[0.06] border border-white/[0.1] rounded-2xl p-5 mb-8 transition-all duration-500 slide-up">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.08] flex items-center justify-center text-2xl shrink-0">
                  {lunchPains[painIndex].emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {(() => {
                      const Icon = lunchPains[painIndex].icon;
                      return (
                        <Icon
                          className="w-4 h-4"
                          style={{ color: ORANGE }}
                        />
                      );
                    })()}
                    <p className="text-white font-extrabold text-base">
                      {lunchPains[painIndex].title}
                    </p>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed">
                    {lunchPains[painIndex].desc}
                  </p>
                </div>
              </div>

              <div className="flex gap-1.5 mt-4">
                {lunchPains.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPainIndex(i)}
                    className="h-1.5 rounded-full transition-all duration-300"
                    style={{
                      width: i === painIndex ? "1.5rem" : "0.4rem",
                      background:
                        i === painIndex ? ORANGE : "rgba(255,255,255,0.18)",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-12">
              <button
                onClick={() => setCouponOpen(true)}
                className="flex items-center gap-2 text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg"
                style={{
                  background: ORANGE,
                  boxShadow: `0 8px 24px ${ORANGE}50`,
                }}
              >
                3일 먹고 공짜 쿠폰 받기 <Gift className="w-4 h-4" />
              </button>
              <a
                href="#services"
                className="flex items-center gap-2 text-white/70 font-semibold text-sm px-6 py-3.5 rounded-xl border border-white/15 hover:border-white/30 transition-all"
              >
                서비스 보기 <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-px bg-white/[0.08] rounded-2xl overflow-hidden">
              {[
                { v: "30분+", l: "점심시간 절약", icon: Timer },
                { v: "0번", l: "메뉴 고민", icon: Smile },
                { v: "3일", l: "쿠폰 체험", icon: Gift },
              ].map(({ v, l, icon: Icon }) => (
                <div key={l} className="bg-[#1C1C1C] px-4 py-4 text-center">
                  <Icon
                    className="w-4 h-4 mx-auto mb-2"
                    style={{ color: ORANGE }}
                  />
                  <p
                    className="text-xl font-extrabold tabular-nums mb-0.5"
                    style={{ color: ORANGE }}
                  >
                    {v}
                  </p>
                  <p className="text-white/40 text-[11px] font-medium">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative min-h-[56vh] lg:min-h-0">
          <ImageWithFallback
            src={heroFood}
            alt="위드런치 점심 도시락"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(235,87,34,0.28) 0%, transparent 55%)",
            }}
          />

          <div className="absolute top-8 left-8 bg-white rounded-2xl p-4 shadow-2xl max-w-[210px] soft-float">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `${ORANGE}15` }}
              >
                <Clock className="w-4 h-4" style={{ color: ORANGE }} />
              </div>
              <span className="text-[11px] font-bold text-[#1A1A1A]/45 uppercase tracking-wide">
                점심시간 절약
              </span>
            </div>
            <p className="text-[#1A1A1A] font-extrabold text-lg leading-tight">
              나가지 말고
              <br />
              받아보세요
            </p>
          </div>

          <div className="absolute bottom-8 right-8 bg-white rounded-2xl p-5 shadow-2xl max-w-[230px]">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: ORANGE }}
              >
                <Truck className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold text-[#1A1A1A]/50 uppercase tracking-wide">
                오늘의 도시락
              </span>
            </div>
            <p className="text-[#1A1A1A] font-extrabold text-lg leading-tight mb-1">
              정해진 시간에 도착
            </p>
            <p className="text-[#1A1A1A]/45 text-xs leading-relaxed mb-3">
              점심시간은 짧으니까, 메뉴 고민부터 줄여드릴게요.
            </p>
            <div className="flex items-center gap-1.5">
              <div className="flex-1 h-1.5 rounded-full bg-[#F0F0F0]">
                <div
                  className="h-full rounded-full"
                  style={{ width: "92%", background: ORANGE }}
                />
              </div>
              <span className="text-[11px] font-bold" style={{ color: ORANGE }}>
                준비중
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="bg-white py-24 lg:py-32">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
            <div>
              <p
                className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3"
                style={{ color: ORANGE }}
              >
                이런 곳에 딱 좋아요
              </p>
              <h2 className="text-3xl lg:text-[2.6rem] font-extrabold text-[#1A1A1A] leading-tight tracking-tight">
                점심 때문에
                <br />
                매일 시간을 쓰고 있다면.
              </h2>
            </div>
            <button
              onClick={() => setCouponOpen(true)}
              className="shrink-0 inline-flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl border-2 hover:text-white transition-all"
              style={{ borderColor: ORANGE, color: ORANGE }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = ORANGE;
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = ORANGE;
              }}
            >
              3일 체험 쿠폰 받기 <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2 mb-10 overflow-x-auto pb-2">
            {services.map((s, i) => {
              const Icon = s.icon;

              return (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className="shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200"
                  style={
                    activeTab === i
                      ? { background: ORANGE, color: "#fff" }
                      : { background: "#F2F2F2", color: "#1A1A1A99" }
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-mono text-[11px] opacity-60">
                    {s.no}
                  </span>
                  {s.title.replace("\n", " ")}
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded mb-6"
                style={{ background: `${ORANGE}15`, color: ORANGE }}
              >
                <BadgeCheck className="w-3.5 h-3.5" />
                {services[activeTab].badge}
              </div>

              <h3 className="text-[2rem] lg:text-[2.6rem] font-extrabold text-[#1A1A1A] leading-[1.15] tracking-tight mb-5 whitespace-pre-line">
                {services[activeTab].title}
              </h3>

              <p className="text-[#1A1A1A]/55 text-base leading-relaxed mb-8">
                {services[activeTab].desc}
              </p>

              <div className="space-y-3 mb-10">
                {services[activeTab].tags.map((t) => (
                  <div key={t} className="flex items-center gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${ORANGE}18` }}
                    >
                      <CheckCircle2
                        className="w-3 h-3"
                        style={{ color: ORANGE }}
                      />
                    </div>
                    <span className="text-sm font-medium text-[#1A1A1A]/70">
                      {t}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                {services.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTab(i)}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === activeTab ? "2rem" : "0.5rem",
                      background: i === activeTab ? ORANGE : "#E0E0E0",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-[0_32px_64px_rgba(0,0,0,0.12)]">
              <ImageWithFallback
                src={services[activeTab].img}
                alt={services[activeTab].title}
                className="w-full h-full object-cover transition-all duration-500"
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 60%, rgba(235,87,34,0.2) 100%)",
                }}
              />

              <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm rounded-xl px-3.5 py-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" style={{ color: ORANGE }} />
                <span className="text-[11px] font-bold" style={{ color: ORANGE }}>
                  {services[activeTab].badge}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU */}
      <section id="menu" className="bg-[#F8F7F5] py-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
            <div>
              <p
                className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3"
                style={{ color: ORANGE }}
              >
                오늘도 맛있게
              </p>
              <h2 className="text-3xl lg:text-[2.4rem] font-extrabold text-[#1A1A1A] leading-tight tracking-tight">
                점심 메뉴 고민을
                <br />
                줄이는 방법.
              </h2>
            </div>
            <p className="text-[#1A1A1A]/50 text-sm max-w-sm leading-relaxed">
              도시락, 샐러드, 샌드위치까지. 바쁜 하루에도 가볍게,
              든든하게 먹을 수 있도록 준비합니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {[
              {
                label: "든든한 도시락",
                sub: "밥과 반찬으로 든든하게 채우는 한 끼",
                img: bentoFlatlay,
                accent: "01",
                icon: UtensilsCrossed,
              },
              {
                label: "가벼운 샐러드",
                sub: "바쁜 날에도 부담 없이 먹는 신선한 구성",
                img: saladBowl,
                accent: "02",
                icon: Heart,
              },
              {
                label: "수제 샌드위치",
                sub: "간편하지만 허전하지 않은 점심 선택지",
                img: sandwich,
                accent: "03",
                icon: Coffee,
              },
            ].map(({ label, sub, img, accent, icon: Icon }) => (
              <div
                key={label}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: "4/5" }}
              >
                <ImageWithFallback
                  src={img}
                  alt={label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                <div className="absolute top-5 left-5 font-mono text-[11px] font-bold text-white/40">
                  {accent}
                </div>

                <div className="absolute top-5 right-5 w-10 h-10 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white font-extrabold text-xl mb-1">
                    {label}
                  </p>
                  <p className="text-white/55 text-xs">{sub}</p>
                  <div
                    className="mt-4 flex items-center gap-2 text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: ORANGE }}
                  >
                    메뉴 고민 줄이기 <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="bg-white py-24 lg:py-32">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p
              className="text-[11px] font-bold tracking-[0.14em] uppercase mb-4"
              style={{ color: ORANGE }}
            >
              이용 방법
            </p>
            <h2 className="text-3xl lg:text-[2.8rem] font-extrabold text-[#1A1A1A] leading-tight tracking-tight">
              신청은 가볍게,
              <br />
              점심은 편하게.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: MousePointerClick,
                title: "1. 문의 남기기",
                desc: "이용 인원, 지역, 원하는 점심 형태를 간단히 남겨주세요.",
              },
              {
                icon: MessageCircle,
                title: "2. 상담 받기",
                desc: "가능 지역과 메뉴 구성을 빠르게 안내해드립니다.",
              },
              {
                icon: Truck,
                title: "3. 도시락 받기",
                desc: "정해진 시간에 점심 도시락을 받아보세요.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-[#F8F7F5] rounded-3xl p-8 hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: `${ORANGE}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: ORANGE }} />
                </div>
                <h3 className="font-extrabold text-[#1A1A1A] text-lg mb-2">
                  {title}
                </h3>
                <p className="text-[#1A1A1A]/50 text-sm leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUPON SECTION */}
      <section
        id="coupon"
        className="bg-[#141414] py-24 lg:py-32 relative overflow-hidden"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[680px] h-[320px] rounded-full opacity-10 blur-[120px] pointer-events-none"
          style={{ background: ORANGE }}
        />

        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase mb-5 px-3 py-1.5 rounded-full"
                style={{ color: ORANGE, background: `${ORANGE}15` }}
              >
                <Gift className="w-3.5 h-3.5" />
                첫 이용 혜택
              </div>

              <h2 className="text-3xl lg:text-[2.8rem] font-extrabold text-white leading-tight tracking-tight mb-6">
                3일만 먹어보세요.
                <br />
                괜찮으면 그때 계속하세요.
              </h2>

              <p className="text-white/50 text-[15px] leading-relaxed max-w-xl mb-8">
                점심 도시락은 말보다 경험이 빠릅니다. 3일 동안 실제로
                받아보고, 점심시간이 얼마나 편해지는지 확인해보세요.
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { icon: Timer, text: "나가는 시간 절약" },
                  { icon: Smile, text: "메뉴 고민 제거" },
                  { icon: TicketPercent, text: "공짜 쿠폰 혜택" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="bg-white/[0.06] border border-white/[0.08] rounded-2xl p-4"
                  >
                    <Icon className="w-5 h-5 mb-3" style={{ color: ORANGE }} />
                    <p className="text-white/75 text-sm font-bold">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="rounded-3xl p-8 lg:p-10 soft-float"
              style={{ background: ORANGE }}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-6 cute-wiggle">
                <Gift className="w-7 h-7 text-white" />
              </div>

              <h3 className="text-white font-extrabold text-2xl leading-tight mb-3">
                3일 먹으면
                <br />
                공짜 쿠폰 발급
              </h3>

              <p className="text-white/75 text-sm leading-relaxed mb-8">
                병원, 직장, 매장 점심 도시락을 부담 없이 먼저 경험해보세요.
              </p>

              <button
                onClick={() => setCouponOpen(true)}
                className="w-full flex items-center justify-between bg-white rounded-xl px-5 py-4 font-bold text-sm hover:opacity-95 transition-opacity"
                style={{ color: ORANGE }}
              >
                쿠폰 받으러 가기
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* METRICS */}
      <section className="bg-[#F8F7F5] py-24">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16">
            <p
              className="text-[11px] font-bold tracking-[0.14em] uppercase mb-4"
              style={{ color: ORANGE }}
            >
              위드런치를 쓰는 이유
            </p>
            <h2 className="text-3xl lg:text-[2.8rem] font-extrabold text-[#1A1A1A] leading-tight tracking-tight">
              점심이 편해지면
              <br />
              하루가 조금 가벼워져요.
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-black/[0.06] rounded-3xl overflow-hidden mb-12">
            {metrics.map(({ value, label, sub, icon: Icon }) => (
              <div
                key={label}
                className="bg-white px-8 py-10 text-center hover:bg-[#fff8f5] transition-colors"
              >
                <Icon
                  className="w-6 h-6 mx-auto mb-4"
                  style={{ color: ORANGE }}
                />
                <p
                  className="text-4xl lg:text-5xl font-extrabold tabular-nums mb-2"
                  style={{ color: ORANGE }}
                >
                  {value}
                </p>
                <p className="text-[#1A1A1A] font-semibold text-sm mb-1">
                  {label}
                </p>
                <p className="text-[#1A1A1A]/30 text-[11px] uppercase tracking-wider font-medium">
                  {sub}
                </p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-stretch">
            <div className="bg-white border border-black/[0.06] rounded-3xl p-8 lg:p-10 relative shadow-sm">
              <div className="flex gap-1 mb-6">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-current"
                      style={{ color: ORANGE }}
                    />
                  ))}
              </div>

              <blockquote className="text-[#1A1A1A]/75 text-lg leading-relaxed mb-8 font-normal">
                “{testimonials[current].quote}”
              </blockquote>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm"
                  style={{ background: ORANGE }}
                >
                  {testimonials[current].author[0]}
                </div>
                <div>
                  <p className="text-[#1A1A1A] font-bold text-sm">
                    {testimonials[current].author}
                  </p>
                  <p className="text-[#1A1A1A]/40 text-xs">
                    {testimonials[current].role} ·{" "}
                    {testimonials[current].company}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 flex items-center gap-2">
                <button
                  onClick={() => go(-1)}
                  className="w-8 h-8 rounded-lg border border-black/[0.08] flex items-center justify-center text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => go(1)}
                  className="w-8 h-8 rounded-lg border border-black/[0.08] flex items-center justify-center text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              className="rounded-3xl flex flex-col justify-between p-8 lg:p-10"
              style={{ background: ORANGE }}
            >
              <div>
                <Heart className="w-8 h-8 text-white/70 mb-6" />
                <h3 className="text-white font-extrabold text-2xl leading-tight mb-3">
                  점심시간은
                  <br />
                  쉬는 시간이어야 하니까요
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  메뉴 고르고, 이동하고, 줄 서는 시간을 줄이면 점심시간이
                  훨씬 여유로워집니다.
                </p>
              </div>
              <a
                href="#contact"
                className="mt-8 flex items-center justify-between bg-white rounded-xl px-5 py-4 font-bold text-sm hover:opacity-95 transition-opacity"
                style={{ color: ORANGE }}
              >
                우리도 받아보기
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === current ? "1.5rem" : "0.375rem",
                  background:
                    i === current ? ORANGE : "rgba(0,0,0,0.16)",
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="bg-white py-24 lg:py-32">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-16 lg:gap-20 items-start">
            <div>
              <p
                className="text-[11px] font-bold tracking-[0.14em] uppercase mb-4"
                style={{ color: ORANGE }}
              >
                점심 도시락 문의
              </p>

              <h2 className="text-3xl lg:text-[2.5rem] font-extrabold text-[#1A1A1A] leading-tight tracking-tight mb-6">
                회사명과 인원만 알려주세요.
                <br />
                점심 고민을 줄여드릴게요.
              </h2>

              <p className="text-[#1A1A1A]/55 text-[15px] leading-relaxed mb-10">
                병원, 직장, 매장처럼 점심시간이 바쁜 곳이라면 위드런치가
                잘 맞습니다. 가능한 지역과 메뉴 구성을 빠르게 안내드릴게요.
              </p>

              <div className="space-y-0 divide-y divide-[rgba(0,0,0,0.06)]">
                {[
                  {
                    icon: Timer,
                    title: "점심시간 절약",
                    desc: "밖에 나가고 줄 서는 시간을 줄여 점심시간을 더 편하게 씁니다.",
                  },
                  {
                    icon: Smile,
                    title: "메뉴 고민 제거",
                    desc: "매일 무엇을 먹을지 정하는 피로감을 줄여드립니다.",
                  },
                  {
                    icon: Truck,
                    title: "정해진 시간 배송",
                    desc: "병원, 사무실, 매장으로 원하는 시간대에 맞춰 안내드립니다.",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-5 py-6">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: `${ORANGE}12` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: ORANGE }} />
                    </div>
                    <div>
                      <p className="font-bold text-[#1A1A1A] text-sm mb-1">
                        {title}
                      </p>
                      <p className="text-[#1A1A1A]/50 text-[13px] leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 rounded-2xl overflow-hidden h-48 relative">
                <ImageWithFallback
                  src={brochureFood}
                  alt="위드런치 도시락 서비스"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to right, rgba(235,87,34,0.48), transparent)",
                  }}
                />
                <div className="absolute left-6 bottom-6">
                  <p className="text-white font-extrabold text-lg leading-tight">
                    바쁜 점심시간,
                    <br />
                    도시락이 도착합니다
                  </p>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Phone, text: "대표 1577-8517" },
                  { icon: Phone, text: "010-5507-2905" },
                  { icon: MessageCircle, text: "카카오톡: WithLunch" },
                  { icon: MapPin, text: "병원 · 직장 · 매장 점심 배송" },
                ].map(({ icon: Icon, text }) => (
                  <div
                    key={text}
                    className="flex items-center gap-2 text-[13px] text-[#1A1A1A]/55"
                  >
                    <Icon
                      className="w-3.5 h-3.5 shrink-0"
                      style={{ color: ORANGE }}
                    />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F8F7F5] rounded-3xl p-8 lg:p-10">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                    style={{ background: `${ORANGE}15` }}
                  >
                    <CheckCircle2 className="w-8 h-8" style={{ color: ORANGE }} />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A] mb-3">
                    문의가 접수되었습니다!
                  </h3>
                  <p className="text-[#1A1A1A]/55 text-sm leading-relaxed max-w-[280px]">
                    담당자가 가능한 지역과 메뉴 구성을 확인한 뒤 연락드릴게요.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        company: "",
                        name: "",
                        email: "",
                        phone: "",
                        headcount: "",
                        location: "",
                        serviceType: "",
                        message: "",
                      });
                    }}
                    className="mt-8 text-sm font-bold underline underline-offset-2"
                    style={{ color: ORANGE }}
                  >
                    추가 문의하기
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-extrabold text-[#1A1A1A] mb-1.5">
                    점심 도시락 문의하기
                  </h3>
                  <p className="text-[#1A1A1A]/50 text-sm mb-8">
                    인원과 지역만 남겨주시면 빠르게 안내드릴게요.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          label: "회사/병원/매장명 *",
                          key: "company",
                          placeholder: "예) 위드내과",
                          type: "text",
                          required: true,
                        },
                        {
                          label: "담당자명 *",
                          key: "name",
                          placeholder: "성함",
                          type: "text",
                          required: true,
                        },
                      ].map(({ label, key, placeholder, type, required }) => (
                        <div key={key}>
                          <label className="block text-[11px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider mb-1.5">
                            {label}
                          </label>
                          <input
                            required={required}
                            type={type}
                            placeholder={placeholder}
                            value={formData[key as keyof typeof formData]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [key]: e.target.value,
                              })
                            }
                            className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/30 outline-none transition-all"
                            onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                            onBlur={(e) =>
                              (e.target.style.borderColor = "rgba(0,0,0,0.1)")
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        {
                          label: "이메일 *",
                          key: "email",
                          placeholder: "you@company.com",
                          type: "email",
                          required: true,
                        },
                        {
                          label: "연락처 *",
                          key: "phone",
                          placeholder: "010-xxxx-xxxx",
                          type: "tel",
                          required: true,
                        },
                      ].map(({ label, key, placeholder, type, required }) => (
                        <div key={key}>
                          <label className="block text-[11px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider mb-1.5">
                            {label}
                          </label>
                          <input
                            required={required}
                            type={type}
                            placeholder={placeholder}
                            value={formData[key as keyof typeof formData]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [key]: e.target.value,
                              })
                            }
                            className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/30 outline-none transition-all"
                            onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                            onBlur={(e) =>
                              (e.target.style.borderColor = "rgba(0,0,0,0.1)")
                            }
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider mb-1.5">
                        이용 유형 *
                      </label>
                      <select
                        required
                        value={formData.serviceType}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            serviceType: e.target.value,
                          })
                        }
                        className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] outline-none appearance-none"
                        onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(0,0,0,0.1)")
                        }
                      >
                        <option value="" disabled>
                          이용 유형 선택
                        </option>
                        <option value="hospital">병원 점심 도시락</option>
                        <option value="office">직장 점심 도시락</option>
                        <option value="store">가게·매장 점심 도시락</option>
                        <option value="trial">3일 체험 / 쿠폰 문의</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider mb-1.5">
                          일일 이용 인원 *
                        </label>
                        <select
                          required
                          value={formData.headcount}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              headcount: e.target.value,
                            })
                          }
                          className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] outline-none appearance-none"
                          onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                          onBlur={(e) =>
                            (e.target.style.borderColor = "rgba(0,0,0,0.1)")
                          }
                        >
                          <option value="" disabled>
                            인원 선택
                          </option>
                          <option value="3-10">3 – 10명</option>
                          <option value="11-30">11 – 30명</option>
                          <option value="31-100">31 – 100명</option>
                          <option value="101+">101명 이상</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider mb-1.5">
                          배송 희망 지역 *
                        </label>
                        <input
                          required
                          type="text"
                          placeholder="예) 분당 정자동"
                          value={formData.location}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              location: e.target.value,
                            })
                          }
                          className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/30 outline-none transition-all"
                          onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                          onBlur={(e) =>
                            (e.target.style.borderColor = "rgba(0,0,0,0.1)")
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-[#1A1A1A]/50 uppercase tracking-wider mb-1.5">
                        문의 내용
                      </label>
                      <textarea
                        rows={3}
                        placeholder="원하는 배송 시간, 메뉴 선호도, 알레르기 정보 등을 입력해 주세요."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            message: e.target.value,
                          })
                        }
                        className="w-full bg-white border border-[rgba(0,0,0,0.1)] rounded-xl px-4 py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/30 outline-none resize-none transition-all"
                        onFocus={(e) => (e.target.style.borderColor = ORANGE)}
                        onBlur={(e) =>
                          (e.target.style.borderColor = "rgba(0,0,0,0.1)")
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 transition-opacity hover:opacity-90 text-sm"
                      style={{
                        background: ORANGE,
                        boxShadow: `0 8px 24px ${ORANGE}40`,
                      }}
                    >
                      점심 문의 제출하기 <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-center text-[11px] text-[#1A1A1A]/35 pt-1">
                      전화 문의:{" "}
                      <span className="font-bold text-[#1A1A1A]/50">
                        1577-8517
                      </span>{" "}
                      /{" "}
                      <span className="font-bold text-[#1A1A1A]/50">
                        010-5507-2905
                      </span>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#111111] pt-16 pb-10">
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr] gap-10 pb-12 border-b border-white/[0.08]">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: ORANGE }}
                >
                  <UtensilsCrossed
                    className="w-4 h-4 text-white"
                    strokeWidth={2.2}
                  />
                </div>
                <span className="font-extrabold text-white text-base">
                  위드런치
                </span>
              </div>
              <p className="text-white/35 text-[13px] leading-relaxed mb-6 max-w-[230px]">
                병원, 직장, 매장의 점심시간을 더 편하게 만들어주는 도시락
                배송 서비스.
              </p>
              <div className="flex gap-2">
                {[Instagram, Youtube].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-8 h-8 rounded-lg bg-white/[0.07] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/15 transition-all"
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {[
              {
                title: "서비스",
                items: [
                  "병원 점심 도시락",
                  "직장 점심 도시락",
                  "가게·매장 도시락",
                  "3일 체험 쿠폰",
                  "도시락 메뉴 안내",
                ],
              },
              {
                title: "이용 안내",
                items: [
                  "이용 방법",
                  "배송 가능 지역",
                  "인원별 상담",
                  "메뉴 구성 문의",
                  "알레르기 정보 안내",
                ],
              },
              {
                title: "연락처",
                items: [
                  "대표 1577-8517",
                  "010-5507-2905",
                  "카카오톡: WithLunch",
                  "병원·직장·매장 점심 배송",
                ],
              },
            ].map(({ title, items }) => (
              <div key={title}>
                <p className="text-white text-[11px] font-bold uppercase tracking-widest mb-5">
                  {title}
                </p>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item}>
                      <a
                        href="#contact"
                        className="text-white/35 text-[13px] hover:text-white/70 transition-colors"
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
            <p className="text-white/25 text-[12px]">
              © 2026 위드런치. All rights reserved.
            </p>
            <div className="flex gap-5">
              {["개인정보처리방침", "이용약관", "사업자 정보"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white/25 text-[12px] hover:text-white/50 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING COUPON BUTTON */}
      <button
        onClick={() => setCouponOpen(true)}
        className="fixed right-5 bottom-5 z-50 bg-white rounded-2xl shadow-2xl border border-black/[0.06] px-4 py-3 flex items-center gap-3 hover:-translate-y-1 transition-all duration-300"
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white cute-wiggle"
          style={{ background: ORANGE }}
        >
          <Gift className="w-5 h-5" />
        </div>
        <div className="text-left">
          <p className="text-[12px] font-extrabold text-[#1A1A1A]">
            3일 먹으면
          </p>
          <p className="text-[11px] font-bold" style={{ color: ORANGE }}>
            공짜 쿠폰 받기
          </p>
        </div>
      </button>

      {/* COUPON MODAL */}
      {couponOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center px-5">
          <div className="bg-white rounded-3xl max-w-[430px] w-full p-7 relative shadow-2xl slide-up">
            <button
              onClick={() => setCouponOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/[0.05] flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 cute-wiggle"
              style={{ background: `${ORANGE}15` }}
            >
              <Gift className="w-8 h-8" style={{ color: ORANGE }} />
            </div>

            <p
              className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3"
              style={{ color: ORANGE }}
            >
              첫 방문 혜택
            </p>

            <h3 className="text-2xl font-extrabold text-[#1A1A1A] leading-tight mb-3">
              첫 방문 혜택이에요
              <br />
              3일 먹으면 공짜 쿠폰!
            </h3>

            <p className="text-[#1A1A1A]/55 text-sm leading-relaxed mb-6">
              매일 점심 메뉴 고르느라 시간을 쓰고 있다면, 위드런치를
              3일만 경험해보세요. 점심시간이 얼마나 편해지는지 바로 느낄 수 있어요.
            </p>

            <div className="bg-[#F8F7F5] rounded-2xl p-4 mb-6 space-y-3">
              {[
                { icon: Smile, text: "매일 점심 메뉴 고민 줄이기" },
                { icon: Timer, text: "밖에 나가는 시간 아끼기" },
                { icon: Truck, text: "정해진 시간에 도시락 받기" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-sm font-medium text-[#1A1A1A]/70"
                >
                  <Icon className="w-4 h-4" style={{ color: ORANGE }} />
                  {text}
                </div>
              ))}
            </div>

            <a
              href="#contact"
              onClick={() => setCouponOpen(false)}
              className="w-full flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl transition-opacity hover:opacity-90"
              style={{ background: ORANGE }}
            >
              쿠폰 받고 문의하기 <ArrowRight className="w-4 h-4" />
            </a>

            <p className="text-center text-[11px] text-[#1A1A1A]/35 mt-4">
              병원·직장·매장 점심 배송 문의 가능
            </p>

            <button
              onClick={closeCouponToday}
              className="w-full mt-3 text-center text-[11px] text-[#1A1A1A]/35 hover:text-[#1A1A1A]/60 transition-colors"
            >
              오늘 하루 보지 않기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}