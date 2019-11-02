import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaMedium,
  FaGithub,
  FaLinkedin
} from "react-icons/fa";
import { DiReact } from "react-icons/di";

const Icon = props => {
  switch (props.name) {
    case "twitter":
      return <FaTwitter {...props} />;
    case "instagram":
      return <FaInstagram {...props} />;
    case "medium":
      return <FaMedium {...props} />;
    case "github":
      return <FaGithub {...props} />;
    case "linkedin":
      return <FaLinkedin {...props} />;
    case "development":
      return <DiReact {...props} />;
    default:
      return null;
  }
};

export default Icon;
