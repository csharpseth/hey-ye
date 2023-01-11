import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CameraScreen from '../screens/CameraScreen';
import HomeScreen from '../screens/HomeScreen'

const Stack = createNativeStackNavigator()

export default function Navigation() {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen 
					name='Home'
					component={HomeScreen}
				/>
				<Stack.Screen 
					name='Camera'
					component={CameraScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
