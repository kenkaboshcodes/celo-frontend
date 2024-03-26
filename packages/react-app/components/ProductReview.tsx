import React from "react";

// This component is used to add a product to the marketplace and show the user's cUSD balance

// Importing the dependencies
import { useEffect, useState } from "react";
// import ethers to convert the product price to wei
import { ethers } from "ethers";
// Import the useAccount and useBalance hooks to get the user's address and balance
import { useAccount, useBalance } from "wagmi";
// Import the toast library to display notifications
import { toast } from "react-toastify";
// Import the useDebounce hook to debounce the input fields
import { useDebounce } from "use-debounce";
// Import our custom useContractSend hook to write a product to the marketplace contract
import { useContractSend } from "@/hooks/contracts/useContractWrite";
// Import the erc20 contract abi to get the cUSD balance
import erc20Instance from "../abi/erc20.json";

// The ProductReview component is used to add a review to a product

// Define the interface for the review, an interface is a type that describes the properties of an object
type ProductReviewProps = {
  id: number;
};

const ProductReview = ({ id }: ProductReviewProps) => {
  // The visible state is used to toggle the modal
  const [visible, setVisible] = useState(false);
  // The following states are used to store the values of the form fields
  const [reviewComment, setReviewComment] = useState("");

  const [disable, setDisable] = useState(false);

  // The following states are used to store the debounced values of the form fields
  const [debouncedReviewComment] = useDebounce(reviewComment, 500);

  // The loading state is used to display a loading message
  const [loading, setLoading] = useState("");

  // Check if the input fields are filled
  const isComplete = reviewComment.length > 0 && reviewComment != " ";

  // Clear the input field after the review is added to the product
  const clearForm = () => {
    setReviewComment("");
  };

  // Use the useContractSend hook to use our writeReview function on the marketplace contract and add a review to the product
  const { writeAsync: createReviewComment } = useContractSend("writeReview", [
    debouncedReviewComment,
    id,
  ]);

  // Define function that handles the creation of a review through the marketplace contract
  const handleCreateReviewComment = async () => {
    if (!createReviewComment) {
      throw "Failed to create review";
      console.log("wronggg");
    }
    setLoading("Creating...");
    if (!isComplete) throw new Error("Please fill appropriate field");
    // Creates the review by calling the writeReview function on the marketplace contract
    const purchaseTx = await createReviewComment();
    setLoading("Waiting for confirmation...");
    // Wait for the transaction to be mined
    await purchaseTx.wait();
    // Close the modal and clear the input fields after the review is added to the product
    // setVisible(false);
    clearForm();
  };

  // Define function that handles the creation of a review, if a user submits the review form
  const addReviewComment = async (e: any) => {
    e.preventDefault();
    setDisable(true);

    try {
      // Display a notification while the review is being added to the product
      await toast.promise(handleCreateReviewComment(), {
        pending: "Creating review...",
        success: "Review created successfully",
        error: "Something went wrong. Try again.",
      });
      // Display an error message if something goes wrong
    } catch (e: any) {
      console.log({ e });
      toast.error(e?.message || "Something went wrong. Try again.");
      // Clear the loading state after the review is added to the marketplace
    } finally {
      setLoading("");
    }
    setDisable(false);
  };

  // Return the JSX for the ProductReview component
  return (
    <div>
      <form
        action=""
        className={"flex flex-row gap-x-5"}
        onSubmit={addReviewComment}
      >
        <div className={"flex flex-row mt-4 grow"}>
          {/* <label htmlFor="review">Review</label> */}
          <textarea
            name="review"
            id="review"
            value={reviewComment} // Set the value of the input field to the product name
            placeholder="give review"
            className={"border-2 border-gray-400 rounded-md w-full"}
            onChange={(e) => {
              setReviewComment(e.target.value);
              let x = e.target.value.trim();
              if (x.length > 2 && x != "") {
                setDisable(false);
              } else setDisable(true);
            }}
            required
          />
        </div>

        <button
          type="submit"
          className={
            "self-end border-[1px] border-gray-500 px-7 py-2 rounded-md"
          }
          disabled={disable}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductReview;
