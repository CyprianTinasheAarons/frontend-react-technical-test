import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MediaRenderer } from "@thirdweb-dev/react";

const Modal = ({ nft, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const truncateDescription = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div className="flex justify-center">
      <button onClick={() =>setIsOpen(true)}>{children}</button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full sm:w-1/3 transform overflow-hidden  sm:p-8 rounded-2xl hover:border-2 hover:border-orange-500 bg-[#1f262a] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title>
                    <div className="flex justify-between mb-2">
                      <h2 className="text-lg font-medium text-white">
                        NFT Details
                      </h2>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-white hover:text-orange-500 focus:outline-none"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </Dialog.Title>
                  <div className="grid grid-cols-6 gap-3 w-full items-start">
                    <div className="col-span-2 ">
                      <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-xl  group-hover:opacity-75   ">
                        <MediaRenderer
                          src={nft.imageSrc}
                          alt={nft.name}
                          className="object-cover object-top"
                        />
                      </div>
                    </div>
                    <div className="col-span-4 relative h-full">
                      <h3 className="text-lg font-medium text-white mb-4">
                        {nft.name}
                      </h3>
                      <p className="text-sm text-white pt-1 font-semibold">
                        {nft.id}
                      </p>
                      <p className="text-sm text-white pt-1">
                        {truncateDescription(nft.description, 300)}
                      </p>
                      <div className="mt-4 absolute bottom-0 w-full justify-end flex ">
                        <a
                          href={
                            "https://opensea.io/assets/ethereum/" +
                            nft.contract +
                            "/" +
                            nft.id
                          }
                          target="_blank"
                          rel="noreferrer"
                          type="button"
                          className="bg-orange-500 text-white font-semibold p-2 rounded-bl-xl rounded-tr-xl col-span-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:bg-orange-600 transition:all duration-300 ease-in-out"
                        >
                          View on OpenSea{" "}
                          <img
                            src="/opensea.svg"
                            alt="opensea"
                            className="w-4 inline-block ml-2"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Modal;
