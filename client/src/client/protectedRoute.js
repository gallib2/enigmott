import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from './authentication/auth';


const ProtectedRoute = ({ component: Component }, ...rest) => {
    return (
        <Route {...rest} render={ props => {
            if(auth.isAuthenticated) {
                return <Component {...props}/>
            } else {
                return (<Redirect to={{
                    pathname: '/login',
                    state: {
                        from: props.location
                    }
                }}/>)
            }
        }} />
    );
}

export default ProtectedRoute;




// const ProtectedRoute = ({ component: Component }, ...rest) => {

//     const renderComponent = async (props) => {
//         //await isAuthenticated()
//         if (true) {
//             return <Component {...props} />
//         } else {
//             return <Redirect to={
//                 {
//                     pathname: '/login',
//                     state: {from: props.location}
//                 }
//             }

//         />
//         }
//     }

//     return (
//         <Route {...rest} render={props => renderComponent(props)} />
//     );
// }

// export default ProtectedRoute;