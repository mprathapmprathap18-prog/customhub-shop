import {
    OWNER_STATS_REQUEST,
    OWNER_STATS_SUCCESS,
    OWNER_STATS_FAIL,
    OWNER_ORDERS_REQUEST,
    OWNER_ORDERS_SUCCESS,
    OWNER_ORDERS_FAIL,
    OWNER_PRODUCTS_REQUEST,
    OWNER_PRODUCTS_SUCCESS,
    OWNER_PRODUCTS_FAIL,
    OWNER_CUSTOMERS_REQUEST,
    OWNER_CUSTOMERS_SUCCESS,
    OWNER_CUSTOMERS_FAIL,
    OWNER_ORDER_UPDATE_REQUEST,
    OWNER_ORDER_UPDATE_SUCCESS,
    OWNER_ORDER_UPDATE_FAIL,
    CLEAR_ERRORS,
} from '../constants/ownerConstants';

export const ownerStatsReducer = (state = { stats: {} }, { type, payload }) => {
    switch (type) {
        case OWNER_STATS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case OWNER_STATS_SUCCESS:
            return {
                loading: false,
                stats: payload.stats,
                recentOrders: payload.recentOrders,
            };
        case OWNER_STATS_FAIL:
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

export const ownerOrdersReducer = (state = { orders: [] }, { type, payload }) => {
    switch (type) {
        case OWNER_ORDERS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case OWNER_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: payload,
            };
        case OWNER_ORDERS_FAIL:
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

export const ownerProductsReducer = (state = { products: [] }, { type, payload }) => {
    switch (type) {
        case OWNER_PRODUCTS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case OWNER_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: payload,
            };
        case OWNER_PRODUCTS_FAIL:
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

export const ownerCustomersReducer = (state = { customers: [] }, { type, payload }) => {
    switch (type) {
        case OWNER_CUSTOMERS_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case OWNER_CUSTOMERS_SUCCESS:
            return {
                loading: false,
                customers: payload,
            };
        case OWNER_CUSTOMERS_FAIL:
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

export const ownerOrderUpdateReducer = (state = {}, { type, payload }) => {
    switch (type) {
        case OWNER_ORDER_UPDATE_REQUEST:
            return {
                loading: true,
                ...state,
            };
        case OWNER_ORDER_UPDATE_SUCCESS:
            return {
                loading: false,
                isUpdated: payload,
            };
        case OWNER_ORDER_UPDATE_FAIL:
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
