import React, {useState, useEffect} from 'react';
import {Alert, SafeAreaView, StyleSheet, Image, AsyncStorage, ScrollView,StatusBar,Platform} from 'react-native';

import socketio from 'socket.io-client';

import logo_img from '../assets/logo.png';
import SpotList from '../componentes/SpotList';

export default function List(){
    const [techs, setTechs] = useState([]);
    
    useEffect(()=>{
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://10.10.10.103:3333',{
                query:{user_id}
            });

            socket.on('booking_response',booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved?'Aprovada!':'Rejeitada!'}` );
            });
        })
    },[]);

    useEffect(()=>{
        AsyncStorage.getItem('techs').then(storageTechs => {
            const arrayTechs = storageTechs.split(',').map(tech => tech.trim());
            setTechs(arrayTechs);
        })
    },[]);

    return(
            <SafeAreaView style={styles.container}>
                <Image style = {styles.logo} source ={logo_img} />
                <ScrollView>
                 {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
                </ScrollView>
            </SafeAreaView>
        );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingBottom:20,
        alignItems: 'center'
    },
    logo:{
        height: 32,
        resizeMode: 'contain',
        marginTop: 10
    }
});