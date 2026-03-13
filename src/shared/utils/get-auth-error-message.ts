type ErrorWithCode = Error & { code?: string };

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  'auth/invalid-email': 'Некорректный адрес электронной почты.',
  'auth/user-disabled': 'Эта учётная запись отключена.',
  'auth/user-not-found': 'Пользователь с таким email не найден.',
  'auth/wrong-password': 'Неверный пароль.',
  'auth/email-already-in-use': 'Этот email уже зарегистрирован.',
  'auth/weak-password': 'Пароль слишком слабый. Используйте не менее 6 символов.',
  'auth/too-many-requests': 'Слишком много попыток. Попробуйте позже.',
  'auth/popup-closed-by-user': 'Вход отменён.',
  'auth/cancelled-popup-request': 'Вход отменён.',
  'auth/popup-blocked': 'Всплывающее окно было заблокировано браузером.',
  'auth/network-request-failed': 'Ошибка сети. Проверьте подключение к интернету.',
  'auth/operation-not-allowed': 'Этот способ входа отключён.',
  'auth/requires-recent-login': 'Для этого действия требуется повторный вход.',
  'auth/invalid-credential': 'Неверный email или пароль.',
};

const DEFAULT_MESSAGE = 'Ошибка авторизации. Попробуйте ещё раз.';

export const getAuthErrorMessage = (error: unknown): string => {
  const err = error as ErrorWithCode;
  const code = err?.code;
  if (code && AUTH_ERROR_MESSAGES[code]) {
    return AUTH_ERROR_MESSAGES[code];
  }
  return DEFAULT_MESSAGE;
};
