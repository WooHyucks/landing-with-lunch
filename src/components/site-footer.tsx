import { CALL_PHONE_TEL, DISPLAY_PHONE, KAKAO_URL, MENU_URL, primaryNav } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-[#111111] pt-16 pb-10">
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10">
        <div className="grid gap-10 pb-12 border-b border-white/[0.08] md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <p className="text-white font-extrabold text-lg mb-3">위드런치</p>
            <p className="text-white/35 text-[13px] leading-relaxed max-w-[280px]">
              병원, 공장, 창고, 사무실의 점심시간을 더 편하게 만들어주는 도시락
              배송 서비스.
            </p>
            <p className="mt-5">
              <a
                href={`tel:${CALL_PHONE_TEL}`}
                className="text-white font-extrabold hover:text-white/80"
              >
                대표번호 {DISPLAY_PHONE}
              </a>
            </p>
          </div>

          <div>
            <p className="text-white text-[11px] font-bold uppercase tracking-widest mb-5">
              안내
            </p>
            <ul className="space-y-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/35 text-[13px] hover:text-white/70 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-white text-[11px] font-bold uppercase tracking-widest mb-5">
              문의
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${CALL_PHONE_TEL}`}
                  className="text-white/35 text-[13px] hover:text-white/70 transition-colors"
                >
                  전화 문의
                </a>
              </li>
              <li>
                <a
                  href={KAKAO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/35 text-[13px] hover:text-white/70 transition-colors"
                >
                  카카오톡 문의
                </a>
              </li>
              <li>
                <a
                  href={MENU_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/35 text-[13px] hover:text-white/70 transition-colors"
                >
                  식단표 보러가기
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="text-white/25 text-[12px] pt-8">© 2026 위드런치. All rights reserved.</p>
      </div>
    </footer>
  );
}
