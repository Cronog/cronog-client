import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cronog',
  appName: 'Cronog',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    // url: "http://192.168.0.174:3000"
    url: "http://172.23.224.1:3000"
  },
  plugins: {
    Keyboard: {
      resize: "ionic",
      style: "LIGHT",
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
