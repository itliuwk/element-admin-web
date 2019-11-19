
import Vue from 'vue'
export function getWinWidth() {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}
export function getWinHeight() {
    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
}

export function getMainContainerWidth() {
    return getWinWidth() - 80
}
export function getMainContainerHeight() {
    return getWinHeight() - 80
}


/**
 * 获取屏幕宽高
 */
Vue.prototype.getViewportSize = function () {
    return {
        width: getWinWidth(),
        height: getWinHeight(),
        mainHeight: getMainContainerHeight()
    }
};
// add scrollevent
export function addScrollEvent(dom, event) {
    function addEvent(obj, sEv, fn) {
        if (obj.addEventListener) {
            return obj.addEventListener(sEv, fn, false);
        } else {
            return obj.attachEvent('on' + sEv, fn);
        }
    }


    function addWheel(obj, fn) {
        function wheel(ev) {
            var oEvent = ev || event;
            var bDown = true;
            bDown = oEvent.wheelDelta ? oEvent.wheelDelta > 0 : oEvent.detail < 0;
            fn && fn(bDown);
            oEvent.preventDefault && oEvent.preventDefault();
            return false;
        }

        /*return false阻止浏览器默认行为，遇到绑定添加的事件的时候就失效了；
        所有要用oEvent.preventDefault（）；在使用此方法前要做判断；*/
        if (window.navigator.userAgent.indexOf('Firefox') != -1) {
            obj.addEventListener('DOMMouseScroll', wheel, false)
        } else {
            addEvent(obj, 'scroll', wheel);
        }
    }


    addWheel(dom, event)

}

export function getRequestParam(url, name) {
    if (name = (new RegExp('[?&]' + encodeURIComponent(name) + '=([^&]*)')).exec(url)) {
        return decodeURIComponent(name[1]);
    }
}

export function createProp(type, options) {
    return {
        type: type || Object,
        default() {
            return options
        }
    }
}

