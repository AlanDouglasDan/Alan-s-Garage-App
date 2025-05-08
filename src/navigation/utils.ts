import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export const navigate = (name: any, params?: any) => {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
};
