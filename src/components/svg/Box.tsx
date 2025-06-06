import React, {FC} from 'react';
import Svg, {Path} from 'react-native-svg';

interface BoxProps {
  color: string;
}

const Box: FC<BoxProps> = ({color}) => {
  return (
    <Svg width="20" height="18" viewBox="0 0 20 18" fill="none">
      <Path
        d="M19 10V17C19 17.2652 18.8946 17.5196 18.7071 17.7071C18.5196 17.8946 18.2652 18 18 18H2C1.73478 18 1.48043 17.8946 1.29289 17.7071C1.10536 17.5196 1 17.2652 1 17V10H0V8L1 3H19L20 8V10H19ZM3 10V16H17V10H3ZM2.04 8H17.96L17.36 5H2.64L2.04 8ZM4 11H12V14H4V11ZM1 0H19V2H1V0Z"
        fill={color}
      />
    </Svg>
  );
};

export default Box;
