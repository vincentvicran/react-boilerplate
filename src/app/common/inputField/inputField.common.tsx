import { Inter } from "next/font/google";
import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";

// import { Box, Label, Text } from "src/app/common";
import { colors } from "src/modules";
const inter = Inter({ subsets: ["latin"] });

export const InputField = (props: Com.InputFieldProps) => {
  const {
    // value,
    name,
    defaultValue,
    placeholder,
    style,
    onChange,
    className,
    type,
    inputType,
    disabled,
    autofocus,
    dateMax,
    dateMin,
    readonly,
    error = false,
    containerStyle,
    max,
    inputMode,
    append,
    ...rest
  } = props;
  const [typepassWord, setTypepassWord] = useState("password");

  return (
    <div className="input-field-container" style={containerStyle}>
      <input
        name={name}
        defaultValue={defaultValue as string | number}
        // onChange={onChange}
        onChange={(e) => {
          if (/^\s/.test(e?.target?.value)) {
            e.preventDefault();
            return;
          }

          if (inputType === "nonZero") {
            if (/^[1-9]*$|^[1-9][0-9]*$/.test(e?.target?.value)) {
              e.preventDefault();
              onChange(e);
              return;
            }
            return;
          }
          if (inputType === "citizen") {
            if (/^[(0-9a-z-/,)]*$/i.test(e?.target?.value)) {
              e.preventDefault();
              onChange(e);
              return;
            }
            return;
          }

          if (inputType === "organization") {
            if (
              /^[A-Z]?([a-zA-Z0-9]*|[-@\.#&!\s]?)+$/i.test(e?.target?.value)
            ) {
              e.preventDefault();
              onChange(e);
              return;
            }
            return;
          }

          if (inputType === "numSymbol") {
            if (/^[(0-9a-z-/)]*$/i.test(e?.target?.value)) {
              e.preventDefault();
              onChange(e);
              return;
            }
            return;
          }
          if (inputType === "alphanumeric") {
            if (/^[0-9A-Za-z]*$/.test(e?.target?.value)) {
              e.preventDefault();
              onChange(e);
              return;
            }
            return;
          }

          if (inputType === "tel") {
            if (/^[0-9]*$/.test(e?.target?.value)) {
              e.preventDefault();
              onChange(e);
              return;
            }
            return;
          }

          if (inputType === "number" || type === "number") {
            if (/^(\d*)$/i.test(e?.target?.value)) {
              e.preventDefault();
              onChange(e);
              return;
            }
            return;
          }

          if (inputType === "decimal") {
            if (/^(\d*)[.,](\d+)$/i.test(e?.target?.value)) {
              e.preventDefault();
              onChange(e);
              return;
            }
            return;
          }

          if (inputType === "fraction") {
            if (/^(\d+)[\/](\d+)$/i.test(e?.target?.value)) {
              e.preventDefault();
              onChange(e);
              return;
            }
            return;
          }

          onChange(e);
        }}
        style={{ ...style, borderColor: !!error ? "red" : "" }}
        className={`inputfield body ${className} ${disabled && `disabled`} ${
          type === "password" && "password"
        } ${inputType === "nepali" && "nepali"}`}
        placeholder={placeholder}
        type={
          type === "password" ? typepassWord : type === "number" ? "text" : type
        }
        onInput={(e: any) => {
          if (type === "number") {
            if (max) {
              if (e.target.value.length > max) {
                e.target.value = e.target.value.slice(0, max);
              }
            }
            if (e.target.value < 0) {
              e.target.value = 0;
            }

            // return e.target.value
          }
        }}
        max={dateMax}
        min={dateMin}
        disabled={disabled}
        autoFocus={autofocus}
        readOnly={readonly}
        inputMode={inputMode ?? type === "number" ? "numeric" : inputMode}
        // value={value}
        {...rest}
      />
      {append}
      {type === "password" && (
        <div
          className="password-icon"
          onClick={() =>
            setTypepassWord((prev) =>
              prev === "password" ? "text" : "password"
            )
          }
        >
          {typepassWord === "password" ? (
            <AiOutlineEye />
          ) : (
            <AiOutlineEyeInvisible />
          )}
        </div>
      )}

      {!!error && <div className="input-error">{error}</div>}
    </div>
  );
};

export const TextArea = (props: Com.TextAreaProps) => {
  const { className, disabled, cols = 40, rows = 5, ...rest } = props;
  return (
    <textarea
      cols={cols}
      rows={rows}
      className={`${inter.className} textarea ${className} ${
        disabled && `disabled`
      }`}
      disabled={disabled}
      // style={{ fontFamily: "inherit !important" }}
      {...rest}
    />
  );
};

export const FormInput = ({
  children,
  label,
  newElement,
  required,
  style,
  textClassName,
  id,
  textStyle,
  ...rest
}: Com.FormInputProps) => {
  return (
    <div style={style} {...rest}>
      <div>
        <label
          htmlFor={id}
          style={{ fontSize: 16, fontFamily: "SFPT-Medium" }}
          className={textClassName}
        >
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
        <span style={{ fontSize: "14px", color: colors.text.secondary }}>
          {newElement}
        </span>
      </div>

      {children}
    </div>
  );
};

export const SearchField = (props: Com.SearchInputProps) => {
  const { onSearch, ...rest } = props;
  return (
    <InputField
      {...rest}
      append={
        <div className="search-icon" onClick={() => onSearch?.()}>
          <BiSearch />
        </div>
      }
    />
  );
};
