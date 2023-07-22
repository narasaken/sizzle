import React, { useEffect } from "react";
import Banner from "../../components/HomeComponents/Banner/Banner";
import Slides from "../../components/Slides/Slides";
import SingleCard from "../../components/HomeComponents/Services/SingleCard/SingleCard";
import Features from "../../components/HomeComponents/Features/Features";
import { cards, projectsCards } from "../../data/data";
import Marketplace from "../../components/HomeComponents/Marketplace/Marketplace";
import Projects from "../../components/HomeComponents/Projects/Projects";
import { useQuery } from "@tanstack/react-query";
import { Axios } from "../../config.js";
import requests from "../../libs/request";
import loader from "../../assets/icons/loader.svg";

const Homepage = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigs"],
    queryFn: () => Axios.get(requests.gigs).then((res) => res.data),
  });

  return (
    <main className="mb-4">
      <Banner />
      {isLoading ? (
        <div className="flex items-center justify-center w-full">
          <img src={loader} alt="/" className="w-[40px]" />
        </div>
      ) : error ? (
        <p className="text-xl md:text-2xl text-red-400 font-normal">
          Error : Something went wrong
        </p>
      ) : (
        <>
          {data?.length === 0 ? (
            <div className="flex items-center justify-center mt-5 flex-col w-full">
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/error-404-4344461-3613889.png"
                alt="/"
                className="w-[350px]"
              />
              <h2 className="text-2xl md:text-4xl text-active font-medium text-center">
                No Result
              </h2>
            </div>
          ) : (
            <Slides
              rowId="1"
              distance={500}
              text="Popular services"
            >
              {data.map((item) => (
                <SingleCard key={item._id} item={item} />
              ))}
            </Slides>
          )}
        </>
      )}
      <Features />
      <Marketplace />
      <hr />
      <br/>
      <Slides
        rowId="3"
        distance={500}
        text="Get inspired"
      >
        <br/>
        {projectsCards.map((item, i) => (
          <Projects item={item} key={i} />
        ))}
      </Slides>
      <br/>
    </main>
  );
};

export default Homepage;
