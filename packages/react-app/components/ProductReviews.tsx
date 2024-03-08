import React from "react";
import Link from "next/link";

// Importing the dependencies
import { useState, useCallback, useEffect } from "react";
// Import the useContractCall hook to read how many products are in the marketplace via the contract
import { useContractCall } from "@/hooks/contracts/useContractRead";
// Import the Product, ProductReview and Alert components
import Product from "@/components/Product";
import ErrorAlert from "@/components/alerts/ErrorAlert";
import LoadingAlert from "@/components/alerts/LoadingAlert";
import SuccessAlert from "@/components/alerts/SuccessAlert";
import ProductReview from "@/components/ProductReview";
import Blockies from "react-blockies";

// Define the interface for the reviews, an interface is a type that describes the properties of an object
type ProductReviewsProps = {
  show: string;
  id: number;
};

// Define the interface for the array of reviews, an interface is a type that describes the properties of an object
interface Review {
  reviews: [];
}


// This component is used to display all the reviews for individual product
const ProductReviews = ({ show, id }: ProductReviewsProps) => {
  const { data: rawReview }: any = useContractCall("readReview", [id], true);

  // Convert the data to the Product interface
  const [reviews, setReviews] = useState<Review | null>(null);
  // Define the states to store the error, success and l/oading messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState("");

  // Define a function to clear the error, success and loading states
  const clear = () => {
    setError("");
    setSuccess("");
    setLoading("");
  };

  // Format the product rview that we read from the smart contract
  const getFormatReview = useCallback(() => {
    if (!rawReview) return null;
    setReviews({
      reviews: rawReview,
    });
  }, [rawReview]);


  // Call the getFormatReview function when the rawReview state changes
  useEffect(() => {
    getFormatReview();
  }, [getFormatReview]);


  // Define the identicon template to display the reviewer of the product
  const identiconTemplate = (address: string) => {
    return (
      <Blockies
        size={14} // number of pixels square
        scale={2} // width/height of each 'pixel'
        className="identicon border-2 border-white rounded-full" // optional className
        seed={address} // seed used to generate icon data, default: random
      />
    );
  };


  // Return the JSX ProductReviews component
  return (
    <div className="review-parent">
      {reviews?.reviews.map((review: any, index: any) => {
          // returns review by id
        return (
          <div className={`${show}`} key={index}>
            <div className="mt-7 bg-gray-300 rounded-md px-4 pt-3">
              <div className={"flex flex-row "}>
                <Link
                  href={`https://explorer.celo.org/alfajores/address/${review[0]}`}
                  className={"h-16 w-16"}
                >
                  {identiconTemplate(review[0])}
                </Link>
                <p>{review[1]}</p>
              </div>
            </div>
          </div>
        );
      })}
      <ProductReview id={id} />
    </div>
  );
};

export default ProductReviews;
