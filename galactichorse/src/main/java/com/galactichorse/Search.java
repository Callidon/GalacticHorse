package com.galactichorse;

import com.galactichorse.bean.LinkBean;
import com.galactichorse.bean.RequestBean;
import com.galactichorse.bean.ResponseBean;
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
 * @author Pierre Gaultier
 * @author Alexis Giraudet
 * @author Thomas Minier
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
     * @return object containing the JSON-LD formatted ontology (field ontology)
     * @throws IOException
     */
    @ApiMethod(name = "ontology", path = "ontology", httpMethod = ApiMethod.HttpMethod.GET)
    public ResponseBean ontology() throws IOException {
        ResponseBean response = new ResponseBean();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        getOntologyModel().write(baos, MODEL_LANGUAGE.getLabel());
        response.setOntology(baos.toString());

        Map<String, LinkBean> links = new HashMap<String, LinkBean>();
        links.put("self", getOntologyLink());
        links.put("insert", getInsertLink());
        links.put("find", getFindLink());
        response.set_links(links);

        return response;
    }

    /**
     * @param urlModel object containing the url and associated model to insert in the datastore (fields url and model)
     * @return object containing links relation (field _links)
     * @throws Exception
     */
    @ApiMethod(name = "insert", path = "insert", httpMethod = ApiMethod.HttpMethod.POST)
    public ResponseBean insertUrlModel(RequestBean urlModel, User user) throws Exception {
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
        links.put("self", getInsertLink());
        links.put("find", getFindLink());
        links.put("ontology", getOntologyLink());
        response.set_links(links);

        return response;
    }

    /**
     * @param urls object containing urls to find in the datastore (field urls)
     * @return object containing matching urls and associated models (field urlModels)
     */
    @ApiMethod(name = "find", path = "find", httpMethod = ApiMethod.HttpMethod.POST)
    public ResponseBean findUrls(RequestBean urls) {
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
        links.put("self", getFindLink());
        links.put("insert", getInsertLink());
        links.put("ontology", getOntologyLink());
        response.set_links(links);

        return response;
    }

    /**
     * @param hosts a set of hosts to find in the datastore
     * @return a map containing urls matching with hosts and their corresponding models
     */
    public static Map<String, String> findHosts(Set<String> hosts) {
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
     * @return instance of the ontology model
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
     * @param model the model to validate
     * @return true if the model is valid else false
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
     * @return a link to the ontology method
     */
    public static LinkBean getOntologyLink() {
        LinkBean link = new LinkBean();
        link.setHref("/ontology");
        return link;
    }

    /**
     * @return a link to the insert method
     */
    public static LinkBean getInsertLink() {
        LinkBean link = new LinkBean();
        link.setHref("/insert");
        return link;
    }

    /**
     * @return a link to the find method
     */
    public static LinkBean getFindLink() {
        LinkBean link = new LinkBean();
        link.setHref("/find");
        return link;
    }
}
