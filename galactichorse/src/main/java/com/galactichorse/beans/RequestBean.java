package com.galactichorse.beans;

import java.util.Collection;

/**
 *
 */
public class RequestBean {
    private String url;
    private Collection<String> urls;
    private String model;

    public RequestBean() {
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Collection<String> getUrls() {
        return urls;
    }

    public void setUrls(Collection<String> urls) {
        this.urls = urls;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
