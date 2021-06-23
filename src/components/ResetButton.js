import React from 'react';
import './ResetButton.css';

const ResetButton = ({ resetTimer }) => {
	return (
		<button id='resetButton' onClick={resetTimer}>Reset</button>
	);
}

export default ResetButton;