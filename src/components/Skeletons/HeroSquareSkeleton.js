import React from "react" 
import ContentLoader from "react-content-loader" 
 
import { Adjust } from "@material-ui/icons"; 
 
const HeroSquareSkeleton = (props) => ( 
  <ContentLoader  
    speed={2} 
    width={Adjust} 
    height={Adjust} 
    viewBox="0 0 400 160" 
    backgroundColor="#f3f3f3" 
    foregroundColor="#ecebeb" 
    {...props} 
  > 
    <rect x="-11" y="-10" rx="0" ry="0" width="413" height="177" /> 
  </ContentLoader> 
) 
 
export default HeroSquareSkeleton;