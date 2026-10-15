import { InfoLayout } from "@/components/info-layout";
import { MENU_URL, pageMetadata } from "@/lib/site";

const title = "이번 주 식단표";
const description =
  "위드런치 이번 주 식단은 네이버 플레이스에서 확인할 수 있습니다. 도시락, 샐러드, 샌드위치 구성을 살펴보세요.";

export const metadata = pageMetadata({
  title: "이번 주 식단표 | 위드런치",
  description,
  path: "/weekly-menu",
});

export default function WeeklyMenuPage() {
  return (
    <InfoLayout path="/weekly-menu" title={title} description={description}>
      <section className="rounded-3xl bg-white border border-black/[0.06] p-6 lg:p-8">
        <h2 className="text-xl font-extrabold mb-3">식단 확인</h2>
        <p className="text-[#1A1A1A]/60 text-sm leading-relaxed">
          이번 주 식단은 위드런치 네이버 플레이스에 올라옵니다. 홈페이지에는
          주차별 메뉴 목록을 따로 보관하지 않으니, 아래 링크에서 현재 식단을
          확인해 주세요.
        </p>
        <a
          href={MENU_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex mt-5 font-bold text-sm text-white px-5 py-3 rounded-xl"
          style={{ background: "#EB5722" }}
        >
          이번 주 식단표 보기
        </a>
      </section>

      <section className="rounded-3xl bg-white border border-black/[0.06] p-6 lg:p-8">
        <h2 className="text-xl font-extrabold mb-3">구성</h2>
        <ul className="space-y-2 text-sm text-[#1A1A1A]/70">
          <li>도시락</li>
          <li>샐러드</li>
          <li>샌드위치</li>
        </ul>
        <p className="text-[#1A1A1A]/50 text-sm leading-relaxed mt-4">
          가격과 주문 방법은{" "}
          <a href="/menu" className="font-bold underline" style={{ color: "#EB5722" }}>
            메뉴 및 가격
          </a>
          ,{" "}
          <a href="/order" className="font-bold underline" style={{ color: "#EB5722" }}>
            주문 방법
          </a>
          에서 안내합니다.
        </p>
      </section>
    </InfoLayout>
  );
}
