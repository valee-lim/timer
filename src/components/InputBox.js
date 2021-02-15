import React, { Component } from 'react';
import './InputBox.css';

const InputBox = ({ searchChange, currentTime, hourHandle, currentState }) => {
	const handleInput = e => {
		let maxLength = hourHandle ? 100 : 10;
		if ((e.target.value >= maxLength && e.key !== 'Backspace') ||
			e.key === 'e' ||
			e.key === '-' ||
			e.key === '+' ||
			e.key === ' ' ||
			e.key === '=' ||
			(e.target.valueAsNumber === 0 && e.key === 'Backspace') ||
			currentState === 'Stop'){
			e.preventDefault();
		}
	}
	return (
		<div>
			<input 
			type='number'
			placeholder='00'
			value={currentTime.toString().padStart(2, '0')}
			onKeyDown={handleInput}
			onChange={searchChange}
			onFocus={e => e.target.select()}
			id='timer'
			/>
		</div>
	);
}

export default InputBox;
