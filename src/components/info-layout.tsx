import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CALL_PHONE_TEL, KAKAO_URL, MENU_URL, ORANGE, SITE_URL, primaryNav } from "@/lib/site";

export function InfoLayout({
  path,
  title,
  description,
  children,
}: {
  path: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "홈",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${SITE_URL}${path}`,
      },
    ],
  };

  return (
    <div
      className="bg-[#F8F7F5] text-[#1A1A1A] min-h-screen pb-24 lg:pb-0"
      style={{ fontFamily: "'Plus Jakarta Sans', 'Noto Sans KR', sans-serif" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <SiteHeader />
      <main className="pt-16">
        <section className="max-w-[860px] mx-auto px-6 lg:px-10 py-16 lg:py-24">
          <nav aria-label="현재 위치" className="text-[13px] text-[#1A1A1A]/45 mb-6">
            <a href="/" className="hover:text-[#1A1A1A]">
              홈
            </a>
            <span className="mx-2">/</span>
            <span className="text-[#1A1A1A]/70">{title}</span>
          </nav>
          <h1 className="text-3xl lg:text-[2.6rem] font-extrabold leading-tight tracking-tight mb-5">
            {title}
          </h1>
          <p className="text-[#1A1A1A]/60 text-[16px] leading-relaxed mb-10">{description}</p>
          <div className="space-y-8">{children}</div>

          <aside className="mt-14 rounded-3xl bg-white border border-black/[0.06] p-6">
            <h2 className="text-lg font-extrabold mb-4">다른 안내</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {primaryNav
                .filter((item) => item.href !== path)
                .map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="block rounded-2xl bg-[#F8F7F5] px-4 py-3 text-sm font-bold hover:bg-[#FFF4EF] transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
          </aside>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${CALL_PHONE_TEL}`}
              className="inline-flex justify-center items-center font-bold text-sm text-white px-5 py-3 rounded-xl"
              style={{ background: ORANGE }}
            >
              전화 문의
            </a>
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center items-center font-bold text-sm px-5 py-3 rounded-xl bg-[#FFE812] text-black"
            >
              카카오톡 문의
            </a>
            <a
              href={MENU_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex justify-center items-center font-bold text-sm px-5 py-3 rounded-xl border-2"
              style={{ borderColor: ORANGE, color: ORANGE }}
            >
              식단표 보러가기
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
      <div className="fixed inset-x-0 bottom-0 z-50 lg:hidden bg-[#EB5722] text-white">
        <div className="grid grid-cols-3 divide-x divide-white/20">
          <a href={`tel:${CALL_PHONE_TEL}`} className="py-3.5 text-center text-[12px] font-bold">
            전화 문의
          </a>
          <a
            href={KAKAO_URL}
            target="_blank"
            rel="noreferrer"
            className="py-3.5 text-center text-[12px] font-bold"
          >
            카톡 문의
          </a>
          <a
            href={MENU_URL}
            target="_blank"
            rel="noreferrer"
            className="py-3.5 text-center text-[12px] font-bold"
          >
            식단표
          </a>
        </div>
      </div>
    </div>
  );
}
