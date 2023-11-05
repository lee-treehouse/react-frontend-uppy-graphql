import React from "react";
import FileUpload from "./components/FileUpload";
import UppyUpload from "./components/UppyUpload";

function App() {
  const showFileUpload = true;
  return (
    <>
      {showFileUpload && <FileUpload />}

      <UppyUpload />
    </>
  );
}

export default App;
