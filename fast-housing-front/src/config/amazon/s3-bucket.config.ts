type s3ConfigType = {
    bucket: string;
    region: string;
    credentials: {
        accessKeyId: string;
        secretAccessKey: string;
    };
}

export const s3Config: s3ConfigType = {
    bucket: process.env.AWS_BUCKET_NAME || '',
    region: process.env.AWS_REGION || '',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    }
}