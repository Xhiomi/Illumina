import { LightningElement, track, wire, api } from 'lwc';
import getPostalCodeInfo from '@salesforce/apex/postalCodesController.getPostalCodeInfo';
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class PostalCodes extends LightningElement {
    @track postalCode;
    @track countryCode;
    @api postalCodeInfo = undefined;
    @api hideMessage = false;
    @api error;

    /*@wire(getPostalCodeInfo,
        {
            countryCode: '$countryCode',
            postalCode: '$postalCode'
        })
        postalCodeInfo;

        wiredPostalCodes({ error, data }) {
            if (data) {
                console.log('data: ', data);
                this.postalCodeInfo = JSON.stringify(data);
                this.error = undefined;
            } else if (error) {
                console.log('error: ', error);
                this.error = JSON.stringify(error);
                this.postalCodeInfo = undefined;
            }
        }*/

    showToast(title, message, variant) {
        const toast = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
            mode: 'pester'
        });
        this.dispatchEvent(toast);
    }

    handlePostalCodeChange(event) {
        this.postalCode = event.target.value;
        this.countryCode = 'us';

        if(this.postalCode.length > 0 && this.postalCode != null) {
            getPostalCodeInfo({
                countryCode: this.countryCode,
                postalCode: this.postalCode
            })
            .then(result => {
                for (let key in result) {
                    if(key == 'Error: ') {
                        this.showToast(key, result[key], 'warning');
                        this.postalCodeInfo = undefined;
                        this.hideMessage = false;
                    } else {
                        this.hideMessage = true;
                        this.postalCodeInfo = JSON.stringify(result);
                    }
                }
            })
            .catch(error => {
                this.showToast('Error', this.error, 'error');
                this.postalCodeInfo = undefined;
                this.hideMessage = false;
            })
        } else {
            this.postalCodeInfo = undefined;
            this.hideMessage = false;
        }
    }
}