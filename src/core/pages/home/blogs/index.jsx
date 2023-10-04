import React from "react";

const Blogs = () => {
  return (
    <section class="w-screen py-[2rem] md:py-[5rem]">
      <div>
        <h3 className="text-3xl font-bold text-center text-fuchsia-900">
          Explore Our Blog
        </h3>
      </div>
      <div class="mx-auto grid max-w-screen-lg grid-cols-1 gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:gap-10">
        <article class="group h-full overflow-hidden rounded-lg border-2 border-gray-200 border-opacity-60 shadow-lg">
          <img
            class="w-full transform object-cover object-center transition duration-500 ease-in-out group-hover:scale-105 md:h-36 lg:h-48"
            src="https://images.unsplash.com/photo-1611002214172-792c1f90b59a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="blog"
          />
          <h2 class="title-font inline-block cursor-pointer px-6 pt-4 pb-1 text-xs font-semibold uppercase tracking-widest text-orange-600 hover:font-bold">
            Cities
          </h2>
          <div class="py-1 px-6">
            <h1 class="title-font mb-3 inline-block cursor-pointer text-xl capitali font-extrabold tracking-wide text-gray-800">
              How to get around in New York
            </h1>
            <p class="line-clamp-6 mb-3 cursor-pointer overflow-hidden leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil,
              maxime. Accusamus qui incidunt est rem at corrupti, earum fugiat
              iure.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Blogs;
