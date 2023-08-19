
const GOOGLE_API_KEY = 'AIzaSyD2mP_sDlloOcwv6OLmYtATOJIcnDhcZcg';
export function getMapPreview(lat, lng) {
    const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
    return imageUrl;
}

export  function getAddress(lat, lng){
    // const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
    // const response = await fetch(url);
    // if(!response.ok){
    //     throw new Error('Failed to fetch address.');
    // }
    // const data  = await response.json();
    // const address = data.results[0].formatted_address;
    // return address;
    return 'con cat tao ne du ma';
}

// export async function getAdr(lat, lng){
//     const response  = await Geocoder.geocodePosition({lat:lat, lng:lng});
//     return response[0].formatted_address;
// }