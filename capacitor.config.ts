import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.aishwaryam.app',
  appName: 'Aishwaryam @Your home',
  webDir: 'dist',
  server: {
    url: 'https://aishwaryam-web.pages.dev',
    cleartext: true
  }
};

export default config;
