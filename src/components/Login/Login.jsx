import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeOffIcon } from '../assets/icons';
import classes from './Login.module.scss';

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Войти на сайт</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <div className={classes.formGroup}>
          <label className={classes.label}>Email</label>
          <input
            type="email"
            className={`${classes.input} ${errors.login ? classes.inputError : ''}`}
            placeholder="example@mail.com"
            {...register('login', {
              required: 'Введите Email, с помощью которого Вы регистрировались',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Введите корректный Email',
              },
            })}
          />
          {errors.login && (
            <div className={classes.error}>{errors.login.message}</div>
          )}
        </div>
        <div className={classes.formGroup}>
          <label className={classes.label}>Пароль</label>
          <div className={classes.passwordInputWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`${classes.input} ${errors.password ? classes.inputError : ''}`}
              placeholder="••••••••"
              {...register('password', {
                required: 'Введите пароль',
                maxLength: {
                  value: 64,
                  message: 'Очень длинный пароль (максимум - 64 символа)',
                },
              })}
            />
            <button
              type="button"
              className={classes.togglePasswordButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className={classes.eyeIcon} />
              ) : (
                <EyeIcon className={classes.eyeIcon} />
              )}
            </button>
          </div>
          {errors.password && (
            <div className={classes.error}>{errors.password.message}</div>
          )}
        </div>
        <div className={classes.checkboxContainer}>
          <label className={classes.checkboxLabel}>
            <input
              type="checkbox"
              className={classes.regularCheckbox}
              {...register('rememberME')}
            />
            Запомнить меня
          </label>
        </div>
        <button
          type="submit"
          className={classes.submitButton}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className={classes.spinner}></span>
              <span>Вход...</span>
            </>
          ) : (
            'Войти'
          )}
        </button>
      </form>
    </div>
  );
};
