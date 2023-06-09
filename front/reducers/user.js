export const initialState = {
  loginLoading: false, // 로그인 시도중
  loginDone: false,
  loginError: null,
  logoutLoading: false, // 로그아웃 시도중
  logoutDone: null,
  logoutError: false,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: null,
  signUpError: false,
  me: null,
  signUpData: {},
  loginData: {},
};

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const Follow_REQUEST = "Follow_REQUEST";
export const Follow_SUCCESS = "Follow_SUCCESS";
export const Follow_FAILURE = "Follow_FAILURE";

export const UNFollow_REQUEST = "UNFollow_REQUEST";
export const UNFollow_SUCCESS = "UNFollow_SUCCESS";
export const UNFollow_FAILURE = "UNFollow_FAILURE";

const dummyUser = (data) => ({
  ...data,
  nickname: "sohyun",
  id: 1,
  Posts: [],
  Followings: [],
  Followers: [],
});

export const loginRequestAction = (data) => ({
  type: LOG_IN_REQUEST,
  data,
});

export const logoutRequestAction = () => ({
  type: LOG_OUT_REQUEST,
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN_REQUEST: // 로딩시 에러는 없애는게 국룰
      return {
        ...state,
        loginLoading: true,
        loginDone: false,
        loginError: null,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginDone: true,
        me: dummyUser(action.data),
      };
    case LOG_IN_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginDone: action.error,
      };
    case LOG_OUT_REQUEST:
      return {
        ...state,
        logoutLoading: true,
        logoutDone: false,
        logoutError: null,
        me: null,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        logoutLoading: false,
        logoutDone: true,
        me: null,
      };
    case LOG_OUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
        logoutError: action.error,
      };
    case SIGN_UP_REQUEST:
      return {
        ...state,
        signUpLoading: true,
        signUpDone: false,
        signUpError: null,
      };
    case SIGN_UP_SUCCESS:
      return {
        ...state,
        signUpLoading: false,
        signUpDone: true,
        me: null,
      };
    case SIGN_UP_FAILURE:
      return {
        ...state,
        signUpLoading: false,
        signUpError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
