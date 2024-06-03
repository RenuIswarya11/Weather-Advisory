import React from 'react';
import './App.css';
import Weather from './weather';

function App() {
    return (
        <div className="App">
            <video autoPlay loop muted className="video-background">
                <source src="/background.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <Weather />
        </div>
    );
}

export default App;
