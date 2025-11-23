// app.config.js
export default ({ config }) => {
  return {
    ...config,
    name: "kit-acordo-casal-capital",
    slug: "kit-acordo-casal-capital",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "kitacordocasalcapital",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    jsEngine: "hermes",
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
        backgroundImage: "./assets/images/android-icon-background.png",
        monochromeImage: "./assets/images/android-icon-monochrome.png"
      },
      package: "com.richardapptest.kitacordocasalcapital"
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
      reactCompiler: true
    },
    updates: { enabled: false },
    runtimeVersion: { policy: "sdkVersion" },
    extra: {
      eas: {
        projectId: "f221a04a-6036-4019-a479-0be66ef37d29",
        build: {
          experimental: {
            android: {
              buildType: "apk"   // ← ESSA LINHA É O SEGREDO FINAL
            }
          }
        }
      }
    }
  };
};