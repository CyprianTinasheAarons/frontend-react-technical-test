import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useDispatch ,useSelector} from "react-redux";
import { updateSearchTermState, getContractNFTs } from "@/slices/alchemy";
import { useToast } from "@chakra-ui/react";

const Search = () => {
  const dispatch = useDispatch();
  const toast = useToast();
    const { searchTerm } = useSelector(
      (state) => state.nfts
    );

  const handleChange = (e) => {
    dispatch(updateSearchTermState(e.target.value));
  };

  const handleSearch = () => {
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
  };

  return (
    <div className="flex justify-center w-full">
      <div className="sm:w-1/2 w-4/5">
        <div className="relative mt-2 flex items-center ">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter NFT Contract Address"
            className="block w-full rounded-tr-xl rounded-bl-xl font-semibold  bg-[#515759] bg-opacity-20 border-0 p-2 py-3 pr-14 text-white shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-orange-400 focus:ring-2 focus:ring-inset focus:ring-orange-600 sm:text-sm sm:leading-6"
            onChange={handleChange}
            onKeyUp={(e) => {
              if (e.key === "Enter") handleSearch();
            }}
          />

          <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
            <button
              onClick={() => handleSearch()}
              className="inline-flex items-center px-2 border-2 border-orange-500 rounded-bl-xl rounded-tr-xl font-sans text-xs text-orange-400 "
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
