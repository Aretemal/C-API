class ErrorCode {
  constructor() {
    this.codeMap = new Map();
    this.codeMap.set('Login cannot be empty', '430');
    this.codeMap.set('First Name cannot be empty', '431');
    this.codeMap.set('Last Name cannot be empty', '432');
    this.codeMap.set('Email cannot be empty', '433');
    this.codeMap.set('Password cannot be shorter than 4 characters', '434');
    this.codeMap.set('Message for new post cannot be empty', '435');
    this.codeMap.set('Id cannot be empty', '436');
    this.codeMap.set('User already exists', '437');
    this.codeMap.set('Login or password is incorrect', '438');
    this.codeMap.set('Password not specified', '439');
    this.codeMap.set('No such connection exists', '440');
    this.codeMap.set('Id not specified', '441');
    this.codeMap.set('Like already exists', '442');
    this.codeMap.set('Like not found', '443');
    this.codeMap.set('Language not specified', '444');
    this.codeMap.set('Error in DB', '445');
    this.ruMap = new Map();
    this.ruMap.set('Login cannot be empty', 'Логин не может быть пустым');
    this.ruMap.set('First Name cannot be empty', 'Имя не может быть пустым');
    this.ruMap.set('Last Name cannot be empty', 'Фамилия не может быть пустой');
    this.ruMap.set('Email cannot be empty', 'Электронная почта не может быть пустой');
    this.ruMap.set('Password cannot be shorter than 4 characters', 'Пароль не может быть короче 4 символов');
    this.ruMap.set('Message for new post cannot be empty', 'Сообщение для нового поста не может быть пустым');
    this.ruMap.set('Id cannot be empty', 'Идентификатор не может быть пустым');
    this.ruMap.set('User already exists', 'Пользователь уже существует');
    this.ruMap.set('Login or password is incorrect', 'Неправильный логин или пароль');
    this.ruMap.set('No such connection exists', 'Нет такой связи');
    this.ruMap.set('Id not specified', 'Идентификатор не указан');
    this.ruMap.set('Like already exists', 'Лайк уже существует');
    this.ruMap.set('Like not found', 'Лайк не найден');
    this.ruMap.set('Language not specified', 'Язык не указан');
    this.ruMap.set('Password not specified', 'Пароль не указан');
    this.ruMap.set('Error in DB', 'Ошибка в БД');
  }

  getStatus(code) {
    return this.codeMap.get(code);
  }

  getLanguage(code, lang) {
    if (lang === 'ru') {
      return this.ruMap.get(code);
    } if (lang === 'en') {
      return code;
    }
  }

  getTitle(code, lang = null) {
    if (lang === 'en') {
      switch (this.getStatus(code)) {
        case '430':
        case '431':
        case '432':
        case '433':
        case '434':
        case '435':
        case '436':
          return 'Validation Error';
        case '437':
        case '438':
        case '439':
        case '440':
        case '441':
        case '445':
          return 'Service Error';
        default:
          return null;
      }
    } else if (lang === 'ru') {
      switch (this.getStatus(code)) {
        case '430':
        case '431':
        case '432':
        case '433':
        case '434':
        case '435':
        case '436':
          return 'Ошибка проверки';
        case '437':
        case '438':
        case '439':
        case '440':
        case '441':
          return 'Cервисная ошибка';
        default:
          return null;
      }
    }
  }
}

export default new ErrorCode();
