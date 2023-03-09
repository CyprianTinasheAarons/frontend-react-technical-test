import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Network, Alchemy } from "alchemy-sdk";
const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

const initialState = {
  userNfts: [],
  contractNfts: [],
  isLoading: false,
  errorMessage: null,
  searchTerm: "",
};

export const getUserNFTs = createAsyncThunk(
  "alchemy/getUserNFTs",
  async (address) => {
    try {
      const res = await alchemy.nft.getNftsForOwner(address);
      return res.ownedNfts?.map((nft) => {
        return {
          id: nft.tokenId,
          name: nft.title,
          description: nft.description,
          imageSrc: nft.rawMetadata.image,
          contract: nft.contract.address,
        };
      });
    } catch (err) {
      console.error("Error getting user NFTs:", err);
      throw err;
    }
  }
);

export const getContractNFTs = createAsyncThunk(
  "alchemy/getContractNFTs",
  async (searchTerm) => {
    try {
      const res = await alchemy.nft.getNftsForContract(searchTerm);
      return res.nfts?.map((nft) => {
        return {
          id: nft.id?.tokenId,
          name: nft.title,
          description: nft.description,
          imageSrc: nft.rawMetadata.image,
          contract: nft.contract.address,
        };
      });
    } catch (err) {
      console.error("Error getting contract NFTs:", err);
      throw err;
    }
  }
);
export const updateSearchTermState = createAsyncThunk(
  "alchemy/updateSearchTermState",
  async (searchTerm) => {
    return searchTerm;
  }
);

export const clearState = createAsyncThunk("alchemy/clearState", async () => {
  return initialState;
});

const alchemySlice = createSlice({
  name: "nft",
  initialState,
  extraReducers: {
    [getUserNFTs.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = null;
    },
    [getUserNFTs.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    },
    [getUserNFTs.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.userNfts = action.payload;
    },
    [getContractNFTs.pending]: (state, action) => {
      state.isLoading = true;
      state.errorMessage = null;
    },
    [getContractNFTs.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.error.message;
    },
    [getContractNFTs.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = null;
      state.contractNfts = action.payload;
    },
    [updateSearchTermState.fulfilled]: (state, action) => {
      state.searchTerm = action.payload;
    },
    [clearState.fulfilled]: (state, action) => {
      state.userNfts = action.payload.userNfts;
      state.contractNfts = action.payload.contractNfts;
    },
  },
});

export default alchemySlice.reducer;
