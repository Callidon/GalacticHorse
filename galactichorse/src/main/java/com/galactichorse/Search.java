package com.galactichorse;

import com.galactichorse.beans.LinkBean;
import com.galactichorse.beans.RequestBean;
import com.galactichorse.beans.ResponseBean;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.appengine.api.datastore.*;
import com.google.appengine.api.oauth.OAuthRequestException;
import com.google.appengine.api.users.User;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.rdf.model.Statement;
import org.apache.jena.riot.Lang;

import java.io.*;
import java.net.URL;
import java.util.*;

/**
 *
 */
@Api(name = "search",
        scopes = {Constants.EMAIL_SCOPE},
        clientIds = {Constants.WEB_CLIENT_ID, Constants.EXTENSION_CLIENT_ID},
        audiences = {Constants.ANDROID_AUDIENCE})
public class Search {
    private static final String ONTOLOGY_PATH = "WEB-INF/reduced-ontology.ttl";
    private static final Lang ONTOLOGY_LANGUAGE = Lang.TURTLE;
    private static final Lang MODEL_LANGUAGE = Lang.JSONLD;
    private static final String ENTITY_KIND_URL_MODEL = "url_model";
    private static final String ENTITY_PROPERTY_MODEL = "model";
    private static final String ENTITY_PROPERTY_HOST = "host";

    private static OntModel ontology__;

    /**
     * @return
     * @throws IOException
     */
    @ApiMethod(name = "ontology", httpMethod = ApiMethod.HttpMethod.GET)
    public ResponseBean getOntology() throws IOException {
        ResponseBean response = new ResponseBean();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        getOntologyModel().write(baos, MODEL_LANGUAGE.getLabel());
        response.setOntology(baos.toString());

        Map<String, LinkBean> links = new HashMap<String, LinkBean>();
        links.put("self", getOntologyLink());
        links.put("nexts", getPutLink());
        response.set_links(links);

        return response;
    }

    /**
     * @param urlModel
     * @return
     * @throws Exception
     */
    @ApiMethod(name = "put", httpMethod = ApiMethod.HttpMethod.POST)
    public ResponseBean putUrlModel(RequestBean urlModel, User user) throws Exception {
        if (user == null)
            throw new OAuthRequestException("user not logged in");

        ResponseBean response = new ResponseBean();
        URL url = new URL(urlModel.getUrl());

        Model ontology = getOntologyModel();
        Model model = ModelFactory.createDefaultModel();
        model.read(new ByteArrayInputStream(urlModel.getModel().getBytes()), null, MODEL_LANGUAGE.getLabel());
        if (!isValidModel(model))
            throw new Exception("invalid model");

        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Entity entity = new Entity(ENTITY_KIND_URL_MODEL, url.toString());
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        model.write(baos, MODEL_LANGUAGE.getLabel());
        entity.setProperty(ENTITY_PROPERTY_MODEL, new Text(baos.toString()));
        entity.setProperty(ENTITY_PROPERTY_HOST, url.getHost());
        datastore.put(entity);

        Map<String, LinkBean> links = new HashMap<String, LinkBean>();
        links.put("self", getPutLink());
        links.put("next", getSearchLink());
        response.set_links(links);

        return response;
    }

    /**
     * @param urls
     * @return
     */
    @ApiMethod(name = "get", httpMethod = ApiMethod.HttpMethod.POST)
    public ResponseBean searchUrls(RequestBean urls) {
        ResponseBean response = new ResponseBean();
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Collection<Key> keys = new ArrayList<Key>();
        Map<String, String> urlModels = new HashMap<String, String>();
        for (String url : urls.getUrls()) {
            keys.add(KeyFactory.createKey(ENTITY_KIND_URL_MODEL, url));
        }
        for (Map.Entry<Key, Entity> entry : datastore.get(keys).entrySet()) {
            urlModels.put(entry.getKey().getName(), ((Text) (entry.getValue().getProperty(ENTITY_PROPERTY_MODEL))).getValue());
        }
        response.setUrlModels(urlModels);

        Map<String, LinkBean> links = new HashMap<String, LinkBean>();
        links.put("self", getSearchLink());
        links.put("next", getOntologyLink());
        response.set_links(links);

        return response;
    }

    /**
     * @param hosts
     * @return
     */
    public static Map<String, String> searchHosts(Set<String> hosts) {
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Map<String, String> hostModels = new HashMap<String, String>();

        Query.Filter filter =
                new Query.FilterPredicate(ENTITY_PROPERTY_HOST,
                        Query.FilterOperator.IN,
                        hosts);
        Query query = new Query(ENTITY_KIND_URL_MODEL).setFilter(filter);
        PreparedQuery preparedQuery = datastore.prepare(query);
        for (Entity result : preparedQuery.asIterable()) {
            hostModels.put((String) result.getProperty(ENTITY_PROPERTY_HOST), ((Text) (result.getProperty(ENTITY_PROPERTY_MODEL))).getValue());
        }

        return hostModels;
    }

    /**
     * @return
     * @throws FileNotFoundException
     */
    public static OntModel getOntologyModel() throws FileNotFoundException {
        if (ontology__ == null) {
            File file = new File(ONTOLOGY_PATH);
            InputStream inputStream = new FileInputStream(file);
            OntModel model = ModelFactory.createOntologyModel();
            model.read(inputStream, null, ONTOLOGY_LANGUAGE.getLabel());
            ontology__ = model;
        }

        return ontology__;
    }

    /**
     * @param model
     * @return
     */
    public static boolean isValidModel(Model model) throws FileNotFoundException {
        for (Statement stmt : model.listStatements().toList()) {
            if (!stmt.getPredicate().toString().equals("http://www.semanticdesktop.org/ontologies/2007/08/15/nao/#hasTag") ||
                    !getOntologyModel().containsResource(stmt.getObject()))
                return false;
        }

        return true;
    }

    /**
     * @return
     */
    public static LinkBean getOntologyLink() {
        LinkBean link = new LinkBean();
        link.setHref("/ontology");
        return link;
    }

    /**
     * @return
     */
    public static LinkBean getPutLink() {
        LinkBean link = new LinkBean();
        link.setHref("/put");
        return link;
    }

    /**
     * @return
     */
    public static LinkBean getSearchLink() {
        LinkBean link = new LinkBean();
        link.setHref("/get");
        return link;
    }
}
