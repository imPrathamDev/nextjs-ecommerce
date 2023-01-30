import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/outline";
import ReviewModel from "../models/ReviewModel";
import StarCard from "../card/StarCard";
import moment from "moment";
import NotFound from "./NotFound";

function Reviews({ session, product, reviews }) {
  const [reviewOpen, setReviewOpen] = useState(false);
  return (
    <section>
      <div className="py-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-medium font-Cinzel sm:text-2xl">
            Customer Reviews
          </h2>
          <button
            onClick={() => setReviewOpen(true)}
            className="px-2 py-1 flex items-center text-gray-500 gap-1 rounded-sm hover:text-primary-white hover:bg-primary transition-all"
          >
            <PlusIcon className="w-4 h-4" />
            <h3 className="text-md font-medium font-Cinzel sm:text-base">
              Post Review
            </h3>
          </button>
        </div>
        <ReviewModel
          isOpen={reviewOpen}
          setIsOpen={setReviewOpen}
          session={session}
          product={product}
        />
        {reviews.length > 0 ? (
          <>
            <div className="flex items-center mt-4">
              <p className="text-3xl font-bold">
                {product?.rating.toFixed(1)}
                <span className="sr-only"> Average review score </span>
              </p>

              <div className="ml-4">
                <div className="flex -ml-1">
                  <StarCard rating={product?.rating} />
                </div>
                <p className="mt-0.5 text-xs text-gray-500">
                  Based on {product?.numReviews} reviews
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 mt-8 lg:grid-cols-2 gap-x-16 gap-y-12">
              {reviews.map((review) => (
                <blockquote key={review?._id}>
                  <header className="sm:items-center sm:flex">
                    <div className="flex -ml-1">
                      <StarCard rating={review?.rating} />
                    </div>

                    <p className="mt-2 font-bold sm:ml-4 sm:mt-0">
                      {review?.heading}
                    </p>
                  </header>

                  <p className="mt-2 text-gray-700">{review?.review}</p>

                  <footer className="mt-4">
                    <p className="text-xs text-gray-500">
                      {review?.user?.firstName} {review?.user?.lastName} -{" "}
                      {moment(review?.createdAt).fromNow()}
                    </p>
                  </footer>
                </blockquote>
              ))}
            </div>
          </>
        ) : (
          <NotFound message={"Zero Reviews Found ^_^"} />
        )}
      </div>
    </section>
  );
}

export default Reviews;
