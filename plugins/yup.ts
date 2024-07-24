import { setLocale } from 'yup'

export default defineNuxtPlugin(({ vueApp }) => {
  setLocale({
    mixed: {
      required: 'Ce champs est requis',
    },
    string: {
      email: "Ce mail n'est pas valide",
      url: "Cette URL n'est pas valide",
      min: (props) => `Ce champ doit contenir au moins ${props.min} caractères`,
      max: (props) => `Ce champ doit contenir au plus ${props.max} caractères`,
    },
    number: {
      min: (props) => `La valeur doit être inférieure à ${props.min}`,
      max: (props) => `La valeur doit être supéreure à ${props.max}`,
    },
  })
})
