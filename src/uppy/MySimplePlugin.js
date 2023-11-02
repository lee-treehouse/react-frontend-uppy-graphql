import BasePlugin from "@uppy/core/lib/BasePlugin.js";
// https://uppy.io/docs/guides/building-plugins/#upload-hooks

class MySimplePlugin extends BasePlugin {
  constructor(uppy, opts) {
    super(uppy, opts);
    this.id = opts.id || "MyPlugin";
    this.type = "example";
    this.prepareUpload = this.prepareUpload.bind(this); // ← this!
  }

  prepareUpload(fileIDs) {
    console.log(this); // `this` refers to the `MyPlugin` instance.
    return Promise.resolve();
  }

  install() {
    this.uppy.addPreProcessor(this.prepareUpload);
  }

  uninstall() {
    this.uppy.removePreProcessor(this.prepareUpload);
  }
}
