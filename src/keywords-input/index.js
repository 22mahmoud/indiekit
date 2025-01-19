import { tagInputSanitizer } from '@indiekit/frontend';

export default class KeywordsInput {
  constructor() {
    this.name = 'Keywords Input';
  }

  get validationSchemas() {
    return {
      keywords: {
        exists: { if: (_value, { req }) => req.body?.keywords },
        tagInput: tagInputSanitizer,
        isArray: true,
      },
    };
  }

  init(Indiekit) {
    Indiekit.addPostType(false, this);
  }
}
