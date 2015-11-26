package com.galactichorse.beans;

import java.util.Collection;
import java.util.Map;

/**
 */
public class DataBean {
    private Object data;
    private String model;
    private String url;
    private Collection<String> urls;
    private Map<String, String> urlModels;
    private Map<String, LinkBean> _links;

    public DataBean() {
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
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

    public Map<String, String> getUrlModels() {
        return urlModels;
    }

    public void setUrlModels(Map<String, String> urlModels) {
        this.urlModels = urlModels;
    }

    public Map<String, LinkBean> get_links() {
        return _links;
    }

    public void set_links(Map<String, LinkBean> _links) {
        this._links = _links;
    }
}
