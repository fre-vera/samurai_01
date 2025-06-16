export const validationEmail = {
  required: 'Введите Email, с помощью которого Вы регистрировались',
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: 'Введите корректный Email',
  },
};

export const validationPassword = {
  required: 'Введите пароль',
  maxLength: {
    value: 64,
    message: 'Очень длинный пароль (максимум - 64 символа)',
  },
};
