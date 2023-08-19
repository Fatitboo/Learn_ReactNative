import PlaceForm from "../components/Places/PlaceForm";

function AddPlace({navigation}){
    function onCreateNewPlaceHandler(placeData){
        navigation.navigate('AllPlaces', {
            place: placeData,
        })
    }
    return <PlaceForm onCreatePlace={onCreateNewPlaceHandler}/>;
}
export default AddPlace;