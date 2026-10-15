import type { Metadata } from "next";

export const SITE_URL = "https://www.with-lunch.com";
export const SITE_NAME = "위드런치";
export const SITE_NAME_EN = "With Lunch";

export const DISPLAY_PHONE = "1577-8519";
export const CALL_PHONE_TEL = "01055072905";
export const KAKAO_URL = "https://pf.kakao.com/_JxbgKn";
export const MENU_URL =
  "https://map.naver.com/p/entry/place/1927474710?placePath=%2Ffeed%3Fentry%3Dplt%26fromPanelNum%3D1%26additionalHeight%3D76%26timestamp%3D202610062152%26locale%3Dko%26svcName%3Dmap_pcv5&searchType=place&lng=127.1488436&lat=37.5854337&c=15.00,0,0,0,dh";

export const ORANGE = "#EB5722";

export const HOME_TITLE = "위드런치 | 병원·사무실 점심 도시락 정기배송";
export const HOME_DESCRIPTION =
  "위드런치는 병원, 사무실, 공장 등을 위한 점심 도시락 정기배송 서비스입니다. 도시락, 샐러드, 샌드위치 메뉴와 주문 방법, 배송 가능 지역을 확인하세요.";

export const primaryNav = [
  { label: "이번 주 식단표", href: "/weekly-menu" },
  { label: "메뉴 및 가격", href: "/menu" },
  { label: "배송 가능 지역", href: "/delivery" },
  { label: "주문 방법", href: "/order" },
] as const;

export const publicPaths = ["/", ...primaryNav.map((item) => item.href)] as const;

const internalPaths: Record<string, string> = {
  "이번 주 식단표": "/weekly-menu",
  "메뉴 및 가격": "/menu",
  "배송 가능 지역": "/delivery",
  "주문 방법": "/order",
};

export function footerItemHref(item: string): string {
  if (internalPaths[item]) return internalPaths[item];
  if (item === "식단표 보러가기") return MENU_URL;
  if (item === "카카오톡 문의" || item === "카카오톡 채널 문의") {
    return KAKAO_URL;
  }
  if (
    item === "전화 문의" ||
    item.startsWith("대표번호") ||
    item.startsWith("고객센터")
  ) {
    return `tel:${CALL_PHONE_TEL}`;
  }
  return "/#contact";
}

export function footerItemOpensNewTab(item: string): boolean {
  return (
    item === "식단표 보러가기" ||
    item === "카카오톡 문의" ||
    item === "카카오톡 채널 문의"
  );
}

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "ko_KR",
      type: "website",
      images: [{ url: "/logo.png", alt: "위드런치 With Lunch" }],
    },
  };
}
