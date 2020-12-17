import React from 'react';
import error404 from '../../../src/Assets/error_404.png';
import './Error.css';

function Error() {
  return (
    <div className="Imagem">
      <img className="notFound" src={error404}/>
    </div>
  );
}

export default Error;
