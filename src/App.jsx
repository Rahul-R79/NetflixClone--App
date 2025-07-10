import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MovieProvider } from './context/MovieContext';
import Home from './pages/Home/Home';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Login from './components/auth/LoginPage';
import Signup from './components/auth/SignupPage';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
		<AuthProvider>
			<MovieProvider>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
					{/* Protected Routes */}
					<Route element={<ProtectedRoute />}>
					<Route path="/movie/:imdbID" element={<MovieDetails />} />
					</Route>
				</Routes>
			</MovieProvider>
		</AuthProvider>
    </Router>
  );
}

export default App;