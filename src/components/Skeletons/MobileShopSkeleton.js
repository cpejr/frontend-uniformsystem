import React from "react";
import ContentLoader from "react-content-loader";

const MobileShopSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={500}
    viewBox="0 0 300 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="84" y="197" rx="0" ry="0" width="132" height="214" />
    <rect x="85" y="436" rx="0" ry="0" width="131" height="84" />
    <rect x="4" y="122" rx="0" ry="0" width="239" height="20" />
    <circle cx="277" cy="131" r="15" />
    <rect x="15" y="156" rx="0" ry="0" width="50" height="23" />
    <rect x="4" y="0" rx="0" ry="0" width="279" height="102" />
  </ContentLoader>
);

export default MobileShopSkeleton;