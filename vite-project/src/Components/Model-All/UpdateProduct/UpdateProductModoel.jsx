import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";

const UpdateProductModel = ({ onClose, onSave, product }) => {
  //   console.log(product.userId);
  const initialValues = {
    title: product.title || "",
    price: product.price || "",
    desc: product.desc || "",
    size: product.size || [],
    stock: product.stock || "",
    productimage: product.imgPath || "",
    userId: product.userId || "",
  };
  // console.log(product.imgPath);

  const [images, setImages] = useState(product.imgPath || []);
  console.log("images", images);
  const [selectedFiles, setSelectedFiles] = useState(product.imgPath || []);
  console.log("selected files", selectedFiles);

  // console.log("upper", images);

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Title is required"),
    price: Yup.number()
      .positive("Price must be a positive number")
      .required("Price is required"),
    desc: Yup.string()
      .min(10, "Description is too short")
      .max(200, "Description is too long")
      .required("Description is required"),
    productimage: Yup.mixed()
      .required("Required")
      .test("fileCount", "At least 1 photo required", (value) => {
        return value && value.length > 0;
      })
      .test("fileCount", "Max 5 photos allowed", (value) => {
        return value && value.length <= 5;
      }),
    // size: Yup.array().test(
    //   "size-required",
    //   "Size is required",
    //   function (value) {
    //     const { category } = this.parent; // Access the parent fields
    //     if (["T-Shirt", "Jeans", "Shoes", "Jacket"].includes(product.category)) {
    //       return value && value.length > 0; // Ensure size is provided
    //     }
    //     return true; // If category is not clothing, size is not required
    //   }
    // ),
  });

  const onSubmit = async (values) => {
    // console.log("updated value",values);
    onSave(values);
  };

  return (
    <>
    <motion.div
      className="fixed overflow-x inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
      id="scrollbarId"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg overflow-scroll " style={{"height":"80vh"}}>
        <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-gray-700">Title</label>
                  <Field
                    type="text"
                    name="title"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 absolute text-xs"
                  />
                </div>

                <div>
                  <label className="block text-gray-700">Price</label>
                  <Field
                    type="number"
                    name="price"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 absolute text-xs"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Stock */}
                <div>
                  <label className="block text-gray-700">Stock</label>
                  <div className="flex gap-4">
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="stock"
                        value="Available"
                        className="form-radio text-blue-500"
                        checked={values.stock === "Available"}
                        onChange={() => {
                          setFieldValue("stock", "Available");
                          setFieldValue("size", []); // Clear size selection when available is selected
                        }}
                      />
                      <span className="ml-2 text-gray-700">Available</span>
                    </label>
                    <label className="flex items-center">
                      <Field
                        type="radio"
                        name="stock"
                        value="Unavailable"
                        className="form-radio text-blue-500"
                        checked={values.stock === "Unavailable"}
                        onChange={() => {
                          setFieldValue("stock", "Unavailable");
                          setFieldValue("size", []); // Clear size selection when unavailable is selected
                        }}
                      />
                      <span className="ml-2 text-gray-700">Unavailable</span>
                    </label>
                  </div>
                  <ErrorMessage
                    name="stock"
                    component="div"
                    className="text-red-500 mt-1 text-xs"
                  />
                </div>
                {/* Size */}
                {["T-Shirt", "Jeans", "Shoes", "Jacket"].includes(
                  product.category
                ) && (
                  <div>
                    <label className="block text-gray-700">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {product.category === "Shoes"
                        ? ["8", "9", "10"].map((sizeOption) => (
                            <label
                              key={sizeOption}
                              className="flex items-center space-x-2"
                            >
                              <Field
                                type="checkbox"
                                name="size"
                                value={sizeOption}
                                className="form-checkbox"
                                disabled={values.stock === "Unavailable"} // Disable checkbox if stock is unavailable
                              />
                              <span className="text-gray-700">
                                {sizeOption}
                              </span>
                            </label>
                          ))
                        : ["S", "M", "L", "XL"].map((sizeOption) => (
                            <label
                              key={sizeOption}
                              className="flex items-center space-x-2"
                            >
                              <Field
                                type="checkbox"
                                name="size"
                                value={sizeOption}
                                className="form-checkbox"
                                disabled={values.stock === "Unavailable"} // Disable checkbox if stock is unavailable
                              />
                              <span className="text-gray-700">
                                {sizeOption}
                              </span>
                            </label>
                          ))}
                    </div>
                    <ErrorMessage
                      name="size"
                      component="div"
                      className="text-red-500 absolute text-xs"
                    />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <Field
                  as="textarea"
                  name="desc"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
                <ErrorMessage
                  name="desc"
                  component="div"
                  className="text-red-500 absolute text-xs"
                />
              </div>

              {/* Product Image */}
              <div className="mb-5">
                <label className="block mb-2 text-gray-700 font-medium">
                  Product Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                  <div className="flex flex-wrap gap-4">
                    {images.map((value, index) => (
                      <div key={index} className="relative w-20 h-20">
                        <img
                          src={value}
                          alt={`Image ${index + 1}`}
                          className="w-full h-full object-cover rounded-lg shadow-md"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImages((prevImages) =>
                              prevImages.filter((_, i) => i !== index)
                            );
                            const updatedFiles = selectedFiles.filter(
                              (_, i) => i !== index
                            );
                            console.log(updatedFiles);
                            setSelectedFiles(updatedFiles);
                            setFieldValue("productimage", updatedFiles);
                          }}
                          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 shadow-lg hover:bg-red-700 transition"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    <label
                      htmlFor="add-more-photos"
                      name="productimage"
                      className="flex items-center justify-center w-20 h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200 transition"
                    >
                      <span className="text-gray-500">+</span>
                    </label>
                    <input
                      id="add-more-photos"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(event) => {
                        const filesArray = Array.from(
                          event.currentTarget.files
                        );
                        const imageUrls = filesArray.map((file) =>
                          URL.createObjectURL(file)
                        );
                        setImages((prevImages) => [
                          ...prevImages,
                          ...imageUrls,
                        ]);
                        setSelectedFiles((prevFiles) => [
                          ...prevFiles,
                          ...filesArray,
                        ]);
                        setFieldValue("productimage", [
                          ...selectedFiles,
                          ...filesArray,
                        ]);
                      }}
                      className="hidden"
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Add up to 5 images. (SVG, PNG, JPG, GIF)
                  </p>
                </div>
                <ErrorMessage
                  name="productimage"
                  component="div"
                  className="text-red-500 mt-1 text-xs"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose} // Close modal on Cancel
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
    </>
  );
};

export default UpdateProductModel;
