/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '!./src/**/*.test.{js,ts,jsx,tsx,mdx}',
    '!./src/**/*.spec.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx}',
    './src/lib/**/*.{js,ts,jsx,tsx}',
    './src/providers/**/*.{js,ts,jsx,tsx}',
    './src/utils/**/*.{js,ts,jsx,tsx}',
    './src/store/**/*.{js,ts,jsx,tsx}',
    './src/services/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        desktop: '1440px',
      },
      colors: {
        // Enhanced neutral system for better dark theme contrast
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },

        // Background and foreground for semantic usage
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',

        // Primary color system
        primary: {
          50: 'hsl(var(--primary-50))',
          100: 'hsl(var(--primary-100))',
          200: 'hsl(var(--primary-200))',
          300: 'hsl(var(--primary-300))',
          400: 'hsl(var(--primary-400))',
          500: 'hsl(var(--primary-500))',
          600: 'hsl(var(--primary-600))',
          700: 'hsl(var(--primary-700))',
          800: 'hsl(var(--primary-800))',
          900: 'hsl(var(--primary-900))',
          DEFAULT: 'hsl(var(--primary-500))',
        },

        // Accent/Secondary colors
        accent: {
          50: 'hsl(var(--accent-50))',
          100: 'hsl(var(--accent-100))',
          200: 'hsl(var(--accent-200))',
          300: 'hsl(var(--accent-300))',
          400: 'hsl(var(--accent-400))',
          500: 'hsl(var(--accent-500))',
          600: 'hsl(var(--accent-600))',
          700: 'hsl(var(--accent-700))',
          800: 'hsl(var(--accent-800))',
          900: 'hsl(var(--accent-900))',
          DEFAULT: 'hsl(var(--accent-500))',
        },

        // Blue variations
        blue: {
          50: 'hsl(var(--blue-50))',
          100: 'hsl(var(--blue-100))',
          200: 'hsl(var(--blue-200))',
          300: 'hsl(var(--blue-300))',
          400: 'hsl(var(--blue-400))',
          500: 'hsl(var(--blue-500))',
          600: 'hsl(var(--blue-600))',
          DEFAULT: 'hsl(var(--blue-500))',
        },

        // Teal variations
        teal: {
          50: 'hsl(var(--teal-50))',
          100: 'hsl(var(--teal-100))',
          200: 'hsl(var(--teal-200))',
          300: 'hsl(var(--teal-300))',
          400: 'hsl(var(--teal-400))',
          500: 'hsl(var(--teal-500))',
          600: 'hsl(var(--teal-600))',
          DEFAULT: 'hsl(var(--teal-500))',
        },

        // Semantic colors
        success: 'hsl(var(--success))',
        warning: 'hsl(var(--warning))',
        error: 'hsl(var(--error))',
        info: 'hsl(var(--info))',

        // UI component colors
        muted: 'hsl(var(--muted))',
        'muted-foreground': 'hsl(var(--muted-foreground))',
        card: 'hsl(var(--card))',
        'card-foreground': 'hsl(var(--card-foreground))',
        popover: 'hsl(var(--popover))',
        'popover-foreground': 'hsl(var(--popover-foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',

        // Brutalist Dashboard Colors
        'void-black': {
          50: 'hsl(var(--void-black-50))',
          100: 'hsl(var(--void-black-100))',
          200: 'hsl(var(--void-black-200))',
          300: 'hsl(var(--void-black-300))',
          400: 'hsl(var(--void-black-400))',
          500: 'hsl(var(--void-black-500))',
          600: 'hsl(var(--void-black-600))',
          700: 'hsl(var(--void-black-700))',
          800: 'hsl(var(--void-black-800))',
          900: 'hsl(var(--void-black-900))',
          950: 'hsl(var(--void-black-950))',
          DEFAULT: 'hsl(var(--void-black))',
        },
        obsidian: {
          50: 'hsl(var(--obsidian-50))',
          100: 'hsl(var(--obsidian-100))',
          200: 'hsl(var(--obsidian-200))',
          300: 'hsl(var(--obsidian-300))',
          400: 'hsl(var(--obsidian-400))',
          500: 'hsl(var(--obsidian-500))',
          600: 'hsl(var(--obsidian-600))',
          700: 'hsl(var(--obsidian-700))',
          800: 'hsl(var(--obsidian-800))',
          900: 'hsl(var(--obsidian-900))',
          950: 'hsl(var(--obsidian-950))',
          DEFAULT: 'hsl(var(--obsidian))',
        },
        gunmetal: {
          50: 'hsl(var(--gunmetal-50))',
          100: 'hsl(var(--gunmetal-100))',
          200: 'hsl(var(--gunmetal-200))',
          300: 'hsl(var(--gunmetal-300))',
          400: 'hsl(var(--gunmetal-400))',
          500: 'hsl(var(--gunmetal-500))',
          600: 'hsl(var(--gunmetal-600))',
          700: 'hsl(var(--gunmetal-700))',
          800: 'hsl(var(--gunmetal-800))',
          900: 'hsl(var(--gunmetal-900))',
          950: 'hsl(var(--gunmetal-950))',
          DEFAULT: 'hsl(var(--gunmetal))',
        },
        titanium: {
          50: 'hsl(var(--titanium-50))',
          100: 'hsl(var(--titanium-100))',
          200: 'hsl(var(--titanium-200))',
          300: 'hsl(var(--titanium-300))',
          400: 'hsl(var(--titanium-400))',
          500: 'hsl(var(--titanium-500))',
          600: 'hsl(var(--titanium-600))',
          700: 'hsl(var(--titanium-700))',
          800: 'hsl(var(--titanium-800))',
          900: 'hsl(var(--titanium-900))',
          950: 'hsl(var(--titanium-950))',
          DEFAULT: 'hsl(var(--titanium))',
        },
        ash: {
          50: 'hsl(var(--ash-50))',
          100: 'hsl(var(--ash-100))',
          200: 'hsl(var(--ash-200))',
          300: 'hsl(var(--ash-300))',
          400: 'hsl(var(--ash-400))',
          500: 'hsl(var(--ash-500))',
          600: 'hsl(var(--ash-600))',
          700: 'hsl(var(--ash-700))',
          800: 'hsl(var(--ash-800))',
          900: 'hsl(var(--ash-900))',
          950: 'hsl(var(--ash-950))',
          DEFAULT: 'hsl(var(--ash))',
        },
        'tulpar-blue': {
          50: 'hsl(var(--tulpar-blue-50, 217 91% 97%) / <alpha-value>)',
          100: 'hsl(var(--tulpar-blue-100, 217 91% 94%) / <alpha-value>)',
          200: 'hsl(var(--tulpar-blue-200, 217 91% 86%) / <alpha-value>)',
          300: 'hsl(var(--tulpar-blue-300, 217 91% 77%) / <alpha-value>)',
          400: 'hsl(var(--tulpar-blue-400, 217 91% 68%) / <alpha-value>)',
          500: 'hsl(var(--tulpar-blue-500, 217 91% 60%) / <alpha-value>)',
          600: 'hsl(var(--tulpar-blue-600, 215 88% 48%) / <alpha-value>)',
          700: 'hsl(var(--tulpar-blue-700, 215 88% 40%) / <alpha-value>)',
          800: 'hsl(var(--tulpar-blue-800, 215 88% 30%) / <alpha-value>)',
          900: 'hsl(var(--tulpar-blue-900, 215 88% 20%) / <alpha-value>)',
          950: 'hsl(var(--tulpar-blue-950, 215 88% 12%) / <alpha-value>)',
          DEFAULT: 'hsl(var(--tulpar-blue) / <alpha-value>)',
        },
        'tulpar-gold': {
          50: 'hsl(43 90% 97% / <alpha-value>)',
          100: 'hsl(43 90% 92% / <alpha-value>)',
          200: 'hsl(43 85% 82% / <alpha-value>)',
          300: 'hsl(43 85% 70% / <alpha-value>)',
          400: 'hsl(43 85% 60% / <alpha-value>)',
          500: 'hsl(var(--tulpar-gold-500, 43 85% 50%) / <alpha-value>)',
          600: 'hsl(43 85% 44% / <alpha-value>)',
          700: 'hsl(43 85% 36% / <alpha-value>)',
          800: 'hsl(43 85% 28% / <alpha-value>)',
          900: 'hsl(43 85% 18% / <alpha-value>)',
          950: 'hsl(43 85% 10% / <alpha-value>)',
          DEFAULT: 'hsl(var(--tulpar-gold) / <alpha-value>)',
        },
        'tulpar-firuze': {
          50: 'hsl(174 75% 97% / <alpha-value>)',
          100: 'hsl(174 75% 92% / <alpha-value>)',
          200: 'hsl(174 75% 80% / <alpha-value>)',
          300: 'hsl(174 75% 65% / <alpha-value>)',
          400: 'hsl(174 75% 50% / <alpha-value>)',
          500: 'hsl(var(--tulpar-firuze-500, 174 75% 40%) / <alpha-value>)',
          600: 'hsl(174 75% 34% / <alpha-value>)',
          700: 'hsl(174 75% 28% / <alpha-value>)',
          800: 'hsl(174 75% 22% / <alpha-value>)',
          900: 'hsl(174 75% 14% / <alpha-value>)',
          950: 'hsl(174 75% 8% / <alpha-value>)',
          DEFAULT: 'hsl(var(--tulpar-firuze) / <alpha-value>)',
        },
        'tulpar-cosmic': {
          DEFAULT: 'hsl(var(--tulpar-cosmic, 222 47% 6%) / <alpha-value>)',
        },
        'signal-green': {
          50: 'hsl(var(--signal-green-50))',
          100: 'hsl(var(--signal-green-100))',
          200: 'hsl(var(--signal-green-200))',
          300: 'hsl(var(--signal-green-300))',
          400: 'hsl(var(--signal-green-400))',
          500: 'hsl(var(--signal-green-500))',
          600: 'hsl(var(--signal-green-600))',
          700: 'hsl(var(--signal-green-700))',
          800: 'hsl(var(--signal-green-800))',
          900: 'hsl(var(--signal-green-900))',
          950: 'hsl(var(--signal-green-950))',
          DEFAULT: 'hsl(var(--signal-green))',
        },
        'alert-red': {
          50: 'hsl(var(--alert-red-50))',
          100: 'hsl(var(--alert-red-100))',
          200: 'hsl(var(--alert-red-200))',
          300: 'hsl(var(--alert-red-300))',
          400: 'hsl(var(--alert-red-400))',
          500: 'hsl(var(--alert-red-500))',
          600: 'hsl(var(--alert-red-600))',
          700: 'hsl(var(--alert-red-700))',
          800: 'hsl(var(--alert-red-800))',
          900: 'hsl(var(--alert-red-900))',
          950: 'hsl(var(--alert-red-950))',
          DEFAULT: 'hsl(var(--alert-red))',
        },

        // Light Theme Palette
        linen: {
          50: 'hsl(var(--linen-50))',
          100: 'hsl(var(--linen-100))',
          200: 'hsl(var(--linen-200))',
          300: 'hsl(var(--linen-300))',
          400: 'hsl(var(--linen-400))',
          500: 'hsl(var(--linen-500))',
          600: 'hsl(var(--linen-600))',
          700: 'hsl(var(--linen-700))',
          800: 'hsl(var(--linen-800))',
          900: 'hsl(var(--linen-900))',
          950: 'hsl(var(--linen-950))',
          DEFAULT: 'hsl(var(--linen))',
        },
        parchment: {
          50: 'hsl(var(--parchment-50))',
          100: 'hsl(var(--parchment-100))',
          200: 'hsl(var(--parchment-200))',
          300: 'hsl(var(--parchment-300))',
          400: 'hsl(var(--parchment-400))',
          500: 'hsl(var(--parchment-500))',
          600: 'hsl(var(--parchment-600))',
          700: 'hsl(var(--parchment-700))',
          800: 'hsl(var(--parchment-800))',
          900: 'hsl(var(--parchment-900))',
          950: 'hsl(var(--parchment-950))',
          DEFAULT: 'hsl(var(--parchment))',
        },
        sandstone: {
          50: 'hsl(var(--sandstone-50))',
          100: 'hsl(var(--sandstone-100))',
          200: 'hsl(var(--sandstone-200))',
          300: 'hsl(var(--sandstone-300))',
          400: 'hsl(var(--sandstone-400))',
          500: 'hsl(var(--sandstone-500))',
          600: 'hsl(var(--sandstone-600))',
          700: 'hsl(var(--sandstone-700))',
          800: 'hsl(var(--sandstone-800))',
          900: 'hsl(var(--sandstone-900))',
          950: 'hsl(var(--sandstone-950))',
          DEFAULT: 'hsl(var(--sandstone))',
        },
        ink: {
          50: 'hsl(var(--ink-50))',
          100: 'hsl(var(--ink-100))',
          200: 'hsl(var(--ink-200))',
          300: 'hsl(var(--ink-300))',
          400: 'hsl(var(--ink-400))',
          500: 'hsl(var(--ink-500))',
          600: 'hsl(var(--ink-600))',
          700: 'hsl(var(--ink-700))',
          800: 'hsl(var(--ink-800))',
          900: 'hsl(var(--ink-900))',
          950: 'hsl(var(--ink-950))',
          DEFAULT: 'hsl(var(--ink))',
        },
      },

      fontFamily: {
        display: ['var(--font-space-grotesk)', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'slide-in': {
          '0%': { transform: 'translateY(10px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        },
        'paper-crumple': {
          '0%': {
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
          },
          '35%': {
            transform:
              'translate(-50%, -50%) scale(0.92, 1.07) rotate(-2deg) skewX(-3deg)',
          },
          '70%': {
            transform:
              'translate(-50%, -50%) scale(0.72, 0.9) rotate(5deg) skewY(8deg)',
          },
          '100%': {
            opacity: '1',
            borderRadius: '34%',
            transform:
              'translate(-50%, -50%) scale(0.48) rotate(-11deg) skew(-8deg, 7deg)',
          },
        },
        'paper-toss': {
          '0%': {
            opacity: '1',
            borderRadius: '34%',
            transform: 'translate(-50%, -50%) scale(0.48) rotate(-11deg)',
          },
          '48%': {
            opacity: '1',
            transform: 'translate(8%, -145%) scale(0.34) rotate(126deg)',
          },
          '100%': {
            opacity: '0',
            transform: 'translate(120%, 92%) scale(0.12) rotate(286deg)',
          },
        },
        'trash-appear': {
          '0%': {
            opacity: '0',
            transform: 'translateY(12px) scale(0.78)',
          },
          '70%': {
            opacity: '1',
            transform: 'translateY(-3px) scale(1.08)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        'trash-wait': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 hsl(var(--alert-red) / 0)',
          },
          '50%': {
            boxShadow: '0 0 0 7px hsl(var(--alert-red) / 0.13)',
          },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        shimmer: 'shimmer 2s infinite',
        'pulse-subtle': 'pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'paper-crumple':
          'paper-crumple 420ms cubic-bezier(0.4, 0, 0.3, 1) forwards',
        'paper-toss':
          'paper-toss 760ms cubic-bezier(0.22, 0.7, 0.24, 1) forwards',
        'trash-appear': 'trash-appear 360ms ease-out forwards',
        'trash-wait': 'trash-wait 900ms ease-in-out infinite',
      },

      boxShadow: {
        primary:
          '0 4px 6px -1px hsla(21, 100%, 50%, 0.1), 0 2px 4px -1px hsla(21, 100%, 50%, 0.06)',
        'primary-lg':
          '0 10px 15px -3px hsla(21, 100%, 50%, 0.1), 0 4px 6px -2px hsla(21, 100%, 50%, 0.05)',
        'primary-xl':
          '0 20px 25px -5px hsla(21, 100%, 50%, 0.1), 0 10px 10px -5px hsla(21, 100%, 50%, 0.04)',
        glow: '0 0 20px hsla(21, 100%, 50%, 0.3)',
        'glow-lg': '0 0 40px hsla(21, 100%, 50%, 0.2)',
        'glow-indigo': '0 0 15px -3px rgba(79, 70, 229, 0.4)',
        'glow-indigo-strong': '0 0 15px rgba(99, 102, 241, 0.5)',
        'glow-indigo-soft': '0 2px 8px -4px rgba(99, 102, 241, 0.4)',
        'glow-red': '0 0 20px rgba(239, 68, 68, 0.2)',
        'glow-red-strong': '0 0 15px rgba(239, 68, 68, 0.5)',
        'glow-amber': '0 0 20px rgba(245, 158, 11, 0.2)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.2)',
        'glow-blue': '0 0 10px rgba(0, 82, 255, 0.8)',
      },

      backdropBlur: {
        xs: '2px',
      },

      minWidth: {
        table: '760px',
      },

      fontSize: {
        micro: ['0.5625rem', { lineHeight: '0.75rem' }],
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        compact: ['0.6875rem', { lineHeight: '1rem' }],
        caption: ['0.8125rem', { lineHeight: '1.125rem' }],
      },

      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },

      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        '10xl': '104rem',
      },

      maxHeight: {
        dialog: 'calc(100vh - 2rem)',
      },

      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
        100: '100',
      },
    },
  },
  plugins: [
    function ({ addUtilities, addComponents }) {
      const newUtilities = {
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
        '.text-gradient': {
          background:
            'linear-gradient(to right, var(--primary-600), var(--accent-600))',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.glass-effect': {
          background: 'hsla(39, 67%, 95%, 0.1)',
          'backdrop-filter': 'blur(10px)',
          border: '1px solid hsla(39, 67%, 95%, 0.2)',
        },
      };

      const newComponents = {
        '.btn-primary': {
          background:
            'linear-gradient(135deg, var(--primary-500), var(--primary-600))',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-md)',
          fontWeight: '500',
          transition: 'all 150ms',
          border: '1px solid var(--primary-600)',
          '&:hover': {
            background:
              'linear-gradient(135deg, var(--primary-400), var(--primary-500))',
            transform: 'translateY(-1px)',
            boxShadow: 'var(--shadow-md)',
          },
        },
        '.card-modern': {
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          boxShadow: 'var(--shadow-sm)',
          transition: 'all 300ms',
          '&:hover': {
            boxShadow: 'var(--shadow-lg)',
            transform: 'translateY(-2px)',
          },
        },
      };

      addUtilities(newUtilities);
      addComponents(newComponents);
    },
  ],
};

export default config;
