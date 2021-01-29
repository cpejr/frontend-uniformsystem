import React from 'react';
import error404 from '../../../src/Assets/error_404.png';
import './Error.css';
import {Helmet} from 'react-helmet';
import MetaData from '../../meta/reactHelmet';

function Error() {

  const meta = {
    titlePage: "Erro",
    titleSearch: "",
    description: "",
    keyWords: "",
    imageUrl: "",
    imageAlt: "",
  }

  return (
    <div className="Imagem">
      <MetaData titlePage={meta.titlePage} titleSearch={meta.titleSearch} description={meta.description} keyWords={meta.keyWords} imageUrl={meta.imageUrl} imageAlt={meta.imageAlt} />
      <img className="notFound" src={error404}/>
    </div>
  );
}

export default Error;
