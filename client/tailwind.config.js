/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4F46E5',  // Example primary color
        'primary-foreground': '#FFFFFF',  // Example text color on primary background
        'background': '#F9FAFB',  // Example background color
        'muted': '#E5E7EB',  // Example muted color
        'muted-foreground': '#6B7280',  // Example muted text color
        'accent': '#FBBF24',  // Example accent color
        'accent-foreground': '#1F2937',  // Example text color on accent background
        'input': '#D1D5DB',  // Example border color
        'ring': '#3B82F6',  // Example ring color for focus
      },
    },
  },
  plugins: [],
}
