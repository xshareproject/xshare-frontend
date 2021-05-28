import * as React from "react";
import { Icon } from "react-native-elements";

export const HomeIcon = ({ color }: { color: string }) => {
  return <Icon name="home" type="ant-design" size={20} color={color} />;
};

export const ContactIcon = ({ color }: { color: string }) => {
  return <Icon name="contacts" type="ant-design" size={20} color={color} />;
};

export const TransactionIcon = ({ color }: { color: string }) => {
  return <Icon name="paper-plane" type="fontisto" size={20} color={color} />;
};

export const ProfileIcon = ({ color }: { color: string }) => {
  return <Icon name="user" type="ant-design" size={20} color={color} />;
};
