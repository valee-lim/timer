import React, { Component } from 'react';
import './RestartButton.css';

const RestartButton = ({ restartTimer }) => {
	return (
		<button id='restartButton' onClick={restartTimer}>Restart</button>
	);
}

export default RestartButton;