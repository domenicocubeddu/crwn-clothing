import SHOP_DATA from './shop.data';

const INTITIAL_STATE = {
    collections: SHOP_DATA
}

const shopReducer = (state = INTITIAL_STATE, action) => {
    switch (action.type) {
        default: 
        return state;
    }
}

export default shopReducer;