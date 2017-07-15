import defaultRenderer from './default-renderer';

const selfClosingTypes = ['linebreak', 'softbreak', 'thematic_break'];

function* walk(ast) {
  const walker = ast.walker();

  for (;;) {
    const event = walker.next();
    if (event) {
      yield event;
    } else {
      break;
    }
  }
}

export default class ReactObjectRenderer {
  constructor(options = {}) {
    this.options = options;
  }

  isParagraphInList() {
    return (
      this.node.type === 'paragraph' &&
      this.node.parent.parent &&
      this.node.parent.parent.type === 'list'
    );
  }

  isSelfClosing() {
    return selfClosingTypes.includes(this.node.type);
  }

  pushText(text) {
    const { children } = this.element;
    const { length } = children;

    if (length > 0 && typeof children[length - 1] === 'string') {
      children[length - 1] += text;
    } else {
      children.push(text);
    }
  }

  normalizeChildren() {
    if (this.element.children) {
      switch (this.element.children.length) {
        case 0:
          delete this.element.children;
          break;

        case 1:
          this.element.children = this.element.children[0];
          break;
      }
    }
  }

  currentNodeToElement(element = {}) {
    const { node } = this;
    const renderer = this.options.renderers && this.options.renderers[node.type] || defaultRenderer;

    return renderer(node, element);
  }

  get element() {
    return this.stack[this.stack.length - 1];
  }

  get parent() {
    return this.stack[this.stack.length - 2];
  }

  render(ast) {
    this.stack = [{ children: [] }];

    for (const event of walk(ast)) {
      this.node = event.node;

      if (this.isParagraphInList()) {
        continue;
      }

      if (!event.entering) {
        this.normalizeChildren();
        this.stack.pop();
        continue;
      }

      if (this.node.isContainer) {
        this.stack.push(this.currentNodeToElement({ children: [] }));
        this.parent.children.push(this.element);
        continue;
      }

      if (!this.isSelfClosing()) {
        if (this.node.type === 'text') {
          this.pushText(this.node.literal);
        } else {
          this.element.children.push(this.currentNodeToElement());
        }
        continue;
      }

      if (this.node.type === 'softbreak') {
        this.pushText(' ');
        continue;
      }

      this.element.children.push(this.currentNodeToElement());
    }

    return this.element.children[0];
  }
}
