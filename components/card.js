import Modal from "./modal";
import { MediaRenderer } from "@thirdweb-dev/react";

const Card = ({ nft }) => {
  return (
    <Modal nft={nft}>
      <div
        key={nft.id}
        className="group relative p-1 sm:m-0 m-2 sm:p-2 rounded-2xl hover:border-2 hover:border-orange-500 bg-[#515759] bg-opacity-30 "
      >
        <div className="aspect-w-1 overflow-hidden rounded-xl  group-hover:opacity-75">
          <MediaRenderer
            src={nft.imageSrc}
            alt={nft.name}
            className="object-center object-cover h-auto w-full rounded-xl"
          />
        </div>
        <div className=" pb-1 text-left">
          <p className="mt-4 font-bold  text-white ">{nft.id}</p>
          <h3 className=" font-medium text-white">
            <span aria-hidden="true" className="absolute inset-0" />
            {nft.name}
          </h3>
        </div>
      </div>
    </Modal>
  );
};

export default Card;
