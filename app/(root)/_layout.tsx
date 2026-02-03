import { Text, View } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router';

const layout = () => {
   return (<Redirect href='/(root)/(tabs)/home' />); 
}

export default layout
