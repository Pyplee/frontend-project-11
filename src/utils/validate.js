import * as yup from 'yup';

export default (url, i18n) => { // (url, urlsList, i18n)
  yup.setLocale({
    string: {
      url: i18n.t('meassages.errorNotValid'),
    },
    // mixed: {
    //   required: i18n.t('form.errors.required'),
    //   notOneOf: i18n.t('form.errors.notUniqueUrl'),
    // },
  });

  const schema = yup
    .string()
    .required()
    .url();
    //  .notOneOf(urlsList);

  return schema.validate(url);

/*
   const schema = yup.object({
     url: yup.string().url(),
   });
   return schema.validate({ url });
  */
};
