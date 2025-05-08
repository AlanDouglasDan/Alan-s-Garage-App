import React, {FC} from 'react';
import Svg, {Path, G, Defs, ClipPath, Rect} from 'react-native-svg';

interface PasscodeProps {}

const Passcode: FC<PasscodeProps> = () => {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
      <G clip-path="url(#clip0_1465_8649)">
        <Path
          d="M2.5 14.5381H17.5V16.2048H2.5V14.5381ZM2.5 9.53809H5V12.0381H2.5V9.53809ZM6.66667 9.53809H9.16667V12.0381H6.66667V9.53809ZM2.5 4.53809H5V7.03809H2.5V4.53809ZM10.8333 4.53809H13.3333V7.03809H10.8333V4.53809ZM15 4.53809H17.5V7.03809H15V4.53809ZM10.8333 9.53809H13.3333V12.0381H10.8333V9.53809ZM15 9.53809H17.5V12.0381H15V9.53809ZM6.66667 4.53809H9.16667V7.03809H6.66667V4.53809Z"
          fill="#667085"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1465_8649">
          <Rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.371094)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Passcode;
