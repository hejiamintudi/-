"use strict";

Vue.component("PanelEnum", {
    template: `
<ui-prop v-prop="target.strName"></ui-prop>
<cc-array-prop :target.sync="target.strArr"></cc-array-prop>
<ui-prop name="myEnum" tooltip="NPC名字" >
    <ui-select v-show=ready tabindex="-1" class="flex-1" v-value="target.myEnum.value">
      <option v-for="(index, items) in player" value={{items}} title={{items}} >{{items}}</option>
    </ui-select>
</ui-prop>
<ui-prop v-prop="target.testEnum"></ui-prop>
<ui-prop v-prop="target.buttonEnum"></ui-prop>
  `,
    props: {
        target: {
            twoWay: true,
            type: Object,
        },
    },

    beforeCompile: function () {
	     this.restart();
    },

    compiled: function () {
    },

    methods: {
    	restart: function () {
            // cc.log("tz", tz);
            var self = this;
            this.jsName = this.target.name.value.split("<", 2)[1].split(">", 1)[0]
            this.targetNode = cc.engine.getInstanceById(this.target.node.value.uuid)
            // this.player = this.targetNode.getComponent(this.jsName).enumPlayer;
            // this.player = this.target.strArr.value;
            // this.player = ["zero", "one", "two"];
            var nodeNameArr = this.targetNode.getComponent(this.jsName).getNodeArr();

            var name = this.targetNode._name;
            Object.defineProperty(this.targetNode, "_name", {
                    get: function () {
                      return name;
                    },
                                      
                    set: function (value) { 
                      var tmp = name;
                      name = value;
                      self.resetTargetNodeName(value, tmp);
                    }
            });


            this.player = nodeNameArr;
            var myEnum = this.targetNode.getComponent(this.jsName).myEnum;
            if (nodeNameArr.indexOf(myEnum) === -1) {
                this.targetNode.getComponent(this.jsName).myEnum = nodeNameArr[0];
            }
            // Editor.log(this.target.testEnum.value);
            // this.myEnum.value = this.strName;
            // this.
            // this.myEnum.value = 2;
            // var self = this;
            // this.target.myEnum.value = this.player[1].value;
            // Editor.log(this.player[1].value);

            // setTimeout(function () {
            //     Editor.log("11111111111");
            //     Editor.log(self.target.myEnum.value);
            // }, 5000);
        },

        resetTargetNodeName: function (value, name) {
            // var id = this.player.indexOf(name);
            // cc.log(name, id, value);
            // Vue.set(this.player, id, value);
            // return;

            var self = this;
            var nodeNameArr = this.targetNode.getComponent(this.jsName).getNodeArr();
            self.player = null;
            self.player = nodeNameArr;
            // return;
            var myEnum = this.targetNode.getComponent(this.jsName).myEnum;
            this.targetNode.getComponent(this.jsName).myEnum = value;

            if (myEnum === name) {
                // this.target.myEnum.value = value;
                this.targetNode.getComponent(this.jsName).myEnum = value;
            }
            this.ready = false;
            // this.ready = true;
            // this.targetNode.getComponent(this.jsName).myEnum = "tz";


            setTimeout(function(){
                self.ready = true;
                // self.targetNode.getComponent(this.jsName).resetInEditor();
            }, 10);
        },
    },

    data: function () {
        return {
            jsName:"",
            targetNode:null,
            player:null,
            ready:true,
        }
    },
});