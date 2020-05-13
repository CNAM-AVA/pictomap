import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function TriangleBackground(props: any) {

    return(
        <View style={[props.style, styles.container]}>
            {/* <View style={styles.triangle}/> */}
            {
                props.children
            }
        </View>
    )
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#27466A',
    },
    // triangle: {
    //     width: 0,
    //     height: 0,
    //     backgroundColor: 'transparent',
    //     borderStyle: 'solid',
    //     borderRightWidth: 150,
    //     borderTopWidth: 150,
    //     borderRightColor: 'transparent',
    //     borderTopColor: 'white',
    //     transform: [
    //         {rotate: '160deg'}
    //     ],
    //     position: 'absolute',
    //     bottom: 0,
    //     left: 0
    // }
});
