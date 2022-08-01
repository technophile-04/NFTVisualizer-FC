import { ethers } from 'ethers';
import { ERC721 } from '../contracts/ERC721';
import ERC721Abi from '../contracts/ERC721.json';

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

// Fullstack collection balance
export const getFullStackCollection = async (
	userAddress: string
): Promise<Metadata | null> => {
	// Fetch Fullstack nft
	const fullStackCollection = new ethers.Contract(
		'0xda4a7Da4397414C089062cf6256989d2C29E31c9',
		ERC721Abi.abi,
		ethersProvider
	) as ERC721;

	const balanceForFullStack = await fullStackCollection.balanceOf(userAddress);

	if (balanceForFullStack.toString() !== '0') {
		const tokenURI = await fullStackCollection.tokenURI(1);

		const json = atob(tokenURI.substring(29));
		const result = JSON.parse(json);
		console.log(result);

		return result;
	} else {
		return null;
	}
};
