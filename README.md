# Hesaplamalarım

> Türk mevzuatına uygun, tip-güvenli, modern ve yüksek performanslı çevrimiçi finans ve çalışma hayatı hesaplama platformu.

[![Next.js 16](https://img.shields.io/badge/Next.js-16.0-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

---

## 📌 İçindekiler

- [Hakkında](#-hakkında)
- [Öne Çıkan Özellikler](#-öne-çıkan-özellikler)
- [Hesaplama Araçları ve Motorlar](#-hesaplama-araçları-ve-motorlar)
- [Teknoloji Yığını](#-teknoloji-yığını)
- [Mimari ve Proje Dizin Yapısı](#-mimari-ve-proje-dizin-yapısı)
- [Tasarım ve Bileşen Sistemi](#-tasarım-ve-bileşen-sistemi)
- [Kurulum ve Çalıştırma](#-kurulum-ve-çalıştırma)
- [Kullanılabilir Komutlar](#-kullanılabilir-komutlar)
- [Geliştirici Kuralları ve Kalite Standartları](#-geliştirici-kuralları-ve-kalite-standartları)
- [Lisans](#-lisans)

---

## 💡 Hakkında

**Hesaplamalarım**, Türkiye'deki güncel iş kanunu ve vergi mevzuatına (2026 yılı SGK tavan/taban ücretleri, gelir vergisi dilimleri, asgari ücret vergi istisnası ve damga vergisi oranları) tam uyumlu olarak çalışan yeni nesil bir hesaplama platformudur.

Platform; bireysel kullanıcılar, muhasebeciler, insan kaynakları uzmanları ve yazılımcılar için karmaşık bordro ve tazminat formüllerini saniyeler içinde şeffaf, anlaşılır ve detaylı tablolara dönüştürür.

---

## 🚀 Öne Çıkan Özellikler

- **Mevzuata Tam Uyum**: 2026 yılı gelir vergisi dilimleri (%15, %20, %27, %35, %40), kümülatif matrah hesabı, SGK prim tavanı ve asgari ücret istisnaları anlık olarak hesaplanır.
- **Tip Güvenli Hesaplama Motoru**: Tüm girdi formları `zod` ve `react-hook-form` ile doğrulanır; hesaplama algoritmaları saf fonksiyonlar (pure functions) olarak izole edilmiştir.
- **Atomik ve Erişilebilir Core Bileşenler**: Radix UI tabanlı 40'tan fazla erişilebilir bileşen (`@/components/core`), hiçbir standart ham HTML primitive'i içermeyen kurumsal tasarım standartlarına sahiptir.
- **Dark-Mode-First Brutalist Tasarım**: Yüksek kontrastlı, modern ve göz yormayan HSL renk token sistemi (`hesaplamalarim-blue`, `obsidian`, `void-black`, `titanium`, `ash`).
- **Oyunlaştırma (Gamification HUD)**: Yapılan hesaplamalara göre tecrübe puanı (XP), rozetler ve seviyeler kazandıran Zustand tabanlı yerel ilerleme sistemi.
- **Yapay Zeka ve LLM Entegrasyonu**: Arama motorları ve yapay zeka ajanlarının platform içeriğini doğrudan okuyabilmesi için standartlaştırılmış `/llms.txt` endpoint desteği.
- **Sıkı Mimari Kurallar**: Hiçbir dosyanın 250 satırı aşmadığı modüler, sürdürülebilir ve endüstri standardı Next.js 16 App Router mimarisi.

---

## 🧮 Hesaplama Araçları ve Motorlar

### 1. Maaş Hesaplama (Brütten Nete / Netten Brüte)
- **Rota**: `/hesaplamalar/maas/brutten-nete`
- **Yetenekler**:
  - Brütten nete veya netten brüte çift yönlü hesaplama.
  - Yıl içindeki kümülatif vergi matrahı aktarımı.
  - SGK İşçi Primi (%14) ve İşsizlik Sigortası Primi (%1) kesintileri.
  - Asgari Ücret Gelir ve Damga Vergisi istisnalarının otomatik düşülmesi.
  - İşverene toplam maliyet ve işveren primlerinin detaylı dökümü.

### 2. Kıdem Tazminatı Hesaplama
- **Rota**: `/hesaplamalar/tazminat/kidem-tazminati`
- **Yetenekler**:
  - İşe giriş ve işten çıkış tarihi seçimi ile tam gün/ay/yıl hizmet süresi hesaplaması.
  - Yıllık güncel kıdem tazminatı tavanı kontrolü.
  - Düzenli yan haklar (yemek, yol, prim vb.) ekleme desteği.
  - Raporlu veya ücretsiz izinli günler için düşülecek gün sayısı desteği.
  - Damga vergisi (binde 7,59) kesintisi sonrası net ödenecek tutar gösterimi.

### 3. İhbar Tazminatı Hesaplama
- **Rota**: `/hesaplamalar/tazminat/ihbar-tazminati`
- **Yetenekler**:
  - Hizmet süresine göre yasal bildirim süreleri (2, 4, 6 veya 8 hafta) otomatik tespiti.
  - Giydirilmiş brüt ücret üzerinden günlük ve haftalık ücret analizi.
  - Gelir vergisi ve damga vergisi kesintileriyle birlikte net tazminat özeti.

---

## 🛠️ Teknoloji Yığını

| Kategori | Teknoloji | Açıklama |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | Turbopack destekli modern React framework |
| **Kütüphane** | React 19 & TypeScript 5 | Tip güvenli arayüz mimarisi |
| **Stil & Tema** | Tailwind CSS & next-themes | HSL tabanlı çoklu renk skalası ve tema yönetimi |
| **State Management** | Zustand (v5) | Hafif, hızlı ve yerel depolama senkronizasyonlu state |
| **Data Fetching** | TanStack React Query (v5) | Güçlü önbellek ve asenkron veri yönetimi |
| **UI Primitives** | Radix UI | WAI-ARIA standartlarında erişilebilir bileşenler |
| **Form & Validasyon** | React Hook Form & Zod | Şema tabanlı çift taraflı form doğrulaması |
| **İkon Seti** | Lucide Icons | Modern, temiz SVG ikon kütüphanesi |

---

## 📁 Mimari ve Proje Dizin Yapısı

```text
src/
├── app/                              # Next.js App Router sayfaları & düzenleri
│   ├── (public)/                     # Halka açık sayfalar (Ana sayfa, hesaplama hub'ı)
│   │   ├── hesaplamalar/             # Hesaplama motorları listesi ve dinamik rotalar
│   │   │   ├── [category]/           # Kategori sayfası (örn: maas, tazminat)
│   │   │   └── [category]/[slug]/    # Özel hesaplama aracı sayfası
│   ├── llms.txt/                     # AI ve LLM sistemleri için rota dokümantasyonu
│   ├── styles/                       # Modüler tema tokenları (tokens-light.css, tokens-dark.css)
│   ├── globals.css                   # Global stiller ve Tailwind direktifleri
│   ├── layout.tsx                    # Kök layout ve Provider hiyerarşisi
│   └── loading.tsx                   # Standart yükleme ekranı
│
├── components/                       # Arayüz Bileşenleri
│   ├── core/                         # 40+ atomik UI bileşeni (button, card, table, dialog vb.)
│   ├── forms/                        # RHF & Zod uyumlu form alanları (amount, date, select vb.)
│   ├── layout/                       # Kabuk ve sayfa düzeni bileşenleri (Navbar, Footer, Shell)
│   └── shared/                       # Ortak işlevsel bileşenler (Error Boundary, HUD)
│
├── features/                         # İş Mantığı ve Özellik Modülleri
│   ├── calculators/                  # Hesaplama motorları ve kullanıcı arayüzleri
│   │   ├── registry/                 # Hesaplama aracı tanımları ve konfigürasyonları
│   │   ├── salary/                   # Maaş hesaplama bileşenleri ve formları
│   │   ├── severance/                # Kıdem ve ihbar tazminatı hesaplama bileşenleri
│   │   └── components/               # Paylaşılan hesaplama kartları ve sonuç tabloları
│   └── routes/                       # Sayfa bazlı feature bileşenleri
│
├── stores/                           # Zustand Durum Yönetimi
│   └── use-gamification-store.ts     # Puan, XP ve başarı rozeti durum deposu
│
├── lib/                              # Yardımcı Kütüphaneler ve Altyapı
│   ├── api/                          # Tip güvenli HTTP client ve interceptor altyapısı
│   ├── metadata/                     # Dinamik SEO, Open Graph ve site metadataları
│   └── utils/                        # Para birimi, tarih ve sayı formatlama yardımcıları
│
└── proxy.ts                          # Next.js 16 Native Güvenlik & Proxy Başlıkları
```

---

## 🎨 Tasarım ve Bileşen Sistemi

Proje, tasarım tutarlılığı ve kod kalitesi için sıkı standartlara tabidir:

- **Primitive HTML Yasağı**: Standart `<button>`, `<input>`, `<table>` gibi ham etiketler yerine doğrudan `@/components/core/*` bileşenleri kullanılır.
- **Form Alanları**: Tüm veri girişleri `@/components/forms` altındaki `AmountField`, `DateField`, `SelectField` gibi Zod entegrasyonlu alanlarla yönetilir.
- **Renk Skalası**: HSL tabanlı token mimarisi sayesinde `50`'den `950`'ye kadar tüm renk varyasyonları desteklenir (`hesaplamalarim-blue`, `hesaplamalarim-gold`, `void-black`, `obsidian`).

---

## ⚡ Kurulum ve Çalıştırma

### Gereksinimler

- Node.js >= 20.9.0
- npm >= 10.0.0

### Adımlar

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/hesaplamalarim/hesaplamalarim.git
   cd hesaplamalarim
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Çevre değişkenlerini hazırlayın:
   ```bash
   cp .env.example .env.local
   ```

4. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

Tarayıcınızda `http://localhost:3000` adresini açarak uygulamayı görüntüleyebilirsiniz.

---

## ⌨️ Kullanılabilir Komutlar

| Komut | Açıklama |
|---|---|
| `npm run dev` | Turbopack ile hızlı yerel geliştirme sunucusu |
| `npm run build` | Üretim (production) için optimize edilmiş derleme |
| `npm run start` | Derlenmiş üretim sunucusunu başlatır |
| `npm run type-check` | TypeScript derleme ve tip denetimi (`tsc --noEmit`) |
| `npm run metadata:check` | Rota ve sayfa metadatalarının doğruluk kontrolü |
| `npm run test` | Vitest ile birim ve entegrasyon testlerini çalıştırır |
| `npm run lint` | ESLint ile kod standartları denetimi |
| `npm run format` | Prettier ile tüm dosyaları biçimlendirir |

---

## 🛡️ Kalite Standartları

Bu proje aşağıdaki mimari ve geliştirme kurallarına kesin olarak uyar:

1. **250 Satır Kuralı**: Hiçbir kaynak kod dosyası 250 satırı aşamaz; büyüyen dosyalar mantıksal alt klasörlere parçalanır.
2. **Sıfır `any` Prensibi**: Tip gevşetmelerine izin verilmez; tüm tipler dar, açık ve TypeScript strict moduna uygundur.
3. **Güvenlik Başlıkları**: CSP, HSTS, X-Frame-Options, Permissions-Policy ve nosniff başlıkları üretim seviyesinde yapılandırılmıştır.

---

## 📄 Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır. Dilediğiniz gibi kişisel veya ticari projelerinizde kullanabilir ve katkıda bulunabilirsiniz.
