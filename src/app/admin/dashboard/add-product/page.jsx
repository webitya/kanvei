"use client" 




 import React, { useState } from 'react';



const MAX_IMAGES = 7;

const ATTRIBUTE_OPTIONS = {
  cloth: [ "Model" , 'type'],
  jewellery: ["Type", "Color"],
  appliances: [], // dynamic based on type
};

const VARIANT_FIELDS = ["Size", "Price", "MRP Price", "In Stock" , "color"];

const ELECTRONIC_TYPES = {
  earphone: ["Connectivity", "Brand", "Battery"],
  refrigerator: ["Capacity", "Door Type", "Energy Rating"],
};

const CategoryForm = () => {

  
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [type, setType] = useState('');
  const [attributes, setAttributes] = useState({});
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    longDescription: '',
    brand: '',
    weight: '',
    height: '',
    width: '',
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files).slice(0, MAX_IMAGES);
    setImages(files);
  };

  const handleAttributeChange = (name, value) => {
    setAttributes({ ...attributes, [name]: value });
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = {
      ...updatedVariants[index],
      [field]: value,
    };
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([...variants, {}]);
  };

  const renderAttributes = () => {
    const keys =
      category === 'appliances' && type ? ELECTRONIC_TYPES[type] || [] : ATTRIBUTE_OPTIONS[category] || [];
    return keys.map((key) => (
      <input
        key={key}
        type="text"
        placeholder={key}
        className="border p-2 w-full mb-2"
        onChange={(e) => handleAttributeChange(key, e.target.value)}
      />
    ));
  };

  return (
    <div className="w-[100%]  mt-17 
     p-6 max-w-3xl mx-auto  rounded-xl shadow-md space-y-6 overflow-scroll">
      <h2 className="text-2xl font-bold decoration-1 w-max rounded-2xl  bg-gray-100 shadow-md p-2 text-purple-700">{"Add Product".toUpperCase()}</h2>

      <input
        type="text"
        placeholder="Title"
        className=" p-2 w-full rounded-md hover:border-0 border-purple-700 hover:outline-2  border-2"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        className=" p-2 w-full rounded-md hover:border-0  border-purple-700 hover:outline-2  border-2"
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
      />
      <textarea
        placeholder="Long Description (max 200 letters)"
        maxLength={200}
        className=" p-2 w-full rounded-md hover:border-0 border-purple-700 hover:outline-2  border-2"
        value={formData.longDescription}
        onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
      />
      <input
        type="text"
        placeholder="Brand"
        className=" p-2 w-full rounded-md hover:border-0 border-purple-700 hover:outline-2  border-2"
        value={formData.brand}
        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
      />

      {/* Dimensions */}
      <div className="grid grid-cols-3 gap-4">
        {['weight', 'height', 'width'].map((dim) => (
          <input
            key={dim}
            type="number"
            placeholder={dim.charAt(0).toUpperCase() + dim.slice(1)}
            className="border p-2 w-full"
            value={formData[dim]}
            onChange={(e) => setFormData({ ...formData, [dim]: e.target.value > -1 ? e.target.value : 0 })}
          />
        ))}
      </div>

      <select
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
          setType('');
          setAttributes({});
        }}
        className="border p-2 w-full"
      >
        <option value="">-- Select Category --</option>
        <option value="cloth">Cloth</option>
        <option value="jewellery">Jewellery</option>
        <option value="appliances">Electronics</option>
      </select>

      {/* Subcategory input */}
      <input
        type="text"
        placeholder="Subcategory"
        className="border p-2 w-full"
        value={subCategory}
        onChange={(e) => setSubCategory(e.target.value)}
      />

      {/* Type for electronics */}
      {category === 'appliances' && (
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value);
            setAttributes({});
          }}
          className="border p-2 w-full"
        >
          <option value="">-- Select Type --</option>
          {Object.keys(ELECTRONIC_TYPES).map((t) => (
            <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
          ))}
        </select>
      )}

      {/* Attributes */}
      <div>
        <h3 className="font-semibold">Attributes</h3>
        {renderAttributes()}
      </div>

      {/* Variants */}
      <div>
        <h3 className="font-semibold mb-2">Variants</h3>
        {variants.map((variant, index) => (
          <div key={index} className="grid grid-cols-5 gap-2 mb-2">
            {VARIANT_FIELDS.map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                className="border p-2"
                onChange={(e) => handleVariantChange(index, field, e.target.value)}
              />
            ))}
          </div>
        ))}
        <button onClick={addVariant} className="px-4 py-2 bg-blue-500 text-white rounded">
          + Add Variant
        </button>
      </div>

      {/* Image Upload */}
      <div>
        <h3 className="font-semibold mb-2">Upload Images (max 7)</h3>
        <input
          type="file"
          className='border w-full'
          accept="image/*"
          multiple
          onChange={handleImageUpload}
        />
        <div className="grid grid-cols-4 gap-2 mt-2 ">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={URL.createObjectURL(img)}
              alt={`preview-${idx}`}
              className="w-24 h-24 object-cover border"
            />
          ))}
        </div>
      </div> 
       
        <button  className='px-4 py-2 bg-blue-500 text-white rounded w-full'>Upload Product</button>
    </div>
  );
};

export default CategoryForm;
