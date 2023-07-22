import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { buttons } from "../../../data/data";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import image1 from "../../../assets/images/back1.jpg";
import image2 from "../../../assets/images/back2.jpg";
import image3 from "../../../assets/images/back3.jpg";
import image4 from "../../../assets/images/back4.jpg";
import image5 from "../../../assets/images/back5.jpg";
import image6 from "../../../assets/images/back6.jpg";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showOpacityAnimation, setShowOpacityAnimation] = useState(false);
  const navigate = useNavigate();
  const initialValues = {
    input: "",
  };
  const validationSchema = yup.object({
    input: yup.string().required("Required"),
  });
  const onSubmit = async (payload, actions) => {
    navigate(`/gigs?search=${payload.input}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const { values, handleBlur, handleChange, handleSubmit, touched, errors } =
    useFormik({
      initialValues,
      validationSchema,
      onSubmit,
    });

  const changeImage = [image1, image2, image3, image4, image5, image6];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === changeImage.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Show opacity animation for 3 seconds when the image changes
    setShowOpacityAnimation(true);
    const opacityAnimationTimeoutId = setTimeout(() => {
      setShowOpacityAnimation(false);
    }, 1000);

    return () => clearTimeout(opacityAnimationTimeoutId);
  }, [currentImageIndex]);

  return (
    <section className="w-full bg-[#1a1b1d] h-screen lg:h-[100vh] text-white  pt-20 relative mb-8">
      <div className="contain flex flex-col items-center justify-center h-full relative z-10">
        <div className="flex flex-col items-center justify-start gap-5 w-full">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold leading-[120%]">
            Find the perfect service for <i className="font-light">you</i> <br /> 
          </h2>
          <div
            className={`flex flex-col lg:flex-row items-center w-full gap-5 lg:w-[850px] bg-white h-[50px] rounded-md focus:border focus:border-[#5C469C] relative mb-20 lg:mb-10`}
           >
            <div className="flex items-center justify-start gap-2 w-full h-full" >
              <span
                className={`text-active pl-3 ${
                  errors.input && touched.input
                    ? " placeholder:text-red-500"
                    : ""
                }`}
              >
                <FiSearch size={18} />
              </span>
              <input
                type="text"
                value={values.input}
                onChange={handleChange}
                onBlur={handleBlur}
                name="input"
                placeholder='Search...'
                className={`w-full h-full bg-transparent outline-none text-active ${
                  errors.input && touched.input
                    ? " placeholder:text-red-500"
                    : ""
                }`} 
              />
            </div>
            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-[#5C469C] h-full lg:w-[180px] outline-none absolute top-16 lg:relative lg:top-0 rounded-md lg:rounded-[0] lg:rounded-tr-md lg:rounded-br-md w-full"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <img
        src={changeImage[currentImageIndex]}
        alt="slide"
        className={`transition-opacity  duration-800 hidden lg:flex absolute top-0 h-full w-full ${
          showOpacityAnimation ? "opacity-95" : "opacity-100"
        }`}
      />
      ;
    </section>
  );
};

export default Hero;
