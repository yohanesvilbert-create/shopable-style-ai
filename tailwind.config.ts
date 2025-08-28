import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				
				// App specific colors
				'app-background': 'hsl(var(--app-background))',
				'section-background': 'hsl(var(--section-background))',
				
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					muted: 'hsl(var(--primary-muted))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					muted: 'hsl(var(--secondary-muted))'
				},
				
				// iOS Glassmorphism accent colors
				'accent-gold': {
					DEFAULT: 'hsl(var(--accent-gold))',
					muted: 'hsl(var(--accent-gold-muted))'
				},
				'accent-warm': 'hsl(var(--accent-warm))',
				
				// iOS specific colors
				'ios-blue': 'hsl(212 100% 50%)',
				'ios-gray': 'hsl(220 15% 95%)',
				'ios-light-gray': 'hsl(220 10% 90%)',
				'glass-white': 'hsl(0 0% 100% / 0.7)',
				'glass-border': 'hsl(220 20% 85% / 0.3)',
				
				// Text hierarchy
				'text-primary': 'hsl(var(--text-primary))',
				'text-secondary': 'hsl(var(--text-secondary))',
				'text-muted': 'hsl(var(--text-muted))',
				
				// Interactive elements
				'button-primary': {
					DEFAULT: 'hsl(var(--button-primary))',
					hover: 'hsl(var(--button-primary-hover))'
				},
				'button-secondary': 'hsl(var(--button-secondary))',
				'button-outline': 'hsl(var(--button-outline))',
				
				// Chips and pills
				'chip-background': 'hsl(var(--chip-background))',
				'chip-foreground': 'hsl(var(--chip-foreground))',
				'chip-active': 'hsl(var(--chip-active))',
				'chip-active-foreground': 'hsl(var(--chip-active-foreground))',
				
				// Fashion specific
				'price-color': 'hsl(var(--price-color))',
				'discount-color': 'hsl(var(--discount-color))',
				'tag-background': 'hsl(var(--tag-background))',
				'loyalty-gold': 'hsl(var(--loyalty-gold))',
				
				// Status colors
				success: 'hsl(var(--success))',
				warning: 'hsl(var(--warning))',
				error: 'hsl(var(--error))',
				info: 'hsl(var(--info))',
				
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					shadow: 'hsl(var(--card-shadow))'
				}
			},
			boxShadow: {
				'card': 'var(--shadow-card)',
				'chip': 'var(--shadow-chip)',
				'floating': 'var(--shadow-floating)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
