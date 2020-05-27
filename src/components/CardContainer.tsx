import React from 'react';
import { StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';

export default function CardContainer(props: any) {

	return (
		<Card
			containerStyle={styles.containerStyle}>
			{props.children}
		</Card>
	)
}

const styles = StyleSheet.create({
	containerStyle: {
		borderRadius: 15,
	},
});
