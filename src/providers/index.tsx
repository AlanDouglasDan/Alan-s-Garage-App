import React, {createContext, useContext} from 'react';
import {Alert} from 'react-native';
import {SheetManager, SheetProvider} from 'react-native-actions-sheet';
import './sheets';

type SheetsProp = {
  open: (sheet_id: string, props?: any) => void;
};

export const SheetsContext = createContext<SheetsProp>({
  open: () => null,
});

const SheetsProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const open = (sheet_id: string, props?: any) => {
    SheetManager.show(sheet_id, props).catch(() => {
      Alert.alert(
        'Error',
        'Unable to complete requested action, please try again later.',
      );
    });
  };

  return (
    <SheetsContext.Provider
      value={{
        open,
      }}>
      <SheetProvider>{children}</SheetProvider>
    </SheetsContext.Provider>
  );
};

export const useSheetsContext = () => useContext(SheetsContext);

export default SheetsProvider;
