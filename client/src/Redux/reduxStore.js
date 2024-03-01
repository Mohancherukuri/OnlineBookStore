import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import { spinnerSlice } from './Slices/spinnerSlice'

const rootReducer = combineReducers ({
    spinner : spinnerSlice.reducer,
});

const reduxStore = configureStore({
    reducer : rootReducer
})

export default reduxStore;