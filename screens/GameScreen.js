import { Text, View, StyleSheet, Alert, FlatList, useWindowDimensions } from "react-native";
import Title from '../components/ui/Title'
import { useState, useEffect } from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from '../components/ui/PrimaryButton'
import Card from "../components/ui/Card";
import { Ionicons } from "@expo/vector-icons";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateNumberBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateNumberBetween(min, max, exclude);
    }
    else return rndNum;
}
let min = 1;
let max = 99;
function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateNumberBetween(1, 99, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();
    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver]);
    useEffect(() => {
        min = 1;
        max = 99;
    }, []);
    function nextGuessHandler(direction) {
        if ((direction === "lower" && currentGuess < userNumber)
            || (direction === "greater" && currentGuess > userNumber)) {
            Alert.alert("Don't lie!", "You  know that is wrong...",
                [{ text: "Sorry!", style: 'cancel' }]);
            return;
        }
        if (direction === "lower") {
            max = currentGuess;
        } else {
            min = currentGuess + 1;
        }
        const newRndNum = generateNumberBetween(min, max, currentGuess);
        setCurrentGuess(newRndNum);
        setGuessRounds((guessRounds) => [newRndNum, ...guessRounds]);
    }
    const guessRoundsLenght = guessRounds.length;
    let content = <>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                        <Ionicons name='md-remove' size={24} color={'white'} />
                    </PrimaryButton>
                </View>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
                        <Ionicons name='md-add' size={24} color={'white'} />
                    </PrimaryButton>
                </View>
            </View>
        </Card>
    </>
    if (width > 500) {
        content = <>
            <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
            <View style={styles.buttonContainerWide}>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
                        <Ionicons name='md-remove' size={24} color={'white'} />
                    </PrimaryButton>
                </View>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View style={styles.buttonContainer}>
                    <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
                        <Ionicons name='md-add' size={24} color={'white'} />
                    </PrimaryButton>
                </View>
            </View>

        </>
    }
    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
            <View style={styles.listContainer}>
                <FlatList data={guessRounds}
                    renderItem={(dataItem) =>
                        <GuessLogItem roundNumber={guessRoundsLenght - dataItem.index}
                            guess={dataItem.item}></GuessLogItem>}
                    keyExtractor={(item) => item} />
            </View>
        </View>
    );
}
export default GameScreen;
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    instructionText: {
        marginBottom: 12,
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 8
    },
    buttonContainerWide:{
        flexDirection:'row',
        alignItems:'center'
    },
    listContainer: {
        flex: 1,
        padding: 16
    }
});