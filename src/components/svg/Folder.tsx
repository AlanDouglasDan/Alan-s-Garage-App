import React, {FC} from 'react';
import Svg, {Path, G, ClipPath, Rect, Defs} from 'react-native-svg';

interface Briefcase2Props {}

const Briefcase2: FC<Briefcase2Props> = () => {
  return (
    <Svg width="20" height="21" viewBox="0 0 20 21" fill="none">
      <G clip-path="url(#clip0_4026_18815)">
        <Path
          d="M10.3451 4.6237H17.5001C17.7211 4.6237 17.9331 4.7115 18.0893 4.86778C18.2456 5.02406 18.3334 5.23602 18.3334 5.45703V17.1237C18.3334 17.3447 18.2456 17.5567 18.0893 17.713C17.9331 17.8692 17.7211 17.957 17.5001 17.957H2.50008C2.27907 17.957 2.06711 17.8692 1.91083 17.713C1.75455 17.5567 1.66675 17.3447 1.66675 17.1237V3.79036C1.66675 3.56935 1.75455 3.35739 1.91083 3.20111C2.06711 3.04483 2.27907 2.95703 2.50008 2.95703H8.67841L10.3451 4.6237ZM16.6667 9.6237H3.33341V16.2904H16.6667V9.6237ZM16.6667 7.95703V6.29036H9.65508L7.98842 4.6237H3.33341V7.95703H16.6667Z"
          fill="#667085"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_4026_18815">
          <Rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 0.457031)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Briefcase2;
