import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";

function PlaceItem({ place, onPress }) {
    return (
        <Pressable style={({ pressed }) => [styles.item, pressed && styles.pressed]} onPress={onPress}>
            <Image style={styles.image} source={{ uri: place.imageUrl }} />
            <View style={styles.info}>
                <Text style={styles.title}>{place.title}</Text>
                <Text style={styles.address}>{place.address}</Text>
            </View>
        </Pressable>
    );
}
export default PlaceItem;
const styles = StyleSheet.create({
    item: {
        marginHorizontal:10,
        flexDirection: 'row',
        borderRadius: 4,
        marginVertical: 12,
        backgroundColor: Colors.primary500,
        elevation: 2,
        shadowColor: 'black',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.25,
        shadowRadius: 2,
        alignItems: 'flex-start'
    },
    pressed: {
        opacity: 0.7
    },
    image: {
        flex: 1,
        borderBottomLeftRadius: 4,
        borderTopLeftRadius: 4,
        height: 100
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.gray700
    },
    info: {
        flex: 2,
        padding: 12
    },
    address: {
        fontSize: 12,
        color: Colors.gray700
    }
});