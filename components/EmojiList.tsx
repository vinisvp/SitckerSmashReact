import { Image } from 'expo-image';
import { useState } from 'react';
import { FlatList, ImageSourcePropType, Platform, Pressable, StyleSheet } from 'react-native';

type Props = {
  //Aqui no onSelect vamos passar uma função para o componente, e o
  //componente vai passar um argumento chamado image
  onSelect: (image: ImageSourcePropType) => void;
  onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
    //Estamos criando uma array com as imagens
    const [emoji] = useState<ImageSourcePropType[]>([
    require("../assets/images/emoji1.png"),
    require("../assets/images/emoji2.png"),
    require("../assets/images/emoji3.png"),
    require("../assets/images/emoji4.png"),
    require("../assets/images/emoji5.png"),
    require("../assets/images/emoji6.png"),
  ]);

  return (
    //O FlatList cria uma lista de componentes, utilizando algum tipo de coleção de dados
    <FlatList
      horizontal
      //Platform.OS pega o sistema operacional do dispositivo do usuário
      //Se for no navegador, então será exibido o scroll em baixo
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      //o data define qual coleção vamos usar
      data={emoji}
      contentContainerStyle={styles.listContainer}
      //renderItem vai renderizar o componente para cada item de data, e será passado o item e seu indice (index)
      renderItem={({ item, index }) => (
        <Pressable
          onPress={() => {
            onSelect(item);
            onCloseModal();
          }}>
          <Image source={item} key={index} style={styles.image} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
