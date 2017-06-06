declare var ccui: any;
import  { ICreationOptions } from "./../ICreationOptions";
/**
 * @description emum providing identifiable colour options for MockAsset
 */
export enum MockAssetColours {
    RED,
    BLUE,
    YELLOW,
    GREEN,
    PINK,
    NONE


};

/**
 * @class MockAsset
 * @description a cc.Node derived class for creating mock assets ,creates a circle with given radius, containing a label with optional  text
 * Template option T is for the Type used to describe type generally string | int | enumtype
 */
export class MockAsset<T> extends cc.Node {
    _visibleNode: cc.Node= null;
    _objecttype: T = null;
    _circleNode: cc.DrawNode;


    constructor(config: ICreationOptions<T>, radius: number =20, COLOUR: MockAssetColours = MockAssetColours.BLUE, text: string ="Text") {
        super();
        this.ctor();

        this._objecttype = config.getType();
        this.setName(config.getName());

        this.setContentSize(radius * 2, radius * 2);
        this.setAnchorPoint(0.5, 0.5);
        this._circleNode = new cc.DrawNode();
        this._circleNode.drawDot(cc.p(radius, radius), radius,this.getColour(COLOUR));
        this.addChild(this._circleNode);


        var textF = new ccui.Text();
        textF.boundingWidth = radius * 2;
        textF.boundingHeight = 30;
        textF.attr({
            textAlign: cc.TEXT_ALIGNMENT_CENTER,
            string: text,
            font: "20px Ariel",
            x: radius
        });
        textF.y = radius - textF.height / 8;
        this.addChild(textF);

    }

    getColour(colour: MockAssetColours):cc.Color {

        switch (colour) {
            case MockAssetColours.RED:
                return new cc.Color(187, 56, 10, 255);
            case MockAssetColours.GREEN:
                return new cc.Color(12, 123, 2, 255);
            case MockAssetColours.BLUE:
                return new cc.Color(27, 68, 174, 255);
            case MockAssetColours.PINK:
                return new cc.Color(211, 62, 109, 255);
            case MockAssetColours.YELLOW:
                return new cc.Color(242, 171, 52, 255);
            case MockAssetColours.NONE:
                return new cc.Color(255, 255, 255, 255);
        }

    }

}