# Proje Geliştirme, Mimari ve Çalışma Kuralları

Bu kurallar, projedeki tüm görevlerde ve geliştirmelerde istisnasız uygulanır. Kullanıcı arayüzü, formlar, TypeScript, dosya modülerliği ve production checklist standartları özellikle bu alanlarda oluşturulan veya değiştirilen tüm kodlar için zorunludur.

---

## 1. Görev Planlama ve Yürütme

- Üç veya daha fazla adım içeren ya da mimari karar gerektiren her görevde uygulamaya başlamadan önce plan yapın. Plan; kapsamı, varsayımları, riskleri, doğrulama adımlarını ve belirsizlikleri azaltacak teknik ayrıntıları içermelidir.
- Planı `tasks/todo.md` dosyasına işaretlenebilir maddeler halinde yazın. Uygulamaya geçmeden önce planın görevi doğru karşıladığını doğrulayın.
- İlerledikçe plan maddelerini tamamlandı olarak işaretleyin; her önemli adımda kısa bir üst düzey ilerleme özeti paylaşın.
- Görev tamamlandığında `tasks/todo.md` içindeki tamamlanmış todo maddelerini kaldırın; kalıcı kayıt için yalnızca inceleme/sonuç özetini bırakın.
- Bir adım başarısız olursa, hata ve logları inceleyin; körü körüne devam etmek yerine durup planı güncelleyin.
- Karmaşık olmayan, bariz düzeltmeler için gereksiz planlama ve süreç yükü oluşturmayın.
- Görev sonunda `tasks/todo.md` dosyasına yapılan değişiklikleri, doğrulama sonuçlarını ve açık kalan noktaları içeren bir inceleme bölümü ekleyin.

---

## 2. Dosya Boyutu, Bölme ve Modülerleştirme Kuralları (Zorunlu / Değişmez)

- **250 Satır Sınırı**: Projedeki hiçbir kaynak kod dosyası (ana bileşenler, alt bileşenler, kancalar, yardımcı fonksiyonlar ve tip dosyaları dahil) **250 satırı geçmemelidir**.
- **Klasör ve İndeksleme Yapısı**: Parçalanan veya modülerleştirilen her dosya, **ana dosya adında bir klasör** açılarak bu klasörün içine yerleştirilmelidir.
- **Dışa Aktarım (`index.ts`)**: Klasör içindeki tüm ana/alt bileşenler, tipler, kancalar ve yardımcılar klasör kökünde yer alan `index.ts` dosyası üzerinden dışa aktarılmalıdır.
- **Mantıksal Ayrıştırma**: Parçalama işlemi yapılırken kodlar rastgele değil; `types.ts`, `constants.ts`, `use-*.ts` (state/logic kancaları), `*-utils.ts` (saf yardımcılar) ve odaklı alt bileşenler (`sub-components`) şeklinde mantıksal sorumluluklarına göre ayrıştırılmalıdır.
- **Form Bileşenleri Kullanımı**: Form alanları veya kullanıcı girdisi içeren tüm yapılarda doğrudan inline HTML elemanı yazmak yerine `@/components/forms` klasöründeki standart form yapısı kullanılmalıdır.

---

## 3. Alt-Ajan Kullanımı

- Araştırma, keşif ve birbirinden bağımsız paralel analizler için alt-ajanları kullanarak ana bağlamı sade tutun.
- Karmaşık işlerde paralel çalışmadan yararlanın; her alt-ajana tek, açık ve odaklı bir sorumluluk verin.
- Küçük veya sıkı bağımlı işlerde koordinasyon maliyeti yaratacak gereksiz delegasyondan kaçının.

---

## 4. Sürekli İyileştirme ve Hata Düzeltme

- Her oturum başında varsa `tasks/lessons.md` dosyasındaki, bu görevle ilgili dersleri gözden geçirin.
- Kullanıcıdan gelen her düzeltme veya geri bildirimden sonra `tasks/lessons.md` dosyasını güncelleyin. Aynı hatayı önleyecek açık, uygulanabilir kurallar kaydedin ve etkisiz kuralları iyileştirin.
- Hata raporlarında veya başarısız CI kontrollerinde ek yönlendirme beklemeden logları, hataları ve ilgili testleri inceleyin; kök nedeni giderin.
- Geçici çözümler yerine basit, kalıcı ve minimal etkili düzeltmeleri tercih edin.

---

