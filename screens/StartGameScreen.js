import {
    TextInput,
    View,
    StyleSheet,
    Alert, Text,
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import { useState } from "react";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
function StartGameScreen({ onPickNumber }) {
    const [enteredNumber, setEnteredNumber] = useState('');

    const { width, height } = useWindowDimensions();
    const marginTopDis = height < 395 ? 30 : 100;
    function numberInputHandler(enteredNumber) {
        setEnteredNumber(enteredNumber)
    }
    function resetInputHandler() {
        setEnteredNumber('');
    }
    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number',
                'Number has to be a number between 1 and 99!',
                [{ text: 'Okey', style: 'destructive', onPress: resetInputHandler }])
            return;
        }
        onPickNumber(chosenNumber);
    }
    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} >
                <View style={[styles.rootScreen, { marginTop: marginTopDis }]}>
                    <Title>Guess my Number</Title>
                    <Card>
                        <InstructionText>Enter a number</InstructionText>
                        <TextInput style={styles.numberInput}
                            maxLength={2}
                            keyboardType="number-pad"
                            autoCapitalize='none'
                            onChangeText={numberInputHandler}
                            value={enteredNumber}
                            autoCorrect={false} />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default StartGameScreen;
const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootScreen: {
        flex: 1,
        alignItems: 'center'
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: "bold",
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 8
    }
});