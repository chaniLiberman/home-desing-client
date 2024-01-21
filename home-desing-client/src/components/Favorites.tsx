// import { FunctionComponent, useEffect, useState } from "react";
// import { UserInfo } from "../App";
// import { Link, useNavigate } from "react-router-dom";
// import User from "../interfaces/User";
// import { successMsg } from "../services/feedbacksService";
// import { addToArrayFav, getUserById } from "../services/userService";
// import Product from "../interfaces/Product";

// interface FavoritesProps {
//     userInfo: any;
// }

// const Favorites: FunctionComponent<FavoritesProps> = ({ userInfo }) => {
//     let navigate = useNavigate();
//     const[user,setUser] = useState<User | undefined>()
//     useEffect(() => {
//         if (userInfo._id === undefined) { return; }
//         getUserById(userInfo._id)
//             .then(res => setUser(res.data))
//             .catch((err) => console.log(err))
//     }, [userInfo._id]);


 
//     let removeFromFavorite = (productId: string | undefined) => {
//         if(!userInfo?._id || !productId) return
//         if (user && user.favorites?.find(product => product._id === productId)) {
//              let products =user.favorites
//              let idx = user.favorites.findIndex(c => c._id === productId)
//              products.splice(idx,1)
//              setUser({...user,favorites:products} as any)
//         }


//         addToArrayFav(userInfo._id!, productId)
//             .then((res) => {
//                 successMsg("Card removed from favorites");
//             })
//             .catch((err) => console.log(err))
//     }



// export default Favorites;

import { FunctionComponent, useEffect, useState } from "react";
import User from "../interfaces/User";
import { successMsg } from "../services/feedbacksService";
import { addToArrayFav, getUserById } from "../services/userService";
import Product from "../interfaces/Product";
import { Link, useNavigate } from "react-router-dom";


interface FavoritesProps {
    userInfo: any;
}

const Favorites: FunctionComponent<FavoritesProps> = ({ userInfo }) => {
    let navigate = useNavigate();
    const [user, setUser] = useState<User | undefined>()
    useEffect(() => {
        if (userInfo.id === undefined) { return; }
        getUserById(userInfo.id)
            .then(res => setUser(res.data))
            .catch((err) => console.log(err))
    }, [userInfo.id]);

    let removeFromFavorite = (productId: string | undefined) => {
        if (!userInfo?.id || !productId) return
        if (user && user.favorites?.find(product => product._id === productId)) {
            let products = user.favorites
            let idx = user.favorites.findIndex(c => c._id === productId)
            products.splice(idx, 1)
            setUser({ ...user, favorites: products } as any)
        }

        addToArrayFav(userInfo.id!, productId)
            .then((res) => {
                successMsg("המוצר הוסר מהמועדפים");
            })
            .catch((err) => console.log(err))
    }

    return ( <>
        <h5 className="display-1 pt-3 text-center">מועדפים</h5>
               <h5 className="display-1 pt-3 text-center" style={{ fontSize: "2.3rem" }}>המועדפים שלי</h5>
               {user?.favorites?.length ?
                   (
                       <div className="container">
                           <div className="row">
                               {user.favorites.map((product: Product) =>
                               (<div key={product._id} className="card col-md-4 mx-2 mt-4" style={{ width: "25rem" }}>
                                   <img src={product.imageUrl} className="card-img-top h-75" onClick={() => navigate(`/cards/card-details/${product._id}`)} alt={product.imageAlt} />
                                   <div className="card-body text-center" style={{ color: "#947427" }}>
                                       <h5 className="card-title">{product.title}</h5>
                                       <p className="card-text">{product.subtitle}</p>
                                   </div>
                                   {/* <ul className="list-group list-group-flush text-center" style={{ color: "#947427" }}>
                                       <li className="list-group-item"><i className="fa-solid fa-phone"></i> {product.phone}</li>
                                       <li className="list-group-item"><i className="fa-regular fa-envelope"></i> {product.email}</li>
                                   </ul> */}
                                   <div className="card-body">
                                        <i className="fa-solid fa-heart"  onClick={() => removeFromFavorite(product._id)} style={{ color: "#ff0000" }}></i>
                                   </div>
                               </div>
                               ))}
                           </div>
                       </div>
                   )
                   :
                   (<div className={"pt-3 pb-5 sandBoxStyle"}>
                  <div className="container backGround mt-5 p-5 col-md-6">
                  <h1 className="text-center mb-5" style={{ fontSize: "2rem" }}>
                            עדיין לא בחרת מוצרים כמועדפים ? מוזמן להקליק על הלב ולסמן כמועדף
                  <h5><Link to="/products" className="text-black">לבחירת מועדפים <i className="fa-solid fa-heart fa-xs"></i></Link></h5> 
                  </h1>
                <h2 className="text-center"><img src="/Images/logo.PNG" style={{ width: "150px", height: "67px" }} /></h2>
                  </div>
                  </div>)
                  
              
               }
               
       </> );
   }
export default Favorites;