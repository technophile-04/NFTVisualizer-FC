import { MetaMaskInpageProvider } from '@metamask/providers';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
declare global {
	interface Window {
		ethereum?: MetaMaskInpageProvider;
	}
}

export const useWallet = () => {
	const [currentAccount, setCurrentAccount] = useState<
		string | undefined | null
	>('');
	const ARB_RPC_URL = 'https://arb1.arbitrum.io/rpc';
	const [isCorrectNetwork, setIsCorrectNetwork] = useState<Boolean>(false);
	const [chainId, setChainId] = useState<number>(0);

	// --------------------------------------------------
	// Change network
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
								chainName: 'Arbitrum',
								chainId: ethers.utils.hexValue(42161),
								nativeCurrency: {
									name: 'AETH',
									decimals: 18,
									symbol: 'AETH',
								},
								rpcUrls: [ARB_RPC_URL],
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

	// --------------------------------------------------
	// Ask to connect metamask
	// --------------------------------------------------
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

	useEffect(() => {
		const ethereum = window.ethereum;
		if (ethereum) {
			const getChain = async () => {
				// @ts-ignore
				const provider = new ethers.providers.Web3Provider(ethereum);
				// @ts-ignore
				const { chainId } = await provider.getNetwork(provider);
				console.log('CHAIN ID : ', chainId);
				setIsCorrectNetwork(chainId === 42161);
				setChainId(chainId);
			};

			ethereum.on('accountsChanged', (...accounts: unknown[]) => {
				console.log('accounts cahnged');
				setCurrentAccount(accounts[0] as string);
			});
			ethereum.on('chainChanged', function (networkId) {
				window.location.reload();
			});
			checkIfWalletIsConnected();
			getChain();
		}
	}, []);

	return { currentAccount, connectWallet, isCorrectNetwork, ARB_RPC_URL };
};
