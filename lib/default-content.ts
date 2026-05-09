// ─────────────────────────────────────────────────
// Alıcılar Sigorta — Default Site Content
// This serves as the baseline. Admin edits override
// these values via localStorage for Vercel compat.
// ─────────────────────────────────────────────────

export interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaText: string;
  stats: { value: string; label: string }[];
}

export interface CampaignSlide {
  id: number;
  title: string;
  desc: string;
  tag: string;
  color: string;
  textColor: string;
  image: string;
}

export interface WhyUsFeature {
  icon: string;
  title: string;
  desc: string;
}

export interface WhyUsContent {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  features: WhyUsFeature[];
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  author: string;
  category: string;
}

export interface InsuranceProduct {
  id: string;
  icon: string;
  title: string;
  desc: string;
  detailedDescription?: string;
  coverages?: string[];
  faqs?: FAQItem[];
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  };
}

export interface PromoContent {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  bullets: string[];
}

export interface SiteContent {
  hero: HeroContent;
  campaigns: CampaignSlide[];
  whyUs: WhyUsContent;
  faq: FAQItem[];
  partners: string[];
  products: InsuranceProduct[];
  contact: ContactInfo;
  promo: PromoContent;
  about: {
    title: string;
    titleHighlight: string;
    description: string;
    description2: string;
  };
  blogs: BlogItem[];
}

