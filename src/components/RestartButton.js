import React from 'react';
import './RestartButton.css';

const RestartButton = ({ restartTimer }) => {
	return (
		<button id='restartButton' onClick={restartTimer}>End</button>
	);
}

export default RestartButton;