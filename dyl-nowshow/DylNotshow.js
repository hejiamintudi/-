"use strict";

Vue.component("DylNotshow", {
    template: ``,
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

    methods: {
    },

    data: function () {
        return {
        }
    },
});