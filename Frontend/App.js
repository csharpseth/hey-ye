import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './app/views/screens/CameraScreen';

import HomeScreen from './app/views/screens/HomeScreen'

const Stack = createNativeStackNavigator()

export default function App() {
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
