import { FunctionComponent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteProduct, getProductByCategory } from "../services/productsService";
import Product from "../interfaces/Product";
import { successMsg } from "../services/feedbacksService";
import { UserInfo } from "../App";

interface FurnituresProps {
    userInfo: UserInfo
    category: string;
    products: Product[]
    setProducts: Function
    productsChange: boolean
    setProductsChange: Function 
}
 
const Furnitures: FunctionComponent<FurnituresProps> = ( {userInfo,category, products, setProducts,productsChange,setProductsChange} ) => {
    let navigate = useNavigate();

    useEffect(() => {
        getProductByCategory(category)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, [productsChange])

    let render = () => {
        setProductsChange(!productsChange);
    }

    let handleDelete = (id: string) => {
        if (window.confirm("Are you sure?")) {
            deleteProduct(id)
                .then((res) => {
                    successMsg("המוצר נמחק ");
                    render();
                })
                .catch((err) => console.log(err));
        }
    }
    return ( <>
     <div className="container">
    <h5 className="display-1 mt-5">{category}</h5>
    <h4 className="display-7 p-5">"ריהוט הוא לא רק פונקציונלי; זו הנשמה של מרחב המחיה שלכם. שדרגו את הנוחות, שפרו את הסגנון – מכיוון שפריט שנבחר בקפידה חורג מהטרנדים, ומוסיף יופי ושימושיות לביתכם. אל תזלזלו בכוחם הטרנספורמטיבי של רהיטים; אמצו את הפוטנציאל בכל פריט לבית מזמין ויפה ללא ספק".</h4>
     {products.length ? (
                <div className="container">
                    <div className="row">
                        {products.map((product: Product) => (
                            <div
                                key={product._id}
                                className="card col-md-4 mx-2 mt-4"
                                style={{ width: "18rem" }}
                            >
                                <img
                                    src={product.imageUrl}
                                    style={{ width: "16.5rem", height: "16rem" }}
                                    className="card-img-top"
                                    onClick={() => navigate(`/products/details/${product._id}`)}
                                    alt={product.title}
                                />
                                <div className="card-body text-center" style={{ color: "#947427" }}>
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.description}</p>
                                </div>
                                <div className="card-body">
                                    {/* <h6 className="card-subtitle mb-2 text-muted">
                                        {product.category}
                                    </h6> */}
                                   <p className="card-text text-success">{product.price} ₪</p>

                                   {userInfo.isAdmin && (
                                        <>
                                            <Link to={`/products/update/${product._id}`} className="btn btn-warning mx-2"><i className="fa-solid fa-pen-to-square"></i></Link>
                                            <Link to="" className="btn btn-danger" onClick={() => handleDelete(product._id as string)}><i className="fa-solid fa-trash"></i></Link>
                                        </>
                                    )}
                                    
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>No products</p>
            )}
            </div>
    </> );
}
 
export default Furnitures;