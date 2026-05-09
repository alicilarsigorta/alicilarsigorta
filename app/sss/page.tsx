import FAQ from "@/components/FAQ";

export const metadata = { title: "Sıkça Sorulan Sorular | Alıcılar Sigorta" };

export default function SSSPage() {
  return (
    <div style={{ paddingTop: 'clamp(40px, 8vw, 100px)', backgroundColor: 'var(--white)', minHeight: '100vh' }}>
      <FAQ />
    </div>
  );
}
