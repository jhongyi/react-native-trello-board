1. Create folder bundle
2. react-native bundle --entry-file index.ios.js --platform ios --bundle-output ./bundle/main.jsbundle --dev false --assets-dest ./bundle
    --entry-file：JS 檔入口文件，以我的專案來說，index.ios.js 是我 iOS 的入口
    --platform：ios 或 android；
    --dev：是否在開發環境，默認值為true。
3. react-native start --reset-cache
