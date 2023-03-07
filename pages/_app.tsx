import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";
import { SessionProvider } from "next-auth/react";
function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

// export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps(store => async() => {
//   console.log(`.app.tsx serverSideProps`)
//   await store.dispatch(getProjects())
// })

export default wrapper.withRedux(App);
