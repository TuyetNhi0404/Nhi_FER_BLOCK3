import React from 'react';

const CourseList = () => {
  
  const courses = ['React', 'ReactNative', 'NodeJs'];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Course names
      </h2>
      <ul className="space-y-3">
        {courses.map((course, index) => (
          <li 
            key={index}
            className="flex items-center text-xl text-gray-700"
          >
            <span className="w-2 h-2 bg-black rounded-full mr-4"></span>
            {course}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;