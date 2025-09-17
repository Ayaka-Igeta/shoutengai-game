/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          blue: '#007AFF',
          gray: {
            50: '#F9F9F9',
            100: '#F2F2F7',
            200: '#E5E5EA',
            300: '#D1D1D6',
            400: '#C7C7CC',
            500: '#AEAEB2',
            600: '#8E8E93',
            700: '#636366',
            800: '#48484A',
            900: '#1C1C1E'
          }
        },
        vibrant: {
          red: '#FF3B30',
          orange: '#FF9500',
          yellow: '#FFCC00',
          green: '#34C759',
          mint: '#00C7BE',
          teal: '#30B0C7',
          cyan: '#32D74B',
          blue: '#007AFF',
          indigo: '#5856D6',
          purple: '#AF52DE',
          pink: '#FF2D92',
          brown: '#A2845E'
        },
        muted: {
          red: '#D70015',
          orange: '#D67800',
          yellow: '#D6A000',
          green: '#2A9F47',
          mint: '#00A39A',
          teal: '#268FA3',
          cyan: '#28B83F',
          blue: '#0056CC',
          indigo: '#4644B1',
          purple: '#8B42B8',
          pink: '#CC1F75',
          brown: '#82694B'
        }
      },
      fontFamily: {
        'sf': ['-apple-system', 'BlinkMacSystemFont', 'San Francisco', 'SF Pro Display', 'SF Pro Text', 'system-ui', 'sans-serif']
      },
      borderRadius: {
        'apple': '20px',
        'apple-lg': '28px'
      },
      backdropBlur: {
        'apple': '20px'
      },
      boxShadow: {
        'apple': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'apple-hover': '0 8px 40px rgba(0, 0, 0, 0.15)'
      }
    },
  },
  plugins: [],
}

