import React from "react";
import { allTestimonials } from "../../static/staticData";

function Testimonials() {
  return (
    <section>
      <div className="max-w-screen-xl px-12 py-16 mx-auto sm:px-6">
        <div className="text-center mb-8">
          <h2 className="text-5xl font-BrownSugar font-normal text-primary">
            Testimonials
          </h2>
          <p>Explore some product types which provide.</p>
        </div>
        <div className="sm:gap-6 lg:gap-8 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {allTestimonials.map((testimonial, index) => (
            <div key={index} className="mb-8 sm:break-inside-avoid">
              <blockquote className="p-6 shadow bg-white rounded-xl">
                <p className="leading-relaxed text-gray-700">
                  {testimonial?.message}
                </p>
              </blockquote>

              <div className="flex items-center gap-4 mt-4">
                <img
                  src={testimonial?.img}
                  className="object-cover w-12 h-12 rounded-full"
                  alt="Man"
                />

                <div className="text-sm">
                  <p className="font-medium font-Cinzel">{testimonial?.name}</p>
                  <p className="mt-1">{testimonial?.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
