import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Text, Button } from 'react-native-elements';
import ProfilePicture from '../../components/ProfilePicture';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import CardContainer from '../../components/CardContainer';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Profile() {

	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<Header
				leftComponent={<Icon
					name='arrow-left'
					type='font-awesome'
					color='white'
					underlayColor='transparent'
					size={40}
					onPress={() => navigation.goBack()}
				/>}
				rightComponent={
					<Icon
						name='edit'
						type='font-awesome'
						color='white'
						underlayColor='transparent'
						size={40}
						onPress={() => navigation.navigate('ProfileEdit')}
					/>
				}
				containerStyle={{
					backgroundColor: '#27466A',
					height: 70,
					paddingBottom: 25,
					shadowColor: 'transparent'
				}}
			/>
			<View style={styles.paddedContainer}>
				<ProfilePicture customStyle={{ alignSelf: "center" }} size="big"></ProfilePicture>
				<CardContainer>
					<TouchableOpacity onPress={() => navigation.navigate('UserPictures')}>
						<View style={{ flexDirection: "row" }}>
							<View style={{
								flex: 2, flexDirection: "row", alignItems: 'center'
							}}>
								<Icon
									size={30}
									name='camera'
									type='font-awesome'
								/>
								<Text
									style={{ marginLeft: 10 }}
								>Mes photos</Text>
							</View>
							<View style={{ flexDirection: "row", alignItems: 'center' }}>
								<Icon
									size={30}
									name='chevron-right'
									type='font-awesome'
								/>
							</View>
						</View>
					</TouchableOpacity>
				</CardContainer>
				<CardContainer>
					<Text h3 style={{ alignSelf: "center" }}>Michael JACKSON</Text>
					<Text style={{ alignSelf: "center", marginBottom: 8 }}>mickaeljackson@yeehee.com</Text>
					<Text style={{ alignSelf: "flex-start" }}>Photos prises: 123</Text>
					<Text style={{ alignSelf: "flex-start" }}>Photos trouvées: 123</Text>
					<Text style={{ alignSelf: "flex-start" }}>Inscrit le: 04 Juin 2010</Text>
					<Button
						containerStyle={{ marginTop: 16 }}
						buttonStyle={{ borderColor: "red" }}
						titleStyle={{ color: "red" }}
						title="Déconnexion"
						type="outline"
					/>
				</CardContainer>
			</View>
		</View >
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#27466A",
	},
	paddedContainer: {
		padding: 10,
	}
});
