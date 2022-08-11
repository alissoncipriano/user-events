import { useState } from 'react';
import './Form.css';

export const Form = () => {
  const [selected, setSelected] = useState(false);
  const [nome, setNome] = useState('');
  const [showResult, setShowResult] = useState(false);

  // console.log('Rendered!!!');

  const handleFocus = () => {
    setSelected(true);
  };

  const handleBlur = () => {
    if (nome.length === 0) setSelected(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(true);
  };

  return (
    <div className={`Form ${showResult && 'submited'}`}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className={`Form-group ${selected && 'selected'}`}>
          <label htmlFor='nome'>Nome: </label>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={(e) => {
              showResult === false && setNome(e.target.value);
            }}
            type='text'
            name='nome'
            value={nome}
          />
        </div>

        <button disabled={nome.length === 0 ? true : false}>Ok!!</button>
      </form>

      {showResult && (
        <div className='Form-result'>
          Nome:
          <span>{nome}</span>
        </div>
      )}
    </div>
  );
};
