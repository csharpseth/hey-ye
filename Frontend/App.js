import { FeedProvider } from './app/contexts/FeedContext';
import Navigation from './app/views/components/Navigation';

export default function App() {
	return (
		<FeedProvider>
			<Navigation />
		</FeedProvider>
	);
}
