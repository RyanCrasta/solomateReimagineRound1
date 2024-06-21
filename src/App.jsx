import "./App.css";
import Loading from "./components/Loading";
import MainBanner from "./components/MainBanner";
import PopularFlavours from "./components/PopularFlavours";
import SectionTwo from "./components/SectionTwo";

import React, { Suspense } from "react";

const LazySectionTwo = React.lazy(() => import("./components/PopularFlavours"));

function App() {
  return (
    <div>
      {/* <div id="fukat"></div> */}
      <Loading />
      <MainBanner />
      <SectionTwo />
      {/* <div id="fukat"></div> */}
      {/* <Suspense fallback={<p>loading..</p>}> */}
      <PopularFlavours />
      {/* </Suspense> */}
    </div>
  );
}

export default App;
