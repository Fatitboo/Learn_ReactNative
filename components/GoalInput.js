import { useState } from 'react';
import { StyleSheet, View, Button, TextInput, Modal, Image} from "react-native";
function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState('');
    function goalInputHandler(enderedText) {
        setEnteredGoalText(enderedText);
    }
    function addGoalHandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }
    return (
        <Modal visible={props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
                <Image style={styles.image} source={require('../assets/images/goal.png')}/>
                <TextInput style={styles.textInput}
                    placeholder="insert here"
                    onChangeText={goalInputHandler}
                    value={enteredGoalText} />
                <View style={styles.buttonContainer}>
                    <View style={styles.button}>
                        <Button title='Add goal' onPress={addGoalHandler} />
                    </View>
                    <View style={styles.button}>
                        <Button title='Cancel' onPress={props.onCancel} color={"red"}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default GoalInput;
const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        padding:16,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#311b6b'
    },
    textInput: {
        width: '100%',
        borderWidth: 1,
        borderColor: "#e4d0ff",
        backgroundColor:"#e4d0ff",
        padding: 10, 
        color:'#120438',
        borderRadius:6,
        padding:16,

    },
    image:{
        width:100,
        height:100
    },
    buttonContainer:{
        flexDirection:'row',
        marginTop:16
    },
    button:{
        width:'30%',
        marginHorizontal:8
    }
});