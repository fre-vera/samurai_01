import { useForm } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

export const TextareaForm = ({ onSubmitHandler, name, placeholder }) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm();

  const text = useWatch({ control, name });

  const onSubmit = (data) => {
    onSubmitHandler(data[name]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <textarea
          {...register(name)}
          placeholder={placeholder}>
        </textarea>
      </div>
      <div>
        {text && (
          <button>Отправить сообщение</button>
        )}
      </div>
    </form>
  );
};
