// import { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
// import { deleteProduct, getProductByCategory, getProducts } from "../services/productsService";
// import Product from "../interfaces/Product";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { successMsg } from "../services/feedbacksService";
// import { UserInfo } from "../App";
// import { addToArrayFav, getUserById } from "../services/userService";
// import User from "../interfaces/User";
// import { AxiosResponse } from "axios";
// import SearchBar from "./SearchBar";

// interface ProductsProps {
//     userInfo: any
//     setUserInfo: Dispatch<SetStateAction<UserInfo>>;
//     // category: string
//     products: Product[]
//     //setProducts: Function
//     setProducts: Dispatch<SetStateAction<Product[]>>;
//     productsChange: boolean
//     setProductsChange: Function
// }

// const Products: FunctionComponent<ProductsProps> = ({ userInfo  ,products, setProducts, productsChange, setProductsChange}) => {
   
//     let {category} = useParams()
//     const [user,setUser] = useState<User | undefined>()  
  
//     useEffect(() => {
//         if (sessionStorage.getItem("token") === null || userInfo.id === undefined) {
//         getProducts()
//             .then((res) => setProducts(res.data));
//     return;
//     }

// const promises = [
//     getProducts() as Promise<AxiosResponse<Product[], any>>,
//      getUserById(userInfo.id) as Promise<AxiosResponse<User, any>>
//     ] as const;
//     Promise.all(promises)
//     .then(([productsResponse, userResponse]) => {
//     setUser(userResponse.data)
//     setProducts(productsResponse.data)
//     })
//    .catch(err => console.log(err))
//     }, [userInfo.id,productsChange]);


// const isFavorite = (someProductId:string | undefined) => {
//     if(!someProductId) return false
//     const userProducts = user?.favorites as Product[] ?? []
//     return userProducts.findIndex(product => product._id === someProductId) !== -1
// }

//     // let addToFavorite = (product: Product) => {
//     //     let id = JSON.parse(sessionStorage.getItem("userInfo") as string).id;
//     //     if (product._id === undefined) { return }
//     //     const productId = product._id;
//     //     let removed = false
//     //     if (user && user.favorites?.find(product => product._id === productId)) {
//     //     removed = true
//     //      let products =user.favorites
//     //      let idx = user.favorites.findIndex(c => c._id === productId)
//     //      products.splice(idx,1)
//     //      setUser({...user,favorites:products} as any)
//     //     }else {
//     //     setUser({...user,favorites:[...user?.favorites as any, products]} as any)    

//     //     }


//     let addToFavorite = (product: Product) => {
//         let id = JSON.parse(sessionStorage.getItem("userInfo") as string).id;
//         if (product._id === undefined) { return; }
//         const productId = product._id;
//         let removed = false;

//         // Ensure user.favorites is initialized as an array
//         const userFavorites = user?.favorites || [];

//         // הסרה מהמועדפים אם הכארד קיים 
//         if (userFavorites.find(product => product._id === productId)) {
//             removed = true;
//             let products = [...userFavorites];
//             let idx = userFavorites.findIndex(c => c._id === productId);
//             products.splice(idx, 1);
//             setUser({ ...user, favorites: products } as any);
//         } else {
//             //הוספה למועדפים 
//             setUser({ ...user, favorites: [...userFavorites, product] } as any);
//         }

//         addToArrayFav(id, productId)
//             .then((res) => {
//                 successMsg(removed ? "המוצר הוסר מהמועדפים" : "נוסף למועדפים");
//             })
//             .catch((err) => console.log(err));
//     };
    
    
    
//     let render = () => {
//         setProductsChange(!productsChange);
//     }
//     let handleDelete = (id: string) => {
//         if (window.confirm("Are you sure?")) {
//             deleteProduct(id)
//                 .then((res) => {
//                     successMsg("המוצר נמחק ");
//                     render();
//                 })
//                 .catch((err) => console.log(err));
//         }
//     }


//     const furnituresImg = "images/furnituries.jpg";
//     const accessoriesImg = "images/accessories.jpg";
//     const gardenFurnitureImg = "images/garden.jpg";

//     let navigate = useNavigate(); 
//     let handleCategoryClick = (category: string) => {
//         navigate(`/products/category/${category}`);
//     };

//     const handleSearch = (results: any[]) => {
//         setProducts(results);
//     };