export const defaultContent: SiteContent = {
  hero: {
    badge: "TÜRK VİZYONUNUN SİGORTA LİDERİ",
    title: "En Değerliniz",
    titleHighlight: "Bizimle Güvende.",
    subtitle: "Kusursuz bir deneyimle Türkiye'nin en seçkin 20+ sigorta markasını aynı ekranda karşılaştırın, size özel tasarlanan VIP poliçeye dakikalar içinde sahip olun.",
    ctaText: "Hemen Teklif Al",
    stats: [
      { value: "20+", label: "Sigorta Şirketi" },
      { value: "500K", label: "Mutlu Müşteri" },
      { value: "%99", label: "Memnuniyet" },
      { value: "7/24", label: "VIP Destek" },
    ],
  },

  campaigns: [
    {
      id: 1,
      title: "Kaskoda İlk Yıla Özel %20 İndirim Fırsatı",
      desc: "Aracınızı güvence altına alırken bütçenizi de koruyun. Sınırlı süreli bu kampanyayı kaçırmayın.",
      tag: "YENİ KAMPANYA",
      color: "linear-gradient(135deg, #fffdf8 0%, #fdf4db 100%)",
      textColor: "var(--black)",
      image: "/slider_car.png",
    },
    {
      id: 2,
      title: "Tamamlayıcı Sağlık Sigortanız Hazır",
      desc: "Fark ücreti ödemeden, Türkiye'nin en seçkin özel hastanelerinde ayrıcalıklı sağlık hizmeti.",
      tag: "ÖZEL FİYAT",
      color: "linear-gradient(135deg, #f8fbff 0%, #e6f0ff 100%)",
      textColor: "var(--black)",
      image: "/slider_health.png",
    },
    {
      id: 3,
      title: "Eviniz İçin Altın Güvence",
      desc: "Doğal afetlerden hırsızlığa kadar genişletilmiş konut paketimizle eviniz tam koruma altında.",
      tag: "KONUT",
      color: "linear-gradient(135deg, #f8fff9 0%, #e6ffe8 100%)",
      textColor: "var(--black)",
      image: "/slider_house.png",
    },
  ],

  whyUs: {
    badge: "● Neden Biz?",
    title: "Türkiye'nin",
    titleHighlight: "Lider",
    subtitle: "20 yıllık sektör deneyimi ve en gelişmiş dijital altyapı ile yanınızdayız.",
    features: [
      { icon: "Award", title: "En İyi Fiyat Garantisi", desc: "20+ sigorta şirketini anlık karşılaştırarak sizin için en düşük fiyatı buluyoruz." },
      { icon: "Zap", title: "Anında Poliçe Onayı", desc: "Dakikalar içinde dijital poliçenize sahip olun. Bekleme yok, evrak yok." },
      { icon: "Headphones", title: "7/24 VIP Hasar Desteği", desc: "Hasar anında 7 gün 24 saat yanınızda olan uzman danışman ekibimiz." },
      { icon: "Lock", title: "Güvenli & Şeffaf", desc: "Hiçbir gizli ücret, komisyon veya sürpriz kesinti yok. Her adım şeffaf." },
    ],
  },

  faq: [
    { q: "Kasko ile Trafik Sigortası arasındaki fark nedir?", a: "Trafik sigortası zorunlu olup karşı tarafa verdiğiniz zararları karşılar. Kasko ise isteğe bağlıdır ve kendi aracınızı kaza, çalınma, yanma gibi durumlara karşı güvence altına alır." },
    { q: "Sigorta teklifi almak için hangi bilgilere ihtiyacım var?", a: "TC Kimlik numaranız, doğum tarihiniz ve iletişim bilgilerinizle (telefon/e-posta) birkaç saniye içinde ücretsiz teklif alabilirsiniz." },
    { q: "Hasar anında ne yapmalıyım?", a: "Önce güvenli bir yere çekilin. Ardından tutanak düzenleyin ve 0850 123 4567 numaralı VIP hasar hattımızı arayın. Uzman ekibimiz 7/24 hizmetinizdedir." },
    { q: "Poliçemi online olarak iptal edebilir miyim?", a: "Evet, her poliçeniz müşteri panelimizden veya danışmanınız aracılığıyla kolayca iptal edilebilir. İptal tarihine göre kalan primler iade edilir." },
    { q: "Taksitli ödeme seçeneği var mı?", a: "Tüm başlıca kredi kartlarına, en fazla 12 aya kadar taksit imkânı sunmaktayız. Kampanya dönemlerinde özel vade seçenekleri de geçerlidir." },
  ],

  partners: [
    "Allianz", "Anadolu Sigorta", "Aksigorta", "Türkiye Sigorta",
    "HDI Sigorta", "Ray Sigorta", "Sompo Sigorta", "Mapfre Sigorta",
    "Axa Sigorta", "Eureko Sigorta", "Bupa Acıbadem", "Neova Katılım",
    "Koru Sigorta", "Türk Nippon", "Unico Sigorta", "Bereket Sigorta",
  ],

  products: [
    { id: "trafik-sigortasi", icon: "Navigation", title: "Trafik Sigortaları", desc: "Zorunlu trafik poliçenizi en iyi fiyata anında yenileyin." },
    { id: "kasko", icon: "Car", title: "Kasko", desc: "Aracınızı kaza, çalınma ve hasara karşı tam kapsamlı koruyun." },
    { id: "konut-sigortasi", icon: "Home", title: "Konut Sigortaları", desc: "Evinizi yangın, sel, hırsızlık ve doğal afetlere karşı güvenceye alın." },
    { id: "saglik-sigortasi-fiyatlari", icon: "HeartPulse", title: "Sağlık Sigortaları", desc: "Özel hastanelerde fark ödemeden kapsamlı tedavi güvencesi." },
    { id: "dask-sorgulama", icon: "ShieldCheck", title: "DASK", desc: "Zorunlu deprem sigortanızı saniyeler içinde kolayca güncelleyin." },
    { id: "is-yeri-sigortasi", icon: "Briefcase", title: "İş Yeri Sigortaları", desc: "İşletmenizi tüm finansal ve fiziksel risklere karşı izole edin." },
    { id: "sorumluluk-sigortasi", icon: "FileText", title: "Sorumluluk Sigortası", desc: "3. şahıslara verilebilecek zararlara karşı tam hukuki teminat." },
    { id: "seyahat-sigortasi", icon: "Plane", title: "Seyahat Sigortası", desc: "Yurt içi/dışı tüm vizelerde geçerli sağlık ve bagaj güvencesi." },
  ],

  contact: {
    phone: "0850 123 4567",
    email: "info@alicilarsigorta.com.tr",
    address: "Levent, Beşiktaş / İstanbul",
    whatsapp: "908501234567",
    socialLinks: {
      instagram: "#",
      facebook: "#",
      twitter: "#",
      linkedin: "#",
    },
  },

  promo: {
    badge: "● Neden Alıcılar Sigorta?",
    title: "Sigortacılığı",
    titleHighlight: "Yeniden",
    subtitle: "Karmaşık sigorta süreçlerini ortadan kaldırarak; hız, şeffaflık ve güveni bir arada sunuyoruz.",
    bullets: [
      "20'den fazla güvenilir sigorta şirketiyle anlaşmalıyız.",
      "Gizli komisyon veya sürpriz ücret kesinlikle yoktur.",
      "Yapay zeka destekli akıllı öneri sistemi.",
      "Hasar anında 7/24 VIP danışmanlık hizmeti.",
    ],
  },

  about: {
    title: "Güveniniz, Bizim",
    titleHighlight: "En Büyük Sermayemiz",
    description: "Alıcılar Sigorta, müşteri odaklı hizmet anlayışıyla sektörde fark yaratan bağımsız bir sigorta platformudur. Amacımız, müşterilerimizin karmaşık sigorta dünyasında yollarını kolayca bulmalarını sağlamak ve onlara en uygun fiyatlarla en geniş kapsamlı korumayı sunmaktır.",
    description2: "20'den fazla lider sigorta şirketi ile yaptığımız güçlü ortaklıklar sayesinde, Kasko'dan Sağlığa, DASK'tan İşyeri Sigortalarına kadar geniş bir yelpazede tamamen şeffaf ve karşılaştırmalı teklifler üretiyoruz.",
  },

  blogs: [
    {
      id: "blog-1",
      slug: "kasko-yaptirirken-dikkat-edilmesi-gerekenler",
      title: "Kasko Sigortası Yaptırırken Nelere Dikkat Etmelisiniz?",
      summary: "Aracınızı güvence altına alırken kasko poliçenizin kapsamını doğru seçmek hayat kurtarır. İkame araç, cam hasarı gibi detayları inceledik.",
      content: "<p>Aracınız için kasko yaptırmak sadece bir lüks değil, aynı zamanda büyük bir gerekliliktir. Kasko seçimi yaparken poliçe limitleri, anlaşmalı servis ağları, mini onarım hizmetleri ve ikame araç gibi detaylar büyük önem taşır.</p><p>Poliçenizi oluştururken ihtiyaçlarınıza uygun teminatları seçtiğinizden emin olun.</p>",
      image: "/slider_car.png",
      date: "2024-05-10",
      author: "Sigorta Uzmanı",
      category: "Kasko",
    },
    {
      id: "blog-2",
      slug: "tamamlayici-saglik-sigortasi-avantajlari",
      title: "Tamamlayıcı Sağlık Sigortasının Bilinmeyen Avantajları",
      summary: "Özel hastanelerde SGK farkı ödemeden tedavi olmanın yolları ve TSS'nin sunduğu ek avantajlar hakkında her şey.",
      content: "<p>Tamamlayıcı Sağlık Sigortası (TSS), özel hastanelerde SGK güvencesini kullanarak fark ücreti ödemeden sağlık hizmeti almanızı sağlar. Yatışlı ve yatışsız tedavi teminatlarının yanı sıra birçok poliçe check-up, diş bakımı gibi ek hizmetler sunar.</p><p>TSS ile bütçenizi sarsmadan en iyi sağlık hizmetini alabilirsiniz.</p>",
      image: "/slider_health.png",
      date: "2024-05-12",
      author: "Sağlık Danışmanı",
      category: "Sağlık",
    }
  ]
};
