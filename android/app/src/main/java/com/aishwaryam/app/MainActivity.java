package com.aishwaryam.app;

import android.os.Bundle;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        WebView webView = this.getBridge().getWebView();
        if (webView != null) {
            webView.setWebViewClient(new BridgeWebViewClient(this.getBridge()) {
                @Override
                public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
                    if (request.isForMainFrame()) {
                        view.loadUrl("file:///android_asset/public/offline.html");
                    } else {
                        super.onReceivedError(view, request, error);
                    }
                }

                @SuppressWarnings("deprecation")
                @Override
                public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
                    if (failingUrl != null && (failingUrl.equals("https://aishwaryam-web.pages.dev") || failingUrl.equals("https://aishwaryam-web.pages.dev/"))) {
                        view.loadUrl("file:///android_asset/public/offline.html");
                    } else {
                        super.onReceivedError(view, errorCode, description, failingUrl);
                    }
                }
            });
        }
    }
}
