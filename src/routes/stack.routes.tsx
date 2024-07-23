import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/Login'

const Stack = createNativeStackNavigator();

export default function StackRoutes(){
    return(
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen 
                name='inicio'
                component = {LoginScreen}
            />
        </Stack.Navigator>
    )
}