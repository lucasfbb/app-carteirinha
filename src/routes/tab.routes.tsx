import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import CardScreen from '../screens/GenerateCardScreen'
import HomeScreen from '../screens/Home'
import LoginScreen from '../screens/Login'
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

export default function TabRoutes(){
    return(
        <Tab.Navigator
            screenOptions={{
            headerShown: false,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, focused, size }) => (
                    <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={size} />
                    ),
                    tabBarLabel:'User'
                }}
            />
            <Tab.Screen
                name="CardScreen"
                component={CardScreen}
                options={{
                    tabBarIcon: ({ color, focused, size}) => (
                    <Ionicons name={focused ? 'id-card' : 'id-card-outline'} color={color} size={size} />
                    ),
                    tabBarLabel:'Carteirinha PGM'
                }}
            />
        </Tab.Navigator>
    )
}