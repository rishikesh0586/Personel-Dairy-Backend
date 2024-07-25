// const cloudinary = require("cloudinary");

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const uploadProductImages = async (images:any) => {
//   if (!images || images.length === 0) {
//     return [];
//   }

//   const imagesLinks = [];
//   for (const image of images) {
//     try {
//       const result = await cloudinary.v2.uploader.upload(image, { folder: "products" });
//       imagesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     } catch (error) {
//       console.error("Error uploading image to Cloudinary:", error);
//       // Consider throwing a custom error or logging details for further handling
//     }
//   }

//   return imagesLinks;
// };

// const deleteProductImages = async (imagePublicIds:any) => {
//   if (!imagePublicIds || imagePublicIds.length === 0) {
//     return;
//   }

//   for (const publicId of imagePublicIds) {
//     try {
//       await cloudinary.v2.uploader.destroy(publicId);
//     } catch (error) {
//       console.error("Error deleting image from Cloudinary:", error);
//       // Consider logging details for further handling
//     }
//   }
// };

// module.exports = { uploadProductImages, deleteProductImages };

import cloudinary from "cloudinary";

const uploadImages = async (images:any) => {
  let imagesArray = [];

  if (typeof images === "string") {
    imagesArray.push(images);
  } else {
    imagesArray = images;
  }
  

  const imagesLinks = [];
  for (let i = 0; i < imagesArray.length; i++) {
    const result = await cloudinary.v2.uploader.upload(imagesArray[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  return imagesLinks;
};

const deleteImages = async (images:any) => {
  for (let i = 0; i < images.length; i++) {
    await cloudinary.v2.uploader.destroy(images[i].public_id);
  }
};

module.exports = { uploadImages, deleteImages };
