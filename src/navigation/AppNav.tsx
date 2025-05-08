import React, {FC} from 'react';

import {useAuth} from 'store/auth/hooks';
import {AppStackNav} from './app-stack';
import {AuthStackNav} from './auth-stack';

const AppNav: FC = () => {
    const {accessToken} = useAuth();

    if (accessToken) {
      return <AppStackNav />;
    }

  return <AuthStackNav />;
};

export default AppNav;
