package com.galactichorse;

import com.google.api.server.spi.config.*;
import com.hp.hpl.jena.rdf.model.*;
import org.apache.jena.riot.Lang;

import java.io.*;
import java.util.Collection;
import java.util.Map;

@Api(name = "ontology")
public class Ontology {
    private static final String ONTOLOGY_PATH = "WEB-INF/accessibility-ontology.ttl";
    private static final Lang ONTOLOGY_INPUT_LANGUAGE = Lang.TURTLE;
    private static final Lang ONTOLOGY_OUTPUT_LANGUAGE = Lang.JSONLD;

    @ApiMethod(name = "get", httpMethod = ApiMethod.HttpMethod.GET)
    public OntologyBean getOntologyJsonld() throws IOException {
        OntologyBean ob = new OntologyBean();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        getOntologyModel().write(baos, ONTOLOGY_OUTPUT_LANGUAGE.getLabel());
        ob.setJsonld(baos.toString());
        return ob;
    }

    public static Model getOntologyModel() throws FileNotFoundException {
        File file = new File(ONTOLOGY_PATH);
        InputStream inputStream = new FileInputStream(file);
        Model model = ModelFactory.createOntologyModel();
        model.read(inputStream, null, ONTOLOGY_INPUT_LANGUAGE.getLabel());
        return model;
    }
}

class OntologyBean {
    private String jsonld;
    private Map<String,Collection<LinkBean>> _links;

    public String getJsonld() {
        return jsonld;
    }

    public void setJsonld(String jsonld) {
        this.jsonld = jsonld;
    }
}

class LinkBean {
    private String href;
    private Boolean templated;
    private String type;
    private String deprecation;
    private String name;
    private String profile;
    private String title;
    private String hreflang;
}
