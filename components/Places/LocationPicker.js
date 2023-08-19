import { Image, StyleSheet, Text, View } from "react-native";
import OutlineButton from "../UI/OutlineButton";
import { Colors } from '../../constants/colors'
import { useForegroundPermissions, getCurrentPositionAsync, PermissionStatus } from 'expo-location'
import { useEffect, useState } from "react";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";
import { getAddress, getAdr, getMapPreview } from "../../utils/location";

function LocationPicker({onPickLocation}) {
    const [locationPermissionInfomation, requestPermission] = useForegroundPermissions();
    const [location, setLocation] = useState();
    const navigation = useNavigation();
    const route = useRoute();
    const isFocused = useIsFocused();

    useEffect(()=>{
        if(isFocused&&route.params){
            const mapPickedLocation = {lat: route.params.lat, lng: route.params.lng};
            setLocation(mapPickedLocation);
        }
        
    },[isFocused, route])
    useEffect(()=>{
        async function handlerLocation(){
            if(location){
                const adr = await getAddress(location.lat, location.lng);
                onPickLocation({...location, adr:adr});
            }
        }  
        handlerLocation();          
    },[location, onPickLocation]);
    async function verifyPermissions() {
        if (locationPermissionInfomation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (locationPermissionInfomation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permission!', 'You need to grant location permission to use this app.');
            return false;
        }
        return true;
    }
    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) return;
        const location = await getCurrentPositionAsync();
        setLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })
    }
    function getImgUrl(lat, lng) { }
    function pickOnMapHandler() {
        navigation.navigate('Map');
    }
    let imgLocation = <Text>No location picked yet.</Text>
    if(location){
        imgLocation = <Image source={{uri:getMapPreview(location.lat, location.lng)}}></Image>
    }
    return (
        <View>
            <View style={styles.mapPreview}>
                {imgLocation}
            </View>
            <View style={styles.actions}>
                <OutlineButton icon='location' onPress={getLocationHandler}>Location User</OutlineButton>
                <OutlineButton icon='map' onPress={pickOnMapHandler}>Pick On Map</OutlineButton>
            </View>
        </View>
    );
}
export default LocationPicker;
const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});