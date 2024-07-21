/** @type {import('next').NextConfig} */
import path from "path";

const nextConfig = {
    sassOptions: {
        includePaths: [path.join('./', 'styles')],
    },
};

export default nextConfig;
