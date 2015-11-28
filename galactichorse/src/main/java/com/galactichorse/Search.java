package com.galactichorse;

import com.galactichorse.beans.DataBean;
import com.galactichorse.beans.RequestBean;
import com.galactichorse.beans.ResponseBean;
import com.google.api.server.spi.config.*;
import com.google.appengine.api.datastore.*;
import com.hp.hpl.jena.ontology.OntModel;
import com.hp.hpl.jena.rdf.model.InfModel;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;
import com.hp.hpl.jena.reasoner.Reasoner;
import com.hp.hpl.jena.reasoner.ReasonerRegistry;
import com.hp.hpl.jena.reasoner.ValidityReport;
import org.apache.jena.riot.Lang;

import java.io.*;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

/**
 *
 */
@Api(name = "search")
public class Search {
    private static final String ONTOLOGY_PATH = "WEB-INF/accessibility-ontology.ttl";
    private static final Lang ONTOLOGY_LANGUAGE = Lang.TURTLE;
    private static final Lang MODEL_LANGUAGE = Lang.JSONLD;
    private static final String ENTITY_KIND_URL_MODEL = "url_model";
    private static final String ENTITY_PROPERTY_MODEL = "model";

    /**
     *
     * @return
     * @throws IOException
     */
    @ApiMethod(name = "ontology", httpMethod = ApiMethod.HttpMethod.GET)
    public ResponseBean getOntology() throws IOException {
        ResponseBean response = new ResponseBean();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        getOntologyModel().write(baos, MODEL_LANGUAGE.getLabel());
        response.setOntology(baos.toString());
        //response.set_links();
        return response;
    }

    /**
     *
     * @param urlModel
     * @return
     * @throws Exception
     */
    @ApiMethod(name = "put", httpMethod = ApiMethod.HttpMethod.POST)
    public ResponseBean putUrlModel(RequestBean urlModel) throws Exception {
        ResponseBean response = new ResponseBean();
        URL url = new URL(urlModel.getUrl());
        Model ontology = getOntologyModel();
        Model model = ModelFactory.createDefaultModel();
        model.read(new ByteArrayInputStream(urlModel.getModel().getBytes()), null, MODEL_LANGUAGE.getLabel());
        Reasoner reasoner = ReasonerRegistry.getOWLReasoner();
        reasoner = reasoner.bindSchema(ontology);
        InfModel infmodel = ModelFactory.createInfModel(reasoner, model);
        ValidityReport validityReport = infmodel.validate();
        if (!validityReport.isValid()) {
            throw new Exception("invalid model");
        }
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        Entity entity = new Entity(ENTITY_KIND_URL_MODEL, url.toString());
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        infmodel.write(baos, MODEL_LANGUAGE.getLabel());
        entity.setProperty(ENTITY_PROPERTY_MODEL, baos.toString());
        datastore.put(entity);
        //response.set_links();
        return response;
    }

    /**
     *
     * @param urls
     * @return
     */
    @ApiMethod(name = "get", httpMethod = ApiMethod.HttpMethod.POST)
    public ResponseBean searchUrls(RequestBean urls) {
        DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
        ResponseBean response = new ResponseBean();
        Collection<Key> keys = new ArrayList<Key>();
        Map<String,String> urlModels = new HashMap<String,String>();
        for (String url : urls.getUrls()) {
            keys.add(KeyFactory.createKey(ENTITY_KIND_URL_MODEL, url));
        }
        for (Map.Entry<Key, Entity> entry : datastore.get(keys).entrySet()) {
            urlModels.put(entry.getKey().getName(), (String) entry.getValue().getProperty(ENTITY_PROPERTY_MODEL));
        }
        response.setUrlModels(urlModels);
        //response.set_links();
        return response;
    }

    /**
     * 
     * @return
     * @throws FileNotFoundException
     */
    public static OntModel getOntologyModel() throws FileNotFoundException {
        File file = new File(ONTOLOGY_PATH);
        InputStream inputStream = new FileInputStream(file);
        OntModel model = ModelFactory.createOntologyModel();
        model.read(inputStream, null, ONTOLOGY_LANGUAGE.getLabel());
        return model;
    }
}
