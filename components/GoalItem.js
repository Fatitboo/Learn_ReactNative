import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {
    return (
        <View style={styles.goalItem}>
            <Pressable onPress={props.onDeleteItem.bind(this, props.id)}
                       android_ripple={{color:'#dddddd'}}
                       style={({pressed})=> pressed && styles.pressedItem}>
                <Text style={styles.goalText}>{props.text}</Text>
            </Pressable>
        </View>
    );
}
export default GoalItem;

const styles = StyleSheet.create({
    goalItem: {
        backgroundColor: '#311b6b',
        padding: 16,
        margin: 4,
        borderRadius: 5
    },
    goalText: {
        color: 'white'
    },
    pressedItem:{
        opacity:0.5
    }
});