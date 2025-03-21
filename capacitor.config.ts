import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.career.guidence',
  appName: 'Empowering Young Minds',
  webDir: 'out',
  plugins: {
    Geolocation: {
      permissions: {
        permissions: true
      }
    }
  }
};

export default config;
