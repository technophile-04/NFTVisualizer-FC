import { useEffect, useState } from 'react';
import { useWallet } from '../../hooks';
import { getFullStackCollection } from '../../utils';

export const Cards = () => {
	const [nfts, setNfts] = useState<Metadata[]>([]);
	const { currentAccount, connectWallet, ARB_RPC_URL } = useWallet();

	const fetchNFTs = async (userAddress: string) => {
		const result = await getFullStackCollection(userAddress);
	};

	useEffect(() => {
		if (currentAccount) {
			fetchNFTs(currentAccount);
		}
	}, [currentAccount]);

	return (
		<div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between items-center">
			Cards Container
			<button onClick={connectWallet}>Connect</button>
		</div>
	);
};
