public with sharing class postalCodesController {

    @AuraEnabled(cacheable=true)
    public static Map<String,String> getPostalCodeInfo(String countryCode, String postalCode) {
        Map<String,String> res = new Map<String,String>();
        Http http = new Http ();
        HttpRequest req = new HttpRequest ();
        HttpResponse resp = new HttpResponse ();

        req.setMethod('GET');
        //req.setHeader('Authorization', 'Bearer ' + UserInfo.getSessionId());
        //req.setEndpoint('callout:PostalCode' + '/' + countryCode + '/' + postalCode);
        req.setEndpoint('http://api.zippopotam.us/' + countryCode + '/' + postalCode);

        try {
            resp = http.send(req);

            if(resp.getStatusCode() == 200) {
                res.put(postalCode, resp.getBody());
            } else {
                res.put('Error: ', postalCode + ' ' + resp.getStatus());
            }
        } catch (Exception e) {
            res.put('Error: ', e.getMessage());
        }

        return res;
    }
}