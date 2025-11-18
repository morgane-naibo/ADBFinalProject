/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          background: "hsl(var(--background, 0 0% 100%))",
          foreground: "hsl(var(--foreground, 240 10% 3.9%))",
          card: "hsl(var(--card, 0 0% 100%))",
          "card-foreground": "hsl(var(--card-foreground, 240 10% 3.9%))",
          popover: "hsl(var(--popover, 0 0% 100%))",
          "popover-foreground": "hsl(var(--popover-foreground, 240 10% 3.9%))",
          primary: "hsl(var(--primary, 142.1 76.2% 36.3%))",
          "primary-foreground": "hsl(var(--primary-foreground, 355.7 100% 97.3%))",
          secondary: "hsl(var(--secondary, 221.2 83.2% 53.3%))",
          "secondary-foreground": "hsl(var(--secondary-foreground, 0 0% 100%))",
          muted: "hsl(var(--muted, 240 4.8% 95.9%))",
          "muted-foreground": "hsl(var(--muted-foreground, 240 3.8% 46.1%))",
          accent: "hsl(var(--accent, 142.1 76.2% 36.3%))",
          "accent-foreground": "hsl(var(--accent-foreground, 0 0% 100%))",
          destructive: "hsl(var(--destructive, 0 84.2% 60.2%))",
          "destructive-foreground": "hsl(var(--destructive-foreground, 0 0% 98%))",
          border: "hsl(var(--border, 240 5.9% 90%))",
          input: "hsl(var(--input, 240 5.9% 90%))",
          ring: "hsl(var(--ring, 142.1 76.2% 36.3%))",
        },
        borderRadius: {
          lg: "var(--radius, 0.5rem)",
          md: "calc(var(--radius, 0.5rem) - 2px)",
          sm: "calc(var(--radius, 0.5rem) - 4px)",
        },
      },
    },
    plugins: [],
  };
  