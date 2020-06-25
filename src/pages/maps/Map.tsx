import React, {useState, useEffect} from 'react';
import { StyleSheet, Dimensions, View, Image } from 'react-native';
import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import * as Location from 'expo-location';
import { Picture } from '../../utils';
import { pictureService, userService } from '../../services';


export default function Map() {

    const [position, setPosition] = useState(null)
    const [markers, setMarkers] = useState<Marker[]>();
    const [pictures, setPictures] = useState<Picture[]>([]);

    useEffect(() => {
        
        (async function loadPics() {
            let pics = await pictureService.getUserFindings(userService.getUser().uuid)
            setPictures(pics)
            console.log(pics)
        })();
       
    }, [])

    return (
        <View style={styles.container}>
            <MapView style={styles.mapStyle}>
                {
                    pictures!.map(pic => (
                        <Marker
                            key={pic.uuid}
                            coordinate={{latitude: +pic.latitude!, longitude: +pic.longitude!}}
                            
                        >
                            <Image source={{uri: pic.uri}}
                                style={{
                                    height: 40,
                                    width: 23,
                                    borderColor: "#27466A",
                                    borderWidth: 2
                                }} />
                        </Marker>
                    ))
                }
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});