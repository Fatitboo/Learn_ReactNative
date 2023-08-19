import { Text, View, Image, StyleSheet, useWindowDimensions, ScrollView } from "react-native";
import Title from '../components/ui/Title'
import PrimaryButton from '../components/ui/PrimaryButton'
import Colors from "../constants/colors";
function GameOverScreen({ userNumber, roundsNum, startNewGame }) {
    const { width, height } = useWindowDimensions();
    let imageSize = 300;
    if (width < 380) {
        imageSize = 150;
    }
    if (height < 400) {
        imageSize = 100;
    }
    const imgStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    };
    return (
        <ScrollView>
            <View style={styles.rootScreen}>
                <Title>GAME OVER</Title>
                <View style={[styles.imageContainer, imgStyle]}>
                    <Image style={styles.image} source={require('../assets/images/success.png')}></Image>
                </View>
                <Text style={styles.sumaryText}>Your phone needed
                    <Text style={styles.nestedText}> {roundsNum}</Text> rounds to guess the number
                    <Text style={styles.nestedText}> {userNumber}</Text>
                </Text>
                <PrimaryButton onPress={startNewGame}>Start new Game</PrimaryButton>
            </View>
        </ScrollView>
    );
}
export default GameOverScreen;


const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        // height:deviceWidth<380?150:300,
        // width:deviceWidth<380?150:300,
        marginVertical: 10,
        // borderRadius:deviceWidth<380?75:150,
        borderWidth: 2,
        borderColor: Colors.primary800,
        overflow: 'hidden',
    },
    image: {
        height: '100%',
        width: '100%'
    },
    sumaryText: {
        fontFamily: 'open-sans',
        fontSize: 24,
        marginBottom: 12
    },
    nestedText: {
        fontFamily: 'open-sans-bold'
    }
});