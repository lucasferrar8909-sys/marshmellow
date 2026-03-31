import {createRoot} from 'react-dom/client';
import App from './App.jsx';
import './index.css';

console.log('main.jsx is running');

createRoot(document.getElementById('root')).render(<App />);
