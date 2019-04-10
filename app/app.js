import Vue from 'nativescript-vue';

import Home from './components/Home';

Vue.registerElement(
    'RadSideDrawer',
    () => require('nativescript-ui-sidedrawer').RadSideDrawer
);

new Vue({
    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    }
}).$start();
