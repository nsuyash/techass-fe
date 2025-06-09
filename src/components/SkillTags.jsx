import React from 'react';

const SkillTags = ({ skills }) => {
  return (
    <div>
      {skills.map((skill) => (
        <span key={skill} className="badge bg-info text-dark me-1">
          {skill}
        </span>
      ))}
    </div>
  );
};

export default SkillTags;
