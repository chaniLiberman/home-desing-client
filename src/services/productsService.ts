import axios from "axios";
import Product from "../interfaces/Product";

let api: string = `${process.env.REACT_APP_API}/products`;

// Get all product
export function getProducts() {
    return axios.get(api);
}

// GET specific product by id
export function getProductById(id: string) {
    return axios.get(`${api}/${id}` ,{
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token
      },
    });
}

// search products by title
export function searchProducts(query: string) {
    return axios.get(`${api}/search?query=${query}`);
}

// GET specific product by category
export function getProductByCategory(category: string) {
    return axios.get(`${api}/by/${category}`);
}

// get product details
export function getProductDetails(id: string){
    return axios.get(`${api}/details/${id}`)
}

// POST new product
export function addProduct(newProduct: Product) {
    return axios.post(api, newProduct ,
        {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token
      },
    }
    )
}

// PUT product by id
export function updateProduct(updatedProduct: Product, id: string) {
    return axios.put(`${api}/update/${id}`, updatedProduct, {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token
      },
    });
}

// DELETE product by id
export function deleteProduct(id: string) {
    return axios.delete(`${api}/${id}` , {
        headers: {
            Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token
      },
    });
} 


