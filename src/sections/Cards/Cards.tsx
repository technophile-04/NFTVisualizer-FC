import { useEffect, useState } from 'react';
import { useWallet } from '../../hooks';
import {
	getBlockchainBasicsCollection,
	getCourseCompleteCollection,
	getFullStackCollection,
	getHardhatBasicCollection,
	getSolidityBasicsCollection,
	Metadata,
} from '../../utils';
import { CardsLoader } from './components';
import Modal from './components/Modal';
import NftCard from './components/NFTCard';

export const Cards = () => {
	const [nfts, setNfts] = useState<Metadata[]>([]);
	const [showModal, setShowModal] = useState<Boolean>(false);
	const { currentAccount, connectWallet } = useWallet();
	const [loading, setLoading] = useState(false);
	const [selectedNft, setSelectedNft] = useState<number>(-1);

	const fetchNFTs = async (userAddress: string) => {
		setLoading(true);
		const finalNFTs: Metadata[] = [];
		const remainingNFTs: string[] = [];

		// course complete
		const courseCompleteResult = await getCourseCompleteCollection(userAddress);
		if (courseCompleteResult) {
			finalNFTs.push(courseCompleteResult);
		} else {
			remainingNFTs.push('Course complete basics Collection');
		}

		// Full stack
		const fsResult = await getFullStackCollection(userAddress);
		if (fsResult) {
			finalNFTs.push(fsResult);
		} else {
			remainingNFTs.push('Full Stack Collection');
		}

		// HH basics stack
		const hhBasicResult = await getHardhatBasicCollection(userAddress);
		if (hhBasicResult) {
			finalNFTs.push(hhBasicResult);
		} else {
			remainingNFTs.push('HH basics Collection');
		}

		// Solidity basics
		const solidityBasicsResult = await getSolidityBasicsCollection(userAddress);
		if (solidityBasicsResult) {
			finalNFTs.push(solidityBasicsResult);
		} else {
			remainingNFTs.push('Solidity basics Collection');
		}

		// block chain basics
		const blockChainBasicsResult = await getBlockchainBasicsCollection(
			userAddress
		);
		if (blockChainBasicsResult) {
			finalNFTs.push(blockChainBasicsResult);
		} else {
			remainingNFTs.push('Blockchain basics Collection');
		}

		setNfts(finalNFTs);
		console.log('[finalNFTs]', finalNFTs);
		setLoading(false);
	};

	function toggleModal(i: number) {
		if (i >= 0) {
			setSelectedNft(i);
		}
		setShowModal((prevState) => !prevState);
	}

	useEffect(() => {
		if (currentAccount) {
			fetchNFTs(currentAccount);
		}
	}, [currentAccount]);

	return (
		<div className="grid grid-cols-4 gap-6 justify-center max-w-6xl gap-x-6 gap-y-10 my-10">
			{true ? (
				<CardsLoader />
			) : (
				nfts?.map((nft, index) => (
					<NftCard
						nft={nft}
						key={index + nft.name}
						toggleModal={() => toggleModal(index)}
					/>
				))
			)}
			{showModal && (
				<Modal nft={nfts[selectedNft]} toggleModal={() => toggleModal(-1)} />
			)}
		</div>
	);
};
