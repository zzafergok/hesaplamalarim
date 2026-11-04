# Proje Öğrenimleri ve Dersler (Lessons Learned)

Bu dosya, kullanıcı geri bildirimleri, mimari denetimler ve geliştirme sürecinde edinilen tecrübelerin kaydıdır. Her oturumda ve geliştirmede bu kurallar göz önünde bulundurulmalıdır.

---

## 1. Mimari ve Dosya Boyutu Standartları

- **250 Satır Kuralı:** Projedeki hiçbir dosya 250 satırı aşmamalıdır. Genişleyen dosyalar (örn. büyük metadata sözlükleri, karmaşık UI kartları, yardımcı fonksiyon kütüphaneleri) ilgili ada sahip bir klasör altında `types.ts`, `constants.ts`, `sub-components` ve `index.ts` yapısıyla derhal modülerleştirilmelidir.
- **Tekil UI Bileşenleri:** `@/components/ui/` yerine tüm temel görsel bileşenler `@/components/core/` ailesinde konumlandırılmalı; `src/components/ui` gibi ayrık dizinler oluşturulmamalıdır.
- **Provider Düzeni:** Tüm React context provider'ları `@/components/providers/` altında toplanmalı ve kök layout'ta düzenli içe aktarılmalıdır.

## 2. Tasarım ve Core Bileşen Kullanımı

- **Raw HTML Yasağı:** Standart `<button>`, `<input>`, `<select>`, `<textarea>`, `<next/link>` gibi primitive yapılar doğrudan JSX içinde yazılmamalıdır. Daima `@/components/core/button`, `@/components/core/input` vb. kullanılmalıdır.
- **Tablo Semantiği:** Veri sunulan tablolarda mutlaka `TableHeader` ve `TableHead` başlıkları eklenmeli, salt `TableBody` ile erişilebilirlik ihlal edilmemelidir.

## 3. Formlar ve Doğrulama

- **Standart Form Mimarisi:** Giriş veya ayar ekranlarındaki formlar statik JSX yerine `@/components/forms`, `react-hook-form` ve `zod` şemalarıyla bağlanmalıdır.
- **Çift Taraflı Doğrulama:** Form doğrulama kuralları hem istemcide hem de API Route Handler seviyesinde Zod ile doğrulanmalıdır.

## 4. TypeScript ve Tip Güvenliği

- **Sıfır `any`:** `any` kullanımı kesinlikle yasaktır; dış veriler `unknown` + Zod/type-guard ile işlenmelidir.
- **Hata Bastırma Yasağı:** `@ts-ignore` ve `@ts-nocheck` gibi derleyiciyi yanıltan açıklamalar yerine doğru TypeScript tipleri (örn. React ref tipleri) tanımlanmalıdır.

## 5. Next.js 16 & ESLint 9 Uyumluluğu

- **Flat Config:** ESLint 9 sürümünde geleneksel `.eslintrc` yerine `eslint.config.mjs` kullanılmalıdır.
- **App Router Özel Sayfaları:** `not-found.tsx`, `error.tsx` ve `loading.tsx` standart olarak tanımlanmalı, kullanıcıya her durumda kurumsal marka deneyimi sunulmalıdır.

## 6. Test ve CI/CD Kalite Kapısı (Quality Gate)

- **Vitest Entegrasyonu:** Projedeki birim ve entegrasyon testleri için Next.js ve TypeScript ile uyumlu Vitest kullanılmalıdır; `vitest.config.mts` içerisinde `@/*` alias tanımı korunmalıdır.
- **Sözlük ve Rota Testleri:** Formatlama ve sayı yardımcıları gibi yerel ayara duyarlı (locale-aware) fonksiyonlar test edilirken hem varsayılan hem `tr` gibi özel yerel ayarlar açıkça doğrulanmalıdır.
- **CI/CD İş Akışı & Lock Senkronizasyonu:** `.github/workflows/ci.yml` üzerinde `type-check`, `lint`, `metadata:check`, `test` ve `build` adımlarının tamamı geçmeden ana dala kod kabul edilmemelidir. `npm ci` adımının sorunsuz çalışması için `package-lock.json` daima güncel tutulmalı ve GitHub Actions üzerinde Node.js 22 LTS kullanılmalıdır.

## 7. Yerel Ağda Geliştirme

- **CSP ve HTTP geliştirme sunucusu:** `upgrade-insecure-requests` yalnızca production CSP'ye eklenmelidir. Yerel ağ IP'sinden HTTP ile açılan Next.js geliştirme sunucusunda bu direktif, istemci kaynaklarını ve API isteklerini HTTPS'e yükseltip `ERR_SSL_PROTOCOL_ERROR` ve `Failed to fetch` hatasına neden olur.

## 8. Submit Button İçeriği

- **İkon ve metin hizalaması:** `SubmitButton` çağıranları SVG ve metni `children` olarak birlikte geçebilir. Ortak bileşen, bu içeriği `inline-flex items-center whitespace-nowrap` sarmalayıcısında tutarak dar viewport'larda satır kırılmasını ve buton taşmasını engellemelidir.
