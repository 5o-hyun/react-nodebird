export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: { id: 1, nickname: "소현" },
      content: "첫번쨰 게시글로 하겠습니다 #해시 #안해",
      Images: [
        {
          src: "https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001958/rn_view_BN001958.jpg",
        },
        {
          src: "https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "hard",
          },
          content: "우와~ 개정판이 나왔군요!",
        },
        {
          User: {
            nickname: "노말라이저",
          },
          content: "정말 심심하지 아니할수가 없어요",
        },
        {
          User: {
            nickname: "eclipse",
          },
          content: "이클립스 넘 맛있쪙",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미데이터입니다",
  User: {
    id: 1,
    nickname: "소현",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
