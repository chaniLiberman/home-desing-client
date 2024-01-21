import axios from "axios";
import _ from "lodash";
import Product from "../interfaces/Product";

let api: string = `${process.env.REACT_APP_API}/carts`;

// create cart
export function createCart(userId: string) {
    return axios.post(api,  { userId, products: [], active: true });
}

// get cart by user id
export function getCartByUserId() {
    return axios.get(`${api}` , {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token
      },
    });
}

// add to cart
export function addToCart(productToAdd: Product) {
    let product = _.pick(productToAdd, [
      "_id",
      "title",
      "category",
      "description",
      "price",
      "imageUrl",
      "quantity"
    ]);
    return axios.post(api, product, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
              .token,
          },
    });
}



// delete product from cart
export function deleteProductFromCart(id: string) {
    return axios.delete(`${api}/${id}` , {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token
      },
    });
} 