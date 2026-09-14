export const getDiscount = (price, cuttedPrice) => {
    if (!cuttedPrice || cuttedPrice <= price) return 0;
    return Math.round(((cuttedPrice - price) / cuttedPrice) * 100);
}

export const getDeliveryDate = () => {
    const deliveryDate = new Date();
    deliveryDate.setDate(new Date().getDate() + 7);
    return deliveryDate.toUTCString().substring(0, 11);
}

export const formatDate = (dt) => {
    if (!dt) return '';
    try {
        return new Date(dt).toUTCString().substring(0, 16);
    } catch {
        return '';
    }
}

export const getRandomProducts = (prodsArray, n = 12) => {
    if (!Array.isArray(prodsArray) || prodsArray.length === 0) return [];
    return [...prodsArray].sort(() => 0.5 - Math.random()).slice(0, n);
}