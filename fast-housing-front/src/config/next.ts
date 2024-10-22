type NextConfig = {
    secret: string;
}

export const nextConfig: NextConfig = {
    secret: process.env.NEXT_SECRET || '',
}

