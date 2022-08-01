import { Link } from 'react-router-dom';
import { Cards } from '../../sections';

export const MyNFTs = () => {
	return (
		<div className="App">
			<div className="container w-[80%] m-auto mt-6">
				{/* Heading */}
				<Link to="/">
					<p className="m-0 text-center font-bold text-3xl text-white">
						Patrick's Hardhat FreeCodeCamp Collection
					</p>
					<p className="text-gray-400 m-1 mt-0 text-center">
						NFT's from one of the best blockchain course
					</p>
				</Link>
				<Cards />
			</div>
		</div>
	);
};
