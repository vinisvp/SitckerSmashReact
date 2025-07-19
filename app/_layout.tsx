import { Stack } from "expo-router";

//Esse arquivo define as rotas do root da aplicação
export default function RootLayout() {
  return (
    //Stack faz navegação acumulando as telas, colocando o botão de voltar para voltar nas telas
    <Stack>
      {/*O name no Stack.Screen terá o mesmo nome do arquivo do componente/tela ou diretorio da navegação aninhada
         O headerShown define se vai mostrar a rota na parte de cima da tela*/}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
