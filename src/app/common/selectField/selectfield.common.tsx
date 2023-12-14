import Select from "react-select";
import { colors } from "../../../modules";

import type {
  ActionMeta,
  GetOptionLabel,
  GroupBase,
  InputActionMeta,
  MultiValue,
  Options,
  StylesConfig,
} from "react-select";

type OnChangeType<T> = (
  newValue: T | MultiValue<T>,
  actionMeta: ActionMeta<T>
) => void;

export interface SelectFieldProps<T> {
  isViewing?: boolean;
  getOptionLabel?: keyof T | ((data: T) => React.ReactNode);
  getOptionValue?: GetOptionLabel<T> | keyof T;
  options: Array<T>;
  defaultOptions?: Array<T> | boolean;
  formatGroupLabel?: any;
  formatOptionLabel?: (data: T) => React.ReactElement;
  onChangeValue?: (newValue: T, actionMeta: ActionMeta<T>) => void;
  onMultiChangeValue?: (newValue: Array<T>, actionMeta: ActionMeta<T>) => void;
  isSearchable?: boolean;
  isClearable?: boolean;
  placeholder?: string;
  isLoading?: boolean;
  defaultValue?: T;
  isMulti?: boolean;
  value?: T;
  multiValue?: Array<T>;
  isOptionDisabled?: (opt: T, selectValue: Options<T>) => boolean;
  instanceId?: string;
  borderless?: boolean;
  isDisabled?: boolean;
  menuIsOpen?: boolean;
  className?: string;
  error?: boolean;
  height?: string;
  onInputChange?: (newValue: string, actionMeta: InputActionMeta) => void;
  onBlur?: () => void;
  menuHeight?: string | number;
  fontSize?: number;
}

export const SelectField = <T,>({
  options,
  formatGroupLabel,
  onChangeValue,
  onMultiChangeValue,
  getOptionLabel = "label" as keyof T,
  getOptionValue = "id" as keyof T,
  isSearchable = true,
  isClearable = false,
  placeholder,
  isLoading,
  defaultValue,
  isMulti,
  value,
  multiValue,
  isOptionDisabled,
  formatOptionLabel,
  instanceId = "react-select",
  borderless,
  isDisabled,
  menuIsOpen,
  className,
  error,
  onInputChange,
  height = "52px",
  onBlur,
  menuHeight,
  fontSize = 14,
  ...props
}: SelectFieldProps<T>) => {
  const selectStyles: StylesConfig<T, boolean, GroupBase<T>> = {
    container: (styles) => ({
      ...styles,
    }),
    // @ts-ignore
    control: (styles, { isFocused }) => ({
      ...styles,
      borderRadius: 4,
      borderColor: "transparent",
      backgroundColor: colors.light.bg,
      boxShadow: isFocused && "none",
      "&:hover": {
        borderColor: borderless ? "transparent" : colors.light.primary300,
      },
      fontSize,
      maxWidth: "100%",
      minWidth: "100%",
      minHeight: isMulti ? "100%" : height,
      maxHeight: isMulti ? "100%" : height,
      padding: "0px 14px",
    }),
    // @ts-ignore

    valueContainer: (styles) => ({
      ...styles,
      padding: 0,
    }),
    // @ts-ignore

    menu: (styles) => ({
      ...styles,
      borderRadius: 4,
      fontSize,
    }),
    // @ts-ignore

    menuList: (styles) => ({
      ...styles,
      height: menuHeight,
    }),
    // @ts-ignore

    multiValue: (styles, { data }: any) => {
      return {
        ...styles,
        backgroundColor: data?.disabled
          ? colors.light.grey200
          : colors.light.grey400,
        color: data?.disabled ? colors.light.grey100 : colors.light.blue,
      };
    },
    // @ts-ignore

    multiValueLabel: (
      styles,
      { data }: { data: T & { disabled?: boolean; color?: string } }
    ) => ({
      ...styles,
      cursor: data?.disabled ? "not-allowed" : "default",
      color: data?.color,
    }),
    // @ts-ignore

    multiValueRemove: (styles, { data }: any) => ({
      ...styles,
      pointerEvents: data?.disabled ? "none" : "all",
      ":hover": {
        backgroundColor: data.color,
        color: data?.disabled ? "white" : colors.light.red,
      },
    }),
    // @ts-ignore

    dropdownIndicator: (styles, { isFocused }: { isFocused: boolean }) => ({
      ...styles,
      fontSize,
      color: isFocused ? colors.light.grey100 : colors.light.grey200,
      padding: 0,
    }),
    // @ts-ignore

    indicatorSeparator: (styles) => ({
      ...styles,
      display: "none",
    }),
    // @ts-ignore

    option: (
      styles,
      {
        isSelected,
        isFocused,
        isDisabled,
      }: { isSelected: boolean; isFocused: boolean; isDisabled: boolean }
    ) => ({
      ...styles,
      backgroundColor: isSelected
        ? colors.light.primary200
        : isFocused
        ? "rgb(0, 0, 200, 0.2)"
        : "",
      color: isDisabled ? "#afafaf" : isSelected ? "#ffffff" : "",
      transition: "all 0.3s ease-in-out",
      fontSize,
      // textAlign: 'left',
    }),
  };

  let optionLabel;
  if (typeof getOptionLabel === "string") {
    optionLabel = (option: any) => `${option[getOptionLabel]}`;
  } else if (typeof getOptionLabel === "function") {
    optionLabel = getOptionLabel;
  }

  let optionValue;
  if (typeof getOptionValue === "string") {
    optionValue = (option: any) => `${option[getOptionValue]}`;
  } else if (typeof getOptionValue === "function") {
    optionValue = getOptionValue;
  }

  return (
    <Select
      formatOptionLabel={formatOptionLabel}
      isOptionDisabled={isOptionDisabled}
      isMulti={isMulti}
      instanceId={instanceId}
      className={`selectfield ${className}`}
      classNamePrefix="react-select"
      styles={selectStyles}
      isDisabled={isDisabled}
      isSearchable={isSearchable}
      isClearable={isClearable}
      isLoading={isLoading}
      // @ts-ignore

      onChange={
        isMulti
          ? (onMultiChangeValue as OnChangeType<T>)
          : (onChangeValue as OnChangeType<T>)
      }
      getOptionLabel={optionLabel as GetOptionLabel<T>}
      getOptionValue={optionValue}
      options={options}
      formatGroupLabel={formatGroupLabel}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={isMulti ? multiValue ?? value : value}
      onInputChange={onInputChange}
      defaultMenuIsOpen={menuIsOpen}
      onBlur={onBlur}
      {...props}
    />
  );
};
