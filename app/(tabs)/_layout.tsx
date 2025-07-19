import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

//Essa é uma rota alternativa usando tabs
export default function TabLayout() {
  return (
    //Tabs é uma rota, que vai possuir as opções em baixo da tela
    //O screenOptions definimos algumas opções do tabs
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      {/*Aqui definimos uma tela da navegação. o tabBarIcon define o incone que vai ser utilizado, com o Ionicons */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
