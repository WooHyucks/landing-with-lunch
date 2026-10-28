import { InfoLayout } from "@/components/info-layout";
import { pageMetadata } from "@/lib/site";

const title = "주문 방법";
const description =
  "위드런치 주문은 전화 또는 카카오톡으로 지역, 인원, 시작일을 알려주시면 됩니다.";

export const metadata = pageMetadata({
  title: "주문 방법 | 위드런치",
  description,
  path: "/order",
});

const steps = [
  {
    title: "1. 전화 또는 카톡 문의",
    text: "지역, 인원, 시작일을 알려주시면 바로 상담해드립니다.",
  },
  {
    title: "2. 가능 여부 확인",
    text: "배송 가능 지역과 메뉴 구성을 빠르게 안내해드립니다.",
  },
  {
    title: "3. 도시락 받기",
    text: "정해진 시간에 점심 도시락을 받아보세요.",
  },
];

export default function OrderPage() {
  return (
    <InfoLayout path="/order" title={title} description={description}>
      <section>
        <h2 className="text-xl font-extrabold mb-4">주문 순서</h2>
        <ol className="space-y-4">
          {steps.map((step) => (
            <li
              key={step.title}
              className="rounded-3xl bg-white border border-black/[0.06] p-6"
            >
              <h3 className="font-extrabold text-lg">{step.title}</h3>
              <p className="text-[#1A1A1A]/55 text-sm leading-relaxed mt-2">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="rounded-3xl bg-white border border-black/[0.06] p-6 lg:p-8">
        <h2 className="text-xl font-extrabold mb-3">상담 전에 알려주시면 좋아요</h2>
        <ul className="space-y-2 text-sm text-[#1A1A1A]/70">
          <li>배송 받을 지역</li>
          <li>하루 이용 인원</li>
          <li>원하는 시작일</li>
          <li>샐러드/샌드위치 여부</li>
        </ul>
        <p className="text-[#1A1A1A]/60 text-sm leading-relaxed mt-4">
          최초 이용 고객이 도시락을 3일 연속으로 드시면 무료 쿠폰을 드립니다.
          가격은{" "}
          <a href="/menu" className="font-bold underline" style={{ color: "#EB5722" }}>
            메뉴 및 가격
          </a>
          , 가능 지역은{" "}
          <a href="/delivery" className="font-bold underline" style={{ color: "#EB5722" }}>
            배송 가능 지역
          </a>
          에서 확인할 수 있습니다.
        </p>
        <p className="text-[12px] text-[#1A1A1A]/40 leading-relaxed mt-2">
          오프라인으로 드린 쿠폰과는 중복 적용되지 않습니다.
        </p>
      </section>
    </InfoLayout>
  );
}
