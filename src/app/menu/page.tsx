import { InfoLayout } from "@/components/info-layout";
import { pageMetadata } from "@/lib/site";

const title = "메뉴 및 가격";
const description =
  "위드런치 기본 도시락과 샐러드/샌드위치는 8,000원입니다. 메뉴 구성과 가격을 확인하세요.";

export const metadata = pageMetadata({
  title: "메뉴 및 가격 | 위드런치",
  description,
  path: "/menu",
});

const items = [
  {
    name: "기본 도시락",
    price: "8,000원",
    text: "기본 도시락은 8,000원으로 부담 없이 점심을 준비할 수 있어요.",
  },
  {
    name: "샐러드/샌드위치",
    price: "8,000원",
    text: "가볍게 먹고 싶은 날에도 8,000원으로 부담 없이 선택할 수 있어요.",
  },
];

export default function MenuPage() {
  return (
    <InfoLayout path="/menu" title={title} description={description}>
      <section>
        <h2 className="text-xl font-extrabold mb-4">가격</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((item) => (
            <article
              key={item.name}
              className="rounded-3xl bg-white border border-black/[0.06] p-6"
            >
              <h3 className="font-extrabold text-lg">{item.name}</h3>
              <p className="text-2xl font-extrabold mt-2" style={{ color: "#EB5722" }}>
                {item.price}
              </p>
              <p className="text-[#1A1A1A]/55 text-sm leading-relaxed mt-3">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white border border-black/[0.06] p-6 lg:p-8">
        <h2 className="text-xl font-extrabold mb-3">이용 안내</h2>
        <p className="text-[#1A1A1A]/60 text-sm leading-relaxed">
          점심을 3일 연속 이용하시면 추가 할인 쿠폰을 드립니다. 먼저 맛보고,
          괜찮으면 그때 계속 이용할 수 있습니다.
        </p>
        <p className="text-[12px] text-[#1A1A1A]/40 leading-relaxed mt-2">
          오프라인으로 드린 쿠폰과는 중복 적용되지 않습니다.
        </p>
        <p className="text-[#1A1A1A]/60 text-sm leading-relaxed mt-3">
          이번 주 구성은{" "}
          <a href="/weekly-menu" className="font-bold underline" style={{ color: "#EB5722" }}>
            이번 주 식단표
          </a>
          에서 네이버 플레이스로 확인할 수 있습니다.
        </p>
      </section>
    </InfoLayout>
  );
}
