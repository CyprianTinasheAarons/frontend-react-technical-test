import { ConnectWallet } from "@thirdweb-dev/react";
import Search from "./search";

const Nav = () => {
  return (
    <nav className="py-2 px-6  flex w-full items-center justify-between mb-16">
      <div>
        <h1 className="text-orange-500  sm:text-3xl text-xl font-bold ">
          NFTs
        </h1>
      </div>
      <div className="w-full sm:block hidden">
        <Search />
      </div>
      <div>
        <ConnectWallet />
      </div>
    </nav>
  );
};

export default Nav;
