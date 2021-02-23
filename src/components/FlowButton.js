import React, { Component } from 'react';
import './FlowButton.css';

const FlowButton = ({ timerState, goText }) => {
	let className = goText ? 'active' : 'pause';
	return (
		<button id='flowButton' className={className} onClick={timerState}>{goText ? 'Stop' : 'Start'}</button>
	);
}

export default FlowButton;
