import React from "react"
import ContentLoader from "react-content-loader"
import Adjust from "@material-ui/icons"

const CheckoutSkeleton = (props) => {
    if (props.screenWidth > 500) {
        return (
            <ContentLoader 
                speed={0.9}
                width={Adjust}
                height={Adjust}
                viewBox="0 0 600 450"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
                {...props}
            >
                <rect x="38" y="140" rx="0" ry="0" width="90" height="104" /> 
                <rect x="152" y="205" rx="0" ry="0" width="71" height="13" /> 
                <rect x="156" y="149" rx="0" ry="0" width="107" height="11" /> 
                <rect x="156" y="169" rx="0" ry="0" width="105" height="11" /> 
                <rect x="155" y="187" rx="0" ry="0" width="56" height="12" /> 
                <rect x="19" y="84" rx="0" ry="0" width="191" height="27" /> 
                <rect x="396" y="117" rx="0" ry="0" width="169" height="25" /> 
                <rect x="410" y="164" rx="0" ry="0" width="102" height="6" /> 
                <rect x="410" y="173" rx="0" ry="0" width="114" height="6" /> 
                <rect x="410" y="183" rx="0" ry="0" width="69" height="6" /> 
                <rect x="410" y="193" rx="0" ry="0" width="115" height="7" /> 
                <rect x="393" y="267" rx="0" ry="0" width="170" height="49" /> 
                <rect x="398" y="329" rx="0" ry="0" width="163" height="34" /> 
                <rect x="20" y="263" rx="0" ry="0" width="88" height="17" /> 
                <rect x="21" y="285" rx="0" ry="0" width="336" height="36" /> 
                <rect x="20" y="327" rx="0" ry="0" width="339" height="36" /> 
                <circle cx="204" cy="411" r="20" /> 
                <circle cx="396" cy="411" r="20" /> 
                <rect x="204" y="391" rx="0" ry="0" width="196" height="40" /> 
                <rect x="410" y="218" rx="0" ry="0" width="136" height="6" /> 
                <rect x="410" y="230" rx="0" ry="0" width="95" height="10" />
            </ContentLoader>
        );
    } else {
        return(
            <ContentLoader>
                
            </ContentLoader>

        );
    };
};

export default CheckoutSkeleton;

