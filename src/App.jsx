import Loading from "./components/Loading";
import MainBanner from "./components/MainBanner";
import SectionTwo from "./components/SectionTwo";

import React, { Suspense } from "react";

const LazySectionTwo = React.lazy(() => import("./components/PopularFlavours"));

function App() {
  return (
    <div>
      <Loading />
      <MainBanner />
      <SectionTwo />
      <Suspense fallback={<p>loading..</p>}>
        <LazySectionTwo />
      </Suspense>
    </div>
  );
}

export default App;