## 5. Tasarım Kararları ve Tamamlama Ölçütü

- Basit olmayan değişikliklerde uygulamadan önce daha zarif ve daha küçük etkili bir çözüm olup olmadığını değerlendirin. Mevcut çözüm yamalı görünüyorsa, eldeki bilgilerle daha zarif çözümü uygulayın.
- Bir görevi, çalıştığı kanıtlanmadan tamamlandı olarak işaretlemeyin. Uygun testleri çalıştırın, hata loglarını kontrol edin ve gerektiğinde ana dalla farkı inceleyin.
- Son teslimden önce çözümün kıdemli bir mühendis incelemesinden geçebilecek sadelik, doğruluk ve sürdürülebilirlikte olup olmadığını değerlendirin.

---

## 6. Tasarım ve Bileşenler

- **Mevcut Tasarım Dili**: Mevcut tasarım dilini koruyun. Yeni renk, tipografi, boşluk, kenarlık, gölge veya etkileşim dili yalnızca mevcut tasarım tokenları ve kalıplarıyla uyumluysa eklenebilir.
- **Core Bileşen Kullanım Zorunluluğu (HTML / Primitive Yasak)**: Standart HTML elementleri veya harici primitive yapılar (`<button>`, `<input>`, `<textarea>`, `<select>`, `<label>`, `<table>`, `<tr>`, `<td>`, `<hr>`, `next/link` vb.) doğrudan kullanılmamalıdır. Karşılığı olan custom core bileşenleri (`@/components/core/button`, `@/components/core/input`, `@/components/core/textarea`, `@/components/core/select`, `@/components/core/label`, `@/components/core/table`, `@/components/core/card`, `@/components/core/badge`, `@/components/core/separator`, `@/components/core/link` vb.) kullanılmalıdır.
- **İçe Aktarma Yolları (Path / Alias Standartları)**: Proje içi bileşen, modül, hook ve dosya içe aktarımlarında (`import`) göreceli derin yollar (`../../`) yerine daima proje kökünden başlayan alias (`@/components/core/...`, `@/components/forms/...`, `@/features/...`, `@/lib/...`, `@/types/...` vb.) kullanılmalıdır.
- **Tablo ve Veri Listeleri**: Liste veya tablo şeklinde veri sunumu gerektiren tüm ekran ve özelliklerde özel `div` grid simülasyonları yerine `@/components/core/table` bileşen ailesi (`Table`, `TableHeader`, `TableBody`, `TableRow`, `TableCell`, `TableHead`) kullanılmalıdır.
- **Responsive ve Erişilebilirlik**: Yeni arayüzler mevcut ekranların responsive davranışını, erişilebilirlik özelliklerini ve Tailwind sınıf düzenini takip etmelidir.

---

## 7. Formlar ve Doğrulama

- Yeni veya değiştirilen form alanlarında önce `src/components/forms` altındaki alan bileşenlerini kullanın. Gerekli bir alan bileşeni yoksa, mevcut core bileşenlerini temel alarak bu dizinde yeniden kullanılabilir bir form bileşeni oluşturun; ekran içinde özel alan çözümü üretmeyin.
- Kullanıcıdan veri alan tüm form akışlarında `react-hook-form` kullanılmalıdır.
- Form şeması `zod` ile tanımlanmalı ve `@hookform/resolvers/zod` üzerinden forma bağlanmalıdır.
- İstemci doğrulaması tek başına yeterli değildir: API girişleri de aynı kuralları sunucu tarafında doğrulamalıdır.
- Hata mesajları kullanıcıya anlaşılır Türkçe ile gösterilmeli ve ilgili alanla ilişkilendirilmelidir.

---

## 8. TypeScript Standartları

- Açık, dar ve yeniden kullanılabilir tipler tanımlayın; API istekleri, yanıtlar, bileşen props'ları ve form verileri tipli olmalıdır.
- `any` türünü hiçbir şekilde kullanmayın. Bilinmeyen dış veri için `unknown` kullanın; type guard, Zod ayrıştırması veya güvenli hata daraltması ile işleyin.
- `as` type assertion yalnızca doğrulama sonrası ve gerekli olduğunda kullanılabilir; doğrulanmamış veriyi zorla tipe dönüştürmek için kullanmayın.
- Yeni kodda `@ts-ignore`, `@ts-nocheck` veya TypeScript hata bastırma açıklamaları kullanmayın.

---

