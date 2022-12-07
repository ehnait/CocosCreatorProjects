const i18n = require('../i18n/i18n');
cc.Class({
    extends: cc.Component,

    switchLanguage(event, customEventData) {
        // let node = event.target;
        if (i18n.currentLocale() === 'en') {
            i18n.init('zh');
        } else {
            i18n.init('en');
        }
        i18n.updateSceneRenderers()
    },
});
