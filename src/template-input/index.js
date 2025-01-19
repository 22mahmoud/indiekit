export default class TemplateInput {
  constructor() {
    this.name = 'Template Input';
  }

  get validationSchemas() {
    return {
      template: {
        exists: { if: (_value, { req }) => req.body?.template },
        notEmpty: true,
      },
    };
  }

  init(Indiekit) {
    Indiekit.addPostType(false, this);
  }
}
