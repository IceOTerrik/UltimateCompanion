package org.apache.cordova.xapkreader;

import com.google.android.vending.expansion.downloader.impl.DownloaderService;

/**
 * This class demonstrates the minimal client implementation of the
 * DownloaderService from the Downloader library.
 */
public class XAPKDownloaderService extends DownloaderService {

    // stuff for LVL -- MODIFY FOR YOUR APPLICATION!
    private static final String BASE64_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuiVnokEpI0wU5EWll178Xeep6rA6hstLUf7Lsk/1nUgxtFNvxyeflXkjzff3h7Ki8KYF79K5Ck8scx9qmrsNmL53RMKuZeLM8HfnIFgicB/MaF0SnsofHpmr+1fLOzGWBE66m5et1eRci4+7DWFt++NhiVgh2jGigV3jnnFguipyfGaCORbd8sEXVI3u4tFCWOVJrDIaJUPo5yCJsrqu1hg5fRbiD8bs73wVxp0R7KpDKElM0KLVLTOVjKaHkTkCvADOgA64fZ1N0OKFpoVN7Zq/qzVZ4VJPukqR5nOc8hyxTHeX1blNiM7kHZT4+iPXqi2CHsPv0xuflAktpZ5hmwIDAQAB";

    // used by the preference obfuscater
    private static final byte[] SALT = new byte[] {
        1, 43, -12, -1, 54, 98, -100, -12, 43, 2, -8, -4, 9, 5, -106, -108, -33, 45, -1, 84
    };

    /**
     * This public key comes from your Android Market publisher account, and it
     * used by the LVL to validate responses from Market on your behalf.
     */
    @Override
    public String getPublicKey() {
        return BASE64_PUBLIC_KEY;
    }

    /**
     * This is used by the preference obfuscater to make sure that your
     * obfuscated preferences are different than the ones used by other
     * applications.
     */
    @Override
    public byte[] getSALT() {
        return SALT;
    }

    /**
     * Fill this in with the class name for your alarm receiver. We do this
     * because receivers must be unique across all of Android (it's a good idea
     * to make sure that your receiver is in your unique package)
     */
    @Override
    public String getAlarmReceiverClassName() {
        return XAPKAlarmReceiver.class.getName();
    }

}