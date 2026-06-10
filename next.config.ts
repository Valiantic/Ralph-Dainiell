const nextConfig = {
  // ... your existing settings ...
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;