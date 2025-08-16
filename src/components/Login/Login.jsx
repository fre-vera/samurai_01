import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeOffIcon } from '../assets/icons';
import classes from './Login.module.scss';
import { validationEmail } from '../utils/validationRules';
import { validationPassword } from '../utils/validationRules';

export const Login = ({ onLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ mode: 'onBlur' });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data) => {
    const { email, password, rememberMe } = data;
    onLogin(email, password, rememberMe, setError);
  };

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.title}>Войти на сайт</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        {/* email */}
        <div className={classes.formGroup}>
          <label className={classes.label}>Email</label>
          <input
            type="email"
            className={`${classes.input} ${errors.email ? classes.inputError : ''}`}
            placeholder="example@mail.com"
            {...register('email', validationEmail)}
          />
          {errors.email && (
            <div className={classes.error}>{errors.email.message}</div>
          )}
        </div>
        {/* password */}
        <div className={classes.formGroup}>
          <label className={classes.label}>Пароль</label>
          <div className={classes.passwordInputWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`${classes.input} ${errors.password ? classes.inputError : ''}`}
              placeholder="••••••••"
              {...register('password', validationPassword)}
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
        {/* checkbox */}
        <div className={classes.checkboxContainer}>
          <label className={classes.checkboxLabel}>
            <input
              type="checkbox"
              className={classes.regularCheckbox}
              {...register('rememberMe')}
            />
            Запомнить меня
          </label>
        </div>
        {/* button */}
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
