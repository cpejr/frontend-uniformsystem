import React from "react" 
import ContentLoader from "react-content-loader" 
import { Adjust } from "@material-ui/icons"; 
 
const CartHeaderSkeleton = (props) => ( 
  <ContentLoader  
    speed={0.9} 
    width={Adjust} 
    height={Adjust} 
    viewBox="0 0 295 90" 
    backgroundColor="#f3f3f3" 
    foregroundColor="#ecebeb" 
    {...props} 
  > 
    <rect x="18" y="9" rx="0" ry="0" width="61" height="65" />  
    <rect x="93" y="40" rx="0" ry="0" width="54" height="8" />  
    <rect x="91" y="18" rx="0" ry="0" width="128" height="10" />  
    <rect x="233" y="39" rx="0" ry="0" width="49" height="8" />  
    <rect x="218" y="54" rx="0" ry="0" width="66" height="9" />  
    <rect x="93" y="57" rx="0" ry="0" width="54" height="8" />  
    <rect x="18" y="93" rx="0" ry="0" width="62" height="65" />  
  </ContentLoader> 
) 
 
export default CartHeaderSkeleton;