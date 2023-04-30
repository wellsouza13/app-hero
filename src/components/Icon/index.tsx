import React from "react";
import * as RemixIcon from "react-icons/ri";

import IIconName from "./icon.name";
import { IconBaseProps } from "react-icons";

export interface IIconProps extends IconBaseProps {
  name: IIconName["name"];
  size?: number;
  color?: string;
}

const Icon: React.FC<IIconProps> = ({ name, ...props }) => {
  const IconGenerated = RemixIcon[name];
  return <IconGenerated {...props} />;
};

export { Icon };