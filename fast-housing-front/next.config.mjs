const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dfhousingbucket.s3.eu-west-3.amazonaws.com",
        port: "",
      },
      {
        // for github avatar
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
    ],
  },
  //reactStrictMode: false,
};

export default nextConfig;
