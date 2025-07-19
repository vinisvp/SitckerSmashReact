import { ImageSourcePropType } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize); //Tamanho da imagem
  //Posição da imagem
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  //Cria uma animação para a mudança de tamanho da imagem
  const imageStyle = useAnimatedStyle(() => {
    return {
      //withSpring faz uma transição para a mudança de valor
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  //Função para o aperto duplo
  const doubleTap = Gesture.Tap() //Estamos identificando os apertos
    .numberOfTaps(2) //Quantidade de apertos
    .onStart(() => { //O que ele vai realizar depois que o aperto duplo for identificado
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  //Função para arrastar
  //Pan detecta se o usuário está segurando
  const drag = Gesture.Pan().onChange((event) => { //onChange vai realizar a função enquanto o usuário continuar apertando
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  //Usar isso para mostrar o emoji mexendo na tela
  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={drag}> {/*Aqui pega o gesto de arrastar */}
      <Animated.View style={[containerStyle, { top: -350 }]}> {/*Vai ser uma view qua vai aplicar as animações */}
        <GestureDetector gesture={doubleTap}> {/*Aqui pega o gesto de aperto duplo */}
          <Animated.Image //Aqui é a imagem que vai aplicar as animações
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
