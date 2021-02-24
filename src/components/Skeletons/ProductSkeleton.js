import { Adjust } from "@material-ui/icons";
import React from "react";
import ContentLoader from "react-content-loader";

const ProductSkeleton = (props) => {
  if (props.screenWidth > 500) {
    console.log("ENTREI RAPA");
    return (
      <ContentLoader
        speed={2}
        width={Adjust}
        height={Adjust}
        viewBox="0 0 500 300"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="85" y="436" rx="0" ry="0" width="131" height="84" />
        <rect x="25" y="62" rx="0" ry="0" width="177" height="176" />
        <rect x="350" y="44" rx="0" ry="0" width="110" height="19" />
        <rect x="244" y="62" rx="0" ry="0" width="75" height="25" />
        <rect x="243" y="92" rx="0" ry="0" width="83" height="17" />
        <rect x="248" y="115" rx="0" ry="0" width="71" height="88" />
        <circle cx="416" cy="128" r="12" />
        <circle cx="446" cy="128" r="12" />
        <circle cx="475" cy="128" r="12" />
        <circle cx="531" cy="130" r="12" />
        <circle cx="417" cy="161" r="12" />
        <circle cx="446" cy="162" r="12" />
        <circle cx="475" cy="162" r="12" />
        <rect x="406" y="190" rx="0" ry="0" width="83" height="23" />
        <rect x="443" y="242" rx="0" ry="0" width="88" height="24" />
      </ContentLoader>
    );
  } else {
    return (
      <ContentLoader
        speed={2}
        width={500}
        height={550}
        viewBox="0 0 300 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
      >
        <rect x="350" y="44" rx="0" ry="0" width="110" height="19" />
        <circle cx="416" cy="128" r="12" />
        <circle cx="446" cy="128" r="12" />
        <circle cx="475" cy="128" r="12" />
        <circle cx="531" cy="130" r="12" />
        <circle cx="417" cy="161" r="12" />
        <circle cx="446" cy="162" r="12" />
        <circle cx="475" cy="162" r="12" />
        <rect x="406" y="190" rx="0" ry="0" width="83" height="23" />
        <rect x="443" y="242" rx="0" ry="0" width="88" height="24" />
        <rect x="41" y="72" rx="0" ry="0" width="197" height="136" />
        <rect x="43" y="213" rx="0" ry="0" width="194" height="32" />
        <rect x="18" y="259" rx="0" ry="0" width="126" height="12" />
        <rect x="16" y="283" rx="0" ry="0" width="129" height="16" />
        <rect x="22" y="341" rx="0" ry="0" width="107" height="128" />
        <rect x="149" y="340" rx="0" ry="0" width="107" height="128" />
        <rect x="24" y="474" rx="0" ry="0" width="102" height="54" />
      </ContentLoader>
    );
  }
};

export default ProductSkeleton;
