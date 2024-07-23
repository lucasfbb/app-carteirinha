import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import TabRoutes from './tab.routes';
import StackRoutes from './stack.routes';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes(){
    return(
        <Drawer.Navigator screenOptions={{title:''}}>
            <Drawer.Screen 
                name='inicio'
                component = {TabRoutes}
                options={{
                    drawerIcon: ({ color, focused, size }) => (
                    <Ionicons name={focused ? 'home' : 'home-outline'} color={color} size={size} />
                    ),
                    drawerLabel:'Início'
                }}
            />

            <Drawer.Screen 
                name='entrar'
                component = {StackRoutes}
                options={{
                    drawerIcon: ({ color, focused, size }) => (
                    <Ionicons name={focused ? 'log-in' : 'log-in-outline'} color={color} size={size} />
                    ),
                    drawerLabel:'Login'
                }}
            />
        </Drawer.Navigator>
        

    )
}