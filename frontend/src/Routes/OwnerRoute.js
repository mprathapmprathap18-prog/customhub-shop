import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const OwnerRoute = ({ children }) => {

    const { loading, isAuthenticated, user } = useSelector(state => state.user);

    return (
        <>
            {loading === false && (
                isAuthenticated === false ? <Navigate to="/login" /> : 
                user.role !== "owner" ? <Navigate to="/" /> : 
                children
            )}
        </>
    );
};

export default OwnerRoute;
