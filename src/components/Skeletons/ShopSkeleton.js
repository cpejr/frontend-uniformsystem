import { Adjust } from "@material-ui/icons";
import React from "react";
import ContentLoader from "react-content-loader";

const ShopSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={Adjust}
    height={Adjust}
    viewBox="0 0 590 240"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="28" y="35" rx="0" ry="0" width="56" height="8" />
    <rect x="29" y="50" rx="0" ry="0" width="56" height="8" />
    <rect x="29" y="65" rx="0" ry="0" width="56" height="8" />
    <rect x="30" y="81" rx="0" ry="0" width="60" height="6" />
    <rect x="30" y="95" rx="0" ry="0" width="56" height="8" />
    <rect x="31" y="111" rx="0" ry="0" width="33" height="7" />
    <rect x="30" y="131" rx="0" ry="0" width="22" height="8" />
    <rect x="30" y="148" rx="0" ry="0" width="35" height="6" />
    <rect x="31" y="162" rx="0" ry="0" width="49" height="7" />
    <rect x="30" y="178" rx="0" ry="0" width="52" height="6" />
    <rect x="30" y="191" rx="0" ry="0" width="55" height="7" />
    <rect x="30" y="207" rx="0" ry="0" width="48" height="7" />
    <rect x="30" y="223" rx="0" ry="0" width="38" height="6" />
    <circle cx="112" cy="152" r="4" />
    <circle cx="112" cy="167" r="4" />
    <circle cx="112" cy="181" r="4" />
    <circle cx="112" cy="196" r="4" />
    <circle cx="112" cy="211" r="4" />
    <circle cx="112" cy="225" r="4" />
    <rect x="137" y="29" rx="8" ry="8" width="99" height="128" />
    <rect x="166" y="9" rx="6" ry="6" width="241" height="13" />
    <rect x="243" y="29" rx="8" ry="8" width="98" height="126" />
    <rect x="350" y="29" rx="8" ry="8" width="97" height="128" />
    <circle cx="419" cy="15" r="4" />
    <rect x="457" y="31" rx="8" ry="8" width="97" height="128" />
    <rect x="135" y="164" rx="8" ry="8" width="97" height="128" />
    <rect x="241" y="164" rx="8" ry="8" width="98" height="126" />
    <rect x="348" y="164" rx="8" ry="8" width="97" height="128" />
    <rect x="455" y="164" rx="8" ry="8" width="97" height="128" />
  </ContentLoader>
);

export default ShopSkeleton;
