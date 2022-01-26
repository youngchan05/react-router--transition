import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const SlideRoute = ( {children, name} ) => {
    const location = useLocation();
    const isLogin = false;
    const  authFn = () => {
        return (
            <TransitionGroup className="transition-group">
                <CSSTransition exact key={location.pathname===`/${name}`?location.pathname:null} classNames="slide" timeout={500}>
                    {
                        children
                    }
                </CSSTransition>
   		    </TransitionGroup> 
        )
    }
    return isLogin ? children :  authFn();
}

export default SlideRoute;
