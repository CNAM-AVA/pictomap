import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Header, Icon, Text, Button, Divider } from 'react-native-elements';
import ProfilePicture from '../../components/ProfilePicture';
import 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import CardContainer from '../../components/CardContainer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { userService, pictureService } from '../../services';
import StringDate from '../../services/StringDate'

export default function Profile() {

	const navigation = useNavigation();
	const [profile, setProfile] = useState(userService.getUser());
	const [stats, setStats]:any = useState({});

	useEffect(() => {
		getUserStats();
	}, []);

	function handleLogout() {
		userService.logout()
			.then(() => {
				navigation.navigate('Login');
			})
			.catch(() => console.log("Somethign went wrong during logout."));
	}

	function getUserStats(){
		pictureService.getUserStats(profile.uuid)
		.then((res:any) => {
			console.log(res);
			
			setStats(res);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	return (
		<View style={styles.container}>
			<Header
			 	style={{flex: 1}}
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
					borderBottomWidth: 0,
				}}
			/>
			<View style={styles.paddedContainer}>
				<ProfilePicture  style={{flex: 0.5}} uri={profile.profile_picture} title={profile.name[0].toUpperCase()} customStyle={{ alignSelf: "center" }} size={110}></ProfilePicture>
				<CardContainer style={{flex: 0.5}}>
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
				<CardContainer style={{flex: 0.5}}>
					<Text h3 style={{ alignSelf: "center" }}>{profile.name}</Text>
					<Text style={{ alignSelf: "center", marginTop: 8, marginBottom: 8 }}>{profile.mail}</Text>
					<Divider style={{marginTop: 8, marginBottom: 8 }}/>
					<Text style={styles.stats_text}>Photos prises: {stats?.taken_pictures}</Text>
					<Text style={styles.stats_text}>Photos trouvées: {stats?.found_pictures}</Text>
					<Text style={styles.stats_text}>Nombre d'abonnés: {stats?.nb_follower}</Text>
					<Text style={styles.stats_text}>Inscrit le: {StringDate.stringDate(profile.created_at)}</Text>
					<Button
						containerStyle={{ marginTop: 16 }}
						buttonStyle={{ borderColor: "red" }}
						titleStyle={{ color: "red" }}
						title="Déconnexion"
						type="outline"
						onPress={handleLogout}
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
		flex: 5,
		padding: 10,
	},
	stats_text:{
		alignSelf: 'flex-start',
		marginBottom: 7,
		marginTop: 7,
	},
});
