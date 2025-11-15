import { Tabs } from "expo-router";


export default function RootLayout() {
  return <Tabs
            screenOptions={{
                tabBarActiveTintColor: "rgba(0, 26, 255, 1)",
                tabBarInactiveTintColor: "#888",
                headerStyle:{
                    backgroundColor: "#b8b8b8ff",
                },
                headerShadowVisible: false,
                headerTintColor: "rgba(8, 0, 255, 1)",
                tabBarStyle:{
                    backgroundColor: "#b8b8b8ff",
                },
            }}>
            <Tabs.Screen name="index" />
            <Tabs.Screen name="myBeers" />
          </Tabs>;
}
