const nodeTypeToElementTypeGetter = {
  block_quote: () => 'blockquote',
  code: () => 'code',
  code_block: () => 'pre',
  document: () => 'div',
  emph: () => 'em',
  heading: ({ level }) => `h${level}`,
  image: () => 'img',
  item: () => 'li',
  linebreak: () => 'br',
  link: () => 'a',
  list: ({ listType }) => listType === 'bullet' ? 'ul' : 'ol',
  paragraph: () => 'p',
  strong: () => 'strong',
  thematic_break: () => 'hr',
};

const nodeTypeToElementPropsGetter = {
  image({ destination, title }) {
    const props = { src: destination };
    if (title) {
      props.title = title;
    }
    return props;
  },
  link({ destination, title }) {
    const props = { href: destination };
    if (title) {
      props.title = title;
    }
    return props;
  },
};

export default function defaultRenderer(node, element) {
  const { type } = node;
  const elementTypeGetter = nodeTypeToElementTypeGetter[type];

  if (!elementTypeGetter) {
    throw new Error(`Markdown element ${type} is not handled!`);
  }

  element.type = elementTypeGetter(node);

  const elementPropsGetter = nodeTypeToElementPropsGetter[type];
  if (elementPropsGetter) {
    element.props = elementPropsGetter(node);
  }

  if (node.literal) {
    element.children = node.literal;
  }

  return element;
}
