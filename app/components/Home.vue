<template>
  <Page class="page" @loaded="onPageLoaded">
    <ActionBar title="Basic App" flat="true"></ActionBar>

    <RadSideDrawer ref="drawer">
      <StackLayout ~drawerContent class="sideStackLayout">
        <StackLayout class="sideTitleStackLayout">
          <Label text="Navigation Menu"></Label>
        </StackLayout>
        <StackLayout class="sideStackLayout">
          <Label text="First" class="sideLabel sideLightRedLabel" @tap="getUsers"></Label>
          <Label text="Second" class="sideLabel"></Label>
          <Label text="Third" class="sideLabel"></Label>
          <Label text="Fourth" class="sideLabel sideLightRedLabel"></Label>
          <Label text="Fifth" class="sideLabel"></Label>
          <Label text="Sixth" class="sideLabel"></Label>
          <Label text="Seventh" class="sideLabel"></Label>
          <Label text="Eigth" class="sideLabel"></Label>
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
        <Label textWrap="true" :text="mainContentText"></Label>
        <Button text="Open Drawer" @tap="openDrawer()"></Button>
      </StackLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
const platform = require( "tns-core-modules/platform" );
const frame = require( "tns-core-modules/ui/frame" );
const http = require( "tns-core-modules/http" );

import { config_data } from '../mixins/common-config-mixin';

export default {
  mixins: [ config_data ],
  methods: {
    onPageLoaded () {
      if ( platform.isIOS ) {
        this.mainContentText = "SideDrawer for NativeScript can be easily setup in the HTML definition of your page by defining tkDrawerContent and tkMainContent. The component has a default transition and position and also exposes notifications related to changes in its state. Swipe from left to open side drawer.";

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

    getUsers () {
      http.request( {
        url: `${ this.BASE_URL }/api/user`,
        method: "GET"
      } ).then( this.parseResponse )
        .catch( ( err ) => {
          console.error( 'error', err );
        } );
    },
    parseResponse ( response ) {
      //   var users = response.content.toJSON();
      var users = response.content.toString();
      this.mainContentText = users;
      this.onCloseDrawerTap();
    }
  },

  data () {
    return {
      mainContentText: "",
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