## 9. Kalite Kontrolü

- Değişiklikten sonra en az `npm run type-check` çalıştırın.
- Arayüz veya build zinciri değiştiyse ayrıca `npm run build` çalıştırın.

---

---

# Web / Next.js Production Checklist

> React / Next.js tabanlı web uygulamasını production'a almadan önce teknik, güvenlik, kalite, performans ve operasyon kontrollerini içeren standart denetim listesi.

---

### 1. Architecture & Project Structure

- [ ] Proje klasör yapısı net ve tutarlı.
- [ ] `src/app/` route, layout ve page yapısı için standart App Router düzeninde kullanılıyor.
- [ ] Route groups `(auth)`, `(admin)`, `(dashboard)` gibi URL'i etkilemeden gruplama yapıyor.
- [ ] `src/components/core/` (veya `ui/`) tekrar kullanılabilir temel UI bileşenlerini içeriyor.
- [ ] `src/components/layout/` genel sayfa ve kabuk layout bileşenlerini içeriyor.
- [ ] `src/components/forms/` standart form alanlarını ve form yöneticilerini içeriyor.
- [ ] `src/features/` feature-specific business logic için kullanılıyor.
- [ ] `src/lib/` utility, config, metadata ve third-party setup için kullanılıyor.
- [ ] `src/hooks/` custom React hook'larını içeriyor.
- [ ] `src/types/` ortak TypeScript tip/arayüz tanımlarını içeriyor.
- [ ] Business logic ile UI sunumu birbirinden ayrılmış.
- [ ] Reusable component yaklaşımı korunuyor; separation of concerns gözetiliyor.

---

### 2. Next.js App Router & Rendering

- [ ] Server Component / Client Component ayrımı bilinçli yapılıyor.
- [ ] Gereksiz `"use client"` direktifi kullanılmıyor; client boundary mümkün olduğunca yaprak bileşenlerde tutuluyor.
- [ ] `layout.tsx`, `loading.tsx`, `error.tsx` ve `not-found.tsx` gereken tüm route seviyelerinde tanımlı.
- [ ] Route Handler'lar (API endpoints) girdi doğrulama ve yetkilendirme (authorization) içeriyor.
- [ ] Data fetching ve cache stratejisi (static, dynamic, revalidate) amaca uygun yapılandırılmış.
- [ ] Next.js Metadata API dinamik ve statik olarak doğru kullanılıyor.
- [ ] Next.js Image (`next/image`) ve Font (`next/font`) optimizasyonları aktif.

---

### 3. Code Quality & Standards

- [ ] TypeScript strict kontrolleri aktif; kod tabanında sıfır `any` prensibi uygulanıyor.
- [ ] Type check (`npm run type-check`) ve linter kuralları hatasız geçiyor.
- [ ] Dead code, kullanılmayan import'lar ve gereksiz paketler temizlendi.
- [ ] Magic string/number değerler sabit veya config dosyalarına taşındı.
- [ ] Hiçbir dosya 250 satır sınırını aşmıyor; aşanlar modüler klasör yapısına taşındı.
- [ ] Kodda debug amaçlı `console.log` bırakılmadı.

---

### 4. Authentication & Authorization

- [ ] Oturum açma ve kapama akışları güvenli; logout sonrası session/token geçersiz kılınıyor.
- [ ] Token yaşam döngüsü, yenileme (refresh) ve son kullanma süreleri doğru yönetiliyor.
- [ ] Kritik endpoint'lerde brute-force ve rate-limiting koruması mevcut.
- [ ] Sadece frontend route guard'larına güvenilmiyor; tüm korumalı veriler sunucu tarafında (Server Actions / Route Handlers) yetkilendirme kontrolünden geçiyor.
- [ ] Rol ve izin kontrolleri sunucu tarafında doğrulanıyor; IDOR/BOLA riskleri engelleniyor.

---

### 5. Security & Headers

