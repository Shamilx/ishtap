"use client";

import { useState } from "react";
import { CiTrash } from "react-icons/ci";

type Props = {
  benefitsToShow?: string[];
};

const Benefit = ({
  value,
  index,
  onChange,
}: {
  value?: string;
  index: number;
  onChange: (index: number, newValue: string) => void;
}) => {
  return (
    <input
      type="text"
      name={`benefit-${index}`}
      value={value}
      onChange={(e) => onChange(index, e.target.value)}
      placeholder="Enter benefit"
      className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
    />
  );
};

function BenefitField({
  benefitsToShow = [],
  onChange,
}: {
  benefitsToShow?: string[];
  onChange: (newBenefits: string[]) => void;
}) {
  const [benefits, setBenefits] = useState(benefitsToShow);

  const handleAdd = () => {
    const updatedBenefits = [...benefits, ""];
    setBenefits(updatedBenefits);
    onChange(updatedBenefits);
  };

  const handleDelete = (index: number) => {
    const updatedBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(updatedBenefits);
    onChange(updatedBenefits);
  };

  const handleBenefitChange = (index: number, newValue: string) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index] = newValue;
    setBenefits(updatedBenefits);
    onChange(updatedBenefits);
  };

  return (
    <div>
      {benefits.map((benefit, i) => (
        <div key={i} className="flex gap-1">
          <input
            type="text"
            value={benefit}
            onChange={(e) => handleBenefitChange(i, e.target.value)}
            placeholder="Enter benefit"
            className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
          />
          <button type="button" onClick={() => handleDelete(i)}>
            <CiTrash size={24} color="#C90000" />
          </button>
        </div>
      ))}

      <button
        onClick={handleAdd}
        type="button"
        className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
      >
        Add
      </button>
    </div>
  );
}

export default BenefitField;
