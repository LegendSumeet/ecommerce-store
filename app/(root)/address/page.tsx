"use client";

import { auth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Router } from "next/router";
import { useState, useEffect } from "react";

interface AddressData {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    userid: string;
  }
  
  const Address = ({ onClose, initialValues }: { onClose: () => void; initialValues: AddressData }) => {
    const { user } = useUser();
    const router = useRouter();

    if (!user) {
      return null;
    }

    const [formData, setFormData] = useState<AddressData>({
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      userid:user?.id,
    });
  
    const [errors, setErrors] = useState<AddressData>({
      street: "",
      city: "",
      state: "",
      country: "",
      postalCode: "",
      userid: "",
    });
  
    useEffect(() => {
      if (initialValues) {
        setFormData(initialValues);
      }
    }, [initialValues]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      let errorMessage = "";
      switch (name) {
        case "street":
          errorMessage = value.trim() === "" ? "Street is required" : "";
          break;
        case "city":
          errorMessage = value.trim() === "" ? "City is required" : "";
          break;
        case "state":
          errorMessage = value.trim() === "" ? "State is required" : "";
          break;
        case "postalCode":
          errorMessage = value.trim() === "" ? "Postal code is required" : "";
          break;
        case "country":
          errorMessage = value.trim() === "" ? "Country is required" : "";
          break;
        default:
          break;
      }
      setErrors({ ...errors, [name]: errorMessage });
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/address`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        router.push("/cart");

      }
    };
    

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white p-8 w-96 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Fill Address</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="street" className="block mb-1">
              Street
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
            <div className="mb-4">
                <label htmlFor="city" className="block mb-1">
                City
                </label>
                <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="state" className="block mb-1">
                State
                </label>
                <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="postalCode" className="block mb-1">
                Postal Code
                </label>
                <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="country" className="block mb-1">
                Country
                </label>
                <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2"
                />
            </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;
