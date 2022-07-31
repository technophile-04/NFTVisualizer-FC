import { MetaMaskInpageProvider } from '@metamask/providers';
import { ethers } from 'ethers';
import { useState } from 'react';
import toast from 'react-hot-toast';

declare global {
	interface Window {
		ethereum?: MetaMaskInpageProvider;
	}
}

export const useWallet = () => {
	const [currentAccount, setCurrentAccount] = useState('');

	// --------------------------------------------------
	// Ask to connect metamask
	// --------------------------------------------------
	const changeNetwork = async () => {
		if (window.ethereum) {
			try {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: ethers.utils.hexValue(80001) }],
				});
			} catch (error: any) {
				if (error.code === 4902) {
					await window.ethereum.request({
						method: 'wallet_addEthereumChain',
						params: [
							{
								chainName: 'Polygon testnet',
								chainId: ethers.utils.hexValue(80001),
								nativeCurrency: {
									name: 'MATIC',
									decimals: 18,
									symbol: 'MATIC',
								},
								rpcUrls: ['https://rpc-mumbai.matic.today'],
							},
						],
					});
				} else {
					toast.error('Please switch to Mumbai testnet');
					console.error(error);
				}
			}
		}
	};

	const connectWallet = async () => {
		const ethereum = window.ethereum!;
		try {
			if (!ethereum) alert('You dont have ethereum wallet installed');
			const accounts = await ethereum.request({
				method: 'eth_requestAccounts',
			});
			console.log(accounts);
			// await changeNetwork();

			if (accounts && Array.isArray(accounts)) {
				// Here you can access accounts[0]
				if (accounts.length > 0) {
					setCurrentAccount(accounts[0]);
					console.log(accounts);
				} else {
					console.log('No accounts found');
				}
			} else {
				// Handle errors here if accounts is not valid.
				console.log('No accounts found');
			}
		} catch (error: any) {
			toast.error(error.message);
			console.log(error);
			throw new Error(error.message);
		}
	};

	// --------------------------------------------------
	// Check if user have already connected to site
	// --------------------------------------------------
	const checkIfWalletIsConnected = async () => {
		const ethereum = window.ethereum!;
		try {
			if (!ethereum) alert('You dont have ethereum wallet installed');
			const accounts = await ethereum.request({ method: 'eth_accounts' });
			// console.log(accounts);

			if (accounts && Array.isArray(accounts)) {
				// Here you can access accounts[0]
				if (accounts.length > 0) {
					setCurrentAccount(accounts[0]);
					console.log(accounts);
				} else {
					console.log('No accounts found');
				}
			} else {
				// Handle errors here if accounts is not valid.
				console.log('No accounts found');
			}
		} catch (error: any) {
			console.log(error);
			throw new Error(error.message);
		}
	};
};
