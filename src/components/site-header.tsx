"use client";

import { useState } from "react";
import { ArrowUpRight, ChevronRight, Menu, MessageCircle, Phone, X } from "lucide-react";
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import {
  CALL_PHONE_TEL,
  DISPLAY_PHONE,
  KAKAO_URL,
  MENU_URL,
  ORANGE,
  primaryNav,
} from "@/lib/site";

const logo = "/logo.png";

export function SiteHeader() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-md shadow-[0_1px_0_rgba(0,0,0,0.06)]">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 flex items-center justify-between h-16 gap-4">
        <a href="/" className="flex items-center shrink-0">
          <ImageWithFallback
            src={logo}
            alt="위드런치 With Lunch"
            className="h-9 w-auto object-contain shrink-0"
          />
          <span className="font-extrabold text-base tracking-tight ml-2 text-[#ea5312]">
            위드런치
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-7" aria-label="주요 메뉴">
          {primaryNav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] font-medium text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#contact"
            className="text-[13px] font-medium text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors whitespace-nowrap"
          >
            문의하기
          </a>
        </nav>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <a
            href={`tel:${CALL_PHONE_TEL}`}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            {DISPLAY_PHONE}
          </a>
          <a
            href={MENU_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-[13px] font-bold px-4 py-2 rounded-lg border-2 transition-all hover:bg-[#FFF4EF]"
            style={{ borderColor: ORANGE, color: ORANGE }}
          >
            식단표 보러가기 <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-white text-[13px] font-bold px-4 py-2 rounded-lg transition-all hover:opacity-90"
            style={{ background: ORANGE }}
          >
            카톡 문의 <MessageCircle className="w-3.5 h-3.5" />
          </a>
        </div>

        <button
          className="lg:hidden p-1.5 shrink-0"
          onClick={() => setNavOpen(!navOpen)}
          aria-label={navOpen ? "메뉴 닫기" : "메뉴 열기"}
        >
          {navOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {navOpen && (
        <div className="lg:hidden bg-white border-t border-black/[0.06] px-5 py-6 shadow-lg">
          <nav className="space-y-1" aria-label="모바일 메뉴">
            {primaryNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center justify-between py-3.5 border-b border-black/[0.05] text-[15px] font-semibold text-[#1A1A1A]"
                onClick={() => setNavOpen(false)}
              >
                {item.label}
                <ChevronRight className="w-4 h-4 text-[#1A1A1A]/25" />
              </a>
            ))}
            <a
              href="/#contact"
              className="flex items-center justify-between py-3.5 border-b border-black/[0.05] text-[15px] font-semibold text-[#1A1A1A]"
              onClick={() => setNavOpen(false)}
            >
              문의하기
              <ChevronRight className="w-4 h-4 text-[#1A1A1A]/25" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
