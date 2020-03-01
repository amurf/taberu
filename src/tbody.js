import { h } from 'vue';
import * as util from './util.js';

export default {
  setup(props, { slots, attrs, emit }) {
    return () => {
      const opts = { defaultColumnTag: 'td', slots };
      return h('tbody', { class: props.body.class }, util.renderContent(props.body, opts));
    };
  },
}
