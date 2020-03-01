import { h } from 'vue';
import * as util from './util.js';

export default {
  setup(props, { slots, attrs, emit }) {
    return () => {
      const opts = { defaultColumnTag: 'th' };
      return h('thead', { class: props.headers.class }, util.renderContent(props.headers, opts));
    };
  },
}
