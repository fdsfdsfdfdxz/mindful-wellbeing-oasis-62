
import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "hsl(var(--primary))",
        secondary: "hsl(var(--secondary))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Custom color palette
        calmBlue: {
          50: "#F0F7FF",
          100: "#E0EFFF",
          200: "#B8DBFF",
          300: "#8AC2FF",
          400: "#57A5FF",
          500: "#2684FF",
          600: "#1C6BDD",
          700: "#1254B5",
          800: "#0D4293",
          900: "#072C66",
        },
        sageGreen: {
          50: "#F0F9F0",
          100: "#DCEEDE",
          200: "#BFE3C0",
          300: "#93D095",
          400: "#65B768",
          500: "#48A14B",
          600: "#3B843D",
          700: "#2E6830",
          800: "#254D25",
          900: "#1B371C",
        },
        warmNeutral: {
          50: "#FAF7F5",
          100: "#F1EAE4",
          200: "#E3D5C9",
          300: "#D4BCAA",
          400: "#C0A18A",
          500: "#AB866D",
          600: "#896A54",
          700: "#6B5141",
          800: "#4D3A2F",
          900: "#30241D",
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          }
        },
        "fade-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(20px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)"
          }
        },
        "scale-up": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)"
          }
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0)"
          },
          "50%": {
            transform: "translateY(-10px)"
          }
        },
        "pulse-soft": {
          "0%, 100%": {
            opacity: "1"
          },
          "50%": {
            opacity: "0.8"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-right": "fade-in-right 0.6s ease-out",
        "fade-in-left": "fade-in-left 0.6s ease-out",
        "scale-up": "scale-up 0.5s ease-out",
        "float": "float 5s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
