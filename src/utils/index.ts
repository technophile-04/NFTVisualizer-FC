import { ethers } from 'ethers';
import { ERC721 } from '../contracts/ERC721';
import ERC721Abi from '../contracts/ERC721.json';

export const FULLSTACK_COLLECTION_ADDRESS =
	'0xda4a7Da4397414C089062cf6256989d2C29E31c9';

export const HARDHAT_BASIC_COLLECTION_ADDRESS =
	'0xB29eA9ad260B6DC980513bbA29051570b2115110';

export const COURSE_COMPLETE_COLLECTION_ADDRESS =
	'0x9E9a4e58dDc9483d241AfC9a028E89BD9b9fa683';

export const BLOCKCHAIN_BASICS_COLLECTION_ADDRESS =
	'0xaAcb0B62aEB7Db938f12161Da0E45fC3B2B34179';

export const SOLIDITY_BASICS_COLLECTION_ADDRESS =
	'0xa457a0f9b6edbec66941d7ed1d4d4834330abf52';

type Attribute = {
	trait_type: string;
	value: number;
};

export interface Metadata {
	name: string;
	attributes: Attribute[];
	description: string;
	image: string;
}

const ARB_RPC_URL = 'https://arb1.arbitrum.io/rpc';
const ethersProvider = new ethers.providers.JsonRpcProvider(ARB_RPC_URL);

// ----------------------------
// Fullstack collection
// ----------------------------
export const getFullStackCollection = async (
	userAddress: string
): Promise<Metadata | null> => {
	const fullStackCollection = new ethers.Contract(
		FULLSTACK_COLLECTION_ADDRESS,
		ERC721Abi.abi,
		ethersProvider
	) as ERC721;

	const balanceForFullStack = await fullStackCollection.balanceOf(userAddress);

	if (balanceForFullStack.toString() !== '0') {
		const tokenURI = await fullStackCollection.tokenURI(1);

		const json = atob(tokenURI.substring(29));
		const result = JSON.parse(json) as Metadata;
		console.log(result);
		const imageHash = result.image.substring(7);
		const imageURL = `https://ipfs.infura.io/ipfs/${imageHash}`;
		const nameArr = result.name.split('| ');

		console.log(imageURL);

		return { ...result, image: imageURL, name: nameArr[1].trim() };
	} else {
		return null;
	}
};

// ----------------------------
// Hardhat basic collection
// ----------------------------
export const getHardhatBasicCollection = async (
	userAddress: string
): Promise<Metadata | null> => {
	const basicCollection = new ethers.Contract(
		HARDHAT_BASIC_COLLECTION_ADDRESS,
		ERC721Abi.abi,
		ethersProvider
	) as ERC721;

	const basicCollectionBalance = await basicCollection.balanceOf(userAddress);

	if (basicCollectionBalance.toString() !== '0') {
		const tokenURI = await basicCollection.tokenURI(1);

		const json = atob(tokenURI.substring(29));
		const result = JSON.parse(json);
		console.log(result);
		const imageHash = result.image.substring(7);
		const imageURL = `https://ipfs.infura.io/ipfs/${imageHash}`;
		const nameArr = result.name.split('| ');

		console.log(imageURL);

		return { ...result, image: imageURL, name: nameArr[1].trim() };
	} else {
		return null;
	}
};

// ----------------------------
// Course complete collection
// ----------------------------
export const getCourseCompleteCollection = async (
	userAddress: string
): Promise<Metadata | null> => {
	const courseCompleteCollection = new ethers.Contract(
		COURSE_COMPLETE_COLLECTION_ADDRESS,
		ERC721Abi.abi,
		ethersProvider
	) as ERC721;

	const courseCompleteCollectionBalance =
		await courseCompleteCollection.balanceOf(userAddress);

	if (courseCompleteCollectionBalance.toString() !== '0') {
		const tokenURI = await courseCompleteCollection.tokenURI(1);

		const json = atob(tokenURI.substring(29));
		const result = JSON.parse(json);
		console.log(result);
		const imageHash = result.image.substring(7);
		const imageURL = `https://ipfs.infura.io/ipfs/${imageHash}`;
		const nameArr = result.name.split('| ');

		console.log(imageURL);

		return { ...result, image: imageURL, name: nameArr[1].trim() };
	} else {
		return null;
	}
};

// ----------------------------
// Blockchain basics collection
// ----------------------------
export const getBlockchainBasicsCollection = async (
	userAddress: string
): Promise<Metadata | null> => {
	const blockChainBasicCollection = new ethers.Contract(
		BLOCKCHAIN_BASICS_COLLECTION_ADDRESS,
		ERC721Abi.abi,
		ethersProvider
	) as ERC721;

	const blockChainBasicCollectionBalance =
		await blockChainBasicCollection.balanceOf(userAddress);

	if (blockChainBasicCollectionBalance.toString() !== '0') {
		const tokenURI = await blockChainBasicCollection.tokenURI(1);

		const json = atob(tokenURI.substring(29));
		const result = JSON.parse(json);
		console.log(result);
		const imageHash = result.image.substring(7);
		const imageURL = `https://ipfs.infura.io/ipfs/${imageHash}`;
		const nameArr = result.name.split('| ');

		console.log(imageURL);

		return { ...result, image: imageURL, name: nameArr[1].trim() };
	} else {
		return null;
	}
};

// ----------------------------
// Solidity basics collection
// ----------------------------
export const getSolidityBasicsCollection = async (
	userAddress: string
): Promise<Metadata | null> => {
	const solidityBasicsCollection = new ethers.Contract(
		SOLIDITY_BASICS_COLLECTION_ADDRESS,
		ERC721Abi.abi,
		ethersProvider
	) as ERC721;

	const solidityBasicsCollectionBalance =
		await solidityBasicsCollection.balanceOf(userAddress);

	if (solidityBasicsCollectionBalance.toString() !== '0') {
		const tokenURI = await solidityBasicsCollection.tokenURI(1);

		const json = atob(tokenURI.substring(29));
		const result = JSON.parse(json) as Metadata;
		console.log(result);
		const imageHash = result.image.substring(7);
		const imageURL = `https://ipfs.infura.io/ipfs/${imageHash}`;
		const nameArr = result.name.split('| ');
		console.log(imageURL);

		return { ...result, image: imageURL, name: nameArr[1].trim() };
	} else {
		return null;
	}
};
