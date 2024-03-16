import React, { useEffect, useState } from "react";
import ContactUsImg from "../assets/images/upload.jpeg";
import Flag from "../assets/images/flag.png";
import { FaHandHoldingHeart } from "react-icons/fa";
import QRCode from "qrcode.react";
import axios from "axios";

const UploadPrescription = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const qrData = "https://web.whatsapp.com/";
  const cities = ["Mumbai", "Pune", "Noida", "Kolkata", "Delhi"];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    medicine_name: "",
    prescription: null,
    definition: "",
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setFormData({
      ...formData,
      [name]: name === "prescription" ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const sendFormData = new FormData();
    for (const key in formData) {
      sendFormData.append(key, formData[key]);
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/submit-form/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Data submitted successfully:", response.data);
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        address: "",
        medicine_name: "",
        prescription: null,
        definition: "",
      });
      window.location.reload();
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="bg-cover aspect-auto p-3 lg:p-5">
      <div className="flex flex-col lg:flex-row h-auto p-3 lg:p-5">
        <div className="w-full lg:w-6/12 bg-cover aspect-auto lg:px-5">
          <h1 className="text-xl lg:text-2xl font-bold mb-2 lg:mb-4 text-[#3470a1] mt-1">
            UPLOAD THE PRESCRIPTION
          </h1>
          <img
            className="w-full h-auto"
            src={ContactUsImg}
            alt="Contact us"
          />
          <ul className="mt-3 lg:mt-6">
            <li className="flex items-center mt-2 lg:mt-4">
              <FaHandHoldingHeart className="inline-block mr-1 lg:mr-2" color="#6CB250" />
              Cheap Real Medicine Available Online.
            </li>
            <li className="flex items-center mt-2 lg:mt-4">
              <FaHandHoldingHeart className="inline-block mr-1 lg:mr-2" color="#6CB250" />
              Upload a valid prescription for our experts to look over.
            </li>
            <li className="flex items-center mt-2 lg:mt-4">
              <FaHandHoldingHeart className="inline-block mr-1 lg:mr-2" color="#6CB250" />
              Save up to 20% on prescription drugs.
            </li>
            <li className="flex items-center mt-2 lg:mt-4">
              <FaHandHoldingHeart className="inline-block mr-1 lg:mr-2" color="#6CB250" />
              Obtain a home delivery of your medications.
            </li>
            <li className="flex items-center mt-2 lg:mt-4">
              <FaHandHoldingHeart className="inline-block mr-1 lg:mr-2" color="#6CB250" />
              Do you have any inquiries? Consult our specialists at no cost.
            </li>
            <li className="flex items-center mt-2 lg:mt-4">
              <FaHandHoldingHeart className="inline-block mr-1 lg:mr-2" color="#6CB250" />
              Mediplus Pharmacy will help you stay healthy.
            </li>
          </ul>
          <div className="mt-3 lg:mt-5">
            <QRCode value={qrData} size={267} />
          </div>
        </div>

        <div className="w-full lg:w-6/12 mt-5 lg:mt-0">
          <form id="contactForm" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-bold text-gray-500"
              >
                Patient Name<span className="text-red-500">*</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.name}
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500"
                type="text"
                id="name"
                name="name"
                placeholder="Patient Name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mt-3 text-sm font-bold text-gray-500"
              >
                Email Address<span className="text-red-500">*</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.email}
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500"
                type="email"
                id="email"
                name="email"
                placeholder="test@gmail.com"
                required
              />
            </div>

            <div className="relative">
              <label
                htmlFor="tel"
                className="block mt-3 text-sm font-bold text-gray-500"
              >
                Phone<span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  onChange={handleChange}
                  value={formData.phone}
                  className="bg-gray-20 border border-gray-300 text-gray-900 text-sm focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500"
                  type="tel"
                  id="tel"
                  name="phone"
                  placeholder="+91"
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <img src={Flag} alt="Indian Flag" className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="city"
                className="block mt-3 text-sm font-bold text-gray-500"
              >
                Select City
              </label>
              <select
                id="city"
                name="city"
                onChange={handleChange}
                value={formData.city}
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500"
              >
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block mt-3 text-sm font-bold text-gray-500"
              >
                Complete Address<span className="text-red-500">*</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.address}
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500"
                type="text"
                id="address"
                name="address"
                placeholder="Address"
                required
              />
            </div>

            <div>
              <label
                htmlFor="medicine_name"
                className="block mt-3 text-sm font-bold text-gray-500"
              >
                Medicine/Product Name<span className="text-red-500">*</span>
              </label>
              <input
                onChange={handleChange}
                value={formData.medicine_name}
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500"
                type="text"
                id="medicine_name"
                name="medicine_name"
                placeholder="Medicine/Product Name"
                required
              />
            </div>

            <div>
              <label
                htmlFor="prescription"
                className="block mt-3 text-sm font-bold text-gray-500"
              >
                Upload Prescription (Format-.png/.jpeg/.jpg/.pdf)
                <span className="text-red-500">*</span>
              </label>
              <input
                onChange={handleChange}
                className="w-full p-2 file:bg-teal-500 hover:file:bg-teal-700 file:text-white file:font-bold file:border-none file:py-2 px-4 file:rounded file:mr-5"
                type="file"
                id="prescription"
                name="prescription"
                required
              />
            </div>

            <div>
              <label
                htmlFor="definition"
                className="block mt-3 text-sm font-bold text-gray-500"
              >
                Define about medicines (QTY, etc.)
                <span className="text-red-500">*</span>
              </label>
              <textarea
                onChange={handleChange}
                value={formData.definition}
                className="bg-gray-20 border border-gray-300 text-gray-900 text-sm focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500"
                id="definition"
                name="definition"
              />
            </div>

            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded mt-3"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <h6 className="font-bold mt-2 lg:mt-4 text-[#a10303] text-center">
        Note: For Any Urgent Requirements Please Call Us : +91 9319595621
      </h6>
    </div>
  );
};

export default UploadPrescription;
