import axios from "axios";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { useSelector } from "react-redux";
import { END } from "redux-saga";
import Layout from "../../components/Layout";
import PostCard from "../../components/PostCard";
import { LOAD_POST_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";
import Head from "next/head";

const Post = () => {
  const router = useRouter();
  const { id } = router.query;
  const { singlePost } = useSelector((state) => state.post);

  // if (router.isFallback) {
  //   return <div>Loading...</div>
  // }

  return (
    <Layout>
      <Head>
        <title>
          {singlePost.User.nickname}
          님의 글
        </title>
        <meta name="description" content={singlePost.content} />
        <meta
          property="og:title"
          content={`${singlePost.User.nickname}님의 게시글`}
        />
        <meta property="og:description" content={singlePost.content} />
        <meta
          property="og:image"
          content={
            singlePost.Images[0]
              ? singlePost.Images[0].src
              : "https://nodebird.com/favicon.ico"
          }
        />
        <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
      </Head>
      <PostCard post={singlePost} />
    </Layout>
  );
};

// getStaticProps: html로 미리 만들어도되는것들(갯수 제한이 있는것들)에 사용. getStaticProps를 사용하려면 getStaticPaths를 꼭 사용해야한다.
// 사용하기가 까다롭다. 대신 HTML을 만드는것이므로 속도는 getServerSideProps보다 훨씬 빠르다.

// export async function getStaticPaths() {
//   return {
//     path: [
//       { params: { id: "1" } },
//       { params: { id: "2" } },
//       { params: { id: "3" } },
//     ],
//     fallback: true,
//   };
// }

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, params }) => {
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      // 서버사이드렌더링 할거
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_POST_REQUEST,
        data: params.id,
      });
      store.dispatch(END); // dispatch를 통해 받아올 데이터를 성공될때까지 기다려준다
      await store.sagaTask.toPromise(); // 이건..사용방법
      return { props: {} };
    }
);

export default Post;
