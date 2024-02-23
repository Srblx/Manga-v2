export function LabelCustom(props: any) {
    return (
      <p
        style={{
          color: props.color || "#9595A6",
          fontFamily: props.fontFamily || "Youtube Sans",        fontWeight: props.fontWeight || "400",
          margin: props.margin || "0",
        }}
      >
        {props.children}
      </p>
    );
  }
  
    