import PRODUCT_API from '../api/productRequest'

export const getAllProducts = () => async (dispatch) => {
    dispatch({ type: 'GET_ALL_PRODUCTS_START' })
    try {
        const { data } = await PRODUCT_API.getAllProducts()
        dispatch({ type: 'GET_ALL_PRODUCTS_SUCCESS', data: data })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'GET_ALL_PRODUCTS_FAIL' })
    }

}