export function imageToBlob(imgElement: HTMLElement | null, format = "image/png", quality = 1.0) {
    return new Promise((resolve, reject) => {
      if (!(imgElement instanceof HTMLImageElement)) {
        reject(new Error("Provided element is not an image."));
        return;
      }
  
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
  
      // Set canvas size to match the image
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;
  
      // Draw the image onto the canvas
      ctx.drawImage(imgElement, 0, 0);
  
      // Convert the canvas to Blob
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Failed to convert image to Blob."));
          }
        },
        format,
        quality
      );
    });
  }
  