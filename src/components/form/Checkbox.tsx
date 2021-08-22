import React from "react";

const Checkbox = React.forwardRef((props: any, ref: React.Ref<HTMLInputElement>) => {
  const { value, ...otherProps } = props;
  return (
    <input
      ref={ref}
      type="checkbox"
      className="form-check-input"
      {...otherProps}
    />
  );
});

export default Checkbox;