- [ ] API anahtarları, veritabanı bağlantıları ve secret değerleri koda gömülü değil; `.env` üzerinden yönetiliyor.
- [ ] Client tarafına yalnızca `NEXT_PUBLIC_` ön ekli genel değerler gönderiliyor.
- [ ] Input validation (Zod) hem istemcide hem sunucuda eksiksiz çalışıyor.
- [ ] XSS, CSRF, SQL/NoSQL Injection, Open Redirect ve Path Traversal açıkları kontrol edildi.
- [ ] Dosya yükleme alanlarında MIME type, uzantı ve boyut sınırlandırması uygulanıyor.
- [ ] Güvenlik başlıkları (CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`) yapılandırıldı.
- [ ] Çerezler `HttpOnly`, `Secure` ve uygun `SameSite` öznitelikleriyle ayarlanıyor.

---

### 6. API & Data Handling

- [ ] API istek ve yanıt şemaları açıkça tiplendirilmiş.
- [ ] Global API hata yakalama ve standartlaştırılmış hata yanıt formatı mevcut.
- [ ] Liste endpoint'lerinde pagination ve kontrollü filtreleme uygulanıyor.
- [ ] Request timeout ve abort controller desteği mevcut.
- [ ] Hassas kullanıcı verileri API yanıtlarından filtreleniyor.

---

### 7. Performance & Core Web Vitals

- [ ] Core Web Vitals metrikleri (LCP, CLS, INP) optimize edildi.
- [ ] Bundle boyutu analiz edildi; gereksiz ağır bağımlılıklardan kaçınıldı.
- [ ] Büyük bileşenler veya nadir kullanılan modüller için dinamik import / lazy loading uygulandı.
- [ ] Görseller optimize edildi; modern formatlar (WebP/AVIF) ve doğru `sizes`/`priority` öznitelikleri kullanılıyor.
- [ ] Font yüklemeleri FOUT/FOIT oluşturmayacak şekilde ayarlandı.
- [ ] Layout shift (CLS) oluşmaması için iskelet (skeleton) ve sabit boyutlu alanlar kullanılıyor.

---

### 8. Accessibility (A11y)

- [ ] Semantik HTML elementleri (`<main>`, `<nav>`, `<header>`, `<footer>`, `<aside>`, `<section>`, `<article>`) kullanılıyor.
- [ ] Başlık hiyerarşisi (`<h1>` - `<h6>`) mantıksal sırada.
- [ ] Tüm etkileşimli elemanlar klavye ile erişilebilir (`Tab`, `Enter`, `Space`, `Escape`).
- [ ] Odak göstergeleri (`focus-visible`) belirgin ve kaybolmuyor.
- [ ] Modal, drawer ve dropdown diyaloglarında odak hapsetme (focus trap) ve geri yükleme düzgün çalışıyor.
- [ ] Form alanlarının ilişkili `<label>` etiketleri ve hata açıklamaları (`aria-describedby`) mevcut.
- [ ] Renk kontrast oranları WCAG standartlarına uygun.
- [ ] `prefers-reduced-motion` medya sorgusu destekleniyor.

---

### 9. UI / UX ve Tasarım Dili

- [ ] Net CTA'lar, anlaşılır durum bildirimleri ve rehberlik eden boş durum (empty-state) ekranları mevcut.
- [ ] Mobil, tablet ve masaüstü responsive düzenleri eksiksiz çalışıyor.
- [ ] Aşırı parıltı, kontrolsüz animasyon, yapay gradient ve gereksiz dekorasyonlar yerine temiz, işlevsel ve tutarlı tasarım dili uygulanıyor.

---

### 10. SEO, Meta & Social Sharing

- [ ] Her rota için benzersiz `title` ve `description` tanımlı.
- [ ] `robots.txt` ve `sitemap.xml` dinamik/statik olarak mevcut.
- [ ] Open Graph (`og:title`, `og:description`, `og:image`) ve Twitter kart meta etiketleri yapılandırıldı.
- [ ] Canonical URL yönlendirmeleri doğru çalışıyor.

---

### 11. Localization (i18n)

- [ ] Desteklenen tüm diller için çeviri anahtarları eksiksiz.
- [ ] Arayüzde hard-coded / çevrilmemiş metin bırakılmadı.
- [ ] Tarih, saat, para birimi ve sayı formatları aktif locale ile uyumlu formatlanıyor.
- [ ] Çeviriler responsive düzeni ve buton alanlarını taşırıp bozmuyor.

---

### 12. Testing, Build & Release

- [ ] `npm run type-check` sıfır hata ile tamamlanıyor.
- [ ] `npm run build` hatasız ve optimize şekilde başarıyla derleniyor.
- [ ] Kritik kullanıcı akışları test edildi.
- [ ] Environment değişkenleri staging/production ortamına göre doğrulandı.
- [ ] 404, hata ve bakım sayfaları üretim koşullarında doğrulandı.
