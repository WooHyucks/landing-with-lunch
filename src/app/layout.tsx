import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "위드런치 | 점심 도시락 정기배송",
  description:
    "병원, 사무실, 매장의 점심시간을 더 편하게 만들어주는 도시락 배송 서비스. 매일 다른 메뉴를 정해진 시간에 받아보세요.",
  openGraph: {
    title: "위드런치 | 점심 도시락 정기배송",
    description:
      "오늘 점심 뭐 먹지? 그 고민, 위드런치가 끝내드릴게요.",
    locale: "ko_KR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
