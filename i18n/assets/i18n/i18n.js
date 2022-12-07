const Polyglot = require('polyglot');

let data = cc.sys.language === 'zh' ? require('zh') : require('en');
// let polyglot = null;
let polyglot = new Polyglot({phrases: data, allowMissing: true});

// module.exports.currentLanguage = () => data
module.exports = {
    /**
     * This method allow you to switch language during runtime, language argument should be the same as your data file name
     * such as when language is 'zh', it will load your 'zh.js' data source.
     * @method init
     * @param language - the language specific data file name, such as 'zh' to load 'zh.js'
     */
    init(language) {
        lang = language;
        data = language === 'zh' ? require('zh') : require('en');
        polyglot.replace(data);
    },
    /**
     * this method takes a text key as input, and return the localized string
     * Please read https://github.com/airbnb/polyglot.js for details
     * @method t
     * @return {String} localized string
     * @example
     *
     * var myText = i18n.t('MY_TEXT_KEY');
     *
     * // if your data source is defined as
     * // {"hello_name": "Hello, %{name}"}
     * // you can use the following to interpolate the text
     * var greetingText = i18n.t('hello_name', {name: 'nantas'}); // Hello, nantas
     */
    t(key, opt) {
        return polyglot.t(key, opt);
    },

    /**
     * get the current language
     */
    currentLocale() {
        return typeof lang !== 'undefined' ? lang : cc.sys.language
    },
    /**
     * very costly iterations
     */
    updateSceneRenderers() {
        let rootNodes = cc.director.getScene().children;
        // walk all nodes with localize label and update
        let allLocalizedLabels = [];
        for (let i = 0; i < rootNodes.length; ++i) {
            let labels = rootNodes[i].getComponentsInChildren('LocalizedLabel');
            Array.prototype.push.apply(allLocalizedLabels, labels);
        }
        for (let i = 0; i < allLocalizedLabels.length; ++i) {
            let label = allLocalizedLabels[i];
            if (!label.node.active) continue;
            label.updateLabel();
        }

        // walk all nodes with localize sprite and update
        let allLocalizedSprites = [];
        for (let i = 0; i < rootNodes.length; ++i) {
            let sprites = rootNodes[i].getComponentsInChildren('LocalizedSprite');
            Array.prototype.push.apply(allLocalizedSprites, sprites);
        }
        for (let i = 0; i < allLocalizedSprites.length; ++i) {
            let sprite = allLocalizedSprites[i];
            if (!sprite.node.active) continue;
            sprite.updateSprite();
        }
    }
};