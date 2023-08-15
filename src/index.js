import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import BoardContextProvider from './context/BoardContextProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BoardContextProvider>
        <App />
    </BoardContextProvider>
);
