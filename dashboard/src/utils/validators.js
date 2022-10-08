export function validateEmptyLength3(value) {
  if(!value){
    return '*Este campo é obrigatório!'
  }

  if(value.length < 3){
    return '*Este campo precisa de no mínimo 3 caracteres.'
  }

  return true;  
}

export function validateEmptyAndEmail(value){
  if(!value){
    return '*Este campo é obrigatório!'
  }
  
  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
  
  if(!regex){
    return '*Formato de e-mail inválido.'
  }

  return true;
  
}