import React from "react";
import {Helmet} from 'react-helmet';

const MetaData = ({titlePage, titleSearch, description, keyWords, imageUrl, imageAlt}) => {

    return (
        <Helmet>
            <title>{titlePage}</title>
            <meta name="title" content={titleSearch}/>
            <meta name="description" content={description}/>
            <meta name="keywords" content={keyWords}/>
            <meta property="og:description" content={description}/>
            <meta property="og:image" content={imageUrl}/>
            <meta property="og:url" content={ URL + window.location.pathname + window.location.search}/>
            <meta property="twitter:card" content={"summary_large_image"}/>
            <meta property="twitter:image:alt" content={imageAlt}/>
        </Helmet>
    );
}

export default MetaData;