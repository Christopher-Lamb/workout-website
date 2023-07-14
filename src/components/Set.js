import React, { useState, useRef } from "react";

export default function Set({ reps, weight, onChange = () => {}, onDelete = () => {} }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = (element) => {
    element.focus();
  };

  return (
    <div className="cursor-pointer flex items-center">
      {isEditing ? (
        <div className="cursor-pointer" tabIndex={0}>
          <div className="relative">
            <div className="absolute flex gap-2" style={{ left: "calc(100% - 100px)", top: "-30px" }}>
              <button
                className="bg-zinc-100 rounded p-0.5"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(false);
                  onDelete();
                }}
              >
                Delete
              </button>

              <button
                className="bg-zinc-100 rounded p-0.5"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
          <RepInput number={reps} onChange={onChange} /> x <WeightInput defaultNumber={weight} onChange={onChange} /> lbs
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)} className="flex items-center justify-center h-[2.5rem]">
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
      className="w-10 h-[2rem] text-xl text-center text-black"
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
      className="w-16 h-[2rem] text-xl text-center text-black"
    ></input>
  );
};
