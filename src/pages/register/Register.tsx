import React, { useState, SyntheticEvent } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { userService } from '../../services'
import TriangleBackground from '../../components/TriangleBackground';
import { Avatar } from 'react-native-elements';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';


export default function Register() {

    const [email, setEmail] = useState<string>('');
    const [pseudo, setPseudo] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    function handleRegister() {
        if (validateEmail() && validatePasswords()) {

            let credentials = {
                email: email,
                password: password,
                password_confirm: confirmPassword,
                pseudo: pseudo
            }

            userService.register(credentials)
                .then(res => {
                    console.log('authenticated !');
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            console.log('Error in email or password')
        }
    }

    function validateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePasswords() {
        return password === confirmPassword;
    }

    return (
        <TriangleBackground style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.keyboardAvoid}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        <Avatar
                            rounded
                            title="PM"
                            size="medium"
                            containerStyle={{ alignSelf: 'center', marginBottom: 35 }}
                        />

                        <Input
                            labelStyle={styles.input}
                            placeholder="email@addresse.com"
                            label="Email"
                            onChangeText={value => setEmail(value)}
                        />
                        <Input
                            labelStyle={styles.input}
                            placeholder="Pseudo"
                            label="Pseudo"
                            onChangeText={value => setPseudo(value)}
                        />
                        <Input
                            labelStyle={styles.input}
                            placeholder="Mot de passe"
                            label="Mot de passe"
                            secureTextEntry
                            onChangeText={value => setPassword(value)}
                        />
                        <Input
                            labelStyle={styles.input}
                            placeholder="Confirmation"
                            label="Confirmation"
                            secureTextEntry
                            onChangeText={value => setConfirmPassword(value)}
                        />

                        <Button
                            title="Inscription"
                            type="outline"
                            style={styles.button}
                            titleStyle={{ color: 'white' }}
                            buttonStyle={{ borderColor: 'white' }}
                            onPress={handleRegister}
                        />
                        <Text style={styles.text}>J'ai un compte !</Text>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </TriangleBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 70
    },
    keyboardAvoid: {
        width: '100%'
    },
    inner: {
        padding: 24,

    },
    input: {
        marginTop: 20,
        color: 'white',
    },
    button: {
        marginTop: 25,
        width: '50%',
        alignSelf: 'center',
    },
    text: {
        color: 'white',
        alignSelf: 'center',
        marginTop: 20
    }
});
