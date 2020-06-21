import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import { Icon } from 'react-native-elements';

// import { NavigationEvents } from 'react-navigation';
// import { withNavigationFocus } from 'react-navigation';

const DESIRED_RATIO = "16:9";

export default function Photo({ navigation }: any) {
    const [hasPermission, setHasPermission] = React.useState<boolean>(false);
    const [cameraRef, setCameraRef] = useState<any>(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [state, setState] = useState<any>({});
    const [loaded, setLoaded] = useState<any>(true);

    useEffect(() => {
        (async () => {
            // Camera permission
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');

            // Location permission
            let locStatus = await (await Location.requestPermissionsAsync()).status;
            if (locStatus !== 'granted') {
                console.log('Permission to access location was denied');
            }
        })();
    });

    useEffect(() => {
        const focus = navigation.addListener('focus', () => {
            setLoaded(true);
        });
        return focus;
    }, [navigation]);

    useEffect(() => {
        const blur = navigation.addListener('blur', () => {
            setLoaded(false);
        });
        return blur;
    }, [navigation]);

    const snap = async () => {
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync();
            let location = await Location.getCurrentPositionAsync({});
            photo.location = location;
            navigation.navigate('ImagePreview', { photo: photo, send: true });
        }
    }

    const prepareRatio = async () => {
        if (Platform.OS === 'android' && cameraRef) {
            const ratios = await cameraRef.getSupportedRatiosAsync();

            // See if the current device has your desired ratio, otherwise get the maximum supported one
            // Usually the last element of "ratios" is the maximum supported ratio
            const ratio = ratios.find((ratio: any) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];

            setState({ ratio });
        }
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    return (
        <View style={styles.container}>
            <View style={styles.background} />
            {loaded && (<Camera
                style={styles.camera}
                type={type}
                ref={ref => setCameraRef(ref)}
                onCameraReady={prepareRatio} // You can only get the supported ratios when the camera is mounted
                ratio={state.ratio}
            />)}
            <View
                style={styles.buttons}
            >
                <Icon // this is a fake icon to corretly align the others
                    style={styles.snap}
                    name='camera'
                    type='font-awesome'
                    color='transparent'
                    underlayColor='transparent'
                    size={70} />
                <Icon
                    style={styles.snap}
                    name='camera'
                    type='font-awesome'
                    color='white'
                    underlayColor='transparent'
                    size={70}
                    onPress={snap}
                />
                <Icon
                    style={styles.flipIcon}
                    name='refresh'
                    type='font-awesome'
                    color='white'
                    underlayColor='transparent'
                    size={70}
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        );
                    }}
                />
            </View>
        </View>
    );
}

const { width: winWidth, height: winHeight } = Dimensions.get('window');
const newHeight = winWidth * (16 / 9);
const heightOffset = (winHeight - newHeight) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        position: 'absolute',
        backgroundColor: 'black'
    },
    camera: {
        position: 'absolute',
        top: heightOffset,
        width: winWidth,
        height: newHeight,
        alignSelf: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    buttons: {
        flex: 1,
        flexDirection: 'row',
        // alignSelf: 'center',
        alignItems: 'flex-end',
        justifyContent: 'space-around',
        margin: 10,
        marginBottom: 20
    },
    flipIcon: {
    },
    snap: {
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alignCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: "#FFFFFF",
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
});
