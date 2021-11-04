import React from "react";
import OptionGroup from "../../../components/option/OptionGroup";
import Option from "../../../components/option/Option";
import { Loft} from "../../../types/Golfs";
import { IGolfComponentsProps } from "../Right";
import { VariantStore } from "../../../hooks/useTransformData";

const instance = VariantStore.getInstance()
const Lofts: React.FC<IGolfComponentsProps> = ({
  values,
  onPropertyChange,
  groupStyle,
  optionStyle,
}) => {
  return (
    <OptionGroup
      disableAutoSelect={!(instance.choosenVariant.loft !== null)}
      style={groupStyle}
      name={"Loft"}
      onChange={(value: any) => {
        onPropertyChange(new Loft(value));
      }}
    >
      {values &&
        values.mapValues((value: Loft) => (
          <Option
            key={`${value._id}`}
            visualDisabled={value.disabled}
            style={optionStyle}
            value={value}
          >
            {value.type}
          </Option>
        ))}
    </OptionGroup>
  );
};

export default Lofts;