import { InfoLayout } from "@/components/info-layout";
import { pageMetadata } from "@/lib/site";

const title = "배송 가능 지역";
const description =
  "위드런치는 병원, 공장, 창고, 사무실로 점심 도시락을 배송합니다. 지역 가능 여부는 전화나 카카오톡으로 안내합니다.";

export const metadata = pageMetadata({
  title: "배송 가능 지역 | 위드런치",
  description,
  path: "/delivery",
});

const places = [
  {
    name: "병원",
    text: "진료와 업무로 바쁜 병원 직원분들을 위해 정해진 시간에 도시락을 배송합니다.",
  },
  {
    name: "공장",
    text: "교대 근무와 현장 업무로 바쁜 공장 직원분들을 위해 정해진 시간에 도시락을 배송합니다.",
  },
  {
    name: "창고",
    text: "물류·창고 현장처럼 점심시간에 자리를 비우기 어려운 곳을 위한 도시락 배송입니다.",
  },
  {
    name: "사무실",
    text: "매일 점심 메뉴를 고르고 이동하는 시간을 줄이는 사무실 정기 배송입니다.",
  },
];

export default function DeliveryPage() {
  return (
    <InfoLayout path="/delivery" title={title} description={description}>
      <section>
        <h2 className="text-xl font-extrabold mb-4">배송하는 곳</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {places.map((place) => (
            <article
              key={place.name}
              className="rounded-3xl bg-white border border-black/[0.06] p-6"
            >
              <h3 className="font-extrabold text-lg">{place.name}</h3>
              <p className="text-[#1A1A1A]/55 text-sm leading-relaxed mt-2">{place.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-3xl bg-white border border-black/[0.06] p-6 lg:p-8">
        <h2 className="text-xl font-extrabold mb-3">지역 확인</h2>
        <p className="text-[#1A1A1A]/60 text-sm leading-relaxed">
          시·구 단위 배송 지역 목록은 홈페이지에 고정해 두지 않습니다. “우리
          지역도 배송되나요?”는 전화나 카카오톡으로 위치를 알려주시면 가능
          여부를 안내합니다.
        </p>
        <p className="text-[#1A1A1A]/60 text-sm leading-relaxed mt-3">
          주문 절차는{" "}
          <a href="/order" className="font-bold underline" style={{ color: "#EB5722" }}>
            주문 방법
          </a>
          에서 확인할 수 있습니다.
        </p>
      </section>
    </InfoLayout>
  );
}
