import YAML from 'yaml';

/**
 * Get content
 * @access private
 * @param {object} properties - JF2 properties
 * @returns {string} Content
 */
const getContent = (properties) => {
  if (!properties.content) return '';

  const content =
    properties.content.text || properties.content.html || properties.content;

  return `\n${content}\n`;
};

/**
 * Get front matter
 * @access private
 * @param {object} properties - JF2 properties
 * @returns {string} Front matter in chosen format
 */
const getFrontMatter = (properties) => {
  properties = {
    date: properties.published,
    ...((['unlisted', 'private'].includes(properties.visibility) ||
      properties['post-status'] === 'draft') && { draft: true }),
    ...(properties.name && { ['title-prefix']: properties.name }),
    ...properties,
  };

  const template = properties.template;
  if (template) {
    properties.template = { [template]: true };
  }

  delete properties.content;
  delete properties.name;
  delete properties['post-status'];
  delete properties.slug;
  delete properties.type;
  delete properties.url;
  delete properties.visibility;
  delete properties.published;

  const frontMatter = YAML.stringify(properties, { lineWidth: 0 });
  return `---\n${frontMatter}---\n`;
};

/**
 * Get post template
 * @param {object} properties - JF2 properties
 * @returns {string} Rendered template
 */
export const getPostTemplate = (properties) => {
  const content = getContent(properties);
  const frontMatter = getFrontMatter(properties);

  return frontMatter + content;
};
