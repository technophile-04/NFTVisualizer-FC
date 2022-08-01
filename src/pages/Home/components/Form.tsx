import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Form = () => {
	const [currentAddress, setCurrentAddress] = useState('');

	return (
		<div className="mx-auto flex items-center justify-center mt-10" role="img">
			<div className="p-5 sm:w-[30rem] w-full flex flex-col justify-start items-center form-bg ">
				<p className="text-main text-xl font-bold text-white">
					Enter your address
				</p>
				<input
					type="text"
					placeholder="Address"
					className="my-2 py-2 px-4 outline-none border-none rounded-2xl w-full"
					value={currentAddress}
					onChange={(e) => setCurrentAddress(e.target.value)}
				/>
				<Link to={`address/${currentAddress}`} className="inline-block w-full">
					<button className="text-white w-full border-[1px] p-2 border-[#433d7c] transition-all ease-out duration-500  hover:bg-[#433d7c] rounded-3xl cursor-pointer font-semibold inline-block">
						Fetch NFT's
					</button>
				</Link>
			</div>
		</div>
	);
};
