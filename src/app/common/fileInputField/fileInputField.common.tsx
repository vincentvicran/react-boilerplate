import React, { ChangeEvent, ReactNode, useRef } from "react";
import { FaFileUpload } from "react-icons/fa";

export function FileInputField({
  label = "Upload File",
  icon = <FaFileUpload />,
  accept = ["*"],
  id,
  onChange,
}: {
  id: string;
  label?: string;
  icon?: ReactNode;
  accept?: Array<string>;
  onChange: (e: ChangeEvent) => void;
}) {
  return (
    <label htmlFor={id} className="fileInputCustom">
      <div className="input-interface">
        <div className="text">{label}</div>
        <div className="icon">{icon}</div>
      </div>

      <input
        type="file"
        id={id}
        accept={String(accept)}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </label>
  );
}
