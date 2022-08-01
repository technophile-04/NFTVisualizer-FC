import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

const loaders = [1, 2, 3, 4, 5];

export const Cards = () => {
	const [nfts, setNfts] = useState<Metadata[]>([]);
	const [showModal, setShowModal] = useState<Boolean>(false);
	const [loading, setLoading] = useState(false);
	const [selectedNft, setSelectedNft] = useState<number>(-1);
	const { address } = useParams();

	const fetchNFTs = async (userAddress: string) => {
		setLoading(true);
		try {
			const finalNFTs: Metadata[] = [];
			const remainingNFTs: string[] = [];

			// course complete
			const courseCompleteResult = await getCourseCompleteCollection(
				userAddress
			);
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
			const solidityBasicsResult = await getSolidityBasicsCollection(
				userAddress
			);
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
		} catch (error: any) {
			alert(error.message);
			setLoading(false);
		}
	};

	function toggleModal(i: number) {
		if (i >= 0) {
			setSelectedNft(i);
		}
		setShowModal((prevState) => !prevState);
	}

	useEffect(() => {
		if (address) {
			fetchNFTs(address);
		}
	}, [address]);

	return (
		<div className="grid grid-cols-4 gap-6 justify-center max-w-6xl gap-x-6 gap-y-10 my-10">
			{loading ? (
				loaders.map((count) => <CardsLoader key={count} />)
			) : nfts.length === 0 ? (
				<h1 className="text-center text-4xl text-white w-full">
					No NFT's found
				</h1>
			) : (
				nfts?.map((nft, index) => (
					<NftCard
						nft={nft}
						key={index + nft.name}
						toggleModal={() => toggleModal(index)}
						ownerAddress={address!}
					/>
				))
			)}
			{showModal && (
				<Modal nft={nfts[selectedNft]} toggleModal={() => toggleModal(-1)} />
			)}
		</div>
	);
};
