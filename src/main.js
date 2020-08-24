import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"

Vue.use(ElementUI)

Vue.directive("clickOutSide", {
  bind(el, binding, vnode) {
    el.handler = function (e) {
      if (el.contains(e.target)) {
        return false;
      }
      binding.value();
    };
    el.stopProp = function (event) {
      event.stopPropagation();
    };
    el.addEventListener("click", el.stopProp);
    document.body.addEventListener("click", el.handler);
  },
  unbind(el, binding) {
    el.removeEventListener("click", el.stopProp);
    document.body.removeEventListener("click", el.handler);
  },
});

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
