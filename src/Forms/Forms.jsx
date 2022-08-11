import './Forms.css';
import { Form } from '../Form/Form';
import { HookedForm } from '../HookedForm/HookedForm';

const Forms = () => {
  return (
    <div className='Forms'>
      <div className='Forms-group'>
        <h1>Formulário sem React Hook Form</h1>
        <Form />
      </div>

      <div className='Forms-group'>
        <h1>Formulário com React Hook Form</h1>
        <HookedForm />
      </div>
    </div>
  );
};

export default Forms;
