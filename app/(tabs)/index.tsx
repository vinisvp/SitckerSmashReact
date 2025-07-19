//O "*" quer dizer que estamos importando tudo da biblioteca expo-image-picker
//e estamos apelidando essa biblioteca como ImagePicker, utilizando a palavra "as"
import domtoimage from "dom-to-image";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import { ImageSourcePropType, Platform, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

//Importamos os componentes. como eles estão em uma pasta fora de app, então colocamos @ e o caminho do componente
//Com @ representando o diretório do projeto
import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";

//Aqui estamos carregando a imagem de exemplo
const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  //Essa várivel será o conteudo que será salvo como imagem
  const imageRef = useRef<View>(null);

  //Estamos definindo estados com useState, que será uma especie de váriaveis
  //requestPermission faz a aplicação pedir permissão do usuário para acessar a biblioteca
  const [status, requestPermission] = MediaLibrary.usePermissions();
  //vamos utilizar esse estado para guardar a imagem selecionada
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  //Usar esse estado para mostrar as opções de emoji
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  //Usar esse estado para definir se o modal será visivel
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  //Usar essa váriavel para definir se o emoji será visivel
  const [pickedEmoji, setPickedEmoji] = useState<
    ImageSourcePropType | undefined
  >(undefined);

  //Se não tiver permissão, então vai pedir
  if (status === null) {
    requestPermission();
  }

  //Com essa função, vamos selecionar a imagem
  const pickImageAsync = async () => {
    //o launchImageLibraryAsync seleciona imagens do dispositivo do usuário
    //o await é necessário, pois precisamos que a seleção termine para guardar a imagem
    let result = await ImagePicker.launchImageLibraryAsync({
      //Algumas opções para a seleção
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    //o canceled é um boolean se diz se o usuário cancelou a seleção
    if (!result.canceled) {
      //Caso não tenha sido cancelada, então guardamos o uri da primeira imagem no estado
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      console.log(result);
    } else {
      alert("You did not select any image.");
    }
  };

  //Para resetar, ou seja, tirar as opções e deixar os botões de selecionar imagem
  const onReset = () => {
    setShowAppOptions(false);
  };

  //Para exibir o modal para selecionar o emoji
  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  //Para parar de exibir o modal de selecionar emoji
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  //Para salvar a imagem com sticker
  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") { //Se o dispositivo não for navegador web
      try {
        //Vai capturar o conteudo do imageRef
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        //Vai salvar a captura na biblioteca
        await MediaLibrary.saveToLibraryAsync(localUri);
        if (localUri) {
          alert("Saved!");
        }
      } catch (e) {
        console.log(e);
      }
    } else { //Já se for navegador web
      try {
        //Vai capturar o conteudo do imageRef
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        //Cria um elemento link
        let link = document.createElement("a");
        //Ao ser clicado, vai fazer dowload de um arquivo com o nome sticker-smash.jpeg
        link.download = "sticker-smash.jpeg";
        //O link desse elemento é a url da captura
        link.href = dataUrl;
        //Clica no link, levando para a tela de download do Computador
        link.click();
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <View
            ref={imageRef}
            collapsable={false} /*Esse View será o conteudo do imageRef */
          >
            {/*Estamos usando a propriedade imgSource que definimos no componente para passar a imagem genérica
            E usamos o selectedImage para passar a imagem selecionada*/}
            <ImageViewer
              imgSource={PlaceholderImage}
              selectedImage={selectedImage}
            />
            {/*Caso um emoji tiver sido selecionado, vamos exibir ele com EmojiSticker */}
            {pickedEmoji && (
              <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
            )}
          </View>
        </View>
        {/*Caso for para exibir as opções de emoji */}
        {showAppOptions ? (
          <View style={styles.optionsContainer}>
            <View style={styles.optionsRow}>
              <IconButton
                icon="refresh"
                label="Reset"
                onPress={onReset} /*Botão de resetar */
              />
              <CircleButton
                onPress={onAddSticker} /*Botão de selecionar o emoji */
              />
              <IconButton
                icon="save-alt"
                label="Save"
                onPress={onSaveImageAsync} /*Botão de salvar o emoji */
              />
            </View>
          </View>
        ) : (
          <View style={styles.footerContainer}>
            {" "}
            {/*Caso não for para exibir as opções de emoji */}
            {/*Passamos a função pickImageAsync para o botão de selecionar imagem */}
            <Button
              theme="primary"
              label="Choose a photo"
              onPress={pickImageAsync}
            />
            <Button
              label="Use this photo"
              onPress={() => setShowAppOptions(true)}
            />
          </View>
        )}
        <EmojiPicker /*Esse será o modal para selecionar o emoji */
          isVisible={isModalVisible}
          onClose={onModalClose}
        >
          <EmojiList /*Lista dentro do modal para mostrar os emojis */
            onSelect={setPickedEmoji}
            onCloseModal={onModalClose}
          />
        </EmojiPicker>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
  button: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#fff",
  },
  imageContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
