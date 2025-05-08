import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  return (
    <Svg width="17" height="18" viewBox="0 0 17 18" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.41288 7.56961L7.03277 8.1742C8.15057 8.43216 9.02341 9.30499 9.28136 10.4228L9.88595 13.0427L13.9908 3.46481L4.41288 7.56961ZM15.5008 0.64172L0.812347 6.93676C-0.0764722 7.31769 0.0391619 8.61286 0.981405 8.8303L6.58305 10.123C6.95565 10.209 7.24659 10.4999 7.33258 10.8725L8.62526 16.4742C8.84271 17.4164 10.1379 17.532 10.5188 16.6432L16.8138 1.95479C17.1694 1.12506 16.3305 0.286125 15.5008 0.64172Z"
        fill="#101828"
      />
    </Svg>
  );
};

export default Navigation;
