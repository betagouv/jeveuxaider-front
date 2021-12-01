import { setLocale } from 'yup'

// Lodash depedency for Yup ...
// https://github.com/jquense/yup/issues/686
// https://github.com/jquense/yup/issues/107

setLocale({
  mixed: {
    required: 'Ce champs est requis'
  },
  string: {
    email: "Ce mail n'est pas valide",
    min: 'Ce champ doit contenir au moins ${min} caractères',
    max: 'Ce champ doit contenir au plus ${min} caractères'
  },
  number: {
    min: 'La valeur doit être inférieure à ${min}',
    max: 'La valeur doit être supéreure à ${max}'
  }
})
