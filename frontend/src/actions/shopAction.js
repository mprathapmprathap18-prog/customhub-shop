import axios from "axios";
import { SHOP_INFO_REQUEST, SHOP_INFO_SUCCESS, SHOP_INFO_FAIL, CLEAR_ERRORS } from "../constants/shopConstants";

// Get Shop Information
export const getShopInfo = () => async (dispatch) => {
    try {
        dispatch({ type: SHOP_INFO_REQUEST });

        const { data } = await axios.get('/api/v1/shop/info');

        dispatch({
            type: SHOP_INFO_SUCCESS,
            payload: data.shop,
        });

    } catch (error) {
        dispatch({
            type: SHOP_INFO_FAIL,
            payload: error.response?.data?.message || "Failed to fetch shop info",
        });
    }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};
