import {
    FETCH_PRODUCTS,
    FILTER_PRODUCTS_BY_SIZE,
    ORDER_PRODUCTS_BY_PRICE,
} from "./types";


const getProducts = async () => {
    const response = await fetch('/api/products');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);

    return body;
};

export const fetchProducts = () => (dispatch) => {


    getProducts()
        .then(res =>
        {
            debugger
            dispatch({ type: FETCH_PRODUCTS, payload: res.products });
            // this.setState({ products: res.products })
        })

        .catch(err => console.log(err));
    // fetch("/api/products")
    //     .then((res) =>{
    //      debugger
    //     })
    //     .catch((err) =>
    //         fetch("db.json")
    //             .then((res) => res.json())
    //             .then((data) => data.products)
    //     )
    //     .then((data) => {
    //         dispatch({ type: FETCH_PRODUCTS, payload: data });
    //     });
};
export const filterProducts = (products, size) => (dispatch) => {
    dispatch({
        type: FILTER_PRODUCTS_BY_SIZE,
        payload: {
            size: size,
            items:
                size === ""
                    ? products
                    : products.filter(
                    (x) => x.availableSizes.indexOf(size.toUpperCase()) >= 0
                    ),
        },
    });
};
export const sortProducts = (items, sort) => (dispatch) => {
    const products = items.slice();
    if (sort !== "") {
        products.sort((a, b) =>
            sort === "lowestprice"
                ? a.price > b.price
                ? 1
                : -1
                : a.price < b.price
                ? 1
                : -1
        );
    } else {
        products.sort((a, b) => (a.id > b.id ? 1 : -1));
    }
    dispatch({
        type: ORDER_PRODUCTS_BY_PRICE,
        payload: {
            sort: sort,
            items: products,
        },
    });
};