// 웹팩바꾸기
/* 
    withBundleAnalyzer enabled:true, process.env.NODE_ENV === "production" 하기위해 package.json build에 추가
    => 하지만 윈도우에서는 작동하지 않음 => npm i cross-env
*/
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  compress: true, // gzip압축
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === "production";
    const plugins = [
      ...config.plugins,
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\ko$/), // moment 용량 넘 커서 ko만 쓰기
    ];

    return {
      ...config,
      mode: prod ? "production" : "development",
      devtool: prod ? "hidden-source-map" : "eval", // 배포할때 hidden-source-map안하면 배포할떄 코드다노출됨
      plugins,
    };
  },
});
