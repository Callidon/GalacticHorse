package com.galactichorse;

public class UrlDataBean {
    private String url;
    private String data;

    public UrlDataBean() {
        url = null;
        data = null;
    }

    public UrlDataBean(String url, String data) {
        this.url = url;
        this.data = data;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}
