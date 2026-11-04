# Tulpar

Tulpar; Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Zustand, TanStack React Query ve Radix UI üzerine inşa edilmiş, enterprise seviyede **domain-independent (sektörden bağımsız)** modern bir web uygulaması altyapısı ve şablonudur.

Public sayfalar (Landing, Login), korumalı kullanıcı alanları (Dashboard, Workspace, Settings) ve yönetim panelleri (Admin Login, Overview, Users, Settings) için hazır uygulama kabukları (Shells), güvenlik katmanı, API interceptor mimarisi, form altyapısı ve durum yönetimi sunar.

---

## 📚 İçindekiler / Table of Contents

- [Tulpar](#tulpar)
  - [📚 İçindekiler / Table of Contents](#-i̇çindekiler--table-of-contents)
  - [🚀 Öne Çıkan Özellikler ve Mimari](#-öne-çıkan-özellikler-ve-mimari)
  - [🛠️ Teknoloji Yığını (Tech Stack)](#️-teknoloji-yığını-tech-stack)
  - [📁 Proje Dizin Yapısı (Project Structure)](#-proje-dizin-yapısı-project-structure)
  - [🎓 Eğitici Mimari Rehber (Educational Guide)](#-eğitici-mimari-rehber-educational-guide)
    - [1. API Client ve Interceptor Kullanımı](#1-api-client-ve-interceptor-kullanımı)
    - [2. Servis ve Önbellekleme Katmanı (`CACHE_STRATEGIES`)](#2-servis-ve-önbellekleme-katmanı-cache_strategies)
    - [3. Zustand ve React Query Auth Hook'ları](#3-zustand-ve-react-query-auth-hookları)
    - [4. Güvenlik ve Session Yapılandırması](#4-güvenlik-ve-session-yapılandırması)
  - [⚡ Kurulum ve Komutlar](#-kurulum-ve-komutlar)
    - [1. Kurulum](#1-kurulum)
    - [2. Kullanılabilir Komutlar](#2-kullanılabilir-komutlar)
  - [📄 Lisans](#-lisans)

---

## 🚀 Öne Çıkan Özellikler ve Mimari

- **Next.js 16 App Router & Native Proxy Middleware**:
  - `src/proxy.ts` üzerinden sıkılaşmış rota koruması (Route Guard).
  - Üretim seviyesinde **HTTP Security Headers** (`X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`, `X-XSS-Protection`).
- **Güvenlik ve Oturum Katmanı**:
  - `httpOnly`, `secure`, `sameSite: 'lax'` parametrelerine sahip HTTP Çerezleri ([session.ts](file:///Users/zafergok/Documents/github/ZAFER/tulpar/src/lib/auth/session.ts)).
  - JWT imzalama ve doğrulama modülü ([jwt.ts](file:///Users/zafergok/Documents/github/ZAFER/tulpar/src/lib/auth/jwt.ts)).
  - Next.js API Route Handler'ları (`/api/auth/login`, `/api/auth/logout`, `/api/auth/me`).
- **İstemci Durum Yönetimi (Zustand)**:
  - `useAuthStore` ile LocalStorage senkronizasyonu (`tulpar-auth-storage`).
- **Tip Güvenli API Client ve Interceptor**:
  - `apiClient` ([client.ts](file:///Users/zafergok/Documents/github/ZAFER/tulpar/src/lib/api/client.ts)) üzerinden istek (Bearer token injection), yanıt (HTTP 401 auto logout) ve hata interceptor'ları.
- **TanStack React Query & Servis Seviyesi Önbellekleme**:
  - `QueryProvider` ile varsayılan önbellek sıfırlanmış (`staleTime: 0`), önbellekleme kararları servis katmanına (`CACHE_STRATEGIES`) bırakılmıştır.
- **Arayüz ve Tema Sistemi**:
  - Dark-mode-first Brutalist renk paleti (`tulpar-blue`, `void-black`, `obsidian`, `gunmetal`, `titanium`, `ash`).
  - 40 adet erişilebilir atomik `src/components/core` bileşeni.
  - React Hook Form & Zod uyumlu `src/components/forms` yapısı.
  - Hazır Türkçe (TR) ve İngilizce (EN) i18n altyapısı.

---

## 🛠️ Teknoloji Yığını (Tech Stack)

- **Framework**: Next.js 16 (App Router & Turbopack), React 19, TypeScript
- **State Management**: Zustand (v5)
- **Data Fetching & Cache**: TanStack React Query (v5) & Devtools
- **Styling & Theme**: Tailwind CSS, `next-themes`, Framer Motion (View Transitions)
- **UI Primitives**: Radix UI (16+ primitive), Lucide Icons
- **Form & Validation**: React Hook Form, `@hookform/resolvers`, Zod

---

## 📁 Proje Dizin Yapısı (Project Structure)

```text
src/
├── app/                      # Next.js App Router sayfaları & API Endpoint'leri
│   ├── (public)/             # Public sayfalar (Landing, Login)
│   ├── (auth)/               # Korumalı kullanıcı sayfaları (Home, Workspace, Settings)
│   ├── (admin)/              # Yönetim paneli sayfaları (Admin Login, Overview, Users, Settings)
│   └── api/                  # Backend REST API endpoint'leri (/api/auth/*)
│
├── features/routes/          # Ekran modülleri ve diller (i18n)
│   ├── _shared/layouts/      # Shell çerçeveleri (PublicShell, AuthShell, AdminShell)
│   ├── public/               # Public ekranlar ve bileşenleri
│   ├── auth/                 # Kullanıcı ekranları ve bileşenleri
│   └── admin/                # Admin ekranları ve bileşenleri
│
├── components/               # UI Bileşen Katmanı
│   ├── core/                 # 40 adet atomik arayüz bileşeni (button, card, badge, dialog vb.)
│   ├── forms/                # RHF + Zod destekli form alanları (form, text-field, select vb.)
│   ├── layout/               # Global kontroller (LanguageSwitcher, ThemeToggle)
│   └── providers/            # ClientLocaleProvider, LocaleHtmlSync
│
├── stores/                   # Zustand Durum Depoları
│   └── use-auth-store.ts     # Oturum ve kullanıcı state deposu (Persisted)
│
├── lib/                      # Kütüphane ve Yardımcı Modüller
│   ├── api/                  # apiClient & HTTP Interceptor altyapısı (client, types)
│   ├── auth/                 # JWT (jwt.ts) & HTTP-Only Session (session.ts)
│   ├── i18n/                 # Server ve Request locale yardımcıları
│   └── metadata/             # Site ve sayfa SEO metadataları
│
├── services/                 # Servis Katmanı ve Önbellek Stratejileri
│   ├── auth-service.ts       # Kimlik doğrulama servis istekleri
│   └── example-service.ts    # Servis bazlı önbellek strateji örnekleri (CACHE_STRATEGIES)
│
├── hooks/                    # Custom React Query ve Uygulama Hook'ları
│   ├── use-api-query.ts      # Tip güvenli React Query sarmalayıcıları
│   └── use-auth-hooks.ts     # useLoginMutation, useLogoutMutation, useCurrentUserQuery
│
├── providers/                # Global Context Provider'lar
│   ├── query-provider.tsx    # TanStack React QueryProvider
│   └── theme-provider.tsx    # next-themes ThemeProvider
│
└── proxy.ts                  # Next.js 16 Native Proxy Middleware & Security Headers
```

---

## 🎓 Eğitici Mimari Rehber (Educational Guide)

### 1. API Client ve Interceptor Kullanımı

Uygulamada tüm HTTP istekleri `apiClient` üzerinden gerçekleştirilir. İstekler giden başlıkları (Authorization Bearer Token), gelen yanıtları (HTTP 401 kontrolü) ve hataları otomatik olarak işler.

```typescript
import { apiClient } from '@/lib/api';

// GET İsteği
const data = await apiClient.get<UserProfile>('/api/users/me');

// POST İsteği
const response = await apiClient.post<LoginResponse>('/api/auth/login', {
  email: 'user@tulpar.com',
  password: 'password123',
});
```

---

### 2. Servis ve Önbellekleme Katmanı (`CACHE_STRATEGIES`)

Projede global `staleTime: 0` olarak ayarlanmıştır. Her servis endpoint'i kendi önbellekleme ihtiyacına göre `CACHE_STRATEGIES` nesnesini kullanır:

```typescript
import { useApiQuery } from '@/hooks/use-api-query';

export const CACHE_STRATEGIES = {
  REALTIME: { staleTime: 0, gcTime: 0 }, // Her zaman taze veri
  SHORT: { staleTime: 1000 * 30, gcTime: 1000 * 60 * 5 }, // 30 saniye önbellek
  MEDIUM: { staleTime: 1000 * 60 * 5, gcTime: 1000 * 60 * 15 }, // 5 dakika önbellek
  LONG: { staleTime: 1000 * 60 * 60, gcTime: 1000 * 60 * 60 * 24 }, // 1 saat önbellek (statik veri)
} as const;

// Örnek Servis Hook'u:
export function useCountryLookupsQuery() {
  return useApiQuery<string[]>(
    ['lookups', 'countries'],
    '/api/lookups/countries',
    {},
    { ...CACHE_STRATEGIES.LONG }, // Statik liste için 1 saat önbellek
  );
}
```

---

### 3. Zustand ve React Query Auth Hook'ları

Kullanıcı giriş/çıkış durumları React Query Mutation'ları üzerinden yönetilir ve otomatik olarak hem Zustand `useAuthStore` state'ini hem de HTTP-Only sunucu çerezlerini senkronize eder:

```typescript
'use client';

import { useLoginMutation, useLogoutMutation, useCurrentUserQuery } from '@/hooks/use-auth-hooks';

export function LoginFormComponent() {
  const loginMutation = useLoginMutation();
  const logoutMutation = useLogoutMutation();
  const { data: userData, isLoading } = useCurrentUserQuery();

  const handleLogin = async () => {
    await loginMutation.mutateAsync({
      email: 'admin@tulpar.com',
      password: 'password123',
      isAdmin: true,
    });
  };

  return (
    <div>
      <button onClick={handleLogin} disabled={loginMutation.isPending}>
        Giriş Yap
      </button>
      <button onClick={() => logoutMutation.mutate()}>Çıkış Yap</button>
    </div>
  );
}
```

---

### 4. Güvenlik ve Session Yapılandırması

Next.js 16 Native `Proxy Middleware` ([proxy.ts](file:///Users/zafergok/Documents/github/ZAFER/tulpar/src/proxy.ts)), tüm isteklere güvenlik başlıklarını otomatik enjekte eder ve oturum kontrollerini yapar:

- **Giren İsteğin Korunması**: Yetkisiz kullanıcılar korumalı `/home` veya `/admin` rotalarına girmek istediğinde otomatik yönlendirilir.
- **HTTP Security Headers**:
  - `X-Frame-Options: DENY` (Clickjacking önleme)
  - `X-Content-Type-Options: nosniff` (MIME sniffing önleme)
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - `X-XSS-Protection: 1; mode=block`

---

## ⚡ Kurulum ve Komutlar

### 1. Kurulum

```bash
# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

Uygulama varsayılan olarak `http://localhost:3000` adresinde çalışır.

### 2. Kullanılabilir Komutlar

```bash
npm run dev             # Turbopack destekli geliştirme sunucusu
npm run build           # Üretim (Production) derlemesi
npm run start           # Derlenmiş üretim sunucusunu başlatma
npm run type-check      # TypeScript statik tip denetimi (tsc --noEmit)
npm run metadata:check  # Rota metadatalarının doğruluk kontrolü
npm run lint            # ESLint kod kalitesi denetimi
```

---

## 📄 Lisans

Bu proje [MIT Lisansı](file:///Users/zafergok/Documents/github/ZAFER/tulpar/LICENSE) altında lisanslanmıştır. Dilediğiniz gibi ticari veya kişisel projelerinizde kullanabilir, değiştirebilir ve dağıtabilirsiniz.
