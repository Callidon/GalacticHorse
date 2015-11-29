package com.galactichorse.beans;

import java.util.Map;

/**
 *
 */
public class ResponseBean {
    private String ontology;
    private Map<String, String> urlModels;
    private Map<String, LinkBean> _links;

    public ResponseBean() {
    }

    public String getOntology() {
        return ontology;
    }

    public void setOntology(String ontology) {
        this.ontology = ontology;
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
