package com.galactichorse;

import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.hp.hpl.jena.rdf.model.Model;
import com.hp.hpl.jena.rdf.model.ModelFactory;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collection;

@Api(name = "ontology")
public class Ontology {
    @ApiMethod(name = "get", httpMethod = ApiMethod.HttpMethod.GET)
    public Collection<String> get() throws Exception {
        File f = new File("WEB-INF/accessibility-ontology.ttl");
        InputStream is = new FileInputStream(f);
        Model model = ModelFactory.createDefaultModel();
        Collection<String> c = new ArrayList<String>();
        model.read(is, null, "TURTLE");
        c.add(model.toString());
        return c;
    }
}
