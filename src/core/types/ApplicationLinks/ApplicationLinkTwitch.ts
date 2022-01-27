import { DesmosApplicationLinkState } from "desmosjs";
import ApplicationLink from "../ApplicationLink";

export default class ApplicationLinkTwitch extends ApplicationLink {
    readonly name: string = 'twitch';
    readonly displayName: string = 'Twitch';
    readonly logo: string = require('@/assets/brands/twitch/logo.svg');
    readonly url: string = "https://www.twitch.tv/";
    readonly redirectUrl = `${this.url}${this.username}`;


    constructor(username: string, state = DesmosApplicationLinkState.APPLICATION_LINK_STATE_INITIALIZED_UNSPECIFIED) {
        super(username, state);
    }

}