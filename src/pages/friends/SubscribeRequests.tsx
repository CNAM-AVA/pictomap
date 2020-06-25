import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import TriangleBackground from '../../components/TriangleBackground';
import { Card, Icon, Input, ListItem, Divider, Badge, Header } from 'react-native-elements';
import { userService, friendService } from '../../services';
import { User } from '../../utils';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function subscribeRequests({route, navigation}:any) {
    const {params} = route.params;
    const [subscribeRequests, setsubscribeRequests] = React.useState<any>(JSON.parse(params));
    const [changeCount, setChangeCount] = React.useState<any>(0);
    const user_uuid = userService.getUser().uuid;

    function acceptRequest(requester_uuid: string){
        friendService.acceptRequest(user_uuid, requester_uuid)
        .then((res:any) => {
            const index = subscribeRequests.findIndex((element:any) => element.uuid === requester_uuid);
            let requests = subscribeRequests;
            requests.splice(index, 1);
            setsubscribeRequests(requests);
            setChangeCount(changeCount + 1);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function refuseRequest(requester_uuid: string){
        friendService.refuseRequest(user_uuid, requester_uuid)
        .then((res:any) => {
            const index = subscribeRequests.findIndex((element:any) => element.uuid === requester_uuid);
            let requests = subscribeRequests;
            requests.splice(index, 1);
            setsubscribeRequests(requests);
            setChangeCount(changeCount + 1);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    function showRequestsList(list:any){
        if(list.length === 0){
            return (<Text style={styles.empty}>Aucune requête</Text>);
        }
        else {
            return(
                list.map((u:any, i:any) => {
                    return(
                        <View key={i}>
                            <ListItem
                                leftAvatar={ u.profile_picture ? {source: {uri: u.profile_picture}} : {title: u.name[0]}}
                                title={u.name}
                                containerStyle={{paddingLeft: 0, paddingRight: 0}}
                                rightElement={
                                <View style={styles.iconContainer}>
                                    <Icon
                                        name='times'
                                        type='font-awesome'
                                        color='grey'
                                        underlayColor='transparent'
                                        size={30}
                                        onPress={() => refuseRequest(u.uuid)}
                                        containerStyle={{marginRight: 30}}
                                    />
                                    <Icon
                                        name='plus'
                                        type='font-awesome'
                                        color='grey'
                                        underlayColor='transparent'
                                        size={30}
                                        onPress={() => acceptRequest(u.uuid)}
                                    />
                                </View>
                                }
                                onPress={() => navigation.navigate('ShowFriend', {userId: u.uuid})}
                            />
                            <Divider style={{ backgroundColor: 'grey' }}/>
                        </View>
                    );
                })
            );
        }
    }

    return(
        <TriangleBackground style={styles.container}>
            <Header
				leftComponent={<Icon
					name='arrow-left'
					type='font-awesome'
					color='white'
					underlayColor='transparent'
					size={40}
					onPress={() => navigation.goBack()}
                />}
                centerComponent={{ text: 'Demandes d\'abonnement', style: { color: '#fff' } }}
				containerStyle={{
					backgroundColor: '#27466A',
					height: 70,
					paddingBottom: 25,
                    borderBottomWidth: 0,
                }}
			/>
            
            <Card containerStyle={styles.cardContainer}>
                <ScrollView>
                    {showRequestsList(subscribeRequests)}
                </ScrollView>
            </Card>
        </TriangleBackground>
    )
}

const styles = StyleSheet.create({
	container: {
        flex: 1,
        // flexDirection: 'column',
    },
    searchBar:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
    },
    searchContainer:{
        // paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 8,
        paddingBottom: 8,
        flex: 0.95,
        backgroundColor: 'white',
        borderRadius: 30,
    },
    searchInput:{
        height: 40,
        paddingLeft: 10,
        color: 'grey',
    },
    searchIcon: {
    },
    backButton: {
        flex: 0.10,
        alignItems: 'flex-end',
        paddingRight: 8,
    },
    text: {
        color: 'white',
        borderRadius: 30,
    },
    cardContainer: {
        borderRadius: 30,
        flex: 1,
        marginBottom: 20,
        marginTop: 0,
    },
    empty: {
        fontSize: 20,
        // fontWeight: 'bold',
        marginTop: 10,
        alignSelf: 'center'
    },
    requestContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingStart: 10,
        borderColor: '#27466A',
        borderStyle: 'solid',
        borderRadius: 20,
        borderWidth: 1,
    },
    badgeStyle:{
        // width: 40,
        minWidth: 30,
        padding: 2,
        height: 30, 
        borderRadius: 15,
        backgroundColor: '#27466A',
    },
    requestText: {
        color: '#27466A',
        fontSize: 15,
        marginStart: 6,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    user: {

    },
    image: {

    },
    name: {

    },
});
