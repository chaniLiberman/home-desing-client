import { FunctionComponent, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Product from "../interfaces/Product";
import { getProductDetails } from "../services/productsService";
import { addToCart } from "../services/cartService";
import { successMsg } from "../services/feedbacksService";
import { UserInfo } from "../App";

interface ProductDetailsProps {
  userInfo: UserInfo
}
 
const ProductDetails: FunctionComponent<ProductDetailsProps> = ( {userInfo} ) => {
    let { id } = useParams();

    let [productDetails , setProductDetails] = useState<Product>();
    useEffect(() => {
        if (id === undefined) {return};
        getProductDetails(id)
           .then((res) => {
                 setProductDetails(res.data)
           })
           .catch((err) => console.log(err))
    }, []);

    let handleAddToCart = (productDetails: Product | undefined) => {
        if(!productDetails) {return};
        addToCart(productDetails)
          .then((res) => successMsg( "! המוצר נוסף בהצלחה"))
          .catch((err) => console.log(err))
    };

    if (!productDetails) {
        return <span>Product not found!</span>
    }

    return ( <>
    <div className="container col-md-6 mt-5">
        <div className="card mb-3 p-3" 
        // style={{width: "650px"}}
        >
            <div className="row g-0">
              <div className="col-md-4">
                <img src={productDetails?.imageUrl} className="img-fluid rounded-start w-100" alt={productDetails?.imageAlt}/>
              </div>
         <div className="col-md-8">
           <div className="card-body">
           <h5 className="text-center display-6">{productDetails?.title}</h5>
           <h3 className="card-text text-center"><small className="text-muted">{productDetails?.subtitle}</small></h3>
           <h6 className="card-text text-center">{productDetails?.description}</h6>
           <p className="text-center" >{productDetails?.price} <i className="fa-solid fa-shekel-sign"></i></p>
           {userInfo.email && <button className="btn btn-primary" onClick={() => handleAddToCart(productDetails)}>
                                <i className="fa-solid fa-cart-shopping"></i>  הוסף לסל
                            </button>}
                            {userInfo.email == false && <button className="btn btn-secondary"><Link to="/login">התחבר כדי להוסיף מוצרים לעגלה</Link></button>} 
         </div>
    </div>
  </div>
    </div>
        </div>
    </> );
}
 
export default ProductDetails;