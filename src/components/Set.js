import React, { useState, useRef } from "react";

export default function Set({ reps, weight, onChange = () => {}, onDelete = () => {} }) {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      {isEditing ? (
        <div className="border cursor-pointer" onClick={() => setIsEditing(false)}>
          <RepInput number={reps} onChange={onChange} /> x <WeightInput defaultNumber={weight} onChange={onChange} /> lbs
          <button
            className="bg-white ml-3"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            delete
          </button>
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)}>
          <span className="text-lg">
            {reps} x {weight} lbs
          </span>
        </div>
      )}
    </div>
  );
}

const RepInput = ({ number, onChange = () => {} }) => {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.type = "number";
    inputRef.current.style.width = "3.5rem";
  };

  const handleFocusOut = () => {
    inputRef.current.style.width = "";
    inputRef.current.type = "";
  };

  return (
    <input
      ref={inputRef}
      defaultValue={number}
      min="1"
      max="99"
      onFocus={handleFocus}
      onBlur={handleFocusOut}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => onChange("reps", e.target.value)}
      className="w-10 h-10 drop-shadow-md border text-xl text-center text-black"
    ></input>
  );
};

const WeightInput = ({ defaultNumber, onChange = () => {} }) => {
  const inputRef = useRef();

  const handleFocus = () => {
    inputRef.current.type = "number";
    inputRef.current.style.width = "4.5rem";
  };

  const handleFocusOut = () => {
    inputRef.current.style.width = "";
    inputRef.current.type = "";
  };

  return (
    <input
      ref={inputRef}
      defaultValue={defaultNumber}
      min="1"
      max="9999"
      onFocus={handleFocus}
      onBlur={handleFocusOut}
      onClick={(e) => e.stopPropagation()}
      onChange={(e) => onChange("weight", e.target.value)}
      className="w-16 h-10 drop-shadow-md border text-xl text-center text-black"
    ></input>
  );
};
