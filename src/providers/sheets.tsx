import {registerSheet} from 'react-native-actions-sheet';

import {TermsPrivacy} from './components/TermsPrivacy';
import {StripeOnboarding} from './components/StripeOnboarding';
import {CarDetails} from './components/CarDetails';
import {CancelRequest} from './components/CancelRequest';
import {PickupReady} from './components/PickupReady';

registerSheet('terms-privacy', TermsPrivacy);
registerSheet('stripe-onboarding', StripeOnboarding);
registerSheet('car-details', CarDetails);
registerSheet('cancel-request', CancelRequest);
registerSheet('pickup-ready', PickupReady);

export {};
