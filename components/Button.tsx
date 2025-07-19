import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Pressable, StyleSheet, Text, View } from "react-native";

//O "?" no theme fala que a propriedade theme não é obrigatória
type Props = {
  label: string;
  theme?: "primary";
  //Com essa propriedade onPress, vamos utilizar para passar uma função ao botão
  onPress?: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
    //Se o theme for primary, será retornado um botão diferente
    if (theme === "primary") {
    return (
      <View
        style={[
          styles.buttonContainer,
          { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 },
        ]}
      >
        {/*Pressable é um componente "botão" mais flexivel, tendo uma costumização maior,
           E detectando diferentes tipos de toques, como pressionada simples, segurar, etc.
           Com onPress, podemos executar uma função com o botão quando precionado*/}
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={onPress}
        >
          {/*Com o FontAwesome, podemos exibir um icone. Para definir o icone, passamos o nome dele em name */}
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={[styles.buttonLabel, { color: "#25292e" }]}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  }

  {/*Caso não tenha um theme valido, então será retornado esse botão mais básico */}
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={onPress}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
