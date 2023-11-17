import { LightningElement, api } from 'lwc';

export default class PostalCodesOutput extends LightningElement {
    @api pcevent;
    @api hidemessage;
}