import { isValidPassword, isValidUserName } from './utils';

describe('isValidUsername', () => {
  it('should return invalid if username is less than 6 characters', () => {
    const username = 'admin';

    expect(isValidUserName(username)).toBeFalsy();
  });

  it('should return invalid if username starts with _', () => {
    const username = '_admin2022';

    expect(isValidUserName(username)).toBeFalsy();
  });

  it('should return invalid if username starts with .', () => {
    const username = '.admin2022';

    expect(isValidUserName(username)).toBeFalsy();
  });

  it('should return a valid username', () => {
    const username = 'admin_2022';

    expect(isValidUserName(username)).toBeTruthy();
  });
});

describe('isValidPassword', () => {
  it('should return invalid if password is less than 8 characters', () => {
    const password = 'admin';

    expect(isValidPassword(password)).toBeFalsy();
  });

  it('should return invalid if password has no digits', () => {
    const password = 'password';

    expect(isValidPassword(password)).toBeFalsy();
  });

  it('should return a valid password', () => {
    const password = 'password123';

    expect(isValidPassword(password)).toBeTruthy();
  });
});

