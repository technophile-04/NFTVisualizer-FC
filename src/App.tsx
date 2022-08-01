import React from 'react';
import { Cards } from './sections';

const App = () => {
	return (
		<div className="App gradient-bg-red ">
			<div className="container w-[80%] m-auto mt-6">
				{/* Heading */}
				<p className="m-0 text-center font-bold text-3xl text-white">
					Patrick's Hardhat FreeCodeCamp Collection
				</p>
				<p className="text-gray-400 m-1 mt-0 text-center">
					NFT's from best blockchain course
				</p>
				{/* Cards Sections (Container) */}
				<Cards />
			</div>
		</div>
	);
};

export default App;
