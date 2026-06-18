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
  Send,
  Search,
  Copy,
} from "lucide-react";

const heroFood = "/images/KakaoTalk_Photo_2026-04-01-17-50-43_003.jpeg";
const bentoFlatlay = "/images/KakaoTalk_Photo_2026-04-01-17-50-43_002.jpeg";
const bentoArtistic = "/images/KakaoTalk_Photo_2026-04-01-17-50-43_006.jpeg";
const saladBowl = "/images/KakaoTalk_Photo_2026-04-01-17-50-43_001.jpeg";
const sandwich = "/images/KakaoTalk_Photo_2026-04-01-17-50-43_007.jpeg";
const brochureFood = "/images/KakaoTalk_Photo_2026-04-01-18-00-35_002.jpeg";

const ORANGE = "#EB5722";

const MAIN_PHONE = "1577-8519";
const MAIN_PHONE_TEL = "15778519";
const MOBILE_PHONE = "010-5507-2905";
const MOBILE_PHONE_TEL = "01055072905";
const KAKAO_ID = "WithLunch";

// 실제 카카오 채널 URL이 있으면 여기에 넣으면 바로 이동됩니다.
// 예: const KAKAO_URL = "https://pf.kakao.com/_xxxxxx";
const KAKAO_URL = "#";

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
    title: "도시락 8,000원",
    desc: "부담 없는 가격으로 든든한 점심을 받아보세요.",
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
  const [kakaoGuideOpen, setKakaoGuideOpen] = useState(false);
  const [copied, setCopied] = useState(false);

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
      5000,
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
      5000,
    );
  };

  const closeCouponToday = () => {
    const today = new Date().toISOString().slice(0, 10);
    localStorage.setItem("withlunch_coupon_modal_date", today);
    setCouponOpen(false);
  };

  const openKakaoGuide = (
    e?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    if (KAKAO_URL === "#") {
      e?.preventDefault();
      setCouponOpen(false);
      setKakaoGuideOpen(true);
      return;
    }
  };

  const copyKakaoId = async () => {
    try {
      await navigator.clipboard.writeText(KAKAO_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  const services = [
    {
      no: "01",
      icon: Hospital,
      title: "병원 점심\n도시락 배송",
      desc: "진료와 업무로 바쁜 병원 직원분들을 위해 정해진 시간에 도시락을 배송합니다. 밖에 나가지 않아도 든든한 점심을 챙길 수 있어요.",
      tags: ["도시락 8,000원", "음료 포함 8,200원", "정시 배송 상담"],
      img: bentoFlatlay,
      badge: "병원 추천",
    },
    {
      no: "02",
      icon: Briefcase,
      title: "직장 점심\n정기 배송",
      desc: "매일 점심 메뉴를 고르고 이동하는 시간을 줄여드립니다. 사무실에서 편하게 받아보는 따뜻한 한 끼를 경험하세요.",
      tags: ["메뉴 고민 없음", "사무실 배송", "전화·카톡 빠른 상담"],
      img: bentoArtistic,
      badge: "직장 인기",
    },
    {
      no: "03",
      icon: Store,
      title: "가게·매장\n점심 도시락",
      desc: "점심시간에도 자리를 비우기 어려운 매장, 학원, 소형 사업장을 위한 도시락 배송 서비스입니다.",
      tags: ["소규모 상담 가능", "시간 절약", "간편 문의"],
      img: saladBowl,
      badge: "소규모 가능",
    },
  ];

  const metrics = [
    {
      value: "8,000원",
      label: "도시락 가격",
      sub: "basic lunchbox",
      icon: UtensilsCrossed,
    },
    {
      value: "8,200원",
      label: "음료 포함",
      sub: "with drink",
      icon: Coffee,
    },
    {
      value: "3일",
      label: "체험 후 쿠폰",
      sub: "trial coupon",
      icon: TicketPercent,
    },
    {
      value: "30분+",
      label: "점심시간 절약",
      sub: "saved lunch time",
      icon: Timer,
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
              { label: "가격 안내", href: "#price" },
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
              href={`tel:${MAIN_PHONE_TEL}`}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              {MAIN_PHONE}
            </a>

            <a
              href={KAKAO_URL}
              target={KAKAO_URL === "#" ? undefined : "_blank"}
              rel={KAKAO_URL === "#" ? undefined : "noreferrer"}
              onClick={openKakaoGuide}
              className="flex items-center gap-1.5 text-white text-[13px] font-bold px-4 py-2 rounded-lg transition-all hover:opacity-90"
              style={{ background: ORANGE }}
            >
              카톡 문의 <MessageCircle className="w-3.5 h-3.5" />
            </a>
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
              { label: "가격 안내", href: "#price" },
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

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${MAIN_PHONE_TEL}`}
                className="flex justify-center items-center gap-2 text-white text-sm font-bold py-3 rounded-xl"
                style={{ background: ORANGE }}
                onClick={() => setNavOpen(false)}
              >
                전화하기
              </a>
              <a
                href={KAKAO_URL}
                target={KAKAO_URL === "#" ? undefined : "_blank"}
                rel={KAKAO_URL === "#" ? undefined : "noreferrer"}
                onClick={(e) => {
                  setNavOpen(false);
                  openKakaoGuide(e);
                }}
                className="flex justify-center items-center gap-2 text-black text-sm font-bold py-3 rounded-xl bg-[#FFE812]"
              >
                카톡문의
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="pt-16 min-h-[100svh] grid lg:grid-cols-[0.92fr_1.08fr] xl:grid-cols-[1fr_1fr] overflow-hidden">
        <div className="bg-[#141414] flex flex-col justify-center px-6 sm:px-10 lg:px-10 xl:px-16 2xl:px-40 py-14 sm:py-16 lg:py-10 xl:py-14 2xl:py-0 min-h-[calc(100svh-4rem)] relative overflow-hidden">
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

          <div className="relative z-10 max-w-[560px] xl:max-w-[500px] 2xl:max-w-[560px]">
            <div
              className="inline-flex items-center gap-2 mb-5 xl:mb-6 2xl:mb-8 text-[11px] font-bold tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border soft-pulse"
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
              도시락 8,000원 · 음료 포함 8,200원
            </div>

            <h1 className="text-[2.45rem] sm:text-[2.75rem] lg:text-[2.3rem] xl:text-[2.6rem] 2xl:text-[3rem] font-extrabold text-white leading-[1.08] tracking-[-0.03em] mb-4 xl:mb-5 2xl:mb-6">
              오늘 점심 뭐 먹지?
              <br />
              <span style={{ color: ORANGE }}>그 고민,</span>
              <br />
              위드런치가
              <br />
              끝내드릴게요
            </h1>

            <p className="text-white/55 text-[15px] xl:text-[16px] 2xl:text-[17px] leading-relaxed mb-5 xl:mb-6 2xl:mb-8 font-normal">
              병원, 사무실, 매장에서 바쁜 점심시간마다
              <br className="hidden lg:block" />
              밖에 나가고 줄 서는 시간을 줄여드립니다.
              <br className="hidden lg:block" />
              부담 없는 가격으로 매일 다른 점심을 받아보세요.
            </p>

            <div className="bg-white/[0.06] border border-white/[0.1] rounded-2xl p-4 2xl:p-5 mb-5 xl:mb-6 2xl:mb-8 transition-all duration-500 slide-up">
              <div className="flex items-start gap-3 2xl:gap-4">
                <div className="w-11 h-11 2xl:w-12 2xl:h-12 rounded-2xl bg-white/[0.08] flex items-center justify-center text-2xl shrink-0">
                  {lunchPains[painIndex].emoji}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {(() => {
                      const Icon = lunchPains[painIndex].icon;
                      return (
                        <Icon className="w-4 h-4" style={{ color: ORANGE }} />
                      );
                    })()}
                    <p className="text-white font-extrabold text-[15px] 2xl:text-base">
                      {lunchPains[painIndex].title}
                    </p>
                  </div>
                  <p className="text-white/45 text-[13px] 2xl:text-sm leading-relaxed">
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

            <div className="flex flex-wrap gap-3 mb-6 xl:mb-7 2xl:mb-12">
              <a
                href={`tel:${MAIN_PHONE_TEL}`}
                className="flex items-center gap-2 text-white font-bold text-sm px-5 2xl:px-6 py-3 2xl:py-3.5 rounded-xl transition-all hover:-translate-y-0.5 shadow-lg"
                style={{
                  background: ORANGE,
                  boxShadow: `0 8px 24px ${ORANGE}50`,
                }}
              >
                전화로 바로 문의 <Phone className="w-4 h-4" />
              </a>

              <a
                href={KAKAO_URL}
                target={KAKAO_URL === "#" ? undefined : "_blank"}
                rel={KAKAO_URL === "#" ? undefined : "noreferrer"}
                onClick={openKakaoGuide}
                className="flex items-center gap-2 font-bold text-sm px-5 2xl:px-6 py-3 2xl:py-3.5 rounded-xl bg-[#FFE812] text-black transition-all hover:-translate-y-0.5"
              >
                카카오톡 문의 <MessageCircle className="w-4 h-4" />
              </a>
            </div>

            <div className="grid grid-cols-3 gap-px bg-white/[0.08] rounded-2xl overflow-hidden">
              {[
                { v: "8,000원", l: "도시락", icon: UtensilsCrossed },
                { v: "8,200원", l: "음료 포함", icon: Coffee },
                { v: "3일", l: "쿠폰 체험", icon: Gift },
              ].map(({ v, l, icon: Icon }) => (
                <div
                  key={l}
                  className="bg-[#1C1C1C] px-3 2xl:px-4 py-3 2xl:py-4 text-center"
                >
                  <Icon
                    className="w-4 h-4 mx-auto mb-2"
                    style={{ color: ORANGE }}
                  />
                  <p
                    className="text-base 2xl:text-xl font-extrabold tabular-nums mb-0.5"
                    style={{ color: ORANGE }}
                  >
                    {v}
                  </p>
                  <p className="text-white/40 text-[10px] 2xl:text-[11px] font-medium">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative min-h-[56vh] lg:min-h-[calc(100svh-4rem)]">
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

          <div className="absolute top-6 xl:top-8 left-6 xl:left-8 bg-white rounded-2xl p-4 shadow-2xl max-w-[210px] soft-float">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: `${ORANGE}15` }}
              >
                <UtensilsCrossed
                  className="w-4 h-4"
                  style={{ color: ORANGE }}
                />
              </div>
              <span className="text-[11px] font-bold text-[#1A1A1A]/45 uppercase tracking-wide">
                기본 도시락
              </span>
            </div>
            <p className="text-[#1A1A1A] font-extrabold text-2xl leading-tight">
              8,000원
            </p>
            <p className="text-[#1A1A1A]/45 text-xs mt-1">음료 포함 8,200원</p>
          </div>

          <div className="absolute bottom-6 xl:bottom-8 right-6 xl:right-8 bg-white rounded-2xl p-4 xl:p-5 shadow-2xl max-w-[230px]">
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: ORANGE }}
              >
                <Phone className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-[11px] font-bold text-[#1A1A1A]/50 uppercase tracking-wide">
                빠른 상담
              </span>
            </div>
            <p className="text-[#1A1A1A] font-extrabold text-lg leading-tight mb-1">
              {MAIN_PHONE}
            </p>
            <p className="text-[#1A1A1A]/45 text-xs leading-relaxed mb-3">
              지역·인원·시작일을 바로 확인해드려요.
            </p>
            <div className="flex items-center gap-1.5">
              <div className="flex-1 h-1.5 rounded-full bg-[#F0F0F0]">
                <div
                  className="h-full rounded-full"
                  style={{ width: "92%", background: ORANGE }}
                />
              </div>
              <span className="text-[11px] font-bold" style={{ color: ORANGE }}>
                상담가능
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
            <a
              href={`tel:${MAIN_PHONE_TEL}`}
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
              전화로 문의하기 <ArrowUpRight className="w-4 h-4" />
            </a>
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
                <span
                  className="text-[11px] font-bold"
                  style={{ color: ORANGE }}
                >
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
              도시락, 샐러드, 샌드위치까지. 바쁜 하루에도 가볍게, 든든하게 먹을
              수 있도록 준비합니다.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            {[
              {
                label: "든든한 도시락",
                sub: "기본 도시락 8,000원",
                img: bentoFlatlay,
                accent: "01",
                icon: UtensilsCrossed,
              },
              {
                label: "음료 포함 구성",
                sub: "도시락 + 음료 8,200원",
                img: saladBowl,
                accent: "02",
                icon: Coffee,
              },
              {
                label: "간편 점심 선택",
                sub: "병원·직장·매장 점심 상담 가능",
                img: sandwich,
                accent: "03",
                icon: Heart,
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
                    전화로 문의하기 <ArrowRight className="w-3 h-3" />
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
              복잡한 신청 없이,
              <br />
              전화나 카톡으로 바로.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Phone,
                title: "1. 전화 또는 카톡 문의",
                desc: "지역, 인원, 시작일을 알려주시면 바로 상담해드립니다.",
              },
              {
                icon: MessageCircle,
                title: "2. 가능 여부 확인",
                desc: "배송 가능 지역과 메뉴 구성을 빠르게 안내해드립니다.",
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

      {/* PRICE */}
      <section
        id="price"
        className="bg-[#141414] py-24 lg:py-32 relative overflow-hidden"
      >
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[680px] h-[320px] rounded-full opacity-10 blur-[120px] pointer-events-none"
          style={{ background: ORANGE }}
        />

        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 relative z-10">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.14em] uppercase mb-5 px-3 py-1.5 rounded-full"
                style={{ color: ORANGE, background: `${ORANGE}15` }}
              >
                <TicketPercent className="w-3.5 h-3.5" />
                가격 안내
              </div>

              <h2 className="text-3xl lg:text-[2.8rem] font-extrabold text-white leading-tight tracking-tight mb-6">
                가격은 단순하게.
                <br />
                점심은 든든하게.
              </h2>

              <p className="text-white/50 text-[15px] leading-relaxed max-w-xl mb-8">
                위드런치는 복잡한 가격표보다 바로 이해되는 가격을 안내합니다.
                기본 도시락은 8,000원, 음료 포함 구성은 8,200원입니다.
              </p>

              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { icon: UtensilsCrossed, text: "기본 도시락 8,000원" },
                  { icon: Coffee, text: "음료 포함 8,200원" },
                  { icon: Phone, text: "전화·카톡 바로 상담" },
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

            <div className="grid gap-4">
              <div className="bg-white rounded-3xl p-8 lg:p-10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p
                      className="text-[11px] font-bold tracking-[0.14em] uppercase mb-2"
                      style={{ color: ORANGE }}
                    >
                      기본 구성
                    </p>
                    <h3 className="text-[#1A1A1A] font-extrabold text-2xl">
                      도시락
                    </h3>
                  </div>
                  <UtensilsCrossed
                    className="w-8 h-8"
                    style={{ color: ORANGE }}
                  />
                </div>

                <p
                  className="text-5xl font-extrabold tracking-tight mb-3"
                  style={{ color: ORANGE }}
                >
                  8,000원
                </p>
                <p className="text-[#1A1A1A]/45 text-sm">
                  병원·직장·매장 점심 도시락 상담 가능
                </p>
              </div>

              <div
                className="rounded-3xl p-8 lg:p-10"
                style={{ background: ORANGE }}
              >
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <p className="text-white/70 text-[11px] font-bold tracking-[0.14em] uppercase mb-2">
                      음료 포함
                    </p>
                    <h3 className="text-white font-extrabold text-2xl">
                      도시락 + 음료
                    </h3>
                  </div>
                  <Coffee className="w-8 h-8 text-white/80" />
                </div>

                <p className="text-white text-5xl font-extrabold tracking-tight mb-3">
                  8,200원
                </p>
                <p className="text-white/70 text-sm">
                  음료까지 함께 필요한 곳에 추천드려요.
                </p>
              </div>
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
                  className="text-3xl lg:text-4xl font-extrabold tabular-nums mb-2"
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
                  메뉴 고르고, 이동하고, 줄 서는 시간을 줄이면 점심시간이 훨씬
                  여유로워집니다.
                </p>
              </div>
              <a
                href={`tel:${MAIN_PHONE_TEL}`}
                className="mt-8 flex items-center justify-between bg-white rounded-xl px-5 py-4 font-bold text-sm hover:opacity-95 transition-opacity"
                style={{ color: ORANGE }}
              >
                전화로 바로 문의
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
                  background: i === current ? ORANGE : "rgba(0,0,0,0.16)",
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
                바로 상담하기
              </p>

              <h2 className="text-3xl lg:text-[2.5rem] font-extrabold text-[#1A1A1A] leading-tight tracking-tight mb-6">
                폼 작성 없이,
                <br />
                전화나 카카오톡으로
                <br />
                바로 물어보세요.
              </h2>

              <p className="text-[#1A1A1A]/55 text-[15px] leading-relaxed mb-10">
                “우리 지역도 배송되나요?”, “몇 명부터 가능한가요?”, “내일부터
                받을 수 있나요?” 같은 질문은 전화나 카카오톡으로 가장 빠르게
                안내드릴 수 있어요.
              </p>

              <div className="space-y-0 divide-y divide-[rgba(0,0,0,0.06)]">
                {[
                  {
                    icon: UtensilsCrossed,
                    title: "도시락 8,000원",
                    desc: "기본 도시락은 8,000원으로 부담 없이 점심을 준비할 수 있어요.",
                  },
                  {
                    icon: Coffee,
                    title: "음료 포함 8,200원",
                    desc: "음료까지 함께 필요한 곳은 8,200원 구성으로 안내드립니다.",
                  },
                  {
                    icon: MapPin,
                    title: "배송 가능 지역 확인",
                    desc: "병원, 사무실, 매장 위치를 알려주시면 가능 여부를 바로 안내드립니다.",
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
                      "linear-gradient(to right, rgba(235,87,34,0.5), transparent)",
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
            </div>

            <div className="bg-[#F8F7F5] rounded-3xl p-8 lg:p-10 sticky top-24">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: `${ORANGE}15` }}
              >
                <MessageCircle className="w-7 h-7" style={{ color: ORANGE }} />
              </div>

              <h3 className="text-2xl font-extrabold text-[#1A1A1A] leading-tight mb-3">
                지금 바로
                <br />
                점심 도시락 상담하기
              </h3>

              <p className="text-[#1A1A1A]/55 text-sm leading-relaxed mb-8">
                가격, 배송 지역, 이용 인원, 시작 가능일을 전화나 카카오톡으로
                빠르게 확인해보세요.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-white rounded-2xl p-5 border border-black/[0.06]">
                  <UtensilsCrossed
                    className="w-5 h-5 mb-3"
                    style={{ color: ORANGE }}
                  />
                  <p className="text-[11px] text-[#1A1A1A]/40 font-bold mb-1">
                    도시락
                  </p>
                  <p
                    className="text-2xl font-extrabold"
                    style={{ color: ORANGE }}
                  >
                    8,000원
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-black/[0.06]">
                  <Coffee className="w-5 h-5 mb-3" style={{ color: ORANGE }} />
                  <p className="text-[11px] text-[#1A1A1A]/40 font-bold mb-1">
                    음료 포함
                  </p>
                  <p
                    className="text-2xl font-extrabold"
                    style={{ color: ORANGE }}
                  >
                    8,200원
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-8">
                <a
                  href={`tel:${MAIN_PHONE_TEL}`}
                  className="group flex items-center justify-between w-full rounded-2xl bg-white border border-black/[0.06] p-5 hover:-translate-y-0.5 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: ORANGE }}
                    >
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#1A1A1A]/40 uppercase tracking-wider mb-0.5">
                        대표번호
                      </p>
                      <p className="text-xl font-extrabold text-[#1A1A1A]">
                        {MAIN_PHONE}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    style={{ color: ORANGE }}
                  />
                </a>

                <a
                  href={`tel:${MOBILE_PHONE_TEL}`}
                  className="group flex items-center justify-between w-full rounded-2xl bg-white border border-black/[0.06] p-5 hover:-translate-y-0.5 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: `${ORANGE}15` }}
                    >
                      <Phone className="w-5 h-5" style={{ color: ORANGE }} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-[#1A1A1A]/40 uppercase tracking-wider mb-0.5">
                        휴대폰 문의
                      </p>
                      <p className="text-xl font-extrabold text-[#1A1A1A]">
                        {MOBILE_PHONE}
                      </p>
                    </div>
                  </div>
                  <ArrowRight
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    style={{ color: ORANGE }}
                  />
                </a>

                <a
                  href={KAKAO_URL}
                  target={KAKAO_URL === "#" ? undefined : "_blank"}
                  rel={KAKAO_URL === "#" ? undefined : "noreferrer"}
                  onClick={openKakaoGuide}
                  className="group flex items-center justify-between w-full rounded-2xl border border-black/[0.06] p-5 hover:-translate-y-0.5 transition-all shadow-sm"
                  style={{ background: "#FFE812" }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-black/45 uppercase tracking-wider mb-0.5">
                        카카오톡 문의
                      </p>
                      <p className="text-xl font-extrabold text-black">
                        {KAKAO_ID}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-black group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-black/[0.06]">
                <p
                  className="text-[11px] font-bold tracking-[0.14em] uppercase mb-4"
                  style={{ color: ORANGE }}
                >
                  상담 전에 알려주시면 좋아요
                </p>

                <div className="space-y-3">
                  {[
                    "배송 받을 지역",
                    "하루 이용 인원",
                    "원하는 시작일",
                    "음료 포함 여부",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-[#1A1A1A]/65"
                    >
                      <CheckCircle2
                        className="w-4 h-4"
                        style={{ color: ORANGE }}
                      />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-center text-[11px] text-[#1A1A1A]/35 mt-5">
                빠른 상담은 전화 또는 카카오톡 문의가 가장 정확합니다.
              </p>
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
                병원, 직장, 매장의 점심시간을 더 편하게 만들어주는 도시락 배송
                서비스.
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
                  "도시락 8,000원",
                  "음료 포함 8,200원",
                  "병원 점심 도시락",
                  "직장 점심 도시락",
                  "가게·매장 도시락",
                ],
              },
              {
                title: "이용 안내",
                items: [
                  "전화 문의",
                  "카카오톡 문의",
                  "배송 가능 지역",
                  "인원별 상담",
                  "시작일 상담",
                ],
              },
              {
                title: "연락처",
                items: [
                  `대표 ${MAIN_PHONE}`,
                  MOBILE_PHONE,
                  `카카오톡: ${KAKAO_ID}`,
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

      {/* FLOATING CONTACT BUTTON */}
      <div className="fixed right-5 bottom-5 z-50 flex flex-col gap-2">
        <a
          href={`tel:${MAIN_PHONE_TEL}`}
          className="bg-white rounded-2xl shadow-2xl border border-black/[0.06] px-4 py-3 flex items-center gap-3 hover:-translate-y-1 transition-all duration-300"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
            style={{ background: ORANGE }}
          >
            <Phone className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-[12px] font-extrabold text-[#1A1A1A]">
              전화 문의
            </p>
            <p className="text-[11px] font-bold" style={{ color: ORANGE }}>
              {MAIN_PHONE}
            </p>
          </div>
        </a>

        <button
          onClick={() => setCouponOpen(true)}
          className="bg-white rounded-2xl shadow-2xl border border-black/[0.06] px-4 py-3 flex items-center gap-3 hover:-translate-y-1 transition-all duration-300"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white cute-wiggle"
            style={{ background: ORANGE }}
          >
            <Gift className="w-5 h-5" />
          </div>
          <div className="text-left">
            <p className="text-[12px] font-extrabold text-[#1A1A1A]">
              3일 쿠폰
            </p>
            <p className="text-[11px] font-bold" style={{ color: ORANGE }}>
              전화·카톡 문의
            </p>
          </div>
        </button>
      </div>

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
              도시락 8,000원,
              <br />
              3일 먹으면 공짜 쿠폰!
            </h3>

            <p className="text-[#1A1A1A]/55 text-sm leading-relaxed mb-6">
              음료 포함은 8,200원입니다. 매일 점심 메뉴 고르느라 시간을 쓰고
              있다면, 전화나 카카오톡으로 바로 문의해보세요.
            </p>

            <div className="bg-[#F8F7F5] rounded-2xl p-4 mb-6 space-y-3">
              {[
                { icon: UtensilsCrossed, text: "도시락 8,000원" },
                { icon: Coffee, text: "음료 포함 8,200원" },
                { icon: Truck, text: "배송 가능 지역 바로 확인" },
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

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${MAIN_PHONE_TEL}`}
                onClick={() => setCouponOpen(false)}
                className="flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl transition-opacity hover:opacity-90"
                style={{ background: ORANGE }}
              >
                전화하기 <Phone className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  setCouponOpen(false);
                  setKakaoGuideOpen(true);
                }}
                className="flex items-center justify-center gap-2 font-bold py-4 rounded-xl transition-opacity hover:opacity-90 bg-[#FFE812] text-black"
              >
                카톡문의 <MessageCircle className="w-4 h-4" />
              </button>
            </div>

            <p className="text-center text-[11px] text-[#1A1A1A]/35 mt-4">
              대표번호 {MAIN_PHONE} · 카카오톡 {KAKAO_ID}
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

      {/* KAKAO GUIDE MODAL */}
      {kakaoGuideOpen && (
        <div className="fixed inset-0 z-[110] bg-black/50 backdrop-blur-sm flex items-center justify-center px-5">
          <div className="bg-white rounded-3xl max-w-[430px] w-full p-7 relative shadow-2xl slide-up overflow-hidden">
            <button
              onClick={() => setKakaoGuideOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/[0.05] flex items-center justify-center z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#FFE812]/60 blur-2xl" />

            <div className="relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-[#FFE812] flex items-center justify-center mb-5">
                <MessageCircle className="w-8 h-8 text-black" />
              </div>

              <p className="text-[11px] font-bold tracking-[0.14em] uppercase mb-3 text-black/45">
                카카오톡 문의 안내
              </p>

              <h3 className="text-2xl font-extrabold text-[#1A1A1A] leading-tight mb-3">
                카카오톡에서
                <br />
                <span style={{ color: ORANGE }}>{KAKAO_ID}</span>를 검색해주세요
              </h3>

              <p className="text-[#1A1A1A]/55 text-sm leading-relaxed mb-6">
                카카오톡 친구 또는 채널 검색창에 아래 이름을 입력하면 위드런치
                문의가 가능합니다.
              </p>

              <div className="bg-[#F8F7F5] rounded-2xl p-5 mb-5 border border-black/[0.05]">
                <div className="flex items-center gap-3 mb-4">
                  <Search className="w-5 h-5" style={{ color: ORANGE }} />
                  <p className="text-sm font-bold text-[#1A1A1A]/55">검색어</p>
                </div>

                <div className="flex items-center justify-between bg-white rounded-xl px-4 py-4 border border-black/[0.06]">
                  <p className="text-xl font-extrabold text-[#1A1A1A]">
                    {KAKAO_ID}
                  </p>
                  <button
                    onClick={copyKakaoId}
                    className="flex items-center gap-1.5 text-[12px] font-bold px-3 py-2 rounded-lg transition-colors"
                    style={{
                      background: copied ? `${ORANGE}18` : "#F2F2F2",
                      color: copied ? ORANGE : "rgba(26,26,26,0.6)",
                    }}
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? "복사됨" : "복사"}
                  </button>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  "카카오톡 실행",
                  "상단 검색창에서 WithLunch 검색",
                  "배송 지역·인원·시작일 문의",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-[#1A1A1A]/65"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white shrink-0"
                      style={{ background: ORANGE }}
                    >
                      {index + 1}
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${MAIN_PHONE_TEL}`}
                  className="flex items-center justify-center gap-2 text-white font-bold py-4 rounded-xl transition-opacity hover:opacity-90"
                  style={{ background: ORANGE }}
                  onClick={() => setKakaoGuideOpen(false)}
                >
                  전화하기 <Phone className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setKakaoGuideOpen(false)}
                  className="flex items-center justify-center gap-2 font-bold py-4 rounded-xl bg-[#111111] text-white transition-opacity hover:opacity-90"
                >
                  확인했어요 <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>

              <p className="text-center text-[11px] text-[#1A1A1A]/35 mt-4">
                대표번호 {MAIN_PHONE} · 휴대폰 {MOBILE_PHONE}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
