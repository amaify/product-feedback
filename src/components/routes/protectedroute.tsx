import { Navigate, Outlet } from "react-router";

const ProtectedRoute = (props: any) => {
	if (props.auth) {
		return <Navigate to={props.redirectPath} replace />;
	}

	return props.children ? props.children : <Outlet />;
};

export default ProtectedRoute;
