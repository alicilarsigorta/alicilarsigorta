/**
 * Aliş — Alıcılar Sigorta maskotu.
 * Pozlar public/mascot/ altındaki şeffaf zeminli webp dosyalarıdır.
 * `height` ekrandaki yüksekliktir; genişlik orandan hesaplanır, böylece
 * görsel yüklenirken sayfa kaymaz.
 */
const POSES = {
  thumbs: { file: "alis-thumbs", w: 346, h: 694 },
  side: { file: "alis-side", w: 290, h: 695 },
  arms: { file: "alis-arms", w: 279, h: 403 },
  point: { file: "alis-point", w: 179, h: 245 },
  welcome: { file: "alis-welcome", w: 281, h: 238 },
  clipboard: { file: "alis-clipboard", w: 185, h: 242 },
  shield: { file: "alis-shield", w: 219, h: 241 },
  phone: { file: "alis-phone", w: 198, h: 238 },
  idea: { file: "alis-idea", w: 201, h: 246 },
  ok: { file: "alis-ok", w: 212, h: 234 },
} as const;

export type MascotPose = keyof typeof POSES;

interface Props {
  pose: MascotPose;
  height: number;
  className?: string;
  style?: React.CSSProperties;
  /** Ekranın ilk görünen kısmındaysa true verin (lazy yüklenmesin). */
  priority?: boolean;
  /** Dekoratifse boş bırakın; anlam taşıyorsa açıklama verin. */
  alt?: string;
}

export default function Mascot({ pose, height, className, style, priority, alt = "" }: Props) {
  const p = POSES[pose];
  const width = Math.round((p.w / p.h) * height);
  return (
    <img
      src={`/mascot/${p.file}.webp`}
      alt={alt}
      aria-hidden={alt ? undefined : true}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={className}
      style={{ height, width: "auto", maxWidth: "none", userSelect: "none", ...style }}
    />
  );
}
