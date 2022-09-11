import {useLocation} from "react-router-dom";
import React from "react";

const NotFound404 = () => {
    let {pathname} = useLocation()
    return(
        <div>
            <h2> Страница по адресу '{pathname}' не найдена</h2>
        </div>
    )

}

export default NotFound404


//
// const NotFound = () => {
//     var {pathname} = useLocation()
//
//     return (
//         <div>
//             Page "{pathname}" not found
//         </div>
//     )
// }