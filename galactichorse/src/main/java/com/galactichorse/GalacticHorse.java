package com.galactichorse;

import com.google.api.server.spi.config.*;
import com.google.appengine.api.datastore.*;

@Api(name = "galactichorse",
        version = "v1",
        namespace = @ApiNamespace(ownerDomain = "galactichorse.com",
                ownerName = "galactichorse.com",
                packagePath=""))
public class GalacticHorse {
    @ApiMethod(name = "post", httpMethod = ApiMethod.HttpMethod.POST)
    public void post(@Named("url") String url, @Named("data") String data) {
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Entity entity = new Entity("Entity", url);
        entity.setProperty("url", url);
        entity.setProperty("data", data);
        datastore.put(entity);
    }

    /*
     * Version de post avec un objet Java sérialisé passé en paramètre dans le
     * corps de la requête HTTP

        @ApiMethod(name = "post", httpMethod = ApiMethod.HttpMethod.POST)
        public void post(UrlDataBean bean) {
            DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
            Entity entity = new Entity("Entity", bean.getUrl());
            entity.setProperty("url", bean.getUrl());
            entity.setProperty("data", bean.getData());
            datastore.put(entity);
        }
     */
    @ApiMethod(name = "get", httpMethod = ApiMethod.HttpMethod.GET)
    public UrlDataBean get(@Named("url") String url) {
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Entity entity;
        UrlDataBean ret = new UrlDataBean();
        try {
            entity = datastore.get(KeyFactory.createKey("Entity", url));
            ret.setUrl((String) entity.getProperty("url"));
            ret.setData((String) entity.getProperty("data"));
        } catch (EntityNotFoundException e) {
            ;
        }
        return ret;
    }
}
