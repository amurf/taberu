import { h } from 'vue';
import * as util from './util.js';

export default {
  setup(props, { slots, attrs, emit }) {
    return () => {
      const opts = { defaultColumnTag: 'th' };
      return h('tfoot', { class: props.footers.class }, util.renderContent(props.footers, opts));
    };
  },
}
