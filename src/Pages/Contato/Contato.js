import React from 'react';
import './Contato.css'
import camisa from '../../Assets/camisa.jpg';

function Contato(){
  return (
    <div className="divPagContato">
      <div className="fundoCinza">
        <div className="divFundoBrancoContato">
          <div className="tituloContato">
            <h1>Contato</h1>
          </div>
          <div className="divRedesSociais">
            <h3>INSTAGRAM</h3>
            <h3>wpp</h3>
            <h3>Facebook</h3>
          </div>
          <div className="divEmail">
            email
          </div>
          <div className="divLocal">
            local
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contato;
