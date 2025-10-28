import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaDollarSign, FaCalendarAlt, FaRegCommentDots, FaWallet } from "react-icons/fa";

const validationSchema = Yup.object({
  type: Yup.string()
    .required("Transaction type is required")
    .oneOf(["income", "expense"]),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string(),
});

const TransactionForm = () => {
  const formik = useFormik({
    initialValues: {
      type: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log("✅ Submitted values:", values);
      alert("Form submitted!");
      resetForm(); // ✅ clears all form fields
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-lg mx-auto my-10 bg-white p-6 rounded-lg shadow-lg space-y-6"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800">
          Transaction Details
        </h2>
        <p className="text-gray-600">Fill in the details below.</p>
      </div>

      {/* Type */}
      <div className="space-y-2">
        <label htmlFor="type" className="flex gap-2 items-center text-gray-700 font-medium">
          <FaWallet className="text-blue-500" />
          <span>Type</span>
        </label>
        <select
          {...formik.getFieldProps("type")}
          id="type"
          className="block w-full p-2 mt-1 border border-gray-300 rounded-md"
        >
          <option value="">Select transaction type</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="amount" className="text-gray-700 font-medium">
          <FaDollarSign className="inline mr-2 text-blue-500" /> Amount
        </label>
        <input
          type="number"
          {...formik.getFieldProps("amount")}
          id="amount"
          placeholder="Amount"
          className="w-full border border-gray-300 rounded-md py-2 px-3"
        />
      </div>

      {/* Category */}
      <div>
        <label htmlFor="category" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" /> Category
        </label>
        <input
          type="text"
          {...formik.getFieldProps("category")}
          id="category"
          placeholder="Category"
          className="w-full border border-gray-300 rounded-md py-2 px-3"
        />
      </div>

      {/* Date */}
      <div>
        <label htmlFor="date" className="text-gray-700 font-medium">
          <FaCalendarAlt className="inline mr-2 text-blue-500" /> Date
        </label>
        <input
          type="date"
          {...formik.getFieldProps("date")}
          id="date"
          className="w-full border border-gray-300 rounded-md py-2 px-3"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="text-gray-700 font-medium">
          <FaRegCommentDots className="inline mr-2 text-blue-500" /> Description
        </label>
        <textarea
          {...formik.getFieldProps("description")}
          id="description"
          placeholder="Description"
          className="w-full border border-gray-300 rounded-md py-2 px-3"
        ></textarea>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
