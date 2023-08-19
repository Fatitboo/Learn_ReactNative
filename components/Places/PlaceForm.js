import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from '../../constants/colors'
import { useCallback, useState } from "react";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { Place } from "../../models/Place";


function PlaceForm({onCreatePlace}) {
    const [enteredTitle, setEnteredTitle] = useState('');
    const [pickedLocation, setPickedLocation] = useState();
    const [pickedImage, setPickedImage] = useState();

    function titleTextChangeHandler(title) {
        setEnteredTitle(title);
    }
     function savePlaceHandler() {
        const placeDta = new Place(enteredTitle, pickedImage, pickedLocation);
        onCreatePlace(placeDta);
    }
    const pickLocationHandler = useCallback((location) => {
        setPickedLocation(location);
    }, []);
    function pickImageHandler(image) {
        setPickedImage(image);
    }
    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={titleTextChangeHandler}
                    value={enteredTitle} />
            </View>
            <ImagePicker onPickImage={pickImageHandler} />
            <LocationPicker onPickLocation={pickLocationHandler} />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
}
export default PlaceForm;
const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 16
    },
    label: {
        color: Colors.primary500,
        fontSize: 16

    },
    input: {
        paddingHorizontal: 4,
        paddingVertical: 10,
        marginVertical: 8,
        backgroundColor: Colors.primary200,
        borderRadius: 4,
        fontSize: 16
    }
});