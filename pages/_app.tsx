import "../styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../redux/store";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

// export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps(store => async() => {
//   console.log(`.app.tsx serverSideProps`)
//   await store.dispatch(getProjects())
// })


export default wrapper.withRedux(App)