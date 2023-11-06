import React from "react";

import Uppy from "@uppy/core";
import Webcam from "@uppy/webcam";
import UppyImageDohicky from "./UppyImageDohicky";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";

// https://uppy.io/docs/react/

// Don't forget the CSS: core and the UI components + plugins you are using.
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";

// Don’t forget to keep the Uppy instance outside of your component.
const uppy = new Uppy()
const uppy = new Uppy({logger: debugLogger})
  .use(Webcam)
  .use(UppyImageDohicky)
  .use(Tus, { endpoint: "http://localhost:1080/" });

function UppyUpload() {
  return (
    <div className="App">
      <h1>Uppy Upload</h1>
      <Dashboard uppy={uppy} plugins={["Webcam", "UppyImageDohicky"]} />;
    </div>
  );
}

export default UppyUpload;
