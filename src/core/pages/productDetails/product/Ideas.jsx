import React from "react";


export default function Ideas({ product }) {

  return (
    <div className="h-full flex flex-col justify-between">
      <h1 className="text-2xl md:text-4xl text-bold text-center mb-5 mt-[5rem]">
        Explore Ideas
      </h1>
      <p className="text-center text-lg">
        Need a jumping-off point for your next project but don't know where to
        start? These sample ideas might just be what you need.
      </p>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 gap-5 mt-5">
        {product.ideas.map((item, index) => (
          <div style={{border: "1px solid #d6d3d1"}} key={index} className="bg-white">
           <div>
            <img src={item.photo} alt="idea" className="w-full aspect-auto"/>
           </div>
           <div className="text-center p-3"> {item.title} </div>
          </div>
        ))}
      </div>
    </div>
  );
}
