import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './HookedForm.css';

const schema = yup
  .object({
    nome: yup.string().required('O nome é obrigatório!'),
    pass: yup
      .string()
      .min(6, 'A senha deve ter pelo menos 6 caracteres!')
      .required('A senha é obrigatória!'),
    passConf: yup
      .string()
      .required('A confirmação de senha é obrigatória!')
      .oneOf([yup.ref('pass')], 'As duas senhas devem ser iguais!'),
  })
  .required();

export const HookedForm = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [selectedElement, setSelectedElelent] = useState(null);
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [confSenha, setConfSenha] = useState('');
  const [showResult, setShowResult] = useState(false);

  //   console.log('Rendered!!!');

  const handleFocus = (el) => {
    setSelectedElelent(el);
  };

  const handleBlur = (e) => {
    if (e.target.value.length === 0) setSelectedElelent(null);
    else setNome(e.target.value);
  };

  const handleChange = (e) => {
    if (e.target.name === 'nome') setNome(e.target.value);
    else if (e.target.name === 'pass') setSenha(e.target.value);
    else setConfSenha(e.target.value);
  };

  const onSubmit = (data) => {
    setNome(data.nome);
    setShowResult(true);
  };

  return (
    <div
      className={`HookedForm ${showResult && 'submited'} ${
        errors.nome && 'error'
      }`}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          className={`HookedForm-group ${
            nome.length > 0
              ? 'selected'
              : selectedElement && selectedElement === 'nome' && 'selected'
          }`}
        >
          <label htmlFor='nome'>Nome: </label>
          <input
            onFocus={() => handleFocus('nome')}
            onBlur={handleBlur}
            {...register('nome', {
              required: true,
              onBlur: (e) => handleBlur(e),
              onChange: (e) => handleChange(e),
            })}
            type='text'
          />
        </div>

        <div
          className={`HookedForm-group ${
            senha.length > 0
              ? 'selected'
              : selectedElement && selectedElement === 'pass' && 'selected'
          }`}
        >
          <label htmlFor='pass'>Senha: </label>
          <input
            onFocus={() => handleFocus('pass')}
            onBlur={handleBlur}
            {...register('pass', {
              required: true,
              onBlur: (e) => handleBlur(e),
              onChange: (e) => handleChange(e),
            })}
            type='password'
          />
        </div>

        <div
          className={`HookedForm-group ${
            confSenha.length > 0
              ? 'selected'
              : selectedElement && selectedElement === 'passConf' && 'selected'
          }`}
        >
          <label htmlFor='passConf'>Confirmação de senha: </label>
          <input
            onFocus={() => handleFocus('passConf')}
            onBlur={handleBlur}
            {...register('passConf', {
              required: true,
              onBlur: (e) => handleBlur(e),
              onChange: (e) => handleChange(e),
            })}
            type='password'
          />
        </div>

        <button>Ok!!</button>
      </form>

      {showResult && (
        <div className='HookedForm-result'>
          Nome:
          <span>{nome}</span>
        </div>
      )}

      {Object.keys(errors).length > 0 &&
        Object.values(errors).map((error) => (
          <div className='HookedForm-error'>
            <span>{error.message}</span>
          </div>
        ))}
    </div>
  );
};
