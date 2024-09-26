// import React, { useEffect, useState } from "react";
// import ReactStars from "react-rating-stars-component";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/pagination";
// import { FreeMode, Pagination, Autoplay } from "swiper/modules";
// import { FaStar } from "react-icons/fa";
// import { apiConnector } from "../../../services/apiconnector";
// import { ratingsEndpoints } from "../../../services/apis";

// function ReviewSlider() {
//   const [reviews, setReviews] = useState([]);
//   const truncateWords = 15;

//   useEffect(() => {
//     (async () => {
//       const { data } = await apiConnector(
//         "GET",
//         ratingsEndpoints.REVIEWS_DETAILS_API
//       );
//       if (data?.success) {
//         setReviews(data?.data);
//       }
//     })();
//   }, []);

//   // Determine if loop mode should be enabled
//   const shouldLoop = reviews.length > 4; // Only enable loop if there are more than 4 reviews

//   return (
//     <div className="text-white">
//       <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent">
//         <Swiper
//           slidesPerView={4}
//           spaceBetween={25}
//           loop={shouldLoop} // Conditional loop based on reviews length
//           freeMode={true}
//           autoplay={{
//             delay: 2500,
//             disableOnInteraction: false,
//           }}
//           modules={[FreeMode, Pagination, Autoplay]}
//           className="w-full"
//         >
//           {reviews.map((review, i) => (
//             <SwiperSlide key={i}>
//               <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
//                 <div className="flex items-center gap-4">
//                   <img
//                     src={
//                       review?.user?.image
//                         ? review?.user?.image
//                         : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
//                     }
//                     alt=""
//                     className="h-9 w-9 rounded-full object-cover"
//                   />
//                   <div className="flex flex-col">
//                     <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
//                     <h2 className="text-[12px] font-medium text-richblack-500">
//                       {review?.course?.courseName}
//                     </h2>
//                   </div>
//                 </div>
//                 <p className="font-medium text-richblack-25">
//                   {review?.review.split(" ").length > truncateWords
//                     ? `${review?.review
//                         .split(" ")
//                         .slice(0, truncateWords)
//                         .join(" ")} ...`
//                     : review?.review}
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <h3 className="font-semibold text-yellow-100">
//                     {review.rating.toFixed(1)}
//                   </h3>
//                   <ReactStars
//                     count={5}
//                     value={review.rating}
//                     size={20}
//                     edit={false}
//                     activeColor="#ffd700"
//                     emptyIcon={<FaStar />}
//                     fullIcon={<FaStar />}
//                   />
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

// export default ReviewSlider;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// // import { submitReview } from "../services/operations/courseDetailsAPI"; // You need to create this API function

// export default function CourseReviewModal({ setReviewModal, courseId }) {
//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState(5); // Default rating
//   const { token } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   const handleReviewSubmit = async () => {
//     const reviewData = {
//       courseId,
//       review: reviewText,
//       rating,
//     };
//     try {
//       // await submitReview(reviewData, token); // This function sends the review to the backend
//       alert("Review submitted successfully");
//       setReviewModal(false);
//     } catch (error) {
//       console.error("Error submitting review:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-xl font-semibold mb-4">Add Review</h2>
//         <textarea
//           rows="4"
//           placeholder="Write your review here..."
//           className="w-full p-2 border border-gray-300 rounded-lg mb-4"
//           value={reviewText}
//           onChange={(e) => setReviewText(e.target.value)}
//         />
//         <div className="flex justify-between items-center mb-4">
//           <label htmlFor="rating" className="font-semibold">Rating:</label>
//           <input
//             type="number"
//             id="rating"
//             min="1"
//             max="5"
//             value={rating}
//             onChange={(e) => setRating(e.target.value)}
//             className="border rounded p-1 w-16 text-center"
//           />
//         </div>
//         <div className="flex justify-between">
//           <button
//             onClick={handleReviewSubmit}
//             className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
//           >
//             Submit Review
//           </button>
//           <button
//             onClick={() => setReviewModal(false)}
//             className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { RxCross2 } from "react-icons/rx"
import ReactStars from "react-rating-stars-component"
import { useSelector } from "react-redux"

import { createRating } from "../../../services/operations/courseDetailsAPI"
import IconBtn from "../../Common/IconBtn"

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { courseEntireData } = useSelector((state) => state.viewCourse)

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    setValue("courseExperience", "")
    setValue("courseRating", 0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const ratingChanged = (newRating) => {
    // console.log(newRating)
    setValue("courseRating", newRating)
  }

  const onSubmit = async (data) => {
    await createRating(
      {
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      },
      token
    )
    setReviewModal(false)
  }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">
          <p className="text-xl font-semibold text-richblack-5">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCross2 className="text-2xl text-richblack-5" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div className="">
              <p className="font-semibold text-richblack-5">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-richblack-5">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex w-11/12 flex-col space-y-2">
              <label
                className="text-sm text-richblack-5"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="form-style resize-x-none min-h-[130px] w-full"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please Add Your Experience
                </span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => setReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
              >
                Cancel
              </button>
              <IconBtn text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}