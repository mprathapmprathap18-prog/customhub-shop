import axios from "axios";
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
} from "../constants/ownerConstants";

// Get Owner Stats
export const getOwnerStats = () => async (dispatch) => {
    try {
        dispatch({ type: OWNER_STATS_REQUEST });
        const { data } = await axios.get('/api/v1/owner/stats');
        dispatch({
            type: OWNER_STATS_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: OWNER_STATS_FAIL,
            payload: error.response?.data?.message || "Error fetching stats",
        });
    }
};

// Get Owner Orders
export const getOwnerOrders = () => async (dispatch) => {
    try {
        dispatch({ type: OWNER_ORDERS_REQUEST });
        const { data } = await axios.get('/api/v1/owner/orders');
        dispatch({
            type: OWNER_ORDERS_SUCCESS,
            payload: data.orders,
        });
    } catch (error) {
        dispatch({
            type: OWNER_ORDERS_FAIL,
            payload: error.response?.data?.message || "Error fetching orders",
        });
    }
};

// Get Owner Products
export const getOwnerProducts = () => async (dispatch) => {
    try {
        dispatch({ type: OWNER_PRODUCTS_REQUEST });
        const { data } = await axios.get('/api/v1/owner/products');
        dispatch({
            type: OWNER_PRODUCTS_SUCCESS,
            payload: data.products,
        });
    } catch (error) {
        dispatch({
            type: OWNER_PRODUCTS_FAIL,
            payload: error.response?.data?.message || "Error fetching products",
        });
    }
};

// Get Owner Customers
export const getOwnerCustomers = () => async (dispatch) => {
    try {
        dispatch({ type: OWNER_CUSTOMERS_REQUEST });
        const { data } = await axios.get('/api/v1/owner/customers');
        dispatch({
            type: OWNER_CUSTOMERS_SUCCESS,
            payload: data.customers,
        });
    } catch (error) {
        dispatch({
            type: OWNER_CUSTOMERS_FAIL,
            payload: error.response?.data?.message || "Error fetching customers",
        });
    }
};

// Update Owner Order
export const updateOwnerOrder = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: OWNER_ORDER_UPDATE_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.put(
            `/api/v1/owner/order/${id}`,
            { status },
            config
        );
        dispatch({
            type: OWNER_ORDER_UPDATE_SUCCESS,
            payload: data.success,
        });
    } catch (error) {
        dispatch({
            type: OWNER_ORDER_UPDATE_FAIL,
            payload: error.response?.data?.message || "Error updating order",
        });
    }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
