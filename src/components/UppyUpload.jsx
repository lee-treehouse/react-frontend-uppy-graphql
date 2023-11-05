import React from "react";

import Uppy from "@uppy/core";
import Webcam from "@uppy/webcam";
import { Dashboard } from "@uppy/react";

// https://uppy.io/docs/react/

// Don't forget the CSS: core and the UI components + plugins you are using.
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/webcam/dist/style.min.css";

// Don’t forget to keep the Uppy instance outside of your component.
const uppy = new Uppy().use(Webcam);

function UppyUpload() {
  return (
    <div className="App">
      <h1>Uppy Upload</h1>
      <Dashboard uppy={uppy} plugins={["Webcam"]} />;
    </div>
  );
}

export default UppyUpload;
