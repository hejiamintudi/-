"use strict";

var fs = require( 'fs' );
var path = require("path");

var pathName = Editor.Project.path + "/assets";

var walk = function(dir) {
    var results = []
    var list = fs.readdirSync(dir)
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) 
            results = results.concat(walk(file));
        else 
            results.push(file);
    })
    return results;
}



Vue.component("DylButton", {
    template: `
<ui-prop name="触发事件">
    <ui-select v-if=ready @confirm="changeNodeName()" v-value="target.nodeName.value" tabindex="-1" resize-v="" class="flex-1">
      <option v-for="(index, items) in nodeNameArr" value={{items}} title={{items}} >{{items}}</option>
    </ui-select>
    <ui-select v-if=ready @confirm="changeJsName()" v-value="target.jsName.value" tabindex="-1" resize-v="" class="flex-1">
      <option v-for="(index, items) in jsNameArr" value={{items}} title={{items}} >{{items}}</option>
    </ui-select>
    <ui-select v-if=ready @confirm="changeFunName()" v-value="target.funName.value" tabindex="-1" resize-v="" class="flex-1">
      <option v-for="(index, items) in funNameArr" value={{items}} title={{items}} >{{items}}</option>
    </ui-select>
</ui-prop>

<ui-prop name="类别">
    <ui-select v-if=ready @confirm="changeType()" tabindex="-1" resize-v="" class="flex-1" v-bind:value="chType">
      <option v-for="(index, items) in typeArr" value={{items}} title={{items}} >{{items}}</option>
    </ui-select>
</ui-prop>

<ui-prop name="场景名" v-show=nextSceneShow>
    <ui-select v-if=ready @confirm="changeScene()" tabindex="-1" resize-v="" class="flex-1" v-bind:value="sceneName">
      <option v-for="(index, items) in sceneArr" value={{items}} title={{items}} >{{items}}</option>
    </ui-select>
</ui-prop>

<ui-prop name="弹窗" style="padding-top: 10px" v-show=popupShow>
    <ui-node v-if=ready v-value="target.popupNode.value.uuid" tabindex="-1" resize-v="" class="flex-1"></ui-node>
    <ui-select v-if=ready @confirm="changePopup()" tabindex="-1" resize-v="" class="flex-1">
      <option v-for="(index, items) in nodeNameArr" value={{items}} title={{items}} >{{items}}</option>
    </ui-select>
</ui-prop>
<ui-prop name="弹窗" style="padding-top: 10px" v-show=popdownShow>
    <ui-node v-if=ready v-value="target.popdownNode.value.uuid" tabindex="-1" resize-v="" class="flex-1"></ui-node>
    <ui-select v-if=ready @confirm="changePopdown()" tabindex="-1" resize-v="" class="flex-1">
      <option v-for="(index, items) in nodeNameArr" value={{items}} title={{items}} >{{items}}</option>
    </ui-select>
</ui-prop>
<ui-prop name="金币数" v-prop="target.coin" v-show=buyShow></ui-prop>
<ui-prop name="金币单位" v-prop="target.coinName" v-show=buyShow></ui-prop>
<ui-prop name="购买物品" v-prop="target.toolName" v-show=buyShow></ui-prop>


  `,

// <cc-event-prop :target.sync="target.touchFun"></cc-event-prop>
//   <cc-event-prop :target.sync="target.clickEvents"></cc-event-prop>
// // <ui-box-container v-prop="target.popEvent" v-show=popEventShow></ui-box-container>
// // <ui-prop v-prop="target.popEvent" v-show="target.sceneType.value=="Popup"||target.sceneType.value=="Popdown""></ui-prop>

// // <ui-prop v-prop="target.msgEnum" v-show="target.EnumWindowType.value==2"></ui-prop>

// // <ui-prop v-prop="target.EnumWindowType"></ui-prop>
// // <ui-prop name="showData" tooltip="当前状态" >
//     <ui-select v-if=ready @confirm="read()" tabindex="-1" resize-v="" class="flex-1 large" v-value="target.showData.value">
//       <option v-for="(index, items) in storageWords" value={{items}} title={{items}} >{{items}}</option>
//     </ui-select>
//     <ui-button class="blue small" style="min-width:100px"
//       @confirm="save()" >
//      保存
//     </ui-button>
// </ui-prop>
// <ui-prop v-if=ready foldable="" indent="0" tabindex="-1" name="stateArr">
//     <ui-num-input @confirm="changelength()" v-value=numInput min="0"  step="1" tabindex="-1" class="flex-1" ></ui-num-input>
//     <div class="child">
//         <ui-prop  v-for="(index, items) in stateArr" track-by="$index" foldable="" indent="1" name={{index}} tooltip="序号:{{index}} ">
//             <ui-input placeholder="修改键名" v-value="stateArr[index]" @confirm="changeKey(index)" class="flex-1" resize-v="" tabindex="-1" ></ui-input>
//         </ui-prop>
//     </div> 
// </ui-prop>
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
            // buttonSave
            this.targetNode.getComponent(this.jsName).buttonSave(this.target.showData.value);
        },

        changeNodeName: function () {
            var value = event.target.value;
            var js = this.targetNode.getComponent(this.jsName);
            js.nodeName = value;
            js.jsName = "";
            js.funName = "";
            this.resetJsNameArr();
        },

        changeJsName: function () {
            var value = event.target.value;
            var js = this.targetNode.getComponent(this.jsName);
            js.jsName = value;
            js.funName = "";
            this.resetFunNameArr();
        },

        changeFunName: function () {
            var value = event.target.value;
            var js = this.targetNode.getComponent(this.jsName);
            js.funName = value;
        },

        changeType: function () {
            // var name = this.target.showData.value;
            // this.targetNode.getComponent(this.jsName)._read(name);
            var typeId = this.typeArr.indexOf(event.target.value);
            this.targetNode.getComponent(this.jsName).sceneType = this.enTypeArr[typeId];
            this.refreshType();
        },

        changeScene: function () {
            // var typeId = this.sceneArr.indexOf(event.target.value);
            // this.targetNode.getComponent(this.jsName).nextScene = this.sceneArr[typeId];
            this.targetNode.getComponent(this.jsName).nextScene = event.target.value;
            // this.refreshType();
        },

        changePopup: function () {
            var value = event.target.value;
            if (value === "") {
                this.js.popupNode = null;
            }
            else {
                this.js.popupNode = this.getNode(value);
            }
        },

        changePopdown: function () {
            var value = event.target.value;
            if (value === "") {
                this.js.popdownNode = null;
            }
            else {
                this.js.popdownNode = this.getNode(value);
            }
        },

        refreshType: function () {
            var sceneType = this.targetNode.getComponent(this.jsName).sceneType;
            this.nextSceneShow = (sceneType === "NextScene");
            this.popupShow = (sceneType === "Popup");
            this.popdownShow = (sceneType === "Popdown");
            this.buyShow = (sceneType === "Buy");
        },

        getSceneName: function (pathArr) {
            // Editor.log(typeof allPathStr);
            // Editor.log(allPathStr);
            // var pathArr = allPathStr.split(",");
            var ansArr = [];
            for (var i = 0; i < pathArr.length; i++) {
                var url = pathArr[i];
                var arr = url.split("/");
                var name = arr[arr.length - 1];
                arr = name.split(".");
                if (arr[arr.length - 1] === "fire") {
                    ansArr.push(arr[0]);
                }
                // name = name.split(".")[0];
                // ansArr.push(name);
            }
            return ansArr;
        },

        restart: function () {
            this.jsName = this.target.name.value.split("<", 2)[1].split(">", 1)[0]
            this.targetNode = cc.engine.getInstanceById(this.target.node.value.uuid)
            this.js = this.targetNode.getComponent(this.jsName);

            // if (!this.js.audio) {
            //     cc.log("1111");
            //     cc.log("111");
            //     var uuid = Editor.assetdb.remote.urlToUuid('db://assets/res/kk.mp3');
            //     cc.log("22")
            //     cc.log(uuid);
            //     this.targetNode.getComponent(this.jsName).audio._uuid = uuid;
            // }
            // else {
            //     cc.log("222");
            // }

            var sceneType = this.js.sceneType;

            this.typeArr = ["空", "切换场景", "下一关", "重玩", "退出游戏", "弹窗", "退出弹窗", "购买"];
            this.enTypeArr = ["Null", "NextScene", "NextLevel", "Restart", "ExitGame", "Popup", "Popdown", "Buy"];            
            var typeId = this.enTypeArr.indexOf(sceneType);
            this.chType = this.typeArr[typeId];
            this.refreshType();

            this.sceneArr = this.getSceneName(walk(pathName));
            // this.sceneArr = this.js.getSceneArr();
            var sceneId = 0;
            this.sceneName = this.js.nextScene;
            // if (this.sceneName === "") {
            //     this.sceneName = this.sceneArr[0];
            // }
            for (var i = 0; i < this.sceneArr.length; i++) {
                if (this.sceneName === this.sceneArr[i]) {
                    sceneId = i;
                }
            }
            this.sceneName = this.sceneArr[sceneId];
            // sceneId = this.sceneArr.indexOf(this.sceneName);
            this.js.nextScene = this.sceneName;
            // cc.log("chType", this.chType);

            var nodeName = this.js.nodeName;
            var jsName = this.js.jsName;
            var funName = this.js.funName;
            // cc.log(nodeName, jsName, funName);
            this.resetNodeNameArr();
            this.js.nodeName = nodeName;
            this.resetJsNameArr();
            this.js.jsName = jsName;
            this.resetFunNameArr();
            this.js.funName = funName;
            this.resetData();


            // cc.log("restart", this.stateArr);
            // var self = this;
            // this.stateArr = this.targetNode.getComponent(this.jsName).stateArr;
            // this.numInput = this.target.stateArr.value.length;
            // this.storageWords = ["default"];
            // for (var i=0;i<this.target.stateArr.value.length;i++){   
            //     // this.storageWords[i] = this.target.stateArr.value[i].value;
            //     var value = this.target.stateArr.value[i].value;
            //     if (value !== "") {
            //         this.storageWords.push(value);
            //     }
            // }
            // var arr = this.storageWords;
            // this.storageWords = null;
            // this.storageWords = arr;

            // if (!this.targetNode.getComponent(this.jsName).defaultData) {
            //     this.save();
            // }

            // this.saveOldArr();
            this.resetData();  
        },

        resetNodeNameArr: function () {
            var arr = [""];
            var fun = function (node) {
                if (node.name[0] === "_") {
                    arr.push(node.name);
                }
                var childArr = node.getChildren();
                for (var i = childArr.length - 1; i >= 0; i--) {
                    fun(childArr[i]);
                }
            }
            fun(this.js.getTopNode());
            this.nodeNameArr = null;
            this.nodeNameArr = arr;
            this.resetData();
        },

        getNode: function (name) {
            var fun = function (node) {
                if (node.name === name) {
                    return node;
                }
                var childArr = node.getChildren();
                for (var i = childArr.length - 1; i >= 0; i--) {
                    var tmp = fun(childArr[i]);
                    if (tmp) {
                        return tmp;
                    }
                }
            }
            return fun(this.js.getTopNode());
        },

        resetJsNameArr: function () {
            var arr = [""];
            if (this.js.nodeName === "") {
                this.jsNameArr = null;
                this.jsNameArr = arr;
                this.js.jsName = "";
                return this.resetFunNameArr();
            }
            var components = this.getNode(this.js.nodeName)._components;
            for (var i = components.length - 1; i >= 0; i--) {
                var name = components[i].constructor.name;
                if (name.split("cc_")[0] === "") {
                    continue;
                }
                arr.push(name);
            }
            this.jsNameArr = null;
            this.jsNameArr = arr;
            this.js.jsName = "";
            this.resetFunNameArr();
        },

        resetFunNameArr: function () {
            var arr = [""];
            if (this.js.jsName === "") {
                this.funNameArr = null;
                this.funNameArr = arr;
                this.js.funName = "";
                return this.resetData();
            }
            var oriFunArr = [
                                 "addComponent",
                                 "getComponent", 
                                 "getComponents", 
                                 "getComponentInChildren", 
                                 "getComponentsInChildren", 
                                 "destroy", 
                                 "isRunning", 
                                 "schedule", 
                                 "scheduleOnce", 
                                 "unschedule",
                                 "unscheduleAllCallbacks"
                            ];
            var checkOriFun = function (name) {
                for (var i = oriFunArr.length - 1; i >= 0; i--) {
                    if (oriFunArr[i] === name) {
                        return true;
                    }
                }
                return false;
            }
            var js = this.getNode(this.js.nodeName).getComponent(this.js.jsName);
            for (var i in js) {
                if ((typeof js[i] === "function") && (i[0] !== "_") && (!checkOriFun(i))) {
                    // cc.log(i);
                    arr.push(i);
                }
            }
            this.funNameArr = null;
            this.funNameArr = arr;
            this.js.funName = "";
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
            typeArr: [],
            chType: "空",
            sceneName: "",
            sceneArr: [],
            enTypeArr: [],
            nextSceneShow: false,
            popdownShow: false,
            popupShow: false,
            buyShow: false,
            nodeNameArr: ["h", "j", "m"],
            jsNameArr: ["d", "y", "l"],
            funNameArr: ["t", "z"],

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