//     return (
//         <>
//         <div className="container">
//         <h6 className="display-4 mt-5 mb-5">HOT WINTER IN HOME DESING</h6>
//         <img src="images/gate.jpg" alt="gate" />
//                 <h4 className="display-7 mb-5">בית הוא ההמשך הישיר שלכם. הוא אוגר בתוכו את הזיכרונות, המחשבות, האהבות והתקוות שלכם וזה המקום אליו תמיד תרצו להגיע בסופו של יום ארוך. הריהוט שבו אמו לשקף זאת ולעורר בכם את כל התחושות הללו. לכן מזנון אינו רק מקום אחסון כי אם המקום שבו נשמרים המזכרות שלכם מהטיול האחרון בחו"ל, מדף המטבח איננו רק מקום להניח בו את כוסות היין אלא הפינה המשקפת את טעמכם האישי (תרתי משמע) והספה איננה רק מקום ישיבה כי אם המקום אליו תרצו להגיע בסוף היום ולהרגיש עטופים ובטוחים.</h4>
//                 <SearchBar onSearch={handleSearch} />
//                     <div className="row">
//                         <h6 className="display-6">קנו לפי קטגוריה</h6>
//                         <div className="image-container col-md-4 mb-3 mr-1">
//                             <img
//                                 src={furnituresImg}
//                                 alt="Shared Image"
//                                 style={{ width: "26rem", height: "20rem" }}
//                                 onClick={() => handleCategoryClick("רהיטים")}
//                             />
//                         </div>
//                         <div className="image-container col-md-4 mb-3 mr-1">
//                             <img
//                                 src={accessoriesImg}
//                                 alt="Shared Image"
//                                 style={{ width: "26rem", height: "20rem" }}
//                                 onClick={() => handleCategoryClick("אקססוריז")}
//                             />
//                         </div>
//                         <div className="image-container col-md-4 mb-3 mr-1">
//                             <img
//                                 src={gardenFurnitureImg}
//                                 alt="Shared Image"
//                                 style={{ width: "26rem", height: "20rem" }}
//                                 onClick={() => handleCategoryClick("ריהוט-גן")}
//                             />
//                         </div>
//                     </div>
        
// <h1 className="display-2 mt-5 mb-5">המוצרים</h1>
                

//             {userInfo.isAdmin &&
//                 (<Link to="/products/new" className="btn btn-success">
//                     <i className="fa-solid fa-plus"></i> הוספת מוצר
//                 </Link>)}
//             {products.length ? (
//                 <div className="container">
//                     <div className="row">
//                         {products.map((product: Product) => (
//                             <div
//                                 key={product._id}
//                                 className="card col-md-4 mx-2 mt-4"
//                                 style={{ width: "19.2rem" }}
//                             >
//                                 <div className="images">
//                                 <img
//                                     src={product.imageUrl}
//                                     style={{ width: "17.8rem", height: "16rem" }}
//                                     className="card-img-top"
//                                     onClick={() => navigate(`/products/details/${product._id}`)}
//                                     alt={product.title}
//                                 />
//                                 </div>
//                                 <div className="card-body text-center" style={{ color: "#947427" }}>
//                                     <h5 className="card-title">{product.title}</h5>
//                                     <p className="card-text">{product.description}</p>
//                                 </div>
//                                 <div className="card-body">
                                   
//                                    <p className="card-text">{product.price} ₪</p>

//                                    <div className="card-body">
//                                     {userInfo.email && (<>
//                                         <div onClick={() => addToFavorite(product)}>
//                                             {!isFavorite(product._id)  ?
//                                                 (<i className="fa-solid fa-heart"></i>)
//                                                 :
//                                                 (<i className="fa-solid fa-heart" style={{ color: "#ff0000" }}></i>)
//                                             }
//                                         </div>
//                                     </>)}
//                                 </div>

                                    
//                                     {userInfo.isAdmin && (
//                                         <>
//                                             <Link to={`/products/update/${product._id}`} className="btn mx-2"><i className="fa-solid fa-pen-to-square" style={{ color: "#947427" }}></i></Link>
//                                             <Link to="" className="btn" onClick={() => handleDelete(product._id as string)}><i className="fa-solid fa-trash" style={{ color: "#947427" }}></i></Link>
//                                         </>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
                
//             ) : (
//                 <p>No products</p>
//                  )}
//        </div>          
  
//         </>
//     )
// }

// export default Products;




import React, { Dispatch, FunctionComponent, SetStateAction, useEffect, useState } from "react";
import { deleteProduct, getProductByCategory, getProducts } from "../services/productsService";
import Product from "../interfaces/Product";
import { Link, useNavigate, useParams } from "react-router-dom";
import { successMsg } from "../services/feedbacksService";
import { UserInfo } from "../App";
import { addToArrayFav, getUserById } from "../services/userService";
import User from "../interfaces/User";
import { AxiosResponse } from "axios";
import SearchBar from "./SearchBar";

interface ProductsProps {
  userInfo: any
  setUserInfo: Dispatch<SetStateAction<UserInfo>>;
  products: Product[]
  setProducts: Dispatch<SetStateAction<Product[]>>;
  productsChange: boolean
  setProductsChange: Function
}

