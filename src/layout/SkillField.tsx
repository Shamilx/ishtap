"use client";

import { get_skills_enum } from "@/supabase/enum/get_skills_enum";
import { useEffect, useState } from "react";
import { CiTrash } from "react-icons/ci";

type Props = {
  skillsToShow?: string[];
};

const Skill = ({
  skillsEnum,
  value,
  index,
  onChange,
}: {
  skillsEnum: string[];
  value?: string;
  index: number;
  onChange: (index: number, newValue: string) => void;
}) => {
  return (
    <select
      name={`skill-${index}`}
      value={value}
      onChange={(e) => onChange(index, e.target.value)}
      className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
    >
      {value === "" && <option value={""}>Select Skill</option>}

      {skillsEnum.map((skill, i) => {
        return (
          <option key={skill} value={skill}>
            {skill}
          </option>
        );
      })}
    </select>
  );
};

function SkillField({
  skillsToShow = [],
  onChange,
}: {
  skillsToShow?: string[];
  onChange: (newSkills: string[]) => void;
}) {
  const [skills, setSkills] = useState(skillsToShow);
  const [enumSkills, setEnumSkills] = useState<string[] | undefined>();

  useEffect(() => {
    const fetchEnum = async () => {
      const fetchedEnumSkills = await get_skills_enum();
      if (fetchedEnumSkills) setEnumSkills(fetchedEnumSkills);
    };

    fetchEnum();
  }, []);

  const handleAdd = () => {
    const updatedSkills = [...skills, ""];
    setSkills(updatedSkills);
    onChange(updatedSkills);
  };

  const handleDelete = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
    onChange(updatedSkills);
  };

  const handleSkillChange = (index: number, newValue: string) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = newValue;
    setSkills(updatedSkills);
    onChange(updatedSkills);
  };

  return (
    <div>
      {enumSkills &&
        skills.map((skill, i) => (
          <div key={i} className="flex gap-1">
            <select
              value={skill}
              onChange={(e) => handleSkillChange(i, e.target.value)}
              className="mt-1 block w-full rounded-md border-2 border-gray-100 ps-1 shadow-sm dark:border-[#404040] dark:bg-[#242424] dark:text-white"
            >
              <option value="">Select Skill</option>
              {enumSkills.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
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

export default SkillField;
