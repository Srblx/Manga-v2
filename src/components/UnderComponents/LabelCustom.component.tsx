import { ReactNode } from "react";

interface LabelCustomProps {
  color?: string;
  fontFamily?: string;
  fontWeight?: string;
  margin?: string;
  children: ReactNode
}

export function LabelCustom(
  props: LabelCustomProps
) {
  const { children, color, fontFamily, fontWeight, margin, } = props;

  return (
    <p
      style={{
        color: color || "#9595A6",
        fontFamily: fontFamily || "Youtube Sans",
        fontWeight: fontWeight || "400",
        margin: margin || "0",
      }}
    >
      {children}
    </p>
  );
}
