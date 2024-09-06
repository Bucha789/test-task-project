import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    //To test the components with the jsdom environment - Required for the localStorage functions
    environment: 'jsdom',
  },
})