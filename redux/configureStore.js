import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { persistCombineReducers, persistStore } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { dishes } from './dishes'
import { promotions } from './promotions'
import { leaders } from './leaders'
import { comments } from './comments'
import { favorites } from './favorites'

export const configureStore = () => {


    const config = {
        key: 'root',
        storage: AsyncStorage,
        debug: true
    }
    const store = createStore(
        persistCombineReducers(config, {
            dishes,
            promotions,
            leaders,
            comments,
            favorites
        }),
        applyMiddleware(thunk, logger),
    );

    const persistor = persistStore(store)
    return { persistor, store };
};