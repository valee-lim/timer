import React from 'react';
import './InputBox.css';

const InputBox = ({ searchChange, currentTime, currentState, milli }) => {
	const handleInput = e => {
		let maxLen = milli === undefined ? 10 : 100;
		if (
			currentState === 1 ||
			(e.target.value >= maxLen && e.key !== 'Backspace') ||
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
			value={currentTime.toString().padStart(milli === undefined ? 2 : 3, '0')}
			onKeyDown={handleInput}
			onChange={searchChange}
			onFocus={e => e.target.select()}
			id='timer'
			disabled={currentState}
			/>
		</div>
	);
}

export default InputBox;
