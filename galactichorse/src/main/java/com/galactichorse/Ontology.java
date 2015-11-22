package com.galactichorse;

import com.hp.hpl.jena.rdf.model.*;
import org.apache.jena.riot.Lang;

import javax.servlet.http.*;
import java.io.*;

public class Ontology extends HttpServlet {
    private static final String ONTOLOGY_PATH = "WEB-INF/accessibility-ontology.ttl";
    private static final Lang ONTOLOGY_INPUT_LANGUAGE = Lang.TURTLE;
    private static final Lang ONTOLOGY_OUTPUT_LANGUAGE = Lang.JSONLD;

    @Override
    public void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
            resp.setContentType(ONTOLOGY_OUTPUT_LANGUAGE.getHeaderString());
            getOntologyModel().write(resp.getOutputStream(), ONTOLOGY_OUTPUT_LANGUAGE.getLabel());
    }

    public static Model getOntologyModel() throws FileNotFoundException {
        File file = new File(ONTOLOGY_PATH);
        InputStream inputStream = new FileInputStream(file);
        Model model = ModelFactory.createOntologyModel();
        model.read(inputStream, null, ONTOLOGY_INPUT_LANGUAGE.getLabel());
        return model;
    }
}
