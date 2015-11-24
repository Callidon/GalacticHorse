package com.galactichorse;

import com.google.api.server.spi.config.*;
import com.google.appengine.api.datastore.*;
import com.hp.hpl.jena.rdf.model.InfModel;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.reasoner.Reasoner;
import com.hp.hpl.jena.reasoner.ReasonerRegistry;
import com.hp.hpl.jena.reasoner.ValidityReport;
import org.apache.jena.riot.Lang;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Api(name = "search")
public class Search {
    private static final String ENTITY_KIND_URL_TAGS = "url_tags";
    private static final String ENTITY_KIND_URL_JSONLD = "url_jsonld";

    @ApiMethod(name = "put", httpMethod = ApiMethod.HttpMethod.POST)
    public void put(UrlTagsBean urlTags) throws Exception {
        URL url = new URL(urlTags.getUrl());
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Entity entity = new Entity(ENTITY_KIND_URL_TAGS, urlTags.getUrl());
        for (Map.Entry<String, Object> tag : urlTags.getTags().entrySet()) {
            entity.setProperty(tag.getKey(), tag.getValue());
        }
        datastore.put(entity);
    }

    @ApiMethod(name = "put_jsonld", httpMethod = ApiMethod.HttpMethod.POST)
    public void putJsonld(UrlJsonldBean urlJsonld) throws Exception {
        URL url = new URL(urlJsonld.getUrl());
        Model ontology = Ontology.getOntologyModel();
        Model model = ModelFactory.createDefaultModel();
        model.read(new ByteArrayInputStream(urlJsonld.getJsonld().getBytes()), null, Lang.JSONLD.getLabel());
        Reasoner reasoner = ReasonerRegistry.getOWLReasoner();
        reasoner = reasoner.bindSchema(ontology);
        InfModel infmodel = ModelFactory.createInfModel(reasoner, model);
        ValidityReport validityReport = infmodel.validate();
        if (!validityReport.isValid()) {
            throw new Exception();
        }
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Entity entity = new Entity(ENTITY_KIND_URL_JSONLD, urlJsonld.getUrl());
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        infmodel.write(baos, Lang.JSONLD.getLabel());
        entity.setProperty("jsonld", baos.toString());
        datastore.put(entity);
    }

    @ApiMethod(name = "search", httpMethod = ApiMethod.HttpMethod.POST)
    public Collection<UrlTagsBean> searchUrls(UrlsBean urls) {
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Collection<Key> keys = new ArrayList<Key>();
        Collection<UrlTagsBean> urlTagsCollection = new ArrayList<UrlTagsBean>();
        for (String url : urls.getUrls()) {
            keys.add(KeyFactory.createKey(ENTITY_KIND_URL_TAGS, url));
        }
        for (Map.Entry<Key, Entity> entry : datastore.get(keys).entrySet()) {
            UrlTagsBean urlTags = new UrlTagsBean();
            urlTags.setUrl(entry.getKey().getName());
            urlTags.setTags(entry.getValue().getProperties());
            urlTagsCollection.add(urlTags);
        }
        return urlTagsCollection;
    }
}

class UrlTagsBean {
    private String url;
    private Map<String, Object> tags;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Map<String, Object> getTags() {
        return tags;
    }

    public void setTags(Map<String, Object> tags) {
        this.tags = tags;
    }
}

class UrlsBean {
    private Collection<String> urls;

    public Collection<String> getUrls() {
        return urls;
    }

    public void setUrls(Collection<String> urls) {
        this.urls = urls;
    }
}

class UrlJsonldBean {
    private String url;
    private String jsonld;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getJsonld() {
        return jsonld;
    }

    public void setJsonld(String jsonld) {
        this.jsonld = jsonld;
    }
}
