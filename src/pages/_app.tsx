import { type AppType } from "next/app";
import { Toaster } from "react-hot-toast";
import { api } from "~/utils/api";

import "~/styles/globals.css";
import {ClerkProvider} from "@clerk/nextjs";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
      <>
          <div><Toaster/></div>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
      </>
  );
};

export default api.withTRPC(MyApp);
