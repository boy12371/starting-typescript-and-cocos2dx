import { ViewController } from "./../../tslib/dalste/ViewController";
import { ScreenTypes } from "./../types/ScreenTypes";
import { ApplicationEvents } from "./../events/ApplicationEvents";
import { Display } from "./../../tslib/dalste/util/Display";


export class SplashScreenViewController extends ViewController {


    //inject
    private _display: Display = undefined;

    onViewReady(): void {
        this.getView().getEventBus().add(this.onViewEvent, this);
        this.getView().getEnterSignal().add(this.onViewEnter, this);
        this.getView().getExitSignal().add(this.onViewExit, this);
        this.getView().getEnterTransitionDidFinishSignal().add(this.onViewEnterTransitionDidFinish, this);
        this.getView().getExitTransitionDidStartSignal().add(this.onViewExitTransitionDidStart, this);
    }

    onViewEnter(): void {
        cc.log("SplashScreenViewController::onViewEnter");
    }

    onViewEnterTransitionDidFinish(): void {
        cc.log("SplashScreenViewController::onViewEnterTransitionDidFinish");
    }

    onViewExit(): void {
        cc.log("SplashScreenViewController::onViewExit");
    }

    onViewExitTransitionDidStart(): void {
        cc.log("SplashScreenViewController::onViewExitTransitionDidStart");
    }
    
    onViewEvent(event: string): void {

        switch (event) {
            case "playGameButtonPressed":
                this._system.notify(ApplicationEvents.APP_GOTO_PLAY_SCENE);
                break;
        }

    }




}