const Products: FunctionComponent<ProductsProps> = ({ userInfo, products, setProducts, productsChange, setProductsChange }) => {
  let { category } = useParams()
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    if (sessionStorage.getItem("token") === null || userInfo.id === undefined) {
      getProducts()
        .then((res) => setProducts(res.data));
      return;
    }

    const promises = [
      getProducts() as Promise<AxiosResponse<Product[], any>>,
      getUserById(userInfo.id) as Promise<AxiosResponse<User, any>>
    ] as const;
    Promise.all(promises)
      .then(([productsResponse, userResponse]) => {
        setUser(userResponse.data)
        setProducts(productsResponse.data)
      })
      .catch(err => console.log(err))
  }, [userInfo.id, productsChange]);


  const isFavorite = (someProductId: string | undefined) => {
    if (!someProductId) return false
    const userProducts = user?.favorites as Product[] ?? []
    return userProducts.findIndex(product => product._id === someProductId) !== -1
  }

  let addToFavorite = (product: Product) => {
    let id = JSON.parse(sessionStorage.getItem("userInfo") as string).id;
    if (product._id === undefined) { return; }
    const productId = product._id;
    let removed = false;

    // Ensure user.favorites is initialized as an array
    const userFavorites = user?.favorites || [];

    if (userFavorites.find(product => product._id === productId)) {
      removed = true;
      let products = [...userFavorites];
      let idx = userFavorites.findIndex(c => c._id === productId);
      products.splice(idx, 1);
      setUser({ ...user, favorites: products } as any);
    } else {
      setUser({ ...user, favorites: [...userFavorites, product] } as any);
    }

    addToArrayFav(id, productId)
      .then((res) => {
        successMsg(removed ? "המוצר הוסר מהמועדפים" : "נוסף למועדפים");
      })
      .catch((err) => console.log(err));
  };

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

  const furnituresImg = "images/furnituries.jpg";
  const accessoriesImg = "images/accessories.jpg";
  const gardenFurnitureImg = "images/garden.jpg";

  let navigate = useNavigate();
  let handleCategoryClick = (category: string) => {
    navigate(`/products/category/${category}`);
  };

  const handleSearch = (results: any[]) => {
    setProducts(results);
  };

  return (
    <div className="products-container">
      <div className="image-container">
        <img className="background-image" src="images/gate.jpg" alt="gate" />
        <h1 className="display-1 caption">HOT WINTER IN HOME DESIGN</h1>
      </div>

      <div className="container">
        <SearchBar onSearch={handleSearch} />

        <div className="row">
          <h6 className="display-6">קנו לפי קטגוריה</h6>
          <div className="image-container col-md-4 mb-3 mr-1">
            <img
              src={furnituresImg}
              alt="Shared Image"
              style={{ width: "26rem", height: "20rem" }}
              onClick={() => handleCategoryClick("רהיטים")}
            />
          </div>
          <div className="image-container col-md-4 mb-3 mr-1">
            <img
              src={accessoriesImg}
              alt="Shared Image"
              style={{ width: "26rem", height: "20rem" }}
              onClick={() => handleCategoryClick("אקססוריז")}
            />
          </div>
          <div className="image-container col-md-4 mb-3 mr-1">
            <img
              src={gardenFurnitureImg}
              alt="Shared Image"
              style={{ width: "26rem", height: "20rem" }}
              onClick={() => handleCategoryClick("ריהוט-גן")}
            />
          </div>
        </div>

        <h1 className="display-2 mt-5 mb-5">המוצרים שלנו</h1>

        {userInfo.isAdmin &&
          <Link to="/products/new" className="position-relative btn btn-sm btn-secondary rounded-pill shadow pt-3" style={{ width: "5rem", height: "5rem" }}>
              <i className="fa-solid fa-plus"></i>  Add Business
          </Link>}
        {products.length ? (
          <div className="container">
            <div className="row">
              {products.map((product: Product) => (
                <div
                  key={product._id}
                  className="card col-md-4 mx-2 mt-4"
                  style={{ width: "19.2rem" }}
                >
                  <div className="images">
                    <img
                      src={product.imageUrl}
                      style={{ width: "17.8rem", height: "16rem" }}
                      className="card-img-top"
                      onClick={() => navigate(`/products/details/${product._id}`)}
                      alt={product.title}
                    />
                  </div>
                  <div className="card-body text-center" style={{ color: "#947427" }}>
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{product.price} ₪</p>

                    <div className="card-body">
                      {userInfo.email && (
                        <>
                          <div onClick={() => addToFavorite(product)}>
                            {!isFavorite(product._id) ?
                              (<i className="fa-solid fa-heart"></i>)
                              :
                              (<i className="fa-solid fa-heart" style={{ color: "#ff0000" }}></i>)
                            }
                          </div>
                        </>
                      )}
                    </div>

                    {userInfo.isAdmin && (
                      <>
                        <Link to={`/products/update/${product._id}`} className="btn mx-2"><i className="fa-solid fa-pen-to-square" style={{ color: "#947427" }}></i></Link>
                        <Link to="" className="btn" onClick={() => handleDelete(product._id as string)}><i className="fa-solid fa-trash" style={{ color: "#947427" }}></i></Link>
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
    </div>
  );
}

export default Products;
