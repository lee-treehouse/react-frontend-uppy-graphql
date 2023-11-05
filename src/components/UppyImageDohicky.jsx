import { UIPlugin } from "@uppy/core";
import Translator from "@uppy/utils/lib/Translator";
import Compressor from "compressorjs/dist/compressor.esm.js";
import { desaturate } from "../regularAsyncModule";

export function loadXHR(url) {
  return new Promise(function (resolve, reject) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.onerror = function () {
        reject("Network error.");
      };
      xhr.onload = function () {
        if (xhr.status === 200) {
          console.log("resolving");
          resolve(xhr.response);
        } else {
          reject("Loading error:" + xhr.statusText);
        }
      };
      xhr.send();
    } catch (err) {
      reject(err.message);
    }
  });
}

class UppyImageDohicky extends UIPlugin {
  constructor(uppy, opts) {
    const defaultOptions = {
      quality: 0.6,
    };
    super(uppy, { ...defaultOptions, ...opts });

    this.id = this.opts.id || "ImageCompressor";
    this.type = "modifier";

    this.defaultLocale = {
      strings: {
        compressingImages: "Compressing images...",
      },
    };

    // we use those internally in `this.compress`, so they
    // should not be overridden
    delete this.opts.success;
    delete this.opts.error;

    this.i18nInit();
  }

  compress(blob) {
    return new Promise((resolve, reject) =>
      // instead of compressing, return something a different blob
      {
        desaturate(blob);

        // loadXHR is a promise that resolves with a blob
        return loadXHR("/creditcard_redacted.png").then((blob) =>
          resolve(blob)
        );

        // eslint-disable-next-line no-unreachable
        return new Compressor(blob, {
          ...this.opts,
          success(result) {
            return resolve(result);
          },
          error(err) {
            return reject(err);
          },
        });
      }
    );
  }

  prepareUpload = (fileIDs) => {
    const promises = fileIDs.map((fileID) => {
      const file = this.uppy.getFile(fileID);
      this.uppy.emit("preprocess-progress", file, {
        mode: "indeterminate",
        message: this.i18n("compressingImages"),
      });

      if (!file.type.startsWith("image/")) {
        return;
      }

      return this.compress(file.data)
        .then((compressedBlob) => {
          console.log("compressed function has finished");
          console.log(
            `[Image Compressor] Image ${file.id} size before/after compression: ${file.data.size} / ${compressedBlob.size}`
          );
          this.uppy.log(
            `[Image Compressor] Image ${file.id} size before/after compression: ${file.data.size} / ${compressedBlob.size}`
          );
          this.uppy.setFileState(fileID, { data: compressedBlob });
        })
        .catch((err) => {
          this.uppy.log(
            `[Image Compressor] Failed to compress ${file.id}:`,
            "warning"
          );
          this.uppy.log(err, "warning");
        });
    });

    const emitPreprocessCompleteForAll = () => {
      fileIDs.forEach((fileID) => {
        const file = this.uppy.getFile(fileID);
        this.uppy.emit("preprocess-complete", file);
      });
    };

    // Why emit `preprocess-complete` for all files at once, instead of
    // above when each is processed?
    // Because it leads to StatusBar showing a weird “upload 6 files” button,
    // while waiting for all the files to complete pre-processing.
    return Promise.all(promises).then(emitPreprocessCompleteForAll);
  };

  install() {
    this.uppy.addPreProcessor(this.prepareUpload);
  }

  uninstall() {
    this.uppy.removePreProcessor(this.prepareUpload);
  }
}

export default UppyImageDohicky;