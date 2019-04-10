<template>
  <Page @loaded="onPageLoaded">
    <ActionBar title="Basic App" flat="true"></ActionBar>

    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent>
        <StackLayout>
          <Label text="Navigation Menu"></Label>
        </StackLayout>
        <StackLayout>
          <Label text="First" class="sideLabel sideLightRedLabel" @tap="getUsers"></Label>
          <Label text="Second" class="sideLabel"></Label>
          <Label text="Third" class="sideLabel"></Label>
          <Label text="Fourth" class="sideLabel sideLightRedLabel"></Label>
          <Label text="Fifth" class="sideLabel"></Label>
          <Label text="Sixth" class="sideLabel"></Label>
          <Label text="Seventh" class="sideLabel"></Label>
          <Label text="Main" class="sideLabel" @tap="callMain"></Label>
        </StackLayout>
        <Label
          text="Close Drawer"
          color="lightgray"
          padding="20"
          style="horizontal-align: center"
          @tap="onCloseDrawerTap"
        ></Label>
      </StackLayout>
      <StackLayout ~mainContent>
        <Button text="Open Drawer" @tap="openDrawer()"></Button>
        <Label v-if="clickedItem==='main'" textWrap="true" :text="mainContentText"></Label>
        <first-page v-if="clickedItem==='first'" :jsonToDisplay="users"></first-page>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
const platform = require( "tns-core-modules/platform" );
const frame = require( "tns-core-modules/ui/frame" );
const http = require( "tns-core-modules/http" );

import { config_data } from '../mixins/common-config-mixin';
import FirstPage from './FirstPage.vue';

export default {
  mixins: [ config_data ],
  components: { FirstPage },
  methods: {
    onPageLoaded () {
      if ( platform.isIOS ) {
        this.mainContentText = "Hello World!";

        console.log( "isIOS" );
        const navBar = frame.topmost().ios.controller.navigationBar;
        navBar.barStyle = UIBarStyle.UIBarStyleBlack;
        // IQKeyboardManager.sharedManager().enableAutoToolbar = false;
      }
    },
    onItemLoading ( args ) {
      if ( args.ios ) {
        args.ios.selectionStyle = UITableViewCellSelectionStyle.None;
      }
    },

    openDrawer () {
      this.$refs.drawer.nativeView.showDrawer();
    },
    onCloseDrawerTap () {
      this.$refs.drawer.nativeView.closeDrawer();
    },
    callMain () {
      this.clickedItem = 'main';
      this.onCloseDrawerTap();
    },
    getUsers () {
      this.clickedItem = 'first';
      http.request( {
        url: `${ this.BASE_URL }/api/user`,
        method: "GET"
      } ).then( this.parseResponse )
        .catch( ( err ) => {
          console.error( 'error', err );
        } );
    },
    parseResponse ( response ) {
      this.users = response.content.toJSON();
      this.onCloseDrawerTap();
    }
  },

  data () {
    return {
      mainContentText: "",
      firstItemText: "",
      clickedItem: "main",
      users: {},
    };
  }
};
</script>

<style scoped>
ActionBar {
  background-color: #35495e;
}
.sideLabel {
  padding: 10px;
  color: beige;
}

.sideLightRedLabel {
  color: red;
}
</style>
