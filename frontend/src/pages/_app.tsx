import { AppProps } from 'next/app';
import 'src/styles/global.css';

export default function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
