import MintUI from 'mint-ui';
import Vue from 'vue';
import 'mint-ui/lib/style.css';
import { Navbar, TabItem } from 'mint-ui';
import { TabContainer, TabContainerItem } from 'mint-ui'
Vue.use(MintUI);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);


new Vue({
  el: '#app',
  data: {
  	selected: 2
  },
  methods: {
    handleClick: function() {
      this.$toast('Hello world!')
    }
  }
});