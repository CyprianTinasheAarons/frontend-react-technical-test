import { configureStore } from "@reduxjs/toolkit";
import  alchemyReducer  from "./slices/alchemy";

const reducer  = {
    nfts: alchemyReducer
}

const store = configureStore({
    reducer: reducer,
    devTools: true
});


export default store;