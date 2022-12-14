/*
  connectWallet: Connects the MetaMask wallet
*/
import { BigNumber, Contract, ethers, providers, utils } from "ethers";

export const connectWallet = async () => {
  try {
    // Get the provider from web3Modal, which in our case is MetaMask
    // When used for the first time, it prompts the user to connect their wallet
    await getProviderOrSigner();
    //          setWalletConnected(true);
  } catch (err) {
    console.error(err);
  }
};

/**
 * Returns a Provider or Signer object representing the Ethereum RPC with or without the
 * signing capabilities of metamask attached
 *
 * A `Provider` is needed to interact with the blockchain - reading transactions, reading balances, reading state, etc.
 *
 * A `Signer` is a special type of Provider used in case a `write` transaction needs to be made to the blockchain, which involves the connected account
 * needing to make a digital signature to authorize the transaction being sent. Metamask exposes a Signer API to allow your website to
 * request signatures from the user using Signer functions.
 *
=       */
export const getProviderOrSigner = async (web3ModalRef, needSigner = false) => {
  // Connect to Metamask
  // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
  try {
    console.log("web3 modal is ",web3ModalRef)
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Mumbai network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 5) {
      window.alert("Please Change the network to Goerli");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  } catch (e) {
    console.log("User is not connected");
  }
};
