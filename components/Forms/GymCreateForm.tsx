// import React, { useState } from "react";
// import DefaultInput from "@/components/FormElements/Input/DefaultInput";
// import { Button } from "@/components/ui/button";
// import { GymFormData } from "@/types/gym-setup";
// import SelectGroupCountry from "@/components/SelectGroup/SelectGroupCountry";
// import SelectGroupState from "@/components/SelectGroup/SelectGroupState";

// interface Task {
//   name: string;
//   completed: boolean;
// }

// type GymCreateFormProps = {
//   data?: GymFormData;
//   selectedTask: Task | null;
//   onSubmit: (data: GymFormData) => void;
// };

// const GymCreateForm: React.FC<GymCreateFormProps> = ({
//   data,
//   selectedTask,
//   onSubmit,
// }) => {
//   const [gymFormData, setGymFormData] = useState<GymFormData>(data || {});
//   const [errors, setErrors] = useState<{ [key: string]: string }>({});

//   // Utility function to remove formatting characters from phone numbers
//   const sanitizePhoneNumber = (phoneNumber: string): string => {
//     return phoneNumber.replace(/[^\d]/g, ""); // Remove everything except digits
//   };

//   // Email validation regex
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   // Handle input changes
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     const { name, value } = e.target;

//     if (name.startsWith("gymLocation.")) {
//       const locationField = name.split(".")[1];
//       setGymFormData((prev) => ({
//         ...prev,
//         gymLocation: {
//           ...prev.gymLocation,
//           [locationField]: value,
//         },
//       }));
//     } else {
//       setGymFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   // Handle option change for SelectGroupCountry and SelectGroupState
//   const handleOptionChange = (field: string, selectedOption: string) => {
//     setGymFormData((prev) => ({
//       ...prev,
//       gymLocation: {
//         ...prev.gymLocation,
//         [field]: selectedOption,
//       },
//     }));
//   };

//   // Validate form fields
//   const validateForm = (): boolean => {
//     const newErrors: { [key: string]: string } = {};

//     // Check required fields based on the current task
//     if (selectedTask?.name === "Add Gym Information") {
//       if (!gymFormData.gymName) {
//         newErrors.gymName = "Gym Name is required.";
//       }
//       if (!gymFormData.gymLocation?.addressLine1) {
//         newErrors.gym_address_line1 = "Address Line 1 is required.";
//       }
//       if (!gymFormData.gymLocation?.city) {
//         newErrors.gym_city = "City is required.";
//       }
//       if (!gymFormData.gymLocation?.state) {
//         newErrors.gym_state = "State is required.";
//       }
//       if (!gymFormData.gymLocation?.postalCode) {
//         newErrors.gym_postal_code = "Postal Code is required.";
//       } else if (
//         !/^[0-9]{5}(?:-[0-9]{4})?$/.test(gymFormData.gymLocation.postalCode)
//       ) {
//         newErrors.gym_postal_code = "Please enter a valid postal code.";
//       }
//       if (!gymFormData.gymLocation?.country) {
//         newErrors.gym_country = "Country is required.";
//       }
//       if (!gymFormData.phoneNumber) {
//         newErrors.phoneNumber = "Phone Number is required.";
//       } else if (sanitizePhoneNumber(gymFormData.phoneNumber).length !== 10) {
//         newErrors.phoneNumber = "Phone Number must be 10 digits long.";
//       }
//     }

//     if (selectedTask?.name === "Add Your Information") {
//       if (!gymFormData.ownerName)
//         newErrors.ownerName = "Owner's Name is required.";
//       if (!gymFormData.email) {
//         newErrors.email = "Email is required.";
//       } else if (!emailRegex.test(gymFormData.email)) {
//         newErrors.email = "Please enter a valid email address.";
//       }
//     }

