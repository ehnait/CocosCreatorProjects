const SpriteFrameSet = require('SpriteFrameSet');
const i18n = require('i18n');

cc.Class({
    extends: cc.Component,

    editor: {
        executeInEditMode: true,
        menu: 'i18n/LocalizedSprite'
    },

    properties: {
        spriteFrameSet: {
            default: [],
            type: SpriteFrameSet,
            tooltip: 'Enter sprite frame here',
            notify: function () {
                this.fetchRender();
            }
        }
    },

    onLoad() {
        this.fetchRender();
    },

    fetchRender() {
        let sprite = this.getComponent(cc.Sprite);
        if (sprite) {
            this.sprite = sprite;
            this.updateSprite();
            return;
        }
    },

    getSpriteFrameByLang(lang) {
        for (let i = 0; i < this.spriteFrameSet.length; ++i) {
            if (this.spriteFrameSet[i].language === lang) {
                return this.spriteFrameSet[i].spriteFrame;
            }
        }
    },

    updateSprite() {
        if (!this.sprite) {
            cc.error('Failed to update localized sprite, sprite component is invalid!');
            return;
        }

        let language = i18n.currentLocale();

        let spriteFrame = this.getSpriteFrameByLang(language);

        if (!spriteFrame && this.spriteFrameSet[0]) {
            spriteFrame = this.spriteFrameSet[0].spriteFrame;
        }

        this.sprite.spriteFrame = spriteFrame;
    }
});