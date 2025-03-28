import { configureStore } from "@reduxjs/toolkit";
import loginreducer from '../login/loginSlice'

const Store = configureStore({
    reducer : {
        auth : loginreducer
    }
})

export default Store;