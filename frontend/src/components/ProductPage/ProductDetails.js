import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const initialReviews = [
  {
    name: "Clive Monkhouse",
    date: "04/04/2023",
    rating: 5,
    verified: true,
    title: "Very Cool!",
    comment:
      "Had this product a while now, and I have to say it's stunning to use. The quality is probably the best in class, and the build is everything you come to expect from this top brand!",
  },
  {
    name: "Lucy Adams",
    date: "04/04/2023",
    rating: 4,
    verified: true,
    title: "Stunning!",
    comment:
      "Stunning in every way! Simply one of the best products around, for the price point. Packed full of features, with a spec to rival any high-end model, take my word for it, this is one to carefully consider when making a new purchase!",
  },
];

const ProductDetails = () => {
  const [activeTab, setActiveTab] = useState("specs");
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);

  // Review Form States
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-GB'); // Formats date as DD/MM/YYYY
    
    const newReview = {
      name,
      date: currentDate,
      rating,
      verified: false, // New reviews are not verified by default
      title,
      comment,
    };

    // Add the new review to the reviews array
    setReviews([newReview, ...reviews]);

    // Reset form
    setRating(0);
    setTitle("");
    setComment("");
    setName("");
    setEmail("");
    setImage(null);
    setShowReviewForm(false);
  };

  // Calculate average rating
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 mt-6 max-w-4xl mx-auto">
      {/* Product Description */}
      <p className="text-gray-600 font-dm-sans text-sm leading-relaxed">
        Capture action-packed moments with ease. With a large 14.2-megapixel sensor and ISO 200-12800, you get beautiful photos and movies, even when you are in low light.
      </p>

      {/* Feature Highlights */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-gray-300 pt-6 text-sm">
        <div className="space-y-2">
          <h3 className="font-bold text-lg">14.2mp</h3>
          <p>Captures richly detailed photos and Full HD movies</p>
        </div>
        <div className="sm:border-l border-gray-300 sm:pl-6 space-y-2">
          <h3 className="font-bold text-lg">60fps</h3>
          <p>Effortlessly shoot super-detailed HD movies</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <div className="relative flex items-start space-x-6 border-b border-gray-300 pb-1">
          <button
            className={`text-sm font-semibold pb-2 ${activeTab === "specs" ? "text-black border-b-2 border-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("specs")}
          >
            Specifications
          </button>
          <button
            className={`text-sm font-semibold pb-2 ${activeTab === "reviews" ? "text-black border-b-2 border-black" : "text-gray-500"}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="relative overflow-hidden w-full mt-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              className="w-full"
              initial={{ x: activeTab === "specs" ? "-100%" : "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: activeTab === "specs" ? "100%" : "-100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              {/* SPECS TAB */}
              {activeTab === "specs" && (
                <div className="w-full p-4">
                  <table className="w-full mt-2 text-sm text-gray-700">
                    <tbody>
                      <tr className="border-b border-gray-300">
                        <td className="py-3 pl-2 text-left font-medium">Total pixels</td>
                        <td className="py-3 pr-2 text-right">14.6 million</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="py-3 pl-2 text-left font-medium">Image sensor</td>
                        <td className="py-3 pr-2 text-right">CX, CMOS, 13.1 mm × 8.8 mm</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="py-3 pl-2 text-left font-medium">Lens mount</td>
                        <td className="py-3 pr-2 text-right">Nikon 1 mount</td>
                      </tr>
                      <tr className="border-b border-gray-300">
                        <td className="py-3 pl-2 text-left font-medium">Battery</td>
                        <td className="py-3 pr-2 text-right">Rechargeable Li-Ion EL-EL22</td>
                      </tr>
                      <tr>
                        <td className="py-3 pl-2 text-left font-medium">Weight</td>
                        <td className="py-3 pr-2 text-right">230 g</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* REVIEWS TAB */}
              {activeTab === "reviews" && (
                <div className="w-full p-4">
                  <div className="border-b pb-4 text-center">
                    <h3 className="font-semibold text-lg mt-3">Customer Reviews</h3>
                    <div className="flex justify-center items-center mt-3 text-yellow-500">
                      {[...Array(5)].map((_, i) => {
                        const starValue = i + 1;
                        if (averageRating >= starValue) {
                          return <FaStar key={i} />;
                        } else if (averageRating >= starValue - 0.5) {
                          return <FaStarHalfAlt key={i} />;
                        } else {
                          return <FaRegStar key={i} />;
                        }
                      })}
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{averageRating.toFixed(2)} out of 5</p>
                    <p className="text-gray-500 text-sm">Based on {reviews.length} reviews</p>

                    {/* Write Review Button */}
                    <button
                      onClick={() => setShowReviewForm(!showReviewForm)}
                      className="bg-orange-500 text-white font-semibold mt-4 px-4 py-1 hover:bg-orange-400"
                    >
                      Write a review
                    </button>
                  </div>

                  {/* Inline Review Form */}
                  {showReviewForm && (
                    <form onSubmit={handleReviewSubmit} className="mt-6 space-y-4 border p-4 rounded-md shadow-sm bg-gray-50">
                      {/* Rating */}
                      <div>
                        <label className="block font-medium">Rating</label>
                        <div className="flex text-yellow-500 space-x-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                              key={star}
                              className={`cursor-pointer ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                              onClick={() => setRating(star)}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block font-medium">Review Title</label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Give your review a title"
                          className="w-full border px-3 py-2 rounded"
                          required
                        />
                      </div>

                      <div>
                        <label className="block font-medium">Review</label>
                        <textarea
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Write yours comments here"
                          className="w-full border px-3 py-2 rounded"
                          rows={4}
                          required
                        />
                      </div>

                      <div>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                      </div>

                      <div>
                        <label className="block font-medium">Name</label>
                        <input
                          type="text"
                          value={name}
                          placeholder="Enter your name (public)"
                          onChange={(e) => setName(e.target.value)}
                          className="w-full border px-3 py-2 rounded"
                          required
                        />
                      </div>
                      <div>
                        <label className="block font-medium">Email</label>
                        <input
                          type="email"
                          value={email}
                          placeholder="Enter your email (private)"
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border px-3 py-2 rounded"
                          required
                        />
                      </div>

                      <div className="flex justify-end space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={() => setShowReviewForm(false)}
                          className="px-4 py-2 border rounded"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-4 py-2 bg-orange-500 text-white rounded"
                        >
                          Submit Review
                        </button>
                      </div>
                    </form>
                  )}

                  {/* Review List */}
                  <div className="w-full mt-6">
                    {reviews.map((review, index) => (
                      <div key={index} className="border-b text-gray-800 py-4">
                        <div className="flex items-center flex-wrap gap-y-2">
                          <span className="font-semibold">{review.name}</span>
                          {review.verified && (
                            <span className="ml-2 text-xs bg-orange-500 text-white px-2 py-0.5 rounded">
                              Verified
                            </span>
                          )}
                          <span className="ml-auto text-gray-500 text-sm">{review.date}</span>
                        </div>
                        <div className="flex items-center text-yellow-500 mt-1">
                          {[...Array(5)].map((_, i) =>
                            i < review.rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                          )}
                        </div>
                        <h4 className="font-semibold text-left mt-4">{review.title}</h4>
                        <p className="text-gray-600 text-left">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;