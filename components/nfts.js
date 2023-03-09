import Card from "./card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import { useAddress } from "@thirdweb-dev/react";
import Search from "./search";
import { clearState, getUserNFTs, getContractNFTs } from "@/slices/alchemy";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useToast } from "@chakra-ui/react";

const NFTs = () => {
  const [toggleView, setToggleView] = useState(false);
  const toast = useToast();

  const { errorMessage, isLoading, searchTerm, userNfts, contractNfts } =
    useSelector((state) => state.nfts);

  const dispatch = useDispatch();
  const address = useAddress();

  const initFetch = useCallback(() => {
    if (address) {
      dispatch(getUserNFTs(address));
    }
  }, [address]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  const showUserNfts = () => {
    dispatch(getUserNFTs(address));
    setToggleView(false);
  };

  const showContractNfts = () => {
    if (searchTerm.length === 0) {
      toast({
        title: "Please enter a contract address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    //check if its an ethereum address
    if (!/^(0x)?[0-9a-f]{40}$/i.test(searchTerm)) {
      toast({
        title: "Please enter a valid contract address",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(getContractNFTs(searchTerm));
    setToggleView(true);
  };

  const clear = () => {
    dispatch(clearState());
  };

  return (
    <div>
      <div className="sm:hidden flex justify-center p-2 w-full">
        <Search />
      </div>
      <div className="flex justify-center m-2">
        <button
          className="bg-orange-500 text-white font-semibold p-2 rounded-bl-xl rounded-tr-xl col-span-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:bg-orange-600 transition:all duration-300 ease-in-out m-1"
          onClick={showUserNfts}
        >
          Show Wallet Nfts
        </button>
        <buttion
          className="bg-orange-500 text-white font-semibold p-2 rounded-bl-xl rounded-tr-xl col-span-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:bg-orange-600 transition:all duration-300 ease-in-out m-1"
          onClick={showContractNfts}
        >
          Show Contract Nfts
        </buttion>
        <button
          className="bg-orange-500 text-white font-semibold p-2 rounded-bl-xl rounded-tr-xl col-span-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:bg-orange-600 transition:all duration-300 ease-in-out m-1"
          onClick={clear}
        >
          <ArrowPathIcon className="h-4 w-4" />
        </button>
      </div>
      {isLoading && (
        <div className="flex justify-center pt-16">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
        </div>
      )}
      {errorMessage && (
        <div className="flex justify-center">
          <p className="text-red-500">{errorMessage}</p>
        </div>
      )}
      {!toggleView ? (
        <div className="flex justify-center">
          <div className=" max-w-7xl overflow-hidden sm:px-6 lg:px-8 mx-2  ">
            <div className="grid gap-4  sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
              {userNfts.length !== 0 &&
                !isLoading &&
                !errorMessage &&
                userNfts.map((nft) => <Card key={nft.id + nft.contract} nft={nft} />)}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className=" max-w-7xl overflow-hidden sm:px-6 lg:px-8 mx-2  ">
            <div className="grid gap-4  sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
              {contractNfts.length !== 0 &&
                !isLoading &&
                !errorMessage &&
                contractNfts.map((nft) => <Card key={nft.id + nft.contract} nft={nft} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTs;
