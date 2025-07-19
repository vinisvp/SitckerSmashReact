import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { PropsWithChildren } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

//PropsWithChildren permite que esse componente tenha um outro componente aninhado a ele
type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

//O children representa o componente aninhado
export default function EmojiPicker({ isVisible, children, onClose }: Props) {
  return (
    <View>
    {/*Um Modal será um componente que exibido acima dos outros componentes */}
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.titleContainer}> {/*Nesse View está definindo o cabecalho do Modal*/}
          <Text style={styles.title}>Choose a sticker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="#fff" size={22} />
          </Pressable>
        </View>
        {/*Aqui estamos exibindo o componente aninhado, e será o corpo do modal*/}
        {children}
      </View>
    </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    height: '25%',
    width: '100%',
    backgroundColor: '#25292e',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
  },
  titleContainer: {
    height: '16%',
    backgroundColor: '#464C55',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row', //Deixa tudo horizontal
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
});
