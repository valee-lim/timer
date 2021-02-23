import React, { Component } from 'react';
import './RestartButton.css';

const RestartButton = ({ RestartTimer }) => {
	return (
		<button id='restartButton' onClick={RestartTimer}>Restart</button>
	);
}

export default RestartButton;