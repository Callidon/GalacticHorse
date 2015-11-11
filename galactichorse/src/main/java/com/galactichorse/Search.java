package com.galactichorse;

import com.google.api.server.spi.config.*;
import com.google.appengine.api.datastore.*;

import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Api(name = "search")
public class Search {
    private static final String ENTITY_KIND_URL_TAGS = "url_tags";

    @ApiMethod(name = "put", httpMethod = ApiMethod.HttpMethod.POST)
    public void put(UrlTagsBean urlTags) throws Exception {
        URL url = new URL(urlTags.getUrl());
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Entity entity = new Entity(ENTITY_KIND_URL_TAGS, urlTags.getUrl());
        for (Map.Entry<String, Object> tag: urlTags.getTags().entrySet()) {
            entity.setProperty(tag.getKey(), tag.getValue());
        }
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
        for (Map.Entry<Key, Entity> entry: datastore.get(keys).entrySet()) {
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
