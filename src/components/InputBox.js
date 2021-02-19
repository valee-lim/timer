import React, { Component } from 'react';
import './InputBox.css';

const InputBox = ({ searchChange, currentTime, digitHandle, currentState }) => {
	const handleInput = e => {
		let maxLength = digitHandle ? 100 : 10;
		if ((e.target.value >= maxLength && e.key !== 'Backspace') ||
			currentState === 'Stop' ||
			e.key === 'e' ||
			e.key === '-' ||
			e.key === '+' ||
			e.key === ' ' ||
			e.key === '='
			){
			e.preventDefault();
		}
	}
	return (
		<div>
			<input 
			type='number'
			placeholder='00'
			value={currentTime.toString().padStart(digitHandle ? 3 : 2, '0')}
			onKeyDown={handleInput}
			onChange={searchChange}
			onFocus={e => e.target.select()}
			id='timer'
			/>
		</div>
	);
}

export default InputBox;
