module.exports = {
  images: {
    formats: ["image/png", "image/jpeg", "image/jpg"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dfhousingbucket.s3.eu-west-3.amazonaws.com",
        port: "",
        pathname: "*",
      },
    ],
    domains: ["dfhousingbucket.s3.eu-west-3.amazonaws.com"],
  },  
};
