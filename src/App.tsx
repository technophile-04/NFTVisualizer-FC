import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { MyNFTs } from './pages/MyNFTs';
import { Cards } from './sections';

const App = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/address/:address" element={<MyNFTs />} />
		</Routes>
	);
};

export default App;
