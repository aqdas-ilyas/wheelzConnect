import { Dimensions, PixelRatio } from 'react-native';
const { width, height } = Dimensions.get('window');
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('screen').width;
const SCREEN_HEIGHT = Dimensions.get('screen').height;

export const GOOGLE_API_KEY = 'AIzaSyBtZvFNCnri83OeZ3ydvlkcIG-0ZrytGFI'

export const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// export const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{7,24}$/; // just one upper case alphabet/one lower case alpjhabet/number/special chars
export const passwordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+]{8,24}$/;

export const storageKey = {};

export const routes = {
  auth: 'auth',
  splash: 'splash',
  selectedLanguage: 'selectedLanguage',
  onboard: 'onboard',
  selectedAccount: 'selectedAccount',

  login: 'login',
  forgotPassword: 'forgotPassword',
  resetPassword: 'resetPassword',
  changePassword: 'changePassword',
  otp: 'otp',
  register: 'register',
  createProfile: "createProfile",
  addAddress: "addAddress",

  hostTab: 'hostTab',
  tab: 'tab',
  home: 'home',
  hostHome: 'hostHome',
  vehicle: 'vehicle',
  chat: 'chat',
  message: 'message',
  book: 'book',
  hostBook: 'hostBook',
  favorite: 'favorite',
  setting: 'setting',
  privacy: 'privacy',
  term: 'term',
  aboutApp: 'aboutApp',
  helpCenter: 'helpCenter',
  deletAccount: 'deletAccount',
  deletAccountOTP: 'deletAccountOTP',

  review: 'review',
  myReview: 'myReview',
  history: 'history',
  historyDetail: 'historyDetail',

  viewProfile: 'viewProfile',
  editProfile: 'editProfile',

  notification: 'notification',
  checkout: 'checkout',
  carDetail: 'carDetail',
  rentalTermsAndConditions: 'rentalTermsAndConditions',
  bookACar: 'bookACar',
  currency: 'currency',


  requestDetail: 'requestDetail',
  requestProfile: 'requestProfile',
  ReservedCarDetail: 'ReservedCarDetail',
  myVehicleDetail: 'myVehicleDetail',
  addVehicle: 'addVehicle',
  addVehicleAvailability: 'addVehicleAvailability',
  addAccessories: 'addAccessories',
  addVehicleTermsCondition: 'addVehicleTermsCondition',
  moreInfo:'moreInfo',
  insurance:'Insurance',
  uploadDocument:'uploadDocument'
};

export const wp = p => width * (p / 100);
export const hp = p => height * (p / 100);

export { WINDOW_HEIGHT, WINDOW_WIDTH, SCREEN_HEIGHT, SCREEN_WIDTH };

const widthBaseScale = SCREEN_WIDTH / 430;
const heightBaseScale = SCREEN_HEIGHT / 932;

function normalize(size, based = 'width') {
  const newSize =
    based === 'height' ? size * heightBaseScale : size * widthBaseScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}
const widthPixel = size => {
  return normalize(size, 'width');
};
const heightPixel = size => {
  return normalize(size, 'height');
};
const fontPixel = size => {
  return heightPixel(size);
};

export { widthPixel, heightPixel, fontPixel };
