import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MainTemplate from '../components/templates/MainTemplate';

export default function ProfileScreen ({ navigation, route }) {

    return (
        <MainTemplate>
            <Text>
                Notre équipe travail sur cette fonctionnalité
            </Text>
        </MainTemplate>
    );
}