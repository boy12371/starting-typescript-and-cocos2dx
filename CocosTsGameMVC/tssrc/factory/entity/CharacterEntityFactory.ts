import { IFactory } from "./../IFactory";
import { EnemySecondaryState } from "./../../component/GameComponents";
import { EnemySecondaryStates } from "./../../component/GameComponents";
import { EnemyPrimaryStates } from "./../../component/GameComponents";
import { PositionComponent } from "./../../component/GameComponents";

import { StateComponent } from "./../../component/GameComponents";
import { PlayerInput } from "./../../component/GameComponents";
import { CharacterAssetTypes } from "./../../types/AssetTypes";
import { CharacterAssetCreationOptions } from "./../view/CharacterAssetFactory";
import { Entity } from "./../../../tslib/moon/src/Entity";

import { CharacterEntityTypes } from "./../../types/EntityTypes";
import { ICreationOptions } from "./../ICreationOptions";

import { CocosRenderNode, Player, NPC,EnemyStateComponent, PlayerStateComponent,PlayerPrimaryState,EnemyPrimaryState } from "./../../component/GameComponents";
import { Display } from "./../../../tslib/dalste/util/Display";
import  {StateMachine,StateMachineConfig} from "javascript-state-machine";

/**
 * @class CharacterEntityCreationOptions
 * @description provides creation options to CharacterAssetFactory
 */
export class CharacterEntityCreationOptions implements ICreationOptions<CharacterEntityTypes>{
    private _type: CharacterEntityTypes;
    private _name: string;



    /**
     * 
     * @param type - the type of object to create 
     * @param name -the name assigned to the cc.node see cc.node.name
     */
    constructor(type: CharacterEntityTypes, name: string) {
        this._type = type;
        this._name = name;
    }
    getType(): CharacterEntityTypes {
        return this._type;
    }

    getName(): string {
        return this._name;
    }
}

/**
 * @class CharacterAssetFactory
 * @param CharacterAssetCreationOptions
 * Uses the returned type from character creation options to create the appropriate cc.Node derived asset
 * 
 */
export class CharacterEntityFactory implements IFactory<CharacterEntityCreationOptions, Entity> {
    //inject
    private _characterAssetFactory: IFactory<CharacterAssetCreationOptions, cc.Node> = null;

    //inject 
    private _display:Display = undefined;

    create(options: CharacterEntityCreationOptions): Entity {
        var e = new Entity();
        switch (options.getType()) {
            case CharacterEntityTypes.NPC:
                var caco = new CharacterAssetCreationOptions(CharacterAssetTypes.NPC, "NPC");
                var asset = this._characterAssetFactory.create(caco);
                asset.setPosition(this._display.middleMiddle().x,this._display.middleMiddle().y+100);

                var posc = new PositionComponent();
                posc.position = cc.p(asset.getPositionX(),asset.getPositionY());
                e.addComponent(posc);

                var crnc = new CocosRenderNode();
                crnc.node = asset;
                e.addComponent(crnc);

                var sc = new EnemyStateComponent();
                var psmc:StateMachineConfig = {
                    initial:EnemyPrimaryStates.IDLE,
                    events: [
                        { name: 'start',  from: EnemyPrimaryStates.IDLE,  to: EnemyPrimaryStates.MOVING },
                        { name: 'die', from: EnemyPrimaryStates.MOVING , to: EnemyPrimaryStates.DEAD   },
                    ]
                };
                sc.primaryState =  StateMachine.create(psmc) as EnemyPrimaryState;

                var ssmc:StateMachineConfig = {
                    initial:EnemySecondaryStates.NONE,
                    events: [
                        { name: 'moveLeft',  from:[ EnemySecondaryStates.NONE, EnemySecondaryStates.MOVING_RIGHT],  to: EnemySecondaryStates.MOVING_LEFT },
                        { name: 'moveRight', from: [ EnemySecondaryStates.NONE, EnemySecondaryStates.MOVING_LEFT] , to: EnemySecondaryStates.MOVING_RIGHT   },
                    ]
                };
                sc.secondaryState =  StateMachine.create(ssmc) as EnemySecondaryState;
                e.addComponent(sc);


                var npc = new NPC();
                e.addComponent(npc);

                break;


            case CharacterEntityTypes.PLAYER:
                var caco = new CharacterAssetCreationOptions(CharacterAssetTypes.PLAYER, "PLAYER");
                var asset = this._characterAssetFactory.create(caco);
                asset.setPosition(this._display.middleMiddle().x,this._display.middleMiddle().y);
                
                var posc = new PositionComponent();
                posc.position = cc.p(asset.getPositionX(),asset.getPositionY());
                e.addComponent(posc);

                var crnc = new CocosRenderNode();
                crnc.node = asset;
                e.addComponent(crnc);

                var pc = new Player();
                e.addComponent(pc);
                var psc = new PlayerStateComponent();
                var smc:StateMachineConfig = {
                    initial:"alive",
                    events: [
                
                        { name: 'die', from: 'alive', to: 'dead'   },
                    ]
                };
                psc.primaryState =  StateMachine.create(smc) as PlayerPrimaryState;
                e.addComponent(psc);
                
                var pi = new PlayerInput(); //register for input events
                e.addComponent(pi);
                break;
        }
        return e;

    }
}
