package com.galactichorse;

import com.google.api.server.spi.config.*;
import com.google.appengine.api.datastore.*;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@Api(name = "search")
public class Search {
    private static final String ENTITY_KIND_URL_TAGS = "url_tags";
    private static final String ENTITY_PROPERTY_TAG_PREFIX = "tag/";
    private static final String ENTITY_PROPERTY_URL_PROTOCOL = "protocol";
    private static final String ENTITY_PROPERTY_URL_AUTHORITY = "authority";
    private static final String ENTITY_PROPERTY_URL_HOST = "host";
    private static final String ENTITY_PROPERTY_URL_PORT = "port";
    private static final String ENTITY_PROPERTY_URL_PATH = "path";
    private static final String ENTITY_PROPERTY_URL_QUERY = "query";
    private static final String ENTITY_PROPERTY_URL_FILE = "filename";
    private static final String ENTITY_PROPERTY_URL_REF = "ref";

    @ApiMethod(name = "put", httpMethod = ApiMethod.HttpMethod.POST)
    public void put(UrlTagsBean urlTags) throws MalformedURLException {
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Entity entity = new Entity(ENTITY_KIND_URL_TAGS, urlTags.getUrl());
        for (Map.Entry entry : urlTags.getTags().entrySet()) {
            entity.setProperty(ENTITY_PROPERTY_TAG_PREFIX + entry.getKey(), entry.getValue());
        }
        URL url = new URL(urlTags.getUrl());
        entity.setProperty(ENTITY_PROPERTY_URL_AUTHORITY, url.getAuthority());
        entity.setProperty(ENTITY_PROPERTY_URL_FILE, url.getFile());
        entity.setProperty(ENTITY_PROPERTY_URL_HOST, url.getHost());
        entity.setProperty(ENTITY_PROPERTY_URL_PATH, url.getPath());
        entity.setProperty(ENTITY_PROPERTY_URL_PORT, url.getPort());
        entity.setProperty(ENTITY_PROPERTY_URL_PROTOCOL, url.getProtocol());
        entity.setProperty(ENTITY_PROPERTY_URL_QUERY, url.getQuery());
        entity.setProperty(ENTITY_PROPERTY_URL_REF, url.getRef());
        datastore.put(entity);
    }

    @ApiMethod(name = "search_urls", httpMethod = ApiMethod.HttpMethod.POST)
    public Collection<Entity> searchUrls(UrlsBean urls) {
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Collection<Key> keys = new ArrayList<Key>();
        for (String url : urls.getUrls()) {
            keys.add(KeyFactory.createKey(ENTITY_KIND_URL_TAGS, url));
        }
        return datastore.get(keys).values();
    }

    @ApiMethod(name = "search_tags", httpMethod = ApiMethod.HttpMethod.POST)
    public void searchTags(TagsBean tags) {
        ;
    }

    @ApiMethod(name = "search_hosts", httpMethod = ApiMethod.HttpMethod.POST)
    public Collection<Entity> searchUrlsHost(UrlsBean urlsBean) {
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Query.Filter filter =
                new Query.FilterPredicate(ENTITY_PROPERTY_URL_HOST,
                        Query.FilterOperator.IN,
                        urlsBean.getUrls());
        Query query = new Query(ENTITY_KIND_URL_TAGS).setFilter(filter);
        return datastore.prepare(query).asList(FetchOptions.Builder.withDefaults());
    }
}

class UrlTagsBean {
    private String url;
    private Map<String, String> tags;

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Map<String, String> getTags() {
        return tags;
    }

    public void setTags(Map<String, String> tags) {
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

class TagsBean {
    private Map<String, String> tags;

    public Map<String, String> getTags() {
        return tags;
    }

    public void setTags(Map<String, String> tags) {
        this.tags = tags;
    }
}
