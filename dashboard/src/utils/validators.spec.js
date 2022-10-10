import {
  validateEmptyLength3,
  validateEmptyAndEmail
} from './validators';

describe('Validators utils', () => {
  it('should give an error with empty payload', () => {
    expect(validateEmptyLength3()).toBe('*Este campo é obrigatório!')
  });

  it('should give an error with less then 3 characters payload', () => {
    expect(validateEmptyLength3('12')).toBe('*Este campo precisa de no mínimo 3 caracteres.')
  });

  it('should return true when input pass a correct param', () => {
    expect(validateEmptyLength3('1234')).toBe(true);
  });

  it('should give an error with empty payload', () => {
    expect(validateEmptyAndEmail()).toBe('*Este campo é obrigatório!')
  });

  it('should give an error with an invalid param', () => {
    expect(validateEmptyAndEmail('myemail@')).toBe('*Formato de e-mail inválido.')
  });

  it('should return true when input be a correct param', () =>{
    expect(validateEmptyAndEmail('email@email.com')).toBe(true);
  });

  
})