package com.aishwaryam.app;

import android.os.Bundle;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.BridgeWebViewClient;
import android.view.WindowManager;
import android.graphics.Color;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        
        getWindow().clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
        getWindow().setStatusBarColor(Color.parseColor("#4A0E4E"));
        getWindow().getDecorView().setSystemUiVisibility(android.view.View.SYSTEM_UI_FLAG_VISIBLE);
        
        WebView webView = this.getBridge().getWebView();
        if (webView != null) {
            webView.setFitsSystemWindows(true);
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
