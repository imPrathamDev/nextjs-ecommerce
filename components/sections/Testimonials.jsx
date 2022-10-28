import React from "react";

const allTestimonials = [
  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime minima dicta amet, molestiae aliquam incidunt suscipit recusandae labore ratione doloremque, architecto et illo minus quo tenetur ducimus, voluptatibus repellendus fuga aperiam vel ab! Ipsam corrupti blanditiis dolorum! Officia assumenda rem nam, eveniet enim ad inventore laudantium est illum voluptatem quis.",
    img: "https://www.hyperui.dev/photos/man-5.jpeg",
    name: "Jeff Wezos",
    position: "CEO of Shipping Company",
  },
  {
    message:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore vel quo deserunt quos expedita minima incidunt sed tempora, a architecto consectetur reprehenderit, in repellat voluptatum.",
    img: "https://www.hyperui.dev/photos/man-5.jpeg",
    name: "Jeff Wezos",
    position: "CEO of Shipping Company",
  },
  {
    message:
      " Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio beatae incidunt perferendis soluta facilis voluptas dicta repudiandae quasi asperiores libero, exercitationem molestiae autem sapiente dolore nulla non consequatur. Eaque, dolores.",
    img: "https://www.hyperui.dev/photos/man-5.jpeg",
    name: "Jeff Wezos",
    position: "CEO of Shipping Company",
  },
  {
    message:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus doloribus eius aut unde, dolores accusantium!",
    img: "https://www.hyperui.dev/photos/man-5.jpeg",
    name: "Jeff Wezos",
    position: "CEO of Shipping Company",
  },
  {
    message:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi a voluptatum quidem nulla quisquam natus velit provident earum esse, odio numquam labore recusandae similique sunt.",
    img: "https://www.hyperui.dev/photos/man-5.jpeg",
    name: "Jeff Wezos",
    position: "CEO of Shipping Company",
  },
  {
    message:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius ut necessitatibus, repudiandae qui dolor minima.",
    img: "https://www.hyperui.dev/photos/man-5.jpeg",
    name: "Jeff Wezos",
    position: "CEO of Shipping Company",
  },
];

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
          {allTestimonials.map((testimonial) => (
            <div className="mb-8 sm:break-inside-avoid">
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