//     setErrors(newErrors);
//     console.log("Errors: ", newErrors);
//     console.log("Form data: ", gymFormData);
//     return Object.keys(newErrors).length === 0; // Return true if no errors
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     if (!validateForm()) {
//       return; // Stop if validation fails
//     }

//     // Sanitize phone number before submitting
//     const sanitizedData = {
//       ...gymFormData,
//       ...(gymFormData.phoneNumber && {
//         phoneNumber: sanitizePhoneNumber(gymFormData.phoneNumber),
//       }),
//     };
//     onSubmit(sanitizedData); // Send the sanitized data to the parent component
//   };

//   const renderTaskForm = () => {
//     switch (selectedTask?.name) {
//       case "Add Gym Information":
//         return (
//           <>
//             <div className="mb-4">
//               <DefaultInput
//                 title="Gym Name"
//                 name="gymName"
//                 placeholder="Gym Name"
//                 value={gymFormData.gymName || ""}
//                 onChange={handleInputChange}
//               />
//               {errors.gymName && <p className="text-red">{errors.gymName}</p>}
//             </div>
//             <div className="mb-4">
//               <DefaultInput
//                 title="Gym Address Line 1"
//                 name="gymLocation.addressLine1"
//                 placeholder="Address Line 1"
//                 value={gymFormData.gymLocation?.addressLine1 || ""}
//                 onChange={handleInputChange}
//               />
//               {errors.gym_address_line1 && (
//                 <p className="text-red">{errors.gym_address_line1}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <DefaultInput
//                 title="Gym Address Line 2"
//                 name="gymLocation.addressLine2"
//                 placeholder="Address Line 2"
//                 value={gymFormData.gymLocation?.addressLine2 || ""}
//                 onChange={handleInputChange}
//               />
//             </div>
//             <div className="mb-4">
//               <DefaultInput
//                 title="City"
//                 name="gymLocation.city"
//                 placeholder="City"
//                 value={gymFormData.gymLocation?.city || ""}
//                 onChange={handleInputChange}
//               />
//               {errors.gym_city && <p className="text-red">{errors.gym_city}</p>}
//             </div>
//             <div className="mb-4">
//               <SelectGroupState
//                 onOptionChange={(selectedOption) =>
//                   handleOptionChange("state", selectedOption)
//                 }
//                 initialValue={gymFormData.gymLocation?.state || ""}
//               />
//               {errors.gym_state && (
//                 <p className="text-red">{errors.gym_state}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <DefaultInput
//                 title="Postal Code"
//                 name="gymLocation.postalCode"
//                 placeholder="Postal Code"
//                 value={gymFormData.gymLocation?.postalCode || ""}
//                 onChange={handleInputChange}
//               />
//               {errors.gym_postal_code && (
//                 <p className="text-red">{errors.gym_postal_code}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <SelectGroupCountry
//                 onOptionChange={(selectedOption) =>
//                   handleOptionChange("country", selectedOption)
//                 }
//                 initialValue={gymFormData.gymLocation?.country || ""}
//               />
//               {errors.gym_country && (
//                 <p className="text-red">{errors.gym_country}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <DefaultInput
//                 title="Gym's Phone Number"
//                 name="phoneNumber"
//                 type="phoneNumber"
//                 placeholder="(234) 567-8900"
//                 value={gymFormData.phoneNumber || ""}
//                 onChange={handleInputChange}
//               />
//               {errors.phoneNumber && (
//                 <p className="text-red">{errors.phoneNumber}</p>
//               )}
//             </div>
//           </>
//         );
//       case "Add Your Information":
//         return (
//           <>
//             <div className="mb-4">
//               <DefaultInput
//                 title="Owner's Name"
//                 name="ownerName"
//                 type="text"
//                 placeholder="Owner's Name"
//                 value={gymFormData.ownerName || ""}
//                 onChange={handleInputChange}
//               />
//               {errors.ownerName && (
//                 <p className="text-red">{errors.ownerName}</p>
//               )}
//             </div>
//             <div className="mb-4">
//               <DefaultInput
//                 title="Email"
//                 name="email"
//                 type="email"
//                 placeholder="Email"
//                 value={gymFormData.email || ""}
//                 onChange={handleInputChange}
//               />
//               {errors.email && <p className="text-red">{errors.email}</p>}
//             </div>
//           </>
//         );
//       case "Review & Confirm Setup":
//         return (
//           <>
//             <h3 className="mb-4 font-bold">Review Your Information</h3>
//             <div className="mb-4">
//               <p>
//                 <strong>Gym Name:</strong> {gymFormData.gymName || "N/A"}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p>
//                 <strong>Address Line 1:</strong>{" "}
//                 {gymFormData.gymLocation?.addressLine1 || "N/A"}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p>
//                 <strong>Address Line 2:</strong>{" "}
//                 {gymFormData.gymLocation?.addressLine2 || "N/A"}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p>
//                 <strong>City:</strong> {gymFormData.gymLocation?.city || "N/A"}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p>
//                 <strong>State:</strong>{" "}
//                 {gymFormData.gymLocation?.state || "N/A"}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p>
//                 <strong>Postal Code:</strong>{" "}
//                 {gymFormData.gymLocation?.postalCode || "N/A"}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p>
//                 <strong>Country:</strong>{" "}
//                 {gymFormData.gymLocation?.country || "N/A"}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p>
//                 <strong>Phone Number:</strong>{" "}
//                 {gymFormData.phoneNumber || "N/A"}
//               </p>
//             </div>
//             <h3 className="mb-4 font-bold">Owner Information</h3>
//             <div className="mb-4">
//               <p>
//                 <strong>Owner&apos;s Name:</strong>{" "}
//                 {gymFormData.ownerName || "N/A"}
//               </p>
//             </div>
//             <div className="mb-4">
//               <p>
//                 <strong>Email:</strong> {gymFormData.email || "N/A"}
//               </p>
//             </div>
//           </>
//         );
//       default:
//         return <p>Select a task to view the form.</p>;
//     }
//   };

//   return (
//     <div>
//       {renderTaskForm()}
//       <div className="flex justify-end">
//         <Button className="text-white" onClick={handleSubmit}>
//           Submit
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default GymCreateForm;
