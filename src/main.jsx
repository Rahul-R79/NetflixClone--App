import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MovieProvider } from './context/MovieContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <MovieProvider>
                <App />
            </MovieProvider>
        </AuthProvider>
    </StrictMode>
)
