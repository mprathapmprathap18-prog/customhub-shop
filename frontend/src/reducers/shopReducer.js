import { SHOP_INFO_REQUEST, SHOP_INFO_SUCCESS, SHOP_INFO_FAIL, CLEAR_ERRORS } from '../constants/shopConstants';

export const shopInfoReducer = (state = { shop: {} }, { type, payload }) => {
    switch (type) {
        case SHOP_INFO_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case SHOP_INFO_SUCCESS:
            return {
                loading: false,
                shop: payload,
            };
        case SHOP_INFO_FAIL:
            return {
                loading: false,
                error: payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
};
