import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cronog',
  appName: 'Cronog',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    url: "http://192.168.0.174:3000"
  },
  plugins: {
    Keyboard: {
      resizeOnFullScreen: false,
    },
    LocalNotifications: {
      smallIcon: "ic_stat_icon_config_sample",
      iconColor: "#488AFF",
      sound: "beep.wav"
    }
  }
};

export default config;
