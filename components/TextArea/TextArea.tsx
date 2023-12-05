import React from "react";
import s from "./TextArea.module.css"

type Props = {
  type: string;
  loading?: boolean;
  value: string;
  onChange: (value: string) => void;
};

const commonStyles = {
  border: "none",
  marginTop: "25px",
  height: "100%",
  width: 'inherit',
  padding: "7px",
  borderRadius: "7px",
  background: '#c0e6ba',
  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 15px'
  
};

const getPLaceholder = ({ type, loading }: any) => {
  if (type === "from") return "Enter text";
  if (loading === true) return "Loading...";
  return "Translate";
};

export const TextArea = ({ type, loading, value, onChange }: Props) => {
  const styles =
    type === "from"
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#EBF5EA", outline: 'none', };


  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  };


  return (
    <textarea
      placeholder={getPLaceholder({ type, loading })}
      autoFocus={type === "from"}
      disabled={type === 'to'} 
      value={value}
      onChange={handleChange}
      style={styles}
      className={s.textarea}
    ></textarea>
  );
};
