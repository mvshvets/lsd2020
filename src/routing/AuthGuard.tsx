import React, { FC, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from 'core/context';
import { ROUTE_NAMES } from './routeNames.const';

export const AuthGuard: FC = ({ children }) => {
    const { userData } = useContext(UserContext);

    return userData ? <>{children}</> : <Redirect to={ROUTE_NAMES.AUTH} />;
};
