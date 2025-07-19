import { Image } from 'expo-image';
import { ImageSourcePropType, StyleSheet } from 'react-native';

//Aqui criamos propriedades que podemos usar no componente
type Props = {
  //Criamos a propriedade imgSource, do tipo ImageSourcePropType, que vai receber uma imagem 
  imgSource: ImageSourcePropType;
  //Vamos utilizar a o propriedade selectedImage para passar a imagem que o usuário escolheu
  selectedImage?: string;
};

//No componente ImageViewer, estamos usando a propriedade imgSource nos argumentos
export default function ImageViewer({ imgSource, selectedImage }: Props) {
  //Caso tiver uma imagem selecionada, então será passada ela, se não,
  //será passada o imgSource, que será uma imagem placeholder
  const imageSource = selectedImage ? { uri: selectedImage } : imgSource;

  return <Image source={imageSource} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});