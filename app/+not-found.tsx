import { Link, Stack } from 'expo-router';
import { StyleSheet, View } from 'react-native';

//Esse arquivo será usado quando a roda for invalida
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops! Not Found' }} />
      {/*View é como se fosse um div */}
      <View style={styles.container}>
        {/*Link você pode fazer navegação de telas, com a rota no href */}
        <Link href="/" style={styles.button}>
          Go back to Home screen!
        </Link>
      </View>
    </>
  );
}

//Aqui definimos os estilos da aplicação
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});