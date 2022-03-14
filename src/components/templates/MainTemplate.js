import React from 'react';
import {Image, StyleSheet} from 'react-native'; 

import IconButton from '../atoms/IconButton';

import LinearGradient from 'react-native-linear-gradient';

export default function MainTemplate( {children} ) {
    return (
        <LinearGradient colors={["#F7E7D5", "#FFF"]} style={styles.container}>
            {children}
            <IconButton icon="Home"/>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
})