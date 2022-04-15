import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cronog',
  appName: 'cronog-client',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.0.174:3000"
  },
  plugins: {
    Keyboard: {
      resize: "ionic",
      style: "LIGHT",
      resizeOnFullScreen: false,
    }
  }
};

export default config;
