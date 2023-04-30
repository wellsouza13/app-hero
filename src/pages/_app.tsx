import Header from "@/components/Header";
import type { AppProps } from "next/app";
import { DashboardContainer } from "./Heroes/styles";
import 'react-toastify/dist/ReactToastify.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header currentTab={""} />
      <DashboardContainer>
        <Component {...pageProps} />
        <ToastContainer />
      </DashboardContainer>
    </>
  );
}
