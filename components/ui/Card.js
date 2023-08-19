import { View, StyleSheet, Dimensions } from "react-native";
import Colors from "../../constants/colors";

function Card({children}){
    return <View style={styles.card}>{children}</View>;
}
export default Card;
const deviceWidth= Dimensions.get('window').width;
const styles=StyleSheet.create({
    card:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:deviceWidth<380?18:36,
        padding: 16,
        backgroundColor: Colors.primary800,
        marginHorizontal: 24,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 6,
        elevation: 4
    }
});