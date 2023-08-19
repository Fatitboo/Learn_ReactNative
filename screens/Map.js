import { useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import IconButton from '../components/UI/IconButton';

function Map({navigation}) {
    const [pickedLocation, setPickedLocation] = useState();
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerRight:({tintcolor})=> <IconButton icon='save' color={tintcolor} size={24} onPress={confirmLocationHandler}/>
        })
    },[navigation, confirmLocationHandler]);
    function confirmLocationHandler(){
        if(!pickedLocation){
            Alert.alert('No location picked', 'Please pick location first!');
            return;
        }
        navigation.navigate('AddPlace', {
            lat: pickedLocation.lat,
            lng:pickedLocation.lng
        })
    }
    function pickMarker(event) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setPickedLocation({
            lat: lat,
            lng: lng
        })
    }
    return (
        <MapView
            style={styles.map}
            onPress={pickMarker}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}>
            {pickedLocation && <Marker title='picked location'
                coordinate={{ latitude: pickedLocation.lat, longitude: pickedLocation.lng }} />}

        </MapView>
    );
}
export default Map;
const styles = StyleSheet.create({
    map: {
        flex: 1
    }
});