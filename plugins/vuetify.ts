import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    ssr: true,
    display: {
      mobileBreakpoint: 'sm',
    },
    theme: {
      defaultTheme: 'myTheme',
      themes: {
        myTheme: {
          colors: {
            primary: '#2970FF',
            background: '#F7F8FA',
            text: '#737373',
            'primary-50': '#eef2ff',
            'primary-100': '#e0e7ff',
            'primary-200': '#c7d2fe',
            'primary-300': '#a5b4fc',
            'primary-400': '#818cf8',
            'primary-500': '#6366f1',
            'primary-600': '#4f46e5',
            'primary-700': '#4338ca',
            'primary-800': '#3730a3',
            'primary-900': '#312e81',
            'primary-950': '#002266',
            'neutral-25': '#FCFCFD',
            'neutral-50': '#FAFAFA',
            'neutral-100': '#F5F5F5',
            'neutral-200': '#E5E5E5',
            'neutral-300': '#D4D4D4',
            'neutral-400': '#A3A3A3',
            'neutral-500': '#737373',
            'neutral-600': '#525252',
            'neutral-700': '#404040',
            'neutral-800': '#262626',
            'neutral-900': '#171717',
            'neutral-950': '#0F0F0F',
            'success-50': '#F0FDF4',
            'success-100': '#DCFCE7',
            'success-200': '#BBF7D0',
            'success-300': '#86EFAC',
            'success-400': '#4ADE80',
            'success-500': '#22C55E',
            'success-600': '#16A34A',
            'success-700': '#15803D',
            'success-800': '#166534',
            'success-900': '#14532D',
            'warning-50': '#FFFBEB',
            'warning-100': '#FEF3C7',
            'warning-200': '#FDE68A',
            'warning-300': '#FCD34D',
            'warning-400': '#FBBF24',
            'warning-500': '#F59E0B',
            'warning-600': '#D97706',
            'warning-700': '#B45309',
            'warning-800': '#92400E',
            'warning-900': '#78350F',
            'destructive-50': '#FEF2F2',
            'destructive-100': '#FEE2E2',
            'destructive-200': '#FECACA',
            'destructive-300': '#FCA5A5',
            'destructive-400': '#F87171',
            'destructive-500': '#EF4444',
            'destructive-600': '#DC2626',
            'destructive-700': '#B91C1C',
            'destructive-800': '#991B1B',
            'destructive-900': '#7F1D1D'
          },
        },
      },
    },
  })
  app.vueApp.use(vuetify)
})
