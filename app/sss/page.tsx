import FAQ from "@/components/FAQ";

export const metadata = { title: "Sıkça Sorulan Sorular | Alıcılar Sigorta" };

export default function SSSPage() {
  return (
    <div style={{ paddingTop: '100px', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <FAQ />
    </div>
  );
}
