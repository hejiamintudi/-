"use strict";

Vue.component("DylWindow", {
    template: `
<ui-prop name="showData" tooltip="当前状态" >
    <ui-select v-if=ready @confirm="read()" tabindex="-1" resize-v="" class="flex-1 large" v-value="target.showData.value">
      <option v-for="(index, items) in storageWords" value={{items}} title={{items}} >{{items}}</option>
    </ui-select>
    <ui-button class="blue small" style="min-width:100px"
      @confirm="save()" >
     保存
    </ui-button>
</ui-prop>
<ui-prop v-if=ready foldable="" indent="0" tabindex="-1" name="stateArr">
    <ui-num-input @confirm="changelength()" v-value=numInput min="0"  step="1" tabindex="-1" class="flex-1" ></ui-num-input>
    <div class="child">
        <ui-prop  v-for="(index, items) in stateArr" track-by="$index" foldable="" indent="1" name={{index}} tooltip="序号:{{index}} ">
            <ui-input placeholder="修改键名" v-value="stateArr[index]" @confirm="changeKey(index)" class="flex-1" resize-v="" tabindex="-1" ></ui-input>
        </ui-prop>
    </div> 
</ui-prop>
  `,
// <cc-array-prop :target.sync="target.stateArr"></cc-array-prop>
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
        save: function () {
            // cc.log("onClick");
            // buttonSave
            this.targetNode.getComponent(this.jsName).buttonSave(this.target.showData.value);
        },

        read: function () {
            var name = this.target.showData.value;
            this.targetNode.getComponent(this.jsName)._read(name);
        },

    	restart: function () {
            // cc.log("restart", this.stateArr);
            var self = this;
            this.jsName = this.target.name.value.split("<", 2)[1].split(">", 1)[0]
            this.targetNode = cc.engine.getInstanceById(this.target.node.value.uuid)
            this.stateArr = this.targetNode.getComponent(this.jsName).stateArr;
            this.numInput = this.target.stateArr.value.length;
            this.storageWords = ["default"];
            for (var i=0;i<this.target.stateArr.value.length;i++){   
                // this.storageWords[i] = this.target.stateArr.value[i].value;
                var value = this.target.stateArr.value[i].value;
                if (value !== "") {
                    this.storageWords.push(value);
                }
            }
            var arr = this.storageWords;
            this.storageWords = null;
            this.storageWords = arr;

            if (!this.targetNode.getComponent(this.jsName).defaultData) {
                this.save();
            }

            this.saveOldArr();
            this.resetData();  
        },

        resetData: function(){
            var self = this;
            this.ready = false;
            setTimeout(function(){
                self.ready = true;
            }, 5);
        },

        changelength: function () {
            // cc.log("change length");
            var self = this;
            var target = this.targetNode.getComponent(this.jsName).stateArr;
            // this.targetNode.getComponent(this.jsName).stateArr.length = this.numInput;
            while (target.length != event.target.value) {
                if (target.length > event.target.value) {
                    // this.storageWords.pop();
                    target.pop();
                }
                else {
                    // this.storageWords.push("");
                    target.push("");
                }
            }
            var arr = this.storageWords;
            this.storageWords = null;
            this.storageWords = arr;

            arr = this.stateArr;
            this.stateArr = null;
            this.stateArr = arr;

            this.saveOldArr();

            this.ready = false;
            setTimeout(function(){
                self.ready = true;
            }, 5);
        },

        changeKey: function (index) {
            // cc.log("changeKey", typeof index, index);
            var value = event.target.value;
            value = value.replace(/\s+/g,"");
            // cc.log("change Key", index, value, typeof value);
            this.targetNode.getComponent(this.jsName)._save(index, value, this.oldArr[index]);
            var arr = this.targetNode.getComponent(this.jsName).stateArr;
            event.target.value = arr[index];
            // cc.log("event", index, arr[index], arr);
            var newArr = ["default"];
            for (var i = 0; i < arr.length; i++) {
                if (arr[i] !== "") {
                    newArr.push(arr[i]);
                }
            }
            this.storageWords = null;
            this.storageWords = newArr;
            //////////////////
            this.stateArr[index] = arr[index];
            // return;
            arr = this.stateArr;
            this.stateArr = null;
            this.stateArr = arr;

            this.saveOldArr();
            if (arr[index] !== "") {
                this.targetNode.getComponent(this.jsName).showData = arr[index];
            }
            if (value === "default") {
                this.targetNode.getComponent(this.jsName).showData = "default";
            }
            // cc.log(typeof this.stateArr, this.stateArr.length, this.stateArr);
            this.resetData();
            return;
        },

        focus:function(index){
        },

        saveOldArr: function () {
            this.oldArr = [];
            for (let i = 0; i < this.stateArr.length; i++) {
                this.oldArr[i] = this.stateArr[i];
            }
        },
    },

    data: function () {
        return {
            numInput:0,
            storageWords:[],
            oldArr: [],
            jsName:"",
            targetNode:null,
            stateArr:[],
            ready:true,
        }
    },